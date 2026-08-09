import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { profile } from "@/data/profile";
import { CopyEmailButton } from "@/components/copy-email-button";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-16 md:grid-cols-3 md:px-10">
        <div>
          <p className="font-display text-lg font-semibold text-ink">{profile.name}</p>
          <p className="mt-2 max-w-[32ch] text-sm leading-relaxed text-ink-dim">{profile.role}</p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="label">Reach</span>
          <span className="flex items-center gap-2 text-sm text-ink-dim">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 transition-colors hover:text-accent"
            >
              <Mail size={15} /> {profile.email}
            </a>
            <CopyEmailButton email={profile.email} />
          </span>
          <a
            href={`tel:${profile.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-2 text-sm text-ink-dim transition-colors hover:text-accent"
          >
            <Phone size={15} /> {profile.phone}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-ink-dim transition-colors hover:text-accent"
          >
            <span className="font-mono text-[15px] leading-none">in</span> LinkedIn
          </a>
          <a
            href={profile.behance}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-ink-dim transition-colors hover:text-accent"
          >
            <span className="font-mono text-[15px] leading-none">Be</span> Behance
          </a>
          <a
            href={profile.facebook}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-ink-dim transition-colors hover:text-accent"
          >
            <span className="font-mono text-[15px] leading-none">f</span> Facebook
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <span className="label">Site</span>
          <Link href="/projects" className="text-sm text-ink-dim transition-colors hover:text-accent">
            Projects
          </Link>
          <Link href="/services" className="text-sm text-ink-dim transition-colors hover:text-accent">
            Services
          </Link>
          <Link href="/about" className="text-sm text-ink-dim transition-colors hover:text-accent">
            About
          </Link>
          <Link href="/certifications" className="text-sm text-ink-dim transition-colors hover:text-accent">
            Certifications
          </Link>
        </div>
      </div>

      <div className="border-t border-line px-6 py-6 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
          {profile.name} - {profile.location}
        </p>
      </div>
    </footer>
  );
}
