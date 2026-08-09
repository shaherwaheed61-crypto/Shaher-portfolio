"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/magnetic-button";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/certifications", label: "Certifications" }
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="font-display text-sm font-semibold tracking-tight text-ink"
          onClick={() => setOpen(false)}
        >
          Shaher Waheed
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-line bg-bg-elevated/70 p-1 backdrop-blur-md lg:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-3.5 py-2 font-mono text-xs uppercase tracking-[0.08em] transition-colors",
                  active ? "text-bg" : "text-ink-dim hover:text-ink"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        <MagneticButton
          href="/contact"
          className="hidden rounded-full bg-accent px-5 py-2.5 font-mono text-xs uppercase tracking-[0.08em] text-bg lg:inline-block"
        >
          Contact
        </MagneticButton>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-line p-2.5 text-ink lg:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="mx-4 mb-4 rounded-[20px] border border-line bg-bg-elevated/95 p-4 backdrop-blur-md lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-[10px] px-4 py-3 font-mono text-xs uppercase tracking-[0.08em]",
                  pathname === link.href ? "bg-accent text-bg" : "text-ink-dim"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-accent px-4 py-3 text-center font-mono text-xs uppercase tracking-[0.08em] text-bg"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
