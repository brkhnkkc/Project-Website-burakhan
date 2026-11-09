import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Full-screen image viewer shared by the Projects and Personal pages.
// Keyboard: Esc closes, ←/→ switch images. Page scrolling is locked while open.
export const Lightbox = ({ images, captions, title, startIndex = 0, onClose }) => {
  const [index, setIndex] = useState(startIndex);
  const count = images.length;

  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + count) % count);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % count);
    };
    window.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [count, onClose]);

  const caption = captions?.[index] ?? title;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title ?? "Image viewer"}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
      >
        <X className="h-6 w-6" />
      </button>

      {count > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          aria-label="Previous image"
          className="absolute left-4 p-2 text-white/70 hover:text-white transition-colors z-10"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
      )}

      <img
        src={images[index]}
        alt={caption ?? `Image ${index + 1}`}
        className="max-h-[85vh] max-w-[85vw] object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {count > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          aria-label="Next image"
          className="absolute right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      )}

      <div className="absolute bottom-4 flex flex-col items-center gap-1.5">
        {caption && (
          <p className="text-white/90 text-sm bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-sm">
            {caption}
          </p>
        )}
        <span className="text-white/50 text-xs">
          {index + 1} / {count}
        </span>
      </div>
    </div>
  );
};
