import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "#site/content";
import { ProjectCard } from "@/components/project-card";
import { ProjectMetaCard } from "@/components/project-meta-card";
import { SectionReveal } from "@/components/section-reveal";
import { ScrollCarousel } from "@/components/scroll-carousel";

export const metadata: Metadata = {
  title: "Projects - Shaher Waheed Roshdy"
};

export default function ProjectsPage() {
  const sorted = [...projects].sort((a, b) => a.order - b.order);
  const [feature, splitA, splitB, gallery, carousel] = sorted;

  return (
    <div className="pt-24">
      <div className="mx-auto max-w-[1400px] px-6 pb-16 md:px-10">
        <SectionReveal>
          <h1 className="font-display text-4xl font-semibold text-ink md:text-6xl">Projects</h1>
        </SectionReveal>
      </div>

      {feature && (
        <section className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionReveal>
            <ProjectCard project={feature} imageClassName="aspect-[16/10] md:aspect-[21/9]" priority />
          </SectionReveal>
        </section>
      )}

      {[splitA, splitB].filter(Boolean).map((project, i) => (
        <section key={project!.slug} className="border-t border-line">
          <div className="mx-auto grid max-w-[1400px] gap-8 px-6 py-20 md:grid-cols-2 md:px-10 md:py-28">
            <SectionReveal className={i % 2 === 1 ? "md:order-2" : ""}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] border border-line">
                <Image
                  src={project!.cover}
                  alt={project!.title}
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </SectionReveal>
            <SectionReveal delay={0.1} className="flex flex-col justify-center gap-6">
              <div>
                <span className="label">{project!.employer}</span>
                <h2 className="mt-2 font-display text-3xl font-semibold text-ink md:text-4xl">
                  {project!.title}
                </h2>
                <p className="mt-4 max-w-[55ch] text-sm leading-relaxed text-ink-dim">
                  {project!.summary}
                </p>
              </div>
              <ProjectMetaCard
                rows={[
                  { label: "Location", value: project!.location },
                  { label: "Period", value: project!.period },
                  { label: "Role", value: project!.role }
                ]}
              />
              <Link
                href={project!.permalink}
                className="w-fit rounded-full border border-line-strong px-6 py-3 font-mono text-xs uppercase tracking-[0.08em] text-ink transition-colors hover:border-accent hover:text-accent"
              >
                View project
              </Link>
            </SectionReveal>
          </div>
        </section>
      ))}

      {gallery && (
        <section className="border-t border-line">
          <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
            <SectionReveal>
              <span className="label">{gallery.employer}</span>
              <h2 className="mt-2 font-display text-3xl font-semibold text-ink md:text-4xl">
                {gallery.title}
              </h2>
              <p className="mt-4 max-w-[65ch] text-sm leading-relaxed text-ink-dim">
                {gallery.summary}
              </p>
            </SectionReveal>
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              {gallery.gallery.map((src, i) => (
                <SectionReveal
                  key={src}
                  delay={i * 0.04}
                  className={i === 0 ? "col-span-2 row-span-2" : ""}
                >
                  <Link href={gallery.permalink} className="relative block aspect-square overflow-hidden rounded-[20px] border border-line">
                    <Image
                      src={src}
                      alt={gallery.title}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
                    />
                  </Link>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {carousel && (
        <section className="border-t border-line">
          <div className="mx-auto max-w-[1400px] px-6 pt-20 md:px-10 md:pt-28">
            <SectionReveal>
              <span className="label">{carousel.employer}</span>
              <h2 className="mt-2 font-display text-3xl font-semibold text-ink md:text-4xl">
                {carousel.title}
              </h2>
              <p className="mt-4 max-w-[65ch] text-sm leading-relaxed text-ink-dim">
                {carousel.summary}
              </p>
            </SectionReveal>
          </div>
          <div className="mt-10 pb-20 md:pb-28">
            <ScrollCarousel images={carousel.gallery} alt={carousel.title} />
          </div>
        </section>
      )}
    </div>
  );
}
