import { ArrowDown } from "lucide-react"

export const HeroSection = () => {
    return <section id="hero" 
            className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
        <div className="container max-w-6xl mx-auto z-10">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-12 items-center">

                {/* Left — text + buttons */}
                <div className="space-y-6 text-left">
                    <p className="text-base font-semibold text-primary uppercase tracking-widest opacity-0 animate-fade-in">
                        Electrical & Computer Engineer
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                        <span className="opacity-0 animate-fade-in-delay-1">Hi, I'm </span>
                        <span className="text-primary opacity-0 animate-fade-in-delay-1">Burakhan</span>
                        <br />
                        <span className="opacity-0 animate-fade-in-delay-2">Kokcu</span>
                    </h1>
                    <p className="text-lg font-medium leading-relaxed text-foreground/75 opacity-0 animate-fade-in-delay-3 border-l-4 border-primary pl-4">
                        I'm an engineer who loves building things from the ground up. Passionate about embedded systems, hardware & software design, and using technology to solve problems that actually matter.
                    </p>
                    <div className="opacity-0 animate-fade-in-delay-4 flex flex-col sm:flex-row gap-3">
                        <a href="#projects" className="cosmic-button">
                            View my projects
                        </a>
                        <a href="#about" className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 font-medium text-center">
                            About me
                        </a>
                    </div>
                </div>

                {/* Right — headshot */}
                <div className="hidden md:flex items-center justify-center">
                    <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden border-2 border-primary/30 shadow-xl">
                        <img
                            src="/brkhn.jpeg"
                            alt="Burakhan Kokcu"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary/10" />
                    </div>
                </div>

            </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
            <span className="text-sm text-muted-foreground mb-2">Scroll</span>
            <ArrowDown className="h-5 w-5 text-primary" />
        </div>
    </section>
}