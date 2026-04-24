const skills = [
    {name: "Circuit Design", level:100, category:"tools"},
    {name: "PCB Design", level:100, category:"tools"},
    {name: "AutoCAD", level:100, category:"tools"},
    {name: "PSpice", level:100, category:"tools"},

    {name: "Verilog", level:100, category:"tools"},
    {name: "AWR", level:100, category:"tools"},
    {name: "MATLAB", level:100, category:"tools"},
]


export const SkillSection = () => {
    return <section id="skills" className="py-24 px-4 relative bg-seccondary/30">
        <div className="container mx-auto max-2-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                My <span className="text-primary"> Skills</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-primary">
                {skills.map((skill, key) => (
                    <div key={key} className="bg-card p-6 rounded-lg shadow-xs card-hover">
                        <div>
                            <h3 className="font-semibold text-lg">{skill.name}</h3>
                        </div>
                        <div className="w-full bg-secondary/50 h-2 rounded-full overlow-hidden">
                          {/*<div className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"/>*/}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    </section>;
};