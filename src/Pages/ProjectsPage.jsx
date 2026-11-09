import { useState } from "react";
import { ExternalLink, Wrench } from "lucide-react";
import { projects } from "@/data/projects";
import { Lightbox } from "@/components/Lightbox";
import { PageHeader } from "@/components/PageHeader";

const categoryColors = {
  Hardware: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  Robotics: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  Software: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
};

const gridCols = (n) =>
  n === 1 ? "grid-cols-1" :
  n === 2 ? "grid-cols-2" :
  n === 3 ? "grid-cols-3" :
  "grid-cols-2 md:grid-cols-4";

export const ProjectsPage = () => {
  const [lightbox, setLightbox] = useState(null); // { project, index }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHeader title="Projects" />

      {/* Hero */}
      <section className="py-16 px-4 text-center border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-4">
            <Wrench className="h-3 w-3" /> Engineering Portfolio
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-primary">Projects</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A collection of hardware and software projects — each built to solve a real problem or explore a new idea.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl space-y-10">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <article
                key={project.id}
                id={project.id}
                className="scroll-mt-20 bg-card rounded-2xl border border-border overflow-hidden shadow-sm"
              >
                {/* Top: title + tags + description */}
                <div className="p-6 border-b border-border">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryColors[project.category]}`}>
                      <Icon className="h-5 w-5" />
                      {project.category}
                    </span>
                    {project.demoUrl && (
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
                  <div className={`grid gap-2 ${gridCols(project.images.length)}`}>
                    {project.images.map((img, i) => (
                      <button
                        key={img}
                        type="button"
                        onClick={() => setLightbox({ project, index: i })}
                        aria-label={`Open photo: ${project.captions[i] ?? project.title}`}
                        className={`relative overflow-hidden rounded-lg cursor-pointer group bg-secondary/30
                          ${project.images.length >= 4 && i === 0 ? "col-span-2 row-span-2" : ""}
                        `}
                        style={{ aspectRatio: "4/3" }}
                      >
                        <img
                          src={img}
                          alt={project.captions[i] ?? `${project.title} photo ${i + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Details + Highlights */}
                <div className="p-6 grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-2">Project Details</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.longDescription}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-2">Key Highlights</h3>
                    <ul className="space-y-1.5">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-0.5">→</span> {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {lightbox && (
        <Lightbox
          images={lightbox.project.images}
          captions={lightbox.project.captions}
          title={lightbox.project.title}
          startIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
};
