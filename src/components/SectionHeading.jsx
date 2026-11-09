import { cn } from "@/lib/utils";

// Consistent section title: small mono label, big heading, optional intro line
export const SectionHeading = ({ label, children, intro, as = "h2", className }) => {
    const Tag = as;
    return (
    <div className={cn("mx-auto mb-10 max-w-2xl text-center md:mb-14", className)}>
        {label && <p className="section-label mb-3">{label}</p>}
        <Tag className="text-3xl font-bold md:text-4xl">{children}</Tag>
        {intro && <div className="mt-4 text-lg text-muted-foreground">{intro}</div>}
    </div>
    );
};
