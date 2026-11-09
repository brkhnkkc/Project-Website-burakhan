import { ArrowRight, Pointer } from "lucide-react"
import { Link } from "react-router-dom"
import { projects } from "@/data/projects"

export const ProjectsSection = () => {
    return <section id="projects" className="py-24 px-4 relative">
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                My <span className="text-primary">Projects</span>
            </h2>
            <div className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                <p>Here are some of the recent projects I worked on.</p>
                <p>
                    <Pointer className="inline h-5 w-5" /> Click to see more.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <Link
                        key={project.id}
                        to={`/projects#${project.id}`}
                        className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
                    >
                        <div className="h-48 overflow-hidden">
                            <img
                                src={project.thumbnail}
                                alt={project.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>

                        <div className="p-6">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                            <p className="text-muted-foreground text-sm line-clamp-3">
                                {project.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="text-center mt-12">
                <a
                    href="https://www.linkedin.com/in/burakhankokcu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cosmic-button w-fit flex items-center mx-auto gap-2"
                >
                    My LinkedIn <ArrowRight size={16} />
                </a>
            </div>
        </div>
    </section>
}
