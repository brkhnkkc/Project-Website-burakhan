import { useState } from "react";
import { ArrowLeft, ExternalLink, Cpu, Zap, Code2, Wrench, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    id: 1,
    title: "Spark Logic Kit",
    subtitle: "Interactive STEM Education Kit",
    description:
      "A unique interactive STEM kit built from the ground up to teach younger students the concepts of electrical and computer engineering. Designed to be hands-on and engaging, bridging the gap between theory and real-world circuit behavior.",
    longDescription:
      "Typically, students receive little to no exposure to Electrical and Computer Engineering concepts at a pre-college level. Inspired by Snap Circuits and electronics hobbyist kits, S.P.A.R.K. Logic was built to introduce computer logic without relying on existing technology or experience. The kit includes a custom-designed PCB with guided experiments, a Python-based companion app for visualizing circuit data in real time, and 3D-printed enclosures designed in Fusion 360. The entire system is built around a microcontroller that communicates with the companion software over USB.",
    images: ["/projects/R4_00634.jpg", "/projects/0001.png", "/projects/ANDLogicBrick.png", "/projects/ORLogicBrick.png", "/projects/IMG_2188.jpg"],
    captions: [
    "Final assembled kit",
    "3D render of the kit",
    "AND logic brick",
    "OR logic brick",
    "Student testing the kit",
  ],
    tags: ["Embedded Systems", "PCB Design", "Python", "PSpice", "Fusion360", "Circuit Design"],
    highlights: [
      "Custom PCB designed from scratch with KiCad",
      "Python GUI for real-time circuit visualization",
      "Fusion 360 enclosure with snap-fit assembly",
      "Suitable for students ages 10–16",
    ],
    category: "Hardware",
    icon: <Cpu className="h-5 w-5" />,
    demoUrl: "#",
  },
  {
    id: 2,
    title: "Wi-Fi Controlled Smart Car",
    subtitle: "Autonomous & Remote Vehicle",
    description:
      "A small Wi-Fi controlled car with built-in functions to draw shapes, follow a path, and perform danger detection using ultrasonic sensors.",
    longDescription:
      "Built entirely from custom hardware and firmware, the Smart Car uses a dual H-bridge motor driver, an ESP32 microcontroller, and a custom PCB that integrates power regulation, sensor interfacing, and motor control. The firmware is written in C/C++ and exposes a REST API over Wi-Fi, allowing control from any browser on the local network.",
    images: ["/projects/carAngledview.png", "/projects/carFromTop.jpg", "/projects/carProjectSide.png"],
    captions: [
    "Car powered up via computer",
    "Display board and ESP420 from topview",
    "Side view of the car",
  ],
    tags: ["Embedded Systems", "PCB Design", "C/C++", "Fusion360", "Circuit Design"],
    highlights: [
      "ESP32-based Wi-Fi control via local REST API",
      "Ultrasonic sensor for obstacle avoidance",
      "Custom motor driver PCB",
      "Autonomous shape-drawing mode via dead reckoning",
    ],
    category: "Robotics",
    icon: <Zap className="h-5 w-5" />,
    demoUrl: "#",
  },
  {
    id: 3,
    title: "AI Content Analysis Platform",
    subtitle: "Web-Based Analysis Tool",
    description:
      "A web-based platform for analyzing content using AI models, providing structured insights and summaries.",
    longDescription:
      "A full-stack web application that integrates AI APIs to process and analyze text and media content. The platform features a clean dashboard for viewing analysis results, a Python backend for orchestrating API calls, and a lightweight frontend for user interaction.",
    images: ["/projects/landingPage.png", "/projects/after_annotation.png", "/projects/after_discussion.png", "/projects/metricWebsiteAI.png", "/projects/discussion_performance.png"],
    captions: [
    "Landing page of the website",
    "After a round of independent analysis by agents",
    "A round of discussions between the agents",
    "Reliablity of event analysis after training rounds",
    "Post-disscussion agreement",
  ],
    tags: ["Python", "FastAPI", "Web Design"],
    highlights: [
      "AI-powered text analysis pipeline",
      "Python FastAPI backend",
      "Responsive web dashboard",
      "Structured JSON output for downstream use",
    ],
    category: "Software",
    icon: <Code2 className="h-5 w-5" />,
    demoUrl: "#",
  },
];

const categoryColors = {
  Hardware: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Robotics: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Software: "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

export const ProjectsPage = () => {
  const [lightbox, setLightbox] = useState(null); // { images, index }

  const openLightbox = (images, captions, index) => setLightbox({ images, captions, index });
  const closeLightbox = () => setLightbox(null);
  const prevImage = () => setLightbox(l => ({ ...l, index: (l.index - 1 + l.images.length) % l.images.length }));
  const nextImage = () => setLightbox(l => ({ ...l, index: (l.index + 1) % l.images.length }));

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Header */}
      <div className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-30">
        <div className="container mx-auto max-w-5xl px-4 py-4 flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <span className="text-border">|</span>
          <span className="font-semibold text-lg">Projects</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 px-4 text-center border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-4">
            <Wrench className="h-3 w-3" /> Engineering Portfolio
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A collection of hardware, firmware, and software projects — each built to solve a real problem or explore a new idea.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl space-y-10">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm"
            >
              {/* Top: title + tags + description */}
              <div className="p-6 border-b border-border">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryColors[project.category]}`}>
                    {project.icon}
                    {project.category}
                  </span>
                  {project.demoUrl !== "#" && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" /> Demo
                    </a>
                  )}
                </div>
                <h2 className="text-2xl font-bold mb-0.5">{project.title}</h2>
                <p className="text-sm text-primary mb-3">{project.subtitle}</p>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-3xl">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Image grid */}
              <div className="p-6 border-b border-border">
                <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide font-medium">Photos</p>
                <div className={`grid gap-2 ${
                  project.images.length === 1 ? "grid-cols-1" :
                  project.images.length === 2 ? "grid-cols-2" :
                  project.images.length === 3 ? "grid-cols-3" :
                  "grid-cols-2 md:grid-cols-4"
                }`}>
                  {project.images.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => openLightbox(project.images, project.captions, i)}
                      className={`relative overflow-hidden rounded-lg cursor-pointer group bg-secondary/30
                        ${project.images.length >= 4 && i === 0 ? "col-span-2 row-span-2" : ""}
                      `}
                      style={{ aspectRatio: "4/3" }}
                    >
                      <img
                        src={img}
                        alt={`${project.title} photo ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Details + Highlights */}
              <div className="p-6 grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Project Details</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.longDescription}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Key Highlights</h4>
                  <ul className="space-y-1.5">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-0.5">→</span> {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev */}
          {lightbox.images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 p-2 text-white/70 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}

          {/* Image */}
          <img
            src={lightbox.images[lightbox.index]}
            alt="Enlarged view"
            className="max-h-[85vh] max-w-[85vw] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          {lightbox.images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 p-2 text-white/70 hover:text-white transition-colors"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 flex flex-col items-center gap-1">
  {lightbox.captions?.[lightbox.index] && (
    <p className="text-white/90 text-sm bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-sm">
      {lightbox.captions[lightbox.index]}
    </p>
  )}
  <span className="text-white/50 text-xs">
    {lightbox.index + 1} / {lightbox.images.length}
  </span>
</div>
        </div>
      )}

    </div>
  );
};