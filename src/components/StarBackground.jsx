import { useEffect, useState } from "react";

// ── Random generators (pure functions, run once per mount/resize) ─────────────
const makeStars = () => {
    const count = Math.floor((window.innerWidth * window.innerHeight) / 10000);
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 4 + 2,
    }));
};

const makeMeteors = () =>
    Array.from({ length: 4 }, (_, i) => ({
        id: i,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 20,
        delay: Math.random() * 10,
        animationDuration: Math.random() * 3 + 3,
    }));

// Light mode: a fixed set of sparkles that loop forever with CSS.
// (Previously 15 new elements were added every 100ms, re-rendering 10x per second.)
const LIGHT_STAR_COUNT = 250;
const LIGHT_STAR_CYCLE = 3; // seconds, matches the `drift` animation
const makeLightStars = () =>
    Array.from({ length: LIGHT_STAR_COUNT }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        // Negative delay = start part-way through, so the sky is already full on load
        delay: -Math.random() * LIGHT_STAR_CYCLE,
    }));

const isDarkNow = () => document.documentElement.classList.contains("dark");

export const StarBackground = () => {
    const [isDark, setIsDark] = useState(isDarkNow);
    const [stars, setStars] = useState(makeStars);
    const [meteors] = useState(makeMeteors);
    const [lightStars] = useState(makeLightStars);

    useEffect(() => {
        const handleResize = () => setStars(makeStars());
        window.addEventListener("resize", handleResize);

        // Follow theme changes made by the toggle
        const observer = new MutationObserver(() => setIsDark(isDarkNow()));
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div id="star-bg" className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">

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

            {isDark && meteors.map((meteor) => (
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
                    animationDelay: star.delay + "s",
                }}/>
            ))}

        </div>
    );
};
