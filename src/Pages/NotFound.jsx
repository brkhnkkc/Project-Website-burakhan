import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 bg-background text-foreground">
            <div className="container max-w-4xl mx-auto text-center z-10 space-y-6">
                <h1 className="text-6xl font-bold opacity-0 animate-fade-in-delay-1">
                    Not Found
                </h1>
                <p className="text-muted-foreground opacity-0 animate-fade-in-delay-2">
                    The page you're looking for doesn't exist.
                </p>
                <div className="opacity-0 animate-fade-in-delay-3">
                    <Link to="/" className="cosmic-button inline-block">
                        Back to home
                    </Link>
                </div>
            </div>
        </div>
    );
};
