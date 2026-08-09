import type { Metadata } from "next";
import { SectionReveal } from "@/components/section-reveal";
import { ServiceRequestForm } from "@/components/service-request-form";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services - Shaher Waheed Roshdy"
};

export default function ServicesPage() {
  return (
    <div className="pt-24">
      <section className="mx-auto max-w-[1400px] px-6 pb-16 md:px-10">
        <SectionReveal>
          <h1 className="font-display text-4xl font-semibold text-ink md:text-6xl">Services</h1>
          <p className="mt-6 max-w-[55ch] text-base leading-relaxed text-ink-dim">
            Freelance shop drawings, landscape design development and BIM coordination, scoped
            and delivered directly.
          </p>
        </SectionReveal>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service, i) => (
              <SectionReveal key={service.title} delay={i * 0.05}>
                <div className="h-full rounded-[20px] border border-line p-6 transition-colors hover:border-accent">
                  <h2 className="font-display text-xl font-semibold text-ink">{service.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-dim">{service.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-line-strong px-3 py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-faint"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
          <SectionReveal>
            <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">
              Request a service
            </h2>
            <p className="mt-3 max-w-[55ch] text-sm leading-relaxed text-ink-dim">
              Fill in the scope below and it opens directly in your email client, ready to send.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.08} className="mt-8 max-w-2xl">
            <ServiceRequestForm />
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
