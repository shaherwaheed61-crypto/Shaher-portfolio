import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";

const navigation = [
  { href: "/projects", label: "Projects" },
  { href: "/profile", label: "Profile" },
  { href: "/credentials", label: "Credentials" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Shaher Waheed home">
          <span className="brand-mark" />
          Shaher Waheed
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/">Home</Link>
          {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <Link className="header-contact" href="mailto:shaherwaheed61@gmail.com">
          Get in touch <ArrowUpRight size={14} />
        </Link>
        <details className="mobile-nav">
          <summary aria-label="Open navigation"><Menu size={18} /></summary>
          <nav aria-label="Mobile navigation">
            <Link href="/">Home</Link>
            {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
        </details>
      </div>
    </header>
  );
}
