"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import type { Project } from "#site/content";

const MotionLink = motion.create(Link);

export function ProjectCard({
  project,
  className,
  imageClassName,
  priority
}: {
  project: Project;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springX = useSpring(px, { stiffness: 200, damping: 22 });
  const springY = useSpring(py, { stiffness: 200, damping: 22 });
  const rotateX = useTransform(springY, [0, 1], [6, -6]);
  const rotateY = useTransform(springX, [0, 1], [-6, 6]);

  function handleMove(e: React.PointerEvent<HTMLAnchorElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <MotionLink
      ref={ref}
      href={project.permalink}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
      className={cn("group relative block overflow-hidden rounded-[20px] border border-line", className)}
    >
      <div className={cn("relative w-full", imageClassName ?? "aspect-[4/5]")}>
        <Image
          src={project.cover}
          alt={project.title}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/10 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-6">
        <span className="label">{project.employer}</span>
        <h3 className="font-display text-2xl font-semibold leading-tight text-ink md:text-3xl">
          {project.title}
        </h3>
        <span className="text-sm text-ink-dim">{project.location}</span>
      </div>
    </MotionLink>
  );
}
