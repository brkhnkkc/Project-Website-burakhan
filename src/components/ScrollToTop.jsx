import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router keeps the old scroll position when changing pages.
// This scrolls to the top on every page change, or to #section when the URL has one.
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait a tick so the new page has rendered before looking for the element
      const id = setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "instant" });
      }, 50);
      return () => clearTimeout(id);
    }
    // "instant" overrides the site-wide smooth scrolling, which would animate from the old page's position
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
};
