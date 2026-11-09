const skills = [
    { name: "PCB Design", category: "tools" },
    { name: "PSpice", category: "tools" },
    { name: "Verilog", category: "tools" },
    { name: "AWR", category: "tools" },
    { name: "Fusion 360", category: "tools" },
    { name: "MATLAB", category: "tools" },
    { name: "AutoCAD", category: "tools" },
    { name: "Circuit Design", category: "tools" },
    { name: "Python", category: "tools" },
    { name: "C/C++", category: "tools" },
    { name: "Java", category: "tools" },
    { name: "3D Design/Modelling", category: "tools" },
]


export const SkillSection = () => {
    return <section id="skills" className="py-24 px-4 relative bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                My <span className="text-primary">Skills</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-primary">
                {skills.map((skill) => (
                    <div key={skill.name} className="bg-card p-6 rounded-lg shadow-xs card-hover">
                        <h3 className="font-semibold text-lg">{skill.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    </section>;
};
