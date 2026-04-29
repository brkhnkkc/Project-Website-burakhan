import { useEffect, useState, useRef } from "react";

export const StarBackground = () => {
    const [stars, setStars] = useState([]);
    const [meteors, setMeteors] = useState([]);
    const [lightStars, setLightStars] = useState([]);
    const [isDark, setIsDark] = useState(false);
    const [meteorsReady, setMeteorsReady] = useState(false);
    const nextId = useRef(0);

    useEffect(() => {
        // Read theme after mount when DOM is fully available
        const dark = document.documentElement.classList.contains("dark");
        setIsDark(dark);

        generateStars();

        // Generate meteors and only show them after a short delay
        // so their animationDelay is respected from the start
        const newMeteors = [];
        for (let i = 0; i < 4; i++) {
            newMeteors.push({
                id: i,
                size: Math.random() * 2 + 1,
                x: Math.random() * 100,
                y: Math.random() * 20,
                delay: Math.random() * 10,
                animationDuration: Math.random() * 3 + 3,
            });
        }
        setMeteors(newMeteors);

        // Small delay before showing meteors so CSS animation delay works correctly
        setTimeout(() => setMeteorsReady(true), 100);

        const handleResize = () => generateStars();
        window.addEventListener("resize", handleResize);

        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains("dark"));
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Light mode spawning stars
    useEffect(() => {
        const interval = setInterval(() => {
            if (document.documentElement.classList.contains("dark")) return;

            const batch = [];
            for (let i = 0; i < 15; i++) {
                batch.push({
                    id: nextId.current++,
                    size: Math.random() * 4 + 2,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                });
            }

            setLightStars(prev => [...prev, ...batch]);

            setTimeout(() => {
                const ids = new Set(batch.map(s => s.id));
                setLightStars(prev => prev.filter(s => !ids.has(s.id)));
            }, 3000);

        }, 100);

        return () => clearInterval(interval);
    }, []);

    const generateStars = () => {
        const numberOfStars = Math.floor((window.innerWidth * window.innerHeight) / 10000);
        const newStars = [];
        for (let i = 0; i < numberOfStars; i++) {
            newStars.push({
                id: i,
                size: Math.random() * 3 + 1,
                x: Math.random() * 100,
                y: Math.random() * 100,
                opacity: Math.random() * 0.5 + 0.5,
                animationDuration: Math.random() * 4 + 2,
            });
        }
        setStars(newStars);
    };

    return (
        <div id="star-bg" className="fixed inset-0 overflow-hidden pointer-events-none z-0">

            {isDark && stars.map((star) => (
                <div key={star.id} className="star" style={{
                    width: star.size + "px",
                    height: star.size + "px",
                    left: star.x + "%",
                    top: star.y + "%",
                    opacity: star.opacity,
                    animationDuration: star.animationDuration + "s",
                }}/>
            ))}

            {isDark && meteorsReady && meteors.map((meteor) => (
                <div key={meteor.id} className="meteor animate-meteor absolute" style={{
                    width: meteor.size * 40 + "px",
                    height: meteor.size + "px",
                    left: meteor.x + "%",
                    top: meteor.y + "%",
                    animationDelay: meteor.delay + "s",
                    animationDuration: meteor.animationDuration + "s",
                }}/>
            ))}

            {!isDark && lightStars.map((star) => (
                <div key={star.id} className="light-star" style={{
                    width: star.size + "px",
                    height: star.size + "px",
                    left: star.x + "%",
                    top: star.y + "%",
                }}/>
            ))}

        </div>
    );
};