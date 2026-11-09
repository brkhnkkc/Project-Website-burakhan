import { ArrowRight, Cog, Cpu, Download, Mail, User } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const strengths = [
    {
        icon: Cog,
        title: "Embedded Systems",
        body: "Developing embedded solutions using microcontrollers and RTOS. Low-level programming, system integration, and optimization for real-time applications.",
    },
    {
        icon: Cpu,
        title: "Hardware/Software",
        body: "Bridging hardware and software for developing reliable systems. Skilled in circuit design, system architectures, debugging, and writing firmware that interacts with physical components.",
    },
    {
        icon: User,
        title: "Team-work",
        body: "Collaborative and adaptable team player with experience working in diverse groups. Effective at communicating technical ideas, contributing to shared goals, and supporting team success.",
    },
];

export const AboutSection = () => {
    return (
        <section id="about" className="relative scroll-mt-16 px-4 py-20 md:py-28">
            <div className="container mx-auto max-w-6xl">
                <SectionHeading label="About">
                    About <span className="text-primary">Me</span>
                </SectionHeading>

                <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
                    {/* Story + actions */}
                    <div className="panel flex flex-col justify-center p-7 sm:p-9">
                        <h3 className="text-2xl font-semibold md:text-3xl">
                            Passionate Electrical and Computer Engineer
                        </h3>
                        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                            Experienced in embedded systems and system design.
                            I like working with hardware and microcontrollers as well as programming for hardware.
                        </p>
                        <p className="mt-4 text-lg leading-relaxed">
                            I'm passionate about finding and implementing solutions to life-affecting problems.
                        </p>

                        <div className="flex flex-wrap gap-3 pt-8">
                            <a href="mailto:kokcuburakhan@gmail.com" className="cosmic-button">
                                <Mail className="h-4 w-4" /> Get In Touch
                            </a>
                            <a href="/BurakhanKokcu_Resume.pdf" target="_blank" rel="noopener noreferrer" className="outline-button">
                                <Download className="h-4 w-4" /> Download Resume
                            </a>
                            <a href="https://www.linkedin.com/in/burakhankokcu/" target="_blank" rel="noopener noreferrer" className="outline-button">
                                My LinkedIn <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Strengths */}
                    <div className="grid gap-4">
                        {strengths.map(({ icon, title, body }) => {
                            const Icon = icon;
                            return (
                            <div key={title} className="panel flex items-start gap-4 p-6">
                                <div className="shrink-0 rounded-xl bg-primary/10 p-3">
                                    <Icon className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold">{title}</h4>
                                    <p className="mt-1 leading-relaxed text-muted-foreground">{body}</p>
                                </div>
                            </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
