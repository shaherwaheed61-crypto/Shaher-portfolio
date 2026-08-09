import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";
import { CredentialBadge } from "@/components/credential-badge";
import { credentials } from "@/data/credentials";

export const metadata: Metadata = {
  title: "Certifications - Shaher Waheed Roshdy"
};

export default function CertificationsPage() {
  return (
    <div className="pt-24">
      <section className="mx-auto max-w-[1400px] px-6 pb-16 md:px-10">
        <SectionReveal>
          <h1 className="font-display text-4xl font-semibold text-ink md:text-6xl">Certifications</h1>
          <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-ink-dim">
            BIM and information-management training completed through Plannerly and Niqat Global,
            supporting ISO 19650-aligned coordination and documentation.
          </p>
        </SectionReveal>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto flex max-w-[1400px] flex-col px-6 md:px-10">
          {credentials.map((credential, i) => (
            <SectionReveal key={credential.title} delay={i * 0.05}>
              <div className="grid gap-8 border-t border-line py-12 md:grid-cols-[1fr_auto]">
                <div>
                  <span className="label">{credential.issuer}</span>
                  <h2 className="mt-2 max-w-[40ch] font-display text-2xl font-semibold text-ink md:text-3xl">
                    {credential.title}
                  </h2>
                  {credential.credentialId && (
                    <p className="mt-3 font-mono text-xs text-ink-faint">
                      Credential ID: {credential.credentialId}
                    </p>
                  )}
                  {credential.url && (
                    <a
                      href={credential.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 flex w-fit items-center gap-1.5 font-mono text-xs uppercase tracking-[0.08em] text-accent"
                    >
                      Verify <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
                <div className="flex gap-3">
                  {credential.badges.map((badge) => (
                    <CredentialBadge key={badge} src={badge} issuer={credential.issuer} />
                  ))}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
