import { useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Light-mode background: a faint, procedurally generated PCB layout
// (traces routed at 45°, vias and IC footprints) with glowing signal pulses
// travelling along the traces. The static board is drawn once to an offscreen
// canvas; each frame only redraws the pulses on top of it.
// ─────────────────────────────────────────────────────────────────────────────

const GRID = 26; // px between routing grid points
// 8 directions, index * 45°: E, SE, S, SW, W, NW, N, NE
const DIRS = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];

const randInt = (a, b) => a + Math.floor(Math.random() * (b - a + 1));

// Generate chips and traces on a cols × rows grid (grid units, not pixels)
function generateBoard(cols, rows) {
    const used = new Set();
    const cell = (c, r) => `${c},${r}`;
    const inside = (c, r) => c >= 0 && r >= 0 && c < cols && r < rows;

    const chips = [];
    const traces = []; // { pts: [[c, r], ...], fromPin: bool }

    // Route one trace: mostly straight runs, turning 90° through a 45° chamfer
    const route = (c, r, dir, maxLen) => {
        const pts = [[c, r]];
        used.add(cell(c, r));
        let len = 0;
        let run = randInt(2, 6);
        let turn = 1;

        while (len < maxLen) {
            const [dx, dy] = DIRS[dir];
            const nc = c + dx;
            const nr = r + dy;
            // Diagonal moves also claim their midpoint so two diagonals can't cross
            const mid = dx && dy ? `m${c * 2 + dx},${r * 2 + dy}` : null;
            if (!inside(nc, nr) || used.has(cell(nc, nr)) || (mid && used.has(mid))) break;

            c = nc;
            r = nr;
            used.add(cell(c, r));
            if (mid) used.add(mid);
            len++;

            if (--run <= 0) {
                pts.push([c, r]);
                if (dir % 2 === 1) {
                    // Finish the chamfer: second 45° turn, same way, back to orthogonal
                    dir = (dir + turn + 8) % 8;
                    run = randInt(3, 9);
                } else if (Math.random() < 0.55) {
                    // Start a turn with a short diagonal chamfer
                    turn = Math.random() < 0.5 ? 1 : -1;
                    dir = (dir + turn + 8) % 8;
                    run = randInt(1, 2);
                } else {
                    run = randInt(2, 6);
                }
            }
        }
        pts.push([c, r]);
        // Drop zero-length segments
        return pts.filter((p, i) => i === 0 || p[0] !== pts[i - 1][0] || p[1] !== pts[i - 1][1]);
    };

    // 1) IC footprints with traces fanning out of their pins
    // No chips on phone-width screens: the text spans the full width there
    const chipCount = cols < 25 ? 0 : Math.max(2, Math.round((cols * rows) / 450));
    for (let n = 0, tries = 0; n < chipCount && tries < 60; tries++) {
        const w = randInt(3, 5);
        const h = randInt(4, 7);
        const c0 = randInt(2, cols - w - 3);
        const r0 = randInt(2, rows - h - 3);
        let clear = true;
        for (let c = c0 - 2; c <= c0 + w + 2 && clear; c++)
            for (let r = r0 - 1; r <= r0 + h + 1; r++)
                if (used.has(cell(c, r))) { clear = false; break; }
        if (!clear) continue;

        for (let c = c0; c <= c0 + w; c++)
            for (let r = r0; r <= r0 + h; r++) used.add(cell(c, r));
        chips.push({ c0, r0, w, h });
        n++;

        for (let r = r0 + 1; r < r0 + h; r++) {
            if (Math.random() < 0.75) {
                const pts = route(c0 - 1, r, 4, randInt(6, 30));
                if (pts.length > 1) traces.push({ pts, fromPin: true });
            }
            if (Math.random() < 0.75) {
                const pts = route(c0 + w + 1, r, 0, randInt(6, 30));
                if (pts.length > 1) traces.push({ pts, fromPin: true });
            }
        }
    }

    // 2) Free-standing traces between vias
    const freeCount = Math.round((cols * rows) / 55);
    for (let i = 0; i < freeCount; i++) {
        const c = randInt(0, cols - 1);
        const r = randInt(0, rows - 1);
        if (used.has(cell(c, r))) continue;
        const pts = route(c, r, randInt(0, 3) * 2, randInt(6, 36));
        const last = pts[pts.length - 1];
        if (Math.abs(last[0] - c) + Math.abs(last[1] - r) >= 4) traces.push({ pts, fromPin: false });
    }

    return { chips, traces };
}

// Pixel-space polyline with cumulative lengths, for moving pulses along it
function toPath(pts, ox, oy) {
    const p = pts.map(([c, r]) => [ox + c * GRID, oy + r * GRID]);
    const cum = [0];
    for (let i = 1; i < p.length; i++) {
        cum.push(cum[i - 1] + Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]));
    }
    return { p, cum, total: cum[cum.length - 1] };
}

function pointAt(path, s) {
    const { p, cum } = path;
    let i = 1;
    while (i < cum.length - 1 && cum[i] < s) i++;
    const seg = cum[i] - cum[i - 1] || 1;
    const t = Math.min(1, Math.max(0, (s - cum[i - 1]) / seg));
    return [p[i - 1][0] + (p[i][0] - p[i - 1][0]) * t, p[i - 1][1] + (p[i][1] - p[i - 1][1]) * t];
}

// Polyline vertices between distances a and b
function subPath(path, a, b) {
    const out = [pointAt(path, a)];
    for (let i = 1; i < path.cum.length - 1; i++) {
        if (path.cum[i] > a && path.cum[i] < b) out.push(path.p[i]);
    }
    out.push(pointAt(path, b));
    return out;
}

export const CircuitBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let width = 0;
        let height = 0;
        let board = null; // offscreen canvas with the static layout
        let paths = [];
        let pulses = [];
        let flashes = [];
        let frame = 0;
        let last = 0;

        // Colours are kept different from the page text (dark navy) and accents (blue)
        // so text stays readable when a pulse passes behind it.
        const BOARD_HSL = "215 22% 52%";   // slate grey: traces, vias, chips
        const CURRENT_HSL = "155 92% 52%";  // green: the moving signal pulses
        const boardColor = (a) => `hsl(${BOARD_HSL} / ${a})`;
        const currentColor = (a) => `hsl(${CURRENT_HSL} / ${a})`;

        // Calmer in the middle of the screen, where the text is
        const calm = (x, y) => {
            const dx = (x - width / 2) / (width * 0.38);
            const dy = (y - height * 0.48) / (height * 0.42);
            return 1 - 0.65 * Math.max(0, 1 - Math.hypot(dx, dy));
        };

        const build = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const cols = Math.floor(width / GRID) + 1;
            const rows = Math.floor(height / GRID) + 1;
            const ox = (width - (cols - 1) * GRID) / 2;
            const oy = (height - (rows - 1) * GRID) / 2;
            const { chips, traces } = generateBoard(cols, rows);

            board = document.createElement("canvas");
            board.width = canvas.width;
            board.height = canvas.height;
            const b = board.getContext("2d");
            b.setTransform(dpr, 0, 0, dpr, 0, 0);
            b.lineCap = "round";
            b.lineJoin = "round";

            // Traces
            b.lineWidth = 2;
            b.strokeStyle = boardColor(0.16);
            for (const t of traces) {
                b.beginPath();
                t.pts.forEach(([c, r], i) => {
                    const x = ox + c * GRID;
                    const y = oy + r * GRID;
                    if (i === 0) b.moveTo(x, y);
                    else b.lineTo(x, y);
                });
                b.stroke();
            }

            // Vias (ring + drill hole) at trace ends
            const via = (x, y) => {
                b.beginPath();
                b.arc(x, y, 4, 0, Math.PI * 2);
                b.fillStyle = boardColor(0.1);
                b.fill();
                b.lineWidth = 1.5;
                b.strokeStyle = boardColor(0.3);
                b.stroke();
                b.beginPath();
                b.arc(x, y, 1.3, 0, Math.PI * 2);
                b.fillStyle = boardColor(0.35);
                b.fill();
            };
            for (const t of traces) {
                const [ec, er] = t.pts[t.pts.length - 1];
                via(ox + ec * GRID, oy + er * GRID);
                if (!t.fromPin) via(ox + t.pts[0][0] * GRID, oy + t.pts[0][1] * GRID);
            }

            // IC footprints: body, pin-1 notch, pin pads
            for (const { c0, r0, w, h } of chips) {
                const x = ox + c0 * GRID;
                const y = oy + r0 * GRID;
                const bw = w * GRID;
                const bh = h * GRID;
                b.fillStyle = boardColor(0.05);
                b.strokeStyle = boardColor(0.28);
                b.lineWidth = 1.5;
                b.beginPath();
                b.roundRect(x, y, bw, bh, 4);
                b.fill();
                b.stroke();
                b.beginPath();
                b.arc(x + bw / 2, y, 5, 0, Math.PI);
                b.stroke();
                b.fillStyle = boardColor(0.3);
                for (let r = 1; r < h; r++) {
                    const py = y + r * GRID;
                    b.fillRect(x - GRID + 4, py - 3, GRID - 4, 6);
                    b.fillRect(x + bw, py - 3, GRID - 4, 6);
                }
            }

            // Fade the middle so the page text stays readable
            b.save();
            b.globalCompositeOperation = "destination-out";
            b.translate(width / 2, height * 0.48);
            b.scale(width * 0.38, height * 0.42);
            const g = b.createRadialGradient(0, 0, 0, 0, 0, 1);
            g.addColorStop(0, "rgba(0,0,0,0.65)");
            g.addColorStop(1, "rgba(0,0,0,0)");
            b.fillStyle = g;
            b.beginPath();
            b.arc(0, 0, 1, 0, Math.PI * 2);
            b.fill();
            b.restore();

            // Pulses only ride on traces long enough to be worth watching
            paths = traces.map((t) => toPath(t.pts, ox, oy)).filter((p) => p.total > GRID * 5);
            const count = Math.min(16, Math.max(5, Math.round(paths.length / 5)));
            pulses = Array.from({ length: paths.length ? count : 0 }, () => spawn(true));
            flashes = [];
        };

        const spawn = (staggered = false) => {
            const path = paths[Math.floor(Math.random() * paths.length)];
            return {
                path,
                // Staggered start so pulses don't all begin at once on load
                s: staggered ? -Math.random() * path.total : 0,
                speed: 90 + Math.random() * 80, // px per second
                tail: 40 + Math.random() * 40,
            };
        };

        const draw = (now) => {
            const dt = Math.min(0.05, (now - last) / 1000 || 0);
            last = now;

            ctx.clearRect(0, 0, width, height);
            if (board) ctx.drawImage(board, 0, 0, width, height);

            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            for (let i = 0; i < pulses.length; i++) {
                const pl = pulses[i];
                pl.s += pl.speed * dt;
                if (pl.s <= 0) continue;

                if (pl.s - pl.tail >= pl.path.total) {
                    pulses[i] = spawn();
                    continue;
                }
                const head = Math.min(pl.s, pl.path.total);
                const [hx, hy] = pointAt(pl.path, head);
                const fade = calm(hx, hy);

                // Tail drawn in segments that brighten towards the head
                const steps = 4;
                for (let k = 0; k < steps; k++) {
                    const a = Math.max(0, pl.s - pl.tail + (pl.tail * k) / steps);
                    const bnd = Math.min(pl.path.total, pl.s - pl.tail + (pl.tail * (k + 1)) / steps);
                    if (bnd <= a) continue;
                    const pts = subPath(pl.path, a, bnd);
                    ctx.beginPath();
                    pts.forEach(([x, y], j) => (j ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
                    ctx.strokeStyle = currentColor((0.15 + 0.55 * ((k + 1) / steps)) * fade);
                    ctx.lineWidth = 2.5;
                    ctx.stroke();
                }

                if (pl.s < pl.path.total) {
                    ctx.save();
                    ctx.shadowColor = currentColor(0.9);
                    ctx.shadowBlur = 10;
                    ctx.beginPath();
                    ctx.arc(hx, hy, 2.8, 0, Math.PI * 2);
                    ctx.fillStyle = currentColor(0.95 * fade);
                    ctx.fill();
                    ctx.restore();
                } else if (!pl.arrived) {
                    pl.arrived = true;
                    flashes.push({ x: hx, y: hy, t: 1, fade });
                }
            }

            // Via "lights up" when a pulse arrives
            flashes = flashes.filter((f) => (f.t -= dt * 1.6) > 0);
            for (const f of flashes) {
                ctx.save();
                ctx.shadowColor = currentColor(0.8);
                ctx.shadowBlur = 14 * f.t;
                ctx.beginPath();
                ctx.arc(f.x, f.y, 4 + (1 - f.t) * 6, 0, Math.PI * 2);
                ctx.strokeStyle = currentColor(0.7 * f.t * f.fade);
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.restore();
            }

            frame = requestAnimationFrame(draw);
        };

        build();
        if (reduceMotion) {
            ctx.drawImage(board, 0, 0, width, height); // static board only
        } else {
            frame = requestAnimationFrame(draw);
        }

        let resizeTimer;
        const onResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                build();
                if (reduceMotion) ctx.drawImage(board, 0, 0, width, height);
            }, 150);
        };
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(frame);
            clearTimeout(resizeTimer);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
};
