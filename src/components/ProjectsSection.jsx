import { ArrowRight, Pointer } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { projects, categoryStyles } from "@/data/projects"
import { SectionHeading } from "./SectionHeading"

// Home page: each project as a row — picture on one side, name + description beside it
export const ProjectsSection = () => {
    return (
        <section id="projects" className="relative scroll-mt-16 px-4 py-20 md:py-28">
            <div className="container mx-auto max-w-6xl">
                <SectionHeading
                    label="Projects"
                    intro={
                        <>
                            <p>Here are some of the recent projects I worked on.</p>
                            <p className="mt-1 inline-flex items-center gap-1.5 text-base">
                                <Pointer className="h-4 w-4" /> Click to see more.
                            </p>
                        </>
                    }
                >
                    My <span className="text-primary">Projects</span>
                </SectionHeading>

                <div className="space-y-8">
                    {projects.map((project, i) => {
                        const Icon = project.icon;
                        const href = `/projects#${project.id}`;
                        return (
                            <article key={project.id} className="panel grid overflow-hidden md:grid-cols-2">
                                {/* Picture (alternates sides on desktop) */}
                                <Link
                                    to={href}
                                    className={cn(
                                        "group block aspect-[4/3] overflow-hidden bg-secondary md:aspect-auto md:min-h-[340px]",
                                        i % 2 === 1 && "md:order-last"
                                    )}
                                    aria-label={`See ${project.title}`}
                                >
                                    <img
                                        src={project.thumbnail}
                                        alt={project.title}
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </Link>

                                {/* Name + description */}
                                <div className="flex flex-col p-7 md:p-9">
                                    <span className={cn("inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium", categoryStyles[project.category])}>
                                        <Icon className="h-3.5 w-3.5" />
                                        {project.category}
                                    </span>
                                    <h3 className="mt-4 text-2xl font-bold md:text-3xl">
                                        <Link to={href} className="transition-colors hover:text-primary">
                                            {project.title}
                                        </Link>
                                    </h3>
                                    <p className="mt-1 font-medium text-primary">{project.subtitle}</p>
                                    <p className="mt-4 leading-relaxed text-muted-foreground">{project.description}</p>

                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="chip">{tag}</span>
                                        ))}
                                    </div>

                                    <Link
                                        to={href}
                                        className="mt-auto inline-flex items-center gap-2 self-start pt-7 font-semibold text-primary hover:underline"
                                    >
                                        See full project <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>

                <div className="mt-12 text-center">
                    <a
                        href="https://www.linkedin.com/in/burakhankokcu/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cosmic-button"
                    >
                        My LinkedIn <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </section>
    )
}
