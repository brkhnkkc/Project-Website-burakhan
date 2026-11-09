import { MapPin, GraduationCap, Heart, Coffee, BookOpen, ExternalLink, Mail } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Lightbox } from "@/components/Lightbox";
import { PageHeader } from "@/components/PageHeader";

const EMAIL = "kokcuburakhan@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/burakhankokcu/";

// ── Gradient blob background ──────────────────────────────────────────────────
const BlobBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animFrame;
    let t = 0;

    const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Respect the "reduce motion" accessibility setting: draw once, don't animate
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const blobs = [
      { x: 0.2, y: 0.3, r: 0.35, dx: 0.00012, dy: 0.00008, color: [100, 160, 255] },
      { x: 0.7, y: 0.6, r: 0.30, dx: -0.0001, dy: 0.00013, color: [80, 140, 230] },
      { x: 0.5, y: 0.15, r: 0.25, dx: 0.00009, dy: -0.00011, color: [60, 120, 220] },
      { x: 0.15, y: 0.75, r: 0.28, dx: -0.00008, dy: -0.00009, color: [120, 180, 255] },
      { x: 0.85, y: 0.2, r: 0.22, dx: 0.00011, dy: 0.00007, color: [90, 150, 240] },
    ];

    const draw = () => {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blobs.forEach((b) => {
        b.x += b.dx * Math.sin(t * 0.008 + b.r * 10);
        b.y += b.dy * Math.cos(t * 0.006 + b.r * 8);
        if (b.x < 0 || b.x > 1) b.dx *= -1;
        if (b.y < 0 || b.y > 1) b.dy *= -1;

        const cx = b.x * canvas.width;
        const cy = b.y * canvas.height;
        const radius = b.r * Math.min(canvas.width, canvas.height);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `rgba(${b.color[0]},${b.color[1]},${b.color[2]},0.35)`);
        grad.addColorStop(1, `rgba(${b.color[0]},${b.color[1]},${b.color[2]},0)`);

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      if (!reduceMotion) animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  );
};

// ── Data ──────────────────────────────────────────────────────────────────────
const interests = [
  { icon: <Coffee className="h-5 w-5" />, label: "Coffee & Deep Work" },
  { icon: <BookOpen className="h-5 w-5" />, label: "Continuous Learning" },
  { icon: <Heart className="h-5 w-5" />, label: "STEM Outreach" },
];

const timeline = [
  { year: "Present", title: "Electrical & Computer Engineer", description: "Finished my degree with focus on embedded systems, hardware design, and firmware development.", type: "education" },
  { year: "2025", title: "Spark Logic Kit", description: "Designed and built a complete STEM education kit from PCB to 3D-printed enclosure.", type: "project" },
  { year: "2024", title: "Wi-Fi Smart Car", description: "Built a fully custom Wi-Fi-controlled vehicle with autonomous modes and obstacle detection.", type: "project" },
  { year: "2023", title: "Started My Computer Engineering Journey", description: "Began diving deep into microcontrollers, circuit design, and embedded programming.", type: "milestone" },
  { year: "2022", title: "Started My Electrical Engineering Journey", description: "Began diving deep into circuit analysis, electronics, and circuit design.", type: "milestone" },
];

const typeColors = {
  education: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/30",
  project: "bg-primary/10 text-primary border-primary/30",
  milestone: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
};

// ── Artwork ───────────────────────────────────────────────────────────────────
// Images live in public/projects/digart/. Unused ones you can add here later:
// night, bombincity, explosionTest (+ explostiontestBtts), minecraftHB, minecraftTestNight2
const artworks = [
  {
    id: 1,
    title: "Atmospheric Doggo",
    hero: "/projects/digart/atmospheric440.webp",
    supporting: ["/projects/digart/atmosphericBTS.webp", "/projects/digart/atmosphericBTS1.webp", "/projects/digart/atmosphericBTS2.webp"],
    description: "Chatting Turtle. Inspired by leaves flying in the wind during a foggy night.",
  },
  {
    id: 2,
    title: "Broken Wall",
    hero: "/projects/digart/brokenWall4.webp",
    supporting: ["/projects/digart/brokenWall.webp", "/projects/digart/brokenWallBTS.webp"],
    description: "A Broken Wall. Symbolizes the act of breaking walls in order to achieve success (to be free).",
  },
  {
    id: 3,
    title: "Generated Planet",
    hero: "/projects/digart/planet1440.webp",
    supporting: ["/projects/digart/generatedPlanet2.webp"],
    description: "A procedurally generated planet.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export const PersonalPage = () => {
  const [activeArtwork, setActiveArtwork] = useState(null);
  const closeArtwork = useCallback(() => setActiveArtwork(null), []);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <BlobBackground />

      <PageHeader title="About Me" />

      {/* Content — sits above blobs */}
      <div className="relative z-10">

        {/* Hero / Identity */}
        <section className="px-4 pb-10 pt-14 md:pt-20">
          <div className="panel mx-auto grid max-w-5xl items-center gap-10 p-7 sm:p-10 md:grid-cols-[1fr_auto]">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Available for opportunities</span>
              </div>
              <h1 className="mt-3 text-4xl font-bold md:text-5xl">
                Burakhan <span className="text-primary">Kokcu</span>
              </h1>
              <p className="mt-2 text-lg font-medium text-primary">Electrical & Computer Engineer</p>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                I'm an engineer who loves building things from the ground up — from schematic to silkscreen,
                from firmware to front panel. I'm passionate about embedded systems, hardware design, and
                using technology to solve problems that actually matter.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={`mailto:${EMAIL}`} className="cosmic-button">
                  <Mail className="h-4 w-4" /> Contact Me
                </a>
                <a href={LINKEDIN} target="_blank" rel="noreferrer" className="outline-button">
                  <ExternalLink className="h-4 w-4" /> LinkedIn
                </a>
              </div>
            </div>
            <div className="order-first mx-auto h-36 w-36 overflow-hidden rounded-2xl border-2 border-primary/30 shadow-lg md:order-none md:h-48 md:w-48">
              <img src="/brkhn.webp" alt="Burakhan Kokcu" className="h-full w-full object-cover" />
            </div>
          </div>
        </section>

        {/* Journey + Education & Interests */}
        <section className="px-4 py-10">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            <div className="panel p-7 sm:p-8">
              <p className="section-label">Timeline</p>
              <h2 className="mt-2 text-2xl font-bold">My <span className="text-primary">Journey</span></h2>
              <ol className="relative mt-8 space-y-8 border-l-2 border-border pl-6">
                {timeline.map((item) => (
                  <li key={item.title} className="relative">
                    <span className="absolute -left-[33px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-card bg-primary" />
                    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold ${typeColors[item.type]}`}>{item.year}</span>
                    <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted-foreground">{item.description}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col gap-6">
              <div className="panel p-7 sm:p-8">
                <p className="section-label">Education</p>
                <div className="mt-4 flex items-start gap-4">
                  <div className="shrink-0 rounded-xl bg-primary/10 p-3">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">B.S. Electrical Engineering</h3>
                    <h3 className="text-lg font-semibold">B.S. Computer Engineering</h3>
                    <p className="mt-1 text-muted-foreground">North Carolina State University · 12/2025</p>
                    <p className="mt-3 leading-relaxed text-muted-foreground">Coursework in embedded systems, digital logic, signals & systems, circuit analysis, and design.</p>
                  </div>
                </div>
              </div>

              <div className="panel p-7 sm:p-8">
                <p className="section-label">Interests</p>
                <ul className="mt-4 space-y-3">
                  {interests.map((item) => (
                    <li key={item.label} className="flex items-center gap-3 rounded-xl border border-border bg-secondary/60 px-4 py-3">
                      <span className="text-primary">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Digital Artwork Gallery */}
        <section className="px-4 py-10">
          <div className="panel mx-auto max-w-5xl p-7 sm:p-8">
            <div className="text-center">
              <p className="section-label">Gallery</p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">Digital <span className="text-primary">Artwork</span></h2>
              <p className="mt-2 text-muted-foreground">Click any piece to explore it in detail.</p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {artworks.map((artwork) => (
                <figure key={artwork.id}>
                  <button
                    type="button"
                    onClick={() => setActiveArtwork(artwork)}
                    aria-label={`Open artwork: ${artwork.title}`}
                    className="group relative block aspect-square w-full overflow-hidden rounded-xl border border-border bg-secondary"
                  >
                    <img
                      src={artwork.hero}
                      alt={artwork.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white">
                      {artwork.supporting.length + 1} images
                    </span>
                  </button>
                  <figcaption className="mt-3">
                    <p className="font-semibold">{artwork.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{artwork.description}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pb-20 pt-10">
          <div className="panel mx-auto max-w-2xl p-8 text-center sm:p-10">
            <h2 className="text-2xl font-bold md:text-3xl">Let's Build Something</h2>
            <p className="mt-3 text-lg text-muted-foreground">Open to internships, collaborations, and interesting engineering problems.</p>
            <a href={`mailto:${EMAIL}`} className="cosmic-button mt-7">
              <Mail className="h-4 w-4" /> Get In Touch
            </a>
          </div>
        </section>

      </div>

      {/* Artwork viewer modal */}
      {activeArtwork && (
        <Lightbox
          images={[activeArtwork.hero, ...activeArtwork.supporting]}
          title={activeArtwork.title}
          onClose={closeArtwork}
        />
      )}
    </div>
  );
};