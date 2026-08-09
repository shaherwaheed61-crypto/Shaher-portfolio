"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

type MetaRow = {
  label: string;
  value: string;
};

export function ProjectMetaCard({
  rows,
  className
}: {
  rows: MetaRow[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className={cn(
        "spotlight-card relative overflow-hidden rounded-[20px] border border-line-strong bg-bg-elevated/80 p-5 backdrop-blur-md",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_60px_rgba(10,8,5,0.45)]",
        className
      )}
    >
      <dl className="relative z-10 flex flex-col gap-2.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-6">
            <dt className="label shrink-0">{row.label}</dt>
            <dd className="text-right text-sm text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
