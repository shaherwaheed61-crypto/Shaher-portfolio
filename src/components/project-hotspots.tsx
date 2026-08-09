"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Hotspot = {
  top: string;
  left: string;
  label: string;
  body: string;
};

export function ProjectHotspots({
  image,
  alt,
  hotspots
}: {
  image: string;
  alt: string;
  hotspots: Hotspot[];
}) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] border border-line">
      <Image src={image} alt={alt} fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />

      {hotspots.map((hotspot, i) => (
        <button
          key={hotspot.label}
          type="button"
          style={{ top: hotspot.top, left: hotspot.left }}
          onClick={() => setActive(active === i ? null : i)}
          aria-label={hotspot.label}
          className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        >
          <span className="absolute h-8 w-8 animate-ping rounded-full bg-accent/30" />
          <span
            className={cn(
              "relative flex h-7 w-7 items-center justify-center rounded-full border border-accent bg-bg-elevated/90 text-accent transition-transform",
              active === i && "scale-110 bg-accent text-bg"
            )}
          >
            <Plus size={14} />
          </span>
        </button>
      ))}

      {active !== null && (
        <div className="absolute bottom-4 left-4 right-4 z-30 max-w-sm rounded-[20px] border border-line-strong bg-bg-elevated/95 p-5 shadow-[0_20px_60px_rgba(10,8,5,0.45)] backdrop-blur-md sm:right-auto">
          <div className="flex items-start justify-between gap-4">
            <span className="label">{hotspots[active].label}</span>
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="text-ink-faint transition-colors hover:text-ink"
            >
              <X size={16} />
            </button>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">{hotspots[active].body}</p>
        </div>
      )}
    </div>
  );
}
