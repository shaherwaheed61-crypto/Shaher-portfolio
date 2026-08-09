import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "#site/content";
import { ProjectMetaCard } from "@/components/project-meta-card";
import { SectionReveal } from "@/components/section-reveal";
import { MDXContent } from "@/components/mdx-content";
import { ProjectHotspots } from "@/components/project-hotspots";
import { LightboxGallery } from "@/components/lightbox-gallery";
import { ParallaxImage } from "@/components/parallax-image";
import { softwareForTags } from "@/lib/software";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: `${project.title} - Shaher Waheed Roshdy`, description: project.summary };
}

export default async function ProjectDetailPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const sorted = [...projects].sort((a, b) => a.order - b.order);
  const index = sorted.findIndex((p) => p.slug === slug);
  const project = sorted[index];
  if (!project) notFound();

  const prev = sorted[(index - 1 + sorted.length) % sorted.length];
  const next = sorted[(index + 1) % sorted.length];

  return (
    <div>
      <section className="relative min-h-[80dvh] overflow-hidden pt-24">
        <ParallaxImage src={project.cover} alt={project.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-bg/10" />

        <div className="relative mx-auto flex min-h-[calc(80dvh-6rem)] max-w-[1400px] flex-col justify-end px-6 pb-14 md:px-10 md:pb-20">
          <Link
            href="/projects"
            className="mb-6 flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-ink-dim transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} /> Projects
          </Link>
          <span className="label">{project.employer}</span>
          <h1 className="mt-2 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ink md:text-7xl">
            {project.title}
          </h1>
        </div>

        <ProjectMetaCard
          className="absolute bottom-8 right-6 hidden w-[300px] md:right-10 md:block"
          rows={[
            { label: "Employer", value: project.employer },
            ...(project.client ? [{ label: "Client", value: project.client }] : []),
            ...(project.consultant ? [{ label: "Consultant", value: project.consultant }] : []),
            { label: "Role", value: project.role },
            { label: "Location", value: project.location },
            { label: "Period", value: project.period }
          ]}
        />
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-10 md:grid-cols-[1fr_300px] md:hidden">
          <ProjectMetaCard
            rows={[
              { label: "Employer", value: project.employer },
              ...(project.client ? [{ label: "Client", value: project.client }] : []),
              { label: "Role", value: project.role },
              { label: "Location", value: project.location },
              { label: "Period", value: project.period }
            ]}
          />
        </div>
        <SectionReveal>
          <MDXContent code={project.body} />
        </SectionReveal>

        {project.gallery.length > 1 && (
          <SectionReveal delay={0.1} className="mt-16">
            <ProjectHotspots
              image={project.gallery[1]}
              alt={project.title}
              hotspots={[
                { top: "22%", left: "22%", label: "Scope & Role", body: project.role },
                {
                  top: "24%",
                  left: "76%",
                  label: "Team",
                  body: [project.employer, project.client, project.consultant]
                    .filter(Boolean)
                    .join(" - ")
                },
                {
                  top: "62%",
                  left: "50%",
                  label: "Software Used",
                  body: softwareForTags(project.tags).join(", ")
                }
              ]}
            />
          </SectionReveal>
        )}

        {project.gallery.length > 0 && (
          <div className="mt-16">
            <LightboxGallery images={project.gallery} alt={project.title} />
          </div>
        )}
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-4 px-6 py-10 md:px-10">
          <Link
            href={prev.permalink}
            className="flex flex-col gap-1 rounded-[20px] border border-line p-6 transition-colors hover:border-accent"
          >
            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-ink-faint">
              <ArrowLeft size={12} /> Previous
            </span>
            <span className="font-display text-lg font-semibold text-ink">{prev.title}</span>
          </Link>
          <Link
            href={next.permalink}
            className="flex flex-col items-end gap-1 rounded-[20px] border border-line p-6 text-right transition-colors hover:border-accent"
          >
            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-ink-faint">
              Next <ArrowRight size={12} />
            </span>
            <span className="font-display text-lg font-semibold text-ink">{next.title}</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
