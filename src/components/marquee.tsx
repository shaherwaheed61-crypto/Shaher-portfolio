"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useVelocity,
  useAnimationFrame,
  useReducedMotion
} from "motion/react";
import { cn } from "@/lib/utils";

export function Marquee({
  items,
  className
}: {
  items: readonly string[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const baseSpeed = 36; // px per second

  useAnimationFrame((_, delta) => {
    if (reduce || !trackRef.current) return;
    const seconds = delta / 1000;
    const boost = Math.max(-3, Math.min(3, scrollVelocity.get() / 400));
    let next = x.get() - (baseSpeed + baseSpeed * Math.abs(boost)) * seconds * (boost < 0 ? -1 : 1);
    const width = trackRef.current.scrollWidth / 2;
    if (width > 0) {
      if (next <= -width) next += width;
      if (next > 0) next -= width;
    }
    x.set(next);
  });

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
      <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-10">
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display text-3xl font-medium text-ink-faint md:text-5xl"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
