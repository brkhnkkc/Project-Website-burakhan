import { useState } from "react";
import { ArrowLeft, ExternalLink, ChevronDown, ChevronUp, Cpu, Zap, Code2, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    id: 1,
    title: "Spark Logic Kit",
    subtitle: "Interactive STEM Education Kit",
    description:
      "A unique interactive STEM kit built from the ground up to teach younger students the concepts of electrical and computer engineering. Designed to be hands-on and engaging, bridging the gap between theory and real-world circuit behavior.",
    longDescription:
      "The Spark Logic Kit was born from the idea that students learn best by doing. The kit includes a custom-designed PCB with guided experiments, a Python-based companion app for visualizing circuit data in real time, and 3D-printed enclosures designed in Fusion 360. The entire system is built around a microcontroller that communicates with the companion software over USB.",
    image: "/projects/R4_00634.jpg",
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
    image: "/projects/0001.png",
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
    image: "",
    tags: ["Python", "PSpice", "Web Design"],
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
  const [expanded, setExpanded] = useState(null);

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
            A collection of hardware, firmware, and software projects — each
            built to solve a real problem or explore a new idea.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl space-y-6">
          {projects.map((project) => {
            const isOpen = expanded === project.id;
            return (
              <div
                key={project.id}
                className="bg-card rounded-xl border border-border overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                {/* Card Top */}
                <div className="grid md:grid-cols-[280px_1fr] grid-cols-1">
                  {/* Image */}
                  <div className="h-48 md:h-auto bg-secondary/30 overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                        No image yet
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryColors[project.category]}`}
                        >
                          {project.icon}
                          {project.category}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold mb-0.5">{project.title}</h2>
                      <p className="text-sm text-primary mb-3">{project.subtitle}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
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

                    <div className="flex items-center gap-3 mt-5">
                      <button
                        onClick={() => setExpanded(isOpen ? null : project.id)}
                        className="flex items-center gap-1.5 text-sm text-primary hover:underline"
                      >
                        {isOpen ? (
                          <>
                            Show less <ChevronUp className="h-4 w-4" />
                          </>
                        ) : (
                          <>
                            Read more <ChevronDown className="h-4 w-4" />
                          </>
                        )}
                      </button>
                      {project.demoUrl !== "#" && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" /> View Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Detail */}
                {isOpen && (
                  <div className="border-t border-border px-6 py-5 bg-background/50 grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        Project Details
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.longDescription}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        Key Highlights
                      </h4>
                      <ul className="space-y-1.5">
                        {project.highlights.map((h, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="text-primary mt-0.5">→</span> {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};