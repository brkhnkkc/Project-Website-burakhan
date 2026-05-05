import { Briefcase, Code, Cog, Cpu, User } from "lucide-react";



export const AboutSection = () => {
    return <section id="about" className="py-24 px-4 relative">
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4l font-bold mb-12 text-center">
                About <span className="text-primary"> Me</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h3>
                        Passionate Electrical and Computer Engineer
                    </h3>
                    <p className="text-muted-foreground">
                        Experienced in embedded systems and system design. 
                        I like working with hardware and microcontrollers as well as programming for hardware.
                    </p>

                    <p>
                        I'm Passionate about finding and implementing solutions to life-affecting problems.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                        <a href="mailto:kokcuburkhan@gmail.com" className="cosmic-button">
                            Get In Touch
                        </a>
                        <a href="/BurakhanKokcu_Resume.pdf" target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 tansition-colors duration-300">
                            Download Resume
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                 <div className="gradient-border p-6 card-hover">
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-primary/10">
                         <Cog className="h-6 w-6 text-rpimary"/>
                        </div>
                        <div className="text-left">
                            <h4 className="font-semibold text-lg"> Embedded Systems </h4>
                            <p className="text-muted-foreground">
                               Developing embedded solutions using microcontrollers and RTOS. Low-level programming, system integration, and optimization for real-time applications.
                            </p>
                        </div>
                    </div>
                 </div>
                 <div className="gradient-border p-6 card-hover">
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-primary/10">
                         <Cpu className="h-6 w-6 text-rpimary"/>
                        </div>
                        <div className="text-left">
                            <h4 className="font-semibold text-lg"> Hardware/Software </h4>
                            <p className="text-muted-foreground">
                               Bridging hardware and software for developing reliable systems. Skilled in circuit design, system architectures, debugging, and writing firmware that interacts with physical components.
                            </p>
                        </div>
                    </div>
                 </div>
                 <div className="gradient-border p-6 card-hover">
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-primary/10">
                         <User className="h-6 w-6 text-rpimary"/>
                        </div>
                        <div className="text-left">
                            <h4 className="font-semibold text-lg"> Team-work </h4>
                            <p className="text-muted-foreground">
                                 Collaborative and adaptable team player with experience working in diverse groups. Effective at communicating technical ideas, contributing to shared goals, and supporting team success.
                            </p>
                        </div>
                    </div>
                 </div>
                </div>
            </div>
        </div>
    </section>;
}