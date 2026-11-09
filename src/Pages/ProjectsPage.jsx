import { useCallback, useState } from "react";
import { ExternalLink, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { projects, categoryStyles } from "@/data/projects";
import { Lightbox } from "@/components/Lightbox";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { StarBackground } from "@/components/StarBackground";

// Large photo + thumbnail strip. Thumbnails switch the large photo; clicking it opens the lightbox.
const ProjectGallery = ({ project, onOpen }) => {
  const [active, setActive] = useState(0);
  const caption = project.captions[active];

  return (
    <div>
      <button
        type="button"
        onClick={() => onOpen(active)}
        aria-label={`Enlarge photo: ${caption ?? project.title}`}
        className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-secondary"
      >
        <img
          src={project.images[active]}
          alt={caption ?? project.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute right-3 top-3 rounded-full bg-black/55 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100">
          <Maximize2 className="h-4 w-4" />
        </span>
      </button>
      {caption && <p className="mt-2 text-sm text-muted-foreground">{caption}</p>}

      {project.images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {project.images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show photo: ${project.captions[i] ?? i + 1}`}
              aria-pressed={i === active}
              className={cn(
                "aspect-square overflow-hidden rounded-lg border-2 transition",
                i === active ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <img src={img} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const ProjectsPage = () => {
  const [lightbox, setLightbox] = useState(null); // { project, index }
  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <StarBackground />
      <PageHeader title="Projects" />

      <main className="relative z-10 px-4 pb-20 pt-14 md:pt-20">
        <div className="container mx-auto max-w-6xl">
          <SectionHeading
            as="h1"
            label="Engineering Portfolio"
            intro="A collection of hardware and software projects — each built to solve a real problem or explore a new idea."
          >
            My <span className="text-primary">Projects</span>
          </SectionHeading>

          <div className="space-y-12">
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <article key={project.id} id={project.id} className="panel scroll-mt-24 overflow-hidden">
                  {/* Pictures beside name + description */}
                  <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
                    <ProjectGallery
                      project={project}
                      onOpen={(index) => setLightbox({ project, index })}
                    />

                    <div className="flex flex-col">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium", categoryStyles[project.category])}>
                          <Icon className="h-3.5 w-3.5" />
                          {project.category}
                        </span>
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                          >
                            <ExternalLink className="h-3.5 w-3.5" /> Demo
                          </a>
                        )}
                      </div>
                      <h2 className="mt-4 text-3xl font-bold">{project.title}</h2>
                      <p className="mt-1 font-medium text-primary">{project.subtitle}</p>
                      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{project.description}</p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="chip">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Details + highlights underneath */}
                  <div className="grid gap-8 border-t border-border bg-secondary/40 p-5 sm:p-7 md:grid-cols-2">
                    <div>
                      <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        Project Details
                      </h3>
                      <p className="mt-3 leading-relaxed">{project.longDescription}</p>
                    </div>
                    <div>
                      <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        Key Highlights
                      </h3>
                      <ul className="mt-3 space-y-2">
                        {project.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2.5 leading-relaxed">
                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>

      {lightbox && (
        <Lightbox
          images={lightbox.project.images}
          captions={lightbox.project.captions}
          title={lightbox.project.title}
          startIndex={lightbox.index}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
};
