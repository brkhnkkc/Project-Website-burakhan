import { ArrowDown } from "lucide-react"

// First thing visitors see: who you are + the main actions
export const HeroSection = () => {
    return (
        <section id="hero" className="relative flex min-h-[100svh] items-center px-4 pt-28 pb-24">
            <div className="container relative z-10 mx-auto max-w-6xl">
                <div className="grid items-center gap-8 md:grid-cols-[1.3fr_1fr] md:gap-12">

                    {/* Text panel */}
                    <div className="panel p-7 opacity-0 animate-fade-in sm:p-10">
                        <p className="section-label">Electrical & Computer Engineer</p>
                        <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
                            Hi, I'm <span className="text-primary">Burakhan</span>
                            <br />
                            Kokcu
                        </h1>
                        <p className="mt-6 border-l-4 border-primary pl-4 text-lg leading-relaxed text-foreground/85 md:text-xl">
                            I'm an engineer who loves building things from the ground up. Passionate about embedded systems, hardware & software design, and using technology to solve problems that actually matter.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <a href="#projects" className="cosmic-button">
                                View my projects
                            </a>
                            <a href="#about" className="outline-button">
                                About me
                            </a>
                        </div>
                    </div>

                    {/* Headshot (shown above the text on phones) */}
                    <div className="order-first flex justify-center opacity-0 animate-fade-in-delay-1 md:order-none">
                        <div className="relative aspect-square w-36 overflow-hidden rounded-2xl border-2 border-primary/30 shadow-xl sm:w-48 md:w-full md:max-w-sm">
                            <img
                                src="/brkhn.webp"
                                alt="Burakhan Kokcu"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                </div>
            </div>

            <a
                href="#about"
                className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center rounded-full bg-card/80 px-3 py-2 text-sm text-muted-foreground backdrop-blur-sm animate-bounce md:flex"
            >
                Scroll
                <ArrowDown className="h-4 w-4 text-primary" />
            </a>
        </section>
    )
}
