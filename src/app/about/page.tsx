import type { Metadata } from "next";
import { SectionReveal } from "@/components/section-reveal";
import { Timeline } from "@/components/timeline";
import { GanttChart } from "@/components/gantt-chart";
import { ProjectMapLoader } from "@/components/project-map-loader";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";

export const metadata: Metadata = {
  title: "About - Shaher Waheed Roshdy"
};

const skillGroups = [
  {
    title: "Software",
    items: ["Revit", "AutoCAD", "Civil 3D", "Navisworks", "SketchUp", "Lumion", "Adobe Creative Suite", "ACC Platform"]
  },
  {
    title: "BIM & Coordination",
    items: ["Clash Detection & Coordination", "BIM Documentation"]
  },
  {
    title: "Design & Delivery",
    items: ["Shop Drawings & BOQs", "Sustainable & Green Building Design"]
  }
];

export default function AboutPage() {
  return (
    <div className="pt-24">
      <section className="mx-auto max-w-[1400px] px-6 pb-16 md:px-10">
        <SectionReveal>
          <h1 className="font-display text-4xl font-semibold text-ink md:text-6xl">About</h1>
          <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-ink-dim">
            {profile.summary}
          </p>
        </SectionReveal>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
          <SectionReveal>
            <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">Education</h2>
          </SectionReveal>
          <SectionReveal delay={0.05} className="mt-6 grid gap-4 border-t border-line pt-6 md:grid-cols-[200px_1fr]">
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-ink-faint">
              {profile.education.period}
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold text-ink">{profile.education.degree}</h3>
              <p className="mt-1 text-sm text-ink-dim">
                {profile.education.school} &middot; {profile.education.location}
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {profile.education.notes.map((note) => (
                  <li key={note} className="max-w-[65ch] text-sm leading-relaxed text-ink-dim">
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
          <div className="sticky top-20 z-10 bg-bg pb-6">
            <SectionReveal>
              <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">Career</h2>
            </SectionReveal>
            <SectionReveal delay={0.05} className="mt-8">
              <GanttChart entries={experience} />
            </SectionReveal>
          </div>
          <Timeline entries={experience} />
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
          <SectionReveal>
            <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">
              Where the work happens
            </h2>
            <p className="mt-3 max-w-[55ch] text-sm leading-relaxed text-ink-dim">
              Project sites across Saudi Arabia and Egypt. Click a marker to open the project.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.05} className="mt-8">
            <ProjectMapLoader />
          </SectionReveal>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
          <SectionReveal>
            <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">Skills</h2>
          </SectionReveal>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {skillGroups.map((group, i) => (
              <SectionReveal key={group.title} delay={i * 0.06}>
                <span className="label">{group.title}</span>
                <ul className="mt-4 flex flex-col gap-2.5 border-t border-line pt-4">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-ink-dim">
                      {item}
                    </li>
                  ))}
                </ul>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
