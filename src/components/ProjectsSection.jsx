import { ArrowRight, ExternalLink, MousePointer, Pointer } from "lucide-react"
import { Link } from "react-router-dom"

const projects = [
    {
        id: 1,
        title: "Spark Logic Kit",
        description: "A unique interactive STEM kit build from from ground up to teach younger student the concepts of electrical and computer engineering",
        image: ["/projects/R4_00634.png"],
        tags: ["Embedded Systems","PCB design","Python","PSpice","Fusion360","Circuit Design"],
        demoUrl: "#",
    },
     {
        id: 2,
        title: "Wi-Fi Controlled Smart Car ",
        description: "A small Wi-Fi controlled car with build in functions to draw shapes, follow path, and danger detection.",
        image: ["/projects/carAngledview.png"],
        tags: ["Embedded Systems","PCB design","C/C++","Fusion360","Circuit Design"],
        demoUrl: "#",
    },
     {
        id: 3,
        title: "AI Content Analysis Platform",
        description: "A web based platform that analyzes uploaded data points based on a pre-made codebook.",
        image: ["/projects/landingPage.png"],
        tags: ["Python","PSpice","Web Design"],
        demoUrl: "#",
    },
]

export const ProjectsSection = () => {
    return <section id="projects" className="py-24 px-4 relative">
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                 My <span className="text-primary"> Projects </span>
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Here are some of the projects I worked on. 
                <p>
                <Pointer className="inline h-5 w-5"/> Click to see more.</p>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, key) => (
                    <Link key={key} to="/projects" className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover">
                    
                    <div className="h-48 overflow-hidden">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
                    </div>

                      <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag) => (
                                <span key={tag} className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">{tag}</span>
                            ))}
                        </div>
                      <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {project.description}
                      </p>
                       <div className="flex justify-between items-center">
                        <div className="flex space-x-3">

                        </div>
                       </div>
                     </div>
                    </Link>
                ))}
            </div>


            <div className="text-center mt-12">
                <a 
                href="https://www.linkedin.com/in/burakhankokcu/"
                target="_blank"
                rel="noopener noreferrer"
                className="cosmic-button w-fit flex items-center mx-auto gap-2">
                    My LinkedIn <ArrowRight size={16} />
                </a>
            </div>

        </div>
    </section>
}