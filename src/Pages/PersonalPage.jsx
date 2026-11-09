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
  education: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  project: "bg-primary/10 text-primary border-primary/20",
  milestone: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
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
        <section className="py-20 px-4 border-b border-border">
          <div className="container mx-auto max-w-4xl grid md:grid-cols-[1fr_auto] gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Available for opportunities</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                Burakhan <span className="text-primary">Kokcu</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6">Electrical & Computer Engineer</p>
              <p className="text-muted-foreground leading-relaxed max-w-xl">
                I'm an engineer who loves building things from the ground up — from schematic to silkscreen,
                from firmware to front panel. I'm passionate about embedded systems, hardware design, and
                using technology to solve problems that actually matter.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 cosmic-button">
                  <Mail className="h-4 w-4" /> Contact Me
                </a>
                <a href={LINKEDIN} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 text-sm font-medium">
                  <ExternalLink className="h-4 w-4" /> LinkedIn
                </a>
              </div>
            </div>
            <div className="w-40 h-40 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-lg mx-auto">
              <img src="/brkhn.webp" alt="Burakhan Kokcu" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* What I Do */}
        <section className="py-16 px-4 border-b border-border">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold mb-8">What I <span className="text-primary">Do</span></h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Hardware Design", body: "I design PCBs from scratch — schematics, layout, DRC, and fabrication. Tools include KiCad, Altium, and PSpice for simulation." },
                { title: "Embedded Firmware", body: "I write firmware in C/C++ for microcontrollers (ESP32, STM32, Arduino). I'm comfortable with bare-metal and RTOS environments." },
                { title: "System Thinking", body: "I think holistically about products — from power budget to mechanical enclosure to user experience. I enjoy building complete systems." },
              ].map((item) => (
                <div key={item.title} className="bg-card/80 backdrop-blur-sm rounded-xl border border-border p-5 card-hover">
                  <h3 className="font-semibold text-base mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education & Timeline */}
        <section className="py-16 px-4 border-b border-border">
          <div className="container mx-auto max-w-4xl grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-8">My <span className="text-primary">Journey</span></h2>
              <div className="relative border-l-2 border-border pl-6 space-y-8">
                {timeline.map((item, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${typeColors[item.type]}`}>{item.year}</span>
                    </div>
                    <h4 className="font-semibold text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4"><span className="text-primary">Education</span></h2>
                <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border p-5">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">B.S. Electrical Engineering</h4>
                      <h4 className="font-semibold">B.S. Computer Engineering</h4>
                      <p className="text-sm text-muted-foreground">North Carolina State University · 12/2025</p>
                      <p className="text-xs text-muted-foreground mt-2">Coursework in embedded systems, digital logic, signals & systems, circuit analysis, and design.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4"><span className="text-primary">Interests</span></h2>
                <div className="space-y-3">
                  {interests.map((item) => (
                    <div key={item.label} className="flex items-center gap-3 bg-card/80 backdrop-blur-sm rounded-lg border border-border px-4 py-3">
                      <span className="text-primary">{item.icon}</span>
                      <span className="text-sm">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Digital Artwork Gallery */}
        <section className="py-16 px-4 border-b border-border">
          <div className="w-full px-4">
          <h2 className="text-2xl font-bold mb-2 text-center">Digital <span className="text-primary">Artwork</span></h2>
          <p className="text-sm text-muted-foreground mb-8 text-center">Click any piece to explore it in detail.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
              {artworks.map((artwork) => (
                <button
                  type="button"
                  key={artwork.id}
                  onClick={() => setActiveArtwork(artwork)}
                  aria-label={`Open artwork: ${artwork.title}`}
                  style={{ aspectRatio: "1/1" }}
                  className="relative group cursor-pointer rounded-xl overflow-hidden bg-card border border-border w-full"
                >
                  <img
                    src={artwork.hero}
                    alt={artwork.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-end p-4">
                    <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-white font-semibold text-sm">{artwork.title}</p>
                      <p className="text-white/60 text-xs mt-0.5">{artwork.supporting.length + 1} images</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 text-center">
          <div className="container mx-auto max-w-xl">
            <h2 className="text-2xl font-bold mb-3">Let's Build Something</h2>
            <p className="text-muted-foreground mb-6 text-sm">Open to internships, collaborations, and interesting engineering problems.</p>
            <a href={`mailto:${EMAIL}`} className="cosmic-button inline-flex items-center gap-2">
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