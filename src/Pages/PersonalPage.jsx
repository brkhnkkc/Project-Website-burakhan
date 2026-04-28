import { ArrowLeft, MapPin, GraduationCap, Heart, Coffee, BookOpen, ExternalLink, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const interests = [
  { icon: <Coffee className="h-5 w-5" />, label: "Coffee & Deep Work" },
  { icon: <BookOpen className="h-5 w-5" />, label: "Continuous Learning" },
  { icon: <Heart className="h-5 w-5" />, label: "STEM Outreach" },
];

const timeline = [
  {
    year: "Present",
    title: "Electrical & Computer Engineering",
    description: "Pursuing my degree with focus on embedded systems, hardware design, and firmware development.",
    type: "education",
  },
  {
    year: "2024",
    title: "Spark Logic Kit",
    description: "Designed and built a complete STEM education kit from PCB to 3D-printed enclosure.",
    type: "project",
  },
  {
    year: "2023",
    title: "Wi-Fi Smart Car",
    description: "Built a fully custom Wi-Fi-controlled vehicle with autonomous modes and obstacle detection.",
    type: "project",
  },
  {
    year: "2022",
    title: "Started Engineering Journey",
    description: "Began diving deep into microcontrollers, circuit design, and embedded programming.",
    type: "milestone",
  },
];

const typeColors = {
  education: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  project: "bg-primary/10 text-primary border-primary/20",
  milestone: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

export const PersonalPage = () => {
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
          <span className="font-semibold text-lg">About Me</span>
        </div>
      </div>

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
            <p className="text-lg text-muted-foreground mb-6">
              Electrical & Computer Engineering Student
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-xl">
              I'm an engineer who loves building things from the ground up — from schematic to silkscreen,
              from firmware to front panel. I'm passionate about embedded systems, hardware design, and
              using technology to solve problems that actually matter.
            </p>

            <div className="flex gap-3 mt-6">
              <a
                href="mailto:your@email.com"
                className="flex items-center gap-2 cosmic-button"
              >
                <Mail className="h-4 w-4" /> Contact Me
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 text-sm font-medium"
              >
                LinkedIn
                </a>
            </div>
          </div>

          {/* Avatar Placeholder */}
          <div className="w-40 h-40 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
            <span className="text-5xl">👨‍💻</span>
          </div>
        </div>
      </section>

      {/* What I Do */}
      <section className="py-16 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">
            What I <span className="text-primary">Do</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Hardware Design",
                body: "I design PCBs from scratch — schematics, layout, DRC, and fabrication. Tools include KiCad, Altium, and PSpice for simulation.",
              },
              {
                title: "Embedded Firmware",
                body: "I write firmware in C/C++ for microcontrollers (ESP32, STM32, Arduino). I'm comfortable with bare-metal and RTOS environments.",
              },
              {
                title: "System Thinking",
                body: "I think holistically about products — from power budget to mechanical enclosure to user experience. I enjoy building complete systems.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-card rounded-xl border border-border p-5 card-hover"
              >
                <h3 className="font-semibold text-base mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Background */}
      <section className="py-16 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl grid md:grid-cols-2 gap-12">
          {/* Timeline */}
          <div>
            <h2 className="text-2xl font-bold mb-8">
              My <span className="text-primary">Journey</span>
            </h2>
            <div className="relative border-l-2 border-border pl-6 space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border font-medium ${typeColors[item.type]}`}
                    >
                      {item.year}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Interests */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                <span className="text-primary">Education</span>
              </h2>
              <div className="bg-card rounded-xl border border-border p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">B.S. Electrical & Computer Engineering</h4>
                    <p className="text-sm text-muted-foreground">Your University · Expected Graduation Year</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Coursework in embedded systems, digital logic, signals & systems, circuit analysis, and VLSI design.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                <span className="text-primary">Interests</span>
              </h2>
              <div className="space-y-3">
                {interests.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 bg-card rounded-lg border border-border px-4 py-3"
                  >
                    <span className="text-primary">{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <div className="container mx-auto max-w-xl">
          <h2 className="text-2xl font-bold mb-3">Let's Build Something</h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Open to positions, collaborations, and interesting engineering problems.
          </p>
          <a href="mailto:your@email.com" className="cosmic-button inline-flex items-center gap-2">
            <Mail className="h-4 w-4" /> Get In Touch
          </a>
        </div>
      </section>
    </div>
  );
};