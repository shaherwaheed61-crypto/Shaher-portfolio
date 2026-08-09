"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ProjectMetaCard } from "@/components/project-meta-card";
import { MagneticButton } from "@/components/magnetic-button";
import { profile } from "@/data/profile";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 140]);

  return (
    <section ref={ref} className="relative min-h-[100dvh] overflow-hidden pt-24">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="/images/gardens-project/night-masterplan-aerial.jpg"
          alt="Aerial night view of the King Abdullah International Gardens masterplan"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/70 via-transparent to-transparent" />
      </motion.div>

      <div className="relative mx-auto flex min-h-[calc(100dvh-6rem)] max-w-[1400px] flex-col justify-end px-6 pb-16 md:px-10 md:pb-20">
        <h1 className="font-display text-6xl font-semibold leading-[1.02] tracking-tight text-ink md:text-7xl">
          Shaher Waheed Roshdy
        </h1>
        <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-ink-dim md:text-lg">
          Landscape architecture and shop drawings that turn concepts into buildable, coordinated
          construction documents.
        </p>
        <div className="mt-8">
          <MagneticButton
            href="/projects"
            className="inline-block rounded-full bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.08em] text-bg"
          >
            View Projects
          </MagneticButton>
        </div>
      </div>

      <ProjectMetaCard
        className="absolute bottom-8 right-6 hidden w-[280px] md:right-10 md:block"
        rows={[
          { label: "Role", value: profile.role },
          { label: "Location", value: profile.location },
          { label: "Experience", value: "5+ Years" },
          { label: "Focus", value: "BIM & Shop Drawings" }
        ]}
      />
    </section>
  );
}
