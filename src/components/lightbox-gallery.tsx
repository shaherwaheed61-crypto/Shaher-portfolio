"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";

export function LightboxGallery({ images, alt }: { images: readonly string[]; alt: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [openIndex, images.length]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {images.map((src, i) => (
          <SectionReveal key={src} delay={i * 0.04}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="relative block aspect-[4/3] w-full overflow-hidden rounded-[20px] border border-line"
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
              />
            </button>
          </SectionReveal>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg/95 p-4 backdrop-blur-md sm:p-10"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpenIndex(null)}
            className="absolute right-5 top-5 rounded-full border border-line-strong p-2.5 text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <X size={18} />
          </button>

          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-line-strong p-2.5 text-ink transition-colors hover:border-accent hover:text-accent sm:left-6"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            className="relative h-full max-h-[80vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[openIndex]}
              alt={alt}
              fill
              sizes="80vw"
              className="object-contain"
            />
          </div>

          <button
            type="button"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? i : (i + 1) % images.length));
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-line-strong p-2.5 text-ink transition-colors hover:border-accent hover:text-accent sm:right-6"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </>
  );
}
