import { CircuitBoard, Cpu, Boxes } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

// Each focus area: what you do (your own words) + the tools you use for it
const focusAreas = [
    {
        icon: CircuitBoard,
        title: "Hardware Design",
        body: "I design PCBs from scratch — schematics, layout, DRC, and fabrication. Tools include KiCad, Altium, and PSpice for simulation.",
        skills: ["PCB Design", "Circuit Design", "PSpice", "AWR", "MATLAB"],
    },
    {
        icon: Cpu,
        title: "Embedded Firmware",
        body: "I write firmware in C/C++ for microcontrollers (ESP32, STM32, Arduino). I'm comfortable with bare-metal and RTOS environments.",
        skills: ["C/C++", "Python", "Verilog", "Java"],
    },
    {
        icon: Boxes,
        title: "System Thinking",
        body: "I think holistically about products — from power budget to mechanical enclosure to user experience. I enjoy building complete systems.",
        skills: ["Fusion 360", "AutoCAD", "3D Design/Modelling"],
    },
];

export const SkillSection = () => {
    return (
        <section id="skills" className="relative scroll-mt-16 px-4 py-20 md:py-28">
            <div className="container mx-auto max-w-6xl">
                <SectionHeading label="Skills & Focus">
                    My <span className="text-primary">Skills</span>
                </SectionHeading>

                <div className="grid gap-6 md:grid-cols-3">
                    {focusAreas.map(({ icon, title, body, skills }) => {
                        const Icon = icon;
                        return (
                        <div key={title} className="panel flex flex-col p-7">
                            <div className="w-fit rounded-xl bg-primary/10 p-3">
                                <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                            <p className="mt-3 leading-relaxed text-muted-foreground">{body}</p>

                            <div className="mt-auto pt-6"><div className="border-t border-border pt-5">
                                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                                    Tools & skills
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill) => (
                                        <span key={skill} className="chip">{skill}</span>
                                    ))}
                                </div>
                            </div></div>
                        </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
