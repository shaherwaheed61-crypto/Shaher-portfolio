import Image from "next/image";
import Link from "next/link";
import { projects } from "#site/content";
import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { SectionReveal } from "@/components/section-reveal";
import { Marquee } from "@/components/marquee";
import { CountUp } from "@/components/count-up";
import { DayNightSwitch } from "@/components/day-night-switch";
import { profile } from "@/data/profile";
import { credentials } from "@/data/credentials";

export default function Home() {
  const featured = ["king-abdullah-gardens", "marsa-khuzam", "zad-engineering"]
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is (typeof projects)[number] => Boolean(p));

  return (
    <>
      <Hero />

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-[1400px] grid-cols-3 divide-x divide-line px-6 py-10 md:px-10">
          {[
            { value: 5, suffix: "+", label: "Years experience" },
            { value: projects.length, suffix: "", label: "Documented projects" },
            { value: credentials.length, suffix: "", label: "BIM certifications" }
          ].map((stat, i) => (
            <SectionReveal key={stat.label} delay={i * 0.05} className="px-4 text-center first:pl-0 last:pr-0">
              <CountUp
                value={stat.value}
                suffix={stat.suffix}
                className="font-display text-3xl font-semibold text-accent md:text-5xl"
              />
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
                {stat.label}
              </p>
            </SectionReveal>
          ))}
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <SectionReveal className="text-center">
            <h2 className="mx-auto max-w-[24ch] font-display text-3xl font-semibold text-ink md:text-5xl">
              Every facade is designed for day and night.
            </h2>
            <p className="mx-auto mt-4 max-w-[50ch] text-sm leading-relaxed text-ink-dim md:text-base">
              Pull the cord to switch the render. Lighting is part of the design, not an
              afterthought.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.1} className="mx-auto mt-10 max-w-3xl">
            <DayNightSwitch
              day="/images/freelance/classic-villa-day.jpg"
              night="/images/freelance/classic-villa-night.jpg"
              alt="Classic villa facade, day and night render"
              aspectClassName="aspect-[16/10] sm:aspect-video"
              cordClassName="right-10 sm:right-16"
            />
          </SectionReveal>
          <SectionReveal delay={0.15} className="mt-6 text-center">
            <Link
              href="/projects/freelance-visualization"
              className="inline-block w-fit rounded-full border border-line-strong px-6 py-3 font-mono text-xs uppercase tracking-[0.08em] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Freelance Visualization Work
            </Link>
          </SectionReveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <SectionReveal>
          <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">
            Selected projects
          </h2>
        </SectionReveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <SectionReveal className="md:col-span-2">
            <ProjectCard
              project={featured[0]}
              imageClassName="aspect-[16/10] md:aspect-[21/9]"
              priority
            />
          </SectionReveal>
          {featured.slice(1).map((project, i) => (
            <SectionReveal key={project.slug} delay={0.1 + i * 0.05}>
              <ProjectCard project={project} imageClassName="aspect-[4/5]" />
            </SectionReveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-24 md:grid-cols-2 md:px-10 md:py-32">
          <SectionReveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] border border-line">
              <Image
                src={profile.portrait}
                alt={profile.name}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1} className="flex flex-col justify-center">
            <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">
              Five years translating concept into construction.
            </h2>
            <p className="mt-5 max-w-[55ch] text-base leading-relaxed text-ink-dim">
              {profile.summary}
            </p>
            <Link
              href="/about"
              className="mt-6 inline-block w-fit rounded-full border border-line-strong px-6 py-3 font-mono text-xs uppercase tracking-[0.08em] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              About
            </Link>
          </SectionReveal>
        </div>
      </section>

      <section className="border-t border-line py-20">
        <Marquee items={profile.skills} />
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <SectionReveal>
            <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">
              BIM credentials
            </h2>
          </SectionReveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {credentials.map((credential, i) => (
              <SectionReveal key={credential.title} delay={i * 0.06}>
                <div className="h-full rounded-[20px] border border-line p-6">
                  <p className="font-display text-lg font-semibold leading-snug text-ink">
                    {credential.title}
                  </p>
                  <p className="mt-2 text-sm text-ink-dim">{credential.issuer}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
          <SectionReveal delay={0.2}>
            <Link
              href="/certifications"
              className="mt-8 inline-block w-fit rounded-full border border-line-strong px-6 py-3 font-mono text-xs uppercase tracking-[0.08em] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Certifications
            </Link>
          </SectionReveal>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line">
        <Image
          src="/images/brand/abstract-3d-hero.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-bg/70" />
        <div className="relative mx-auto max-w-[1400px] px-6 py-28 text-center md:px-10 md:py-36">
          <SectionReveal>
            <h2 className="font-display text-4xl font-semibold leading-tight text-ink md:text-6xl">
              Coordinating your next landscape or shop-drawing package.
            </h2>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-accent px-8 py-4 font-mono text-xs uppercase tracking-[0.08em] text-bg transition-transform hover:-translate-y-[1px]"
            >
              Contact
            </Link>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
