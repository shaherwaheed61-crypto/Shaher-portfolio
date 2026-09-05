import Link from "next/link";
import { portfolio } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-main">
          <div>
            <p className="mono-label">Architect / Landscape Architect</p>
            <p className="footer-name">Shaher Waheed Roshdy</p>
            <p className="footer-role">Design development · Shop drawings · BIM-enabled documentation</p>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <Link href="/projects">Projects</Link>
            <Link href="/profile">Profile</Link>
            <Link href="/credentials">Credentials</Link>
            <Link href="/contact">Contact</Link>
            <a href={portfolio.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={portfolio.behance} target="_blank" rel="noreferrer">Behance</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Shaher Waheed Roshdy</span>
          <span>Riyadh, Saudi Arabia</span>
        </div>
      </div>
    </footer>
  );
}
