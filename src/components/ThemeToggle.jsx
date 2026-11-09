import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// The saved theme is applied by a small script in index.html before React loads,
// so here we only read the current state from the <html> element.
export const ThemeToggle = ({ className }) => {
    const [isDarkMode, setIsDarkMode] = useState(() =>
        document.documentElement.classList.contains("dark")
    );

    // Keep every toggle on the page in sync (the navbar has a desktop and a mobile one)
    useEffect(() => {
        const observer = new MutationObserver(() =>
            setIsDarkMode(document.documentElement.classList.contains("dark"))
        );
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    const toggleTheme = () => {
        const nextDark = !isDarkMode;
        document.documentElement.classList.toggle("dark", nextDark);
        try {
            localStorage.setItem("theme", nextDark ? "dark" : "light");
        } catch {
            // Storage can be blocked (private mode); the toggle still works for this visit
        }
        setIsDarkMode(nextDark);
    };

    return (
        <button
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className={cn(
                "p-2 rounded-full transition-colors duration-300 hover:bg-primary/10",
                "focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary",
                className
            )}
        >
            {isDarkMode ? (
                <Sun className="h-6 w-6 text-yellow-500" />
            ) : (
                <Moon className="h-6 w-6 text-blue-900" />
            )}
        </button>
    );
};
