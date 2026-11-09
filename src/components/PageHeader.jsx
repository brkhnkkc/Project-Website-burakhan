import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

// Sticky header used on the sub-pages (Projects, Personal)
export const PageHeader = ({ title }) => (
  <div className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-30">
    <div className="container mx-auto max-w-5xl px-4 py-3 flex items-center gap-4">
      <Link
        to="/"
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>
      <span className="text-border">|</span>
      <span className="font-semibold text-lg">{title}</span>
      <ThemeToggle className="ml-auto" />
    </div>
  </div>
);
