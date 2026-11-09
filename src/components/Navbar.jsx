import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "#hero", type: "anchor" },
  { name: "About", href: "#about", type: "anchor" },
  { name: "Projects", href: "/projects", type: "link" },
  { name: "Skills", href: "#skills", type: "anchor" },
  { name: "Personal", href: "/personal", type: "link" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderNavItem = (item, onClick) => {
    const className =
      "text-foreground/80 hover:text-primary transition-colors duration-300";

    // Section links (#about, #skills...)
    if (item.type === "anchor") {
      if (isHome) {
        return (
          <a key={item.name} href={item.href} className={className} onClick={onClick}>
            {item.name}
          </a>
        );
      }
      // On other pages, go back to the home page and jump to that section
      return (
        <Link key={item.name} to={`/${item.href}`} className={className} onClick={onClick}>
          {item.name}
        </Link>
      );
    }

    // Route links
    return (
      <Link key={item.name} to={item.href} className={cn(className, location.pathname === item.href && "text-primary font-medium")} onClick={onClick}>
        {item.name}
      </Link>
    );
  };

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-md shadow-xs"
          : "py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link
          className="text-xl font-bold text-primary flex items-center"
          to="/"
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground">Burakhan Kokcu</span>{" "}
            Portfolio
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => renderNavItem(item, undefined))}
          <ThemeToggle />
        </div>

        {/* Mobile: theme toggle + menu button */}
        <div className="md:hidden flex items-center gap-1 z-50">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="p-2 text-foreground"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-8 text-xl">
            {navItems.map((item) => renderNavItem(item, () => setIsMenuOpen(false)))}
          </div>
        </div>
      </div>
    </nav>
  );
};
