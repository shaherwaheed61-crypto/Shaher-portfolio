import { SectionReveal } from "@/components/section-reveal";
import type { ExperienceEntry } from "@/data/experience";

export function Timeline({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <div className="flex flex-col">
      {entries.map((entry, i) => (
        <SectionReveal key={entry.employer + entry.period} delay={i * 0.05}>
          <div className="grid gap-4 border-t border-line py-10 md:grid-cols-[200px_1fr]">
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-ink-faint">
              {entry.period}
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold text-ink md:text-2xl">
                {entry.role}
              </h3>
              <p className="mt-1 text-sm text-ink-dim">
                {entry.url ? (
                  <a href={entry.url} target="_blank" rel="noreferrer" className="hover:text-accent">
                    {entry.employer}
                  </a>
                ) : (
                  entry.employer
                )}{" "}
                &middot; {entry.location}
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {entry.bullets.map((bullet) => (
                  <li key={bullet} className="max-w-[65ch] text-sm leading-relaxed text-ink-dim">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionReveal>
      ))}
    </div>
  );
}
