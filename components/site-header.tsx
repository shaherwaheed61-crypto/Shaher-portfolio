"use client";

import Link from "next/link";
import { Download, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { portfolio } from "@/data/portfolio";

const navigation = [
  { href: "/projects", label: "Projects" },
  { href: "/profile", label: "Profile" },
  { href: "/credentials", label: "Credentials" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label={`${portfolio.name} home`}>
          <span className="brand-mark" />
          {portfolio.name}
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link className={isActive("/") ? "active" : undefined} href="/" aria-current={isActive("/") ? "page" : undefined}>Home</Link>
          {navigation.map((item) => <Link className={isActive(item.href) ? "active" : undefined} key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>{item.label}</Link>)}
        </nav>
        <a className="header-contact" href={portfolio.cv} download>
          Download CV <Download size={14} />
        </a>
        <details className="mobile-nav">
          <summary aria-label="Open navigation"><Menu size={18} /></summary>
          <nav aria-label="Mobile navigation">
            <Link className={isActive("/") ? "active" : undefined} href="/" aria-current={isActive("/") ? "page" : undefined}>Home</Link>
            {navigation.map((item) => <Link className={isActive(item.href) ? "active" : undefined} key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>{item.label}</Link>)}
            <a href={portfolio.cv} download>Download CV</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
