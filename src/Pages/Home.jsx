import { StarBackground } from "../components/StarBackground";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";

export const Home = () => {

    return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Background Effect */}
        <StarBackground />

        {/* Navbar (includes the theme toggle) */}
        <Navbar />

        {/* Main Content */}
        <main>
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <SkillSection />
        </main>

    </div>
    );
};
