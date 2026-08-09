import type { ExperienceEntry } from "@/data/experience";

function toMonthIndex(dateStr: string, now: Date) {
  if (dateStr === "present") {
    return now.getFullYear() * 12 + now.getMonth();
  }
  const [year, month] = dateStr.split("-").map(Number);
  return year * 12 + (month - 1);
}

export function GanttChart({ entries }: { entries: ExperienceEntry[] }) {
  const now = new Date();
  const rows = entries
    .map((entry) => ({
      entry,
      start: toMonthIndex(entry.startDate, now),
      end: toMonthIndex(entry.endDate, now)
    }))
    .sort((a, b) => a.start - b.start);

  const min = Math.min(...rows.map((r) => r.start));
  const max = Math.max(...rows.map((r) => r.end));
  const span = max - min;

  const startYear = Math.floor(min / 12);
  const endYear = Math.ceil(max / 12);
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[640px]">
        <div className="relative mb-2 h-5">
          {years.map((year) => {
            const pos = ((year * 12 - min) / span) * 100;
            if (pos < 0 || pos > 100) return null;
            return (
              <span
                key={year}
                style={{ left: `${pos}%` }}
                className="absolute font-mono text-[11px] text-ink-faint"
              >
                {year}
              </span>
            );
          })}
        </div>

        <div className="flex flex-col gap-3">
          {rows.map(({ entry, start, end }) => {
            const left = ((start - min) / span) * 100;
            const width = Math.max(((end - start) / span) * 100, 1.5);
            return (
              <div key={entry.employer + entry.period} className="relative h-10">
                <div className="absolute inset-y-0 left-0 w-full border-t border-line" />
                <div
                  style={{ left: `${left}%`, width: `${width}%` }}
                  className="absolute top-1.5 flex h-7 items-center rounded-full bg-accent-soft px-3"
                >
                  <span className="truncate font-mono text-[11px] uppercase tracking-[0.06em] text-accent">
                    {entry.employer}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
