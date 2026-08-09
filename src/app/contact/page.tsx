import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";
import { ContactForm } from "@/components/contact-form";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact - Shaher Waheed Roshdy"
};

export default function ContactPage() {
  return (
    <div className="pt-24">
      <section className="mx-auto max-w-[1400px] px-6 pb-16 md:px-10">
        <SectionReveal>
          <h1 className="font-display text-4xl font-semibold text-ink md:text-6xl">
            Let&apos;s coordinate the details.
          </h1>
          <p className="mt-6 max-w-[55ch] text-base leading-relaxed text-ink-dim">
            Shop drawings, landscape design development, or BIM coordination, reach out directly
            or send a message below.
          </p>
        </SectionReveal>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-16 md:grid-cols-2 md:px-10 md:py-20">
          <SectionReveal className="flex flex-col gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 rounded-[20px] border border-line px-5 py-4 text-sm text-ink transition-colors hover:border-accent"
            >
              <Mail size={16} className="text-accent" /> {profile.email}
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-3 rounded-[20px] border border-line px-5 py-4 text-sm text-ink transition-colors hover:border-accent"
            >
              <Phone size={16} className="text-accent" /> {profile.phone}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-[20px] border border-line px-5 py-4 text-sm text-ink transition-colors hover:border-accent"
            >
              <span className="font-mono text-base leading-none text-accent">in</span> LinkedIn
            </a>
            <a
              href={profile.behance}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-[20px] border border-line px-5 py-4 text-sm text-ink transition-colors hover:border-accent"
            >
              <span className="font-mono text-base leading-none text-accent">Be</span> Behance
            </a>
            <a
              href={profile.facebook}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-[20px] border border-line px-5 py-4 text-sm text-ink transition-colors hover:border-accent"
            >
              <span className="font-mono text-base leading-none text-accent">f</span> Facebook
            </a>
            <div className="flex items-center gap-3 rounded-[20px] border border-line px-5 py-4 text-sm text-ink-dim">
              <MapPin size={16} className="text-accent" /> {profile.location}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.08}>
            <ContactForm />
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
