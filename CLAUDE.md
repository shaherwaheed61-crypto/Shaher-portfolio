@AGENTS.md

# Shaher Waheed Roshdy — Architectural & Landscape Portfolio

Interactive, scroll-driven portfolio for an Architect & Landscape Architect (5+ years, BIM-certified, Riyadh KSA). Real projects, real CV data — no filler content in committed work.

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- Lenis (smooth scroll) + GSAP/ScrollTrigger (pinning, scroll-timed sequences) + `motion` (Motion for React, formerly Framer Motion) for component-level micro-interactions
- React Three Fiber + Drei for any 3D scene; keep 3D components client-only (`dynamic(() => import(...), { ssr: false })`)
- Velite for MDX-based project content (`content/projects/*.mdx`)
- Deploy target: Cloudflare Pages via GitHub Actions, using Next.js **static export** (`output: "export"` in `next.config.ts`) — no server runtime, no API routes, `next/image` optimization disabled (`images.unoptimized`). Not GitHub Pages, not Vercel.

## Content source of truth

Real CV data lives in the parent folder (`../Arch.Shaher waheed .pdf`, `../سعد.docx`) — never invent project names, clients, or dates. Confirmed real projects/employers:
- Safwa Riyadh General Contracting Co. — Marsa Khuzam (Riyadh, client NHC), Al Ula Housing (Tabuk/Medina)
- Zaid Al-Hussein & Brothers Contracting — King Abdullah International Gardens (Riyadh Municipality)
- Zad Engineering Consulting Office (Egypt) — architectural shop drawings
- Freelance 3D/landscape modeling (Behance: behance.net/shaherwaheed)
- Certifications: Plannerly ISO 19650 Information Manager (Level 1 & 3), Niqat Global BIM Management

Real project photos were extracted from an old draft (`../extracted-assets/`) — reuse these where they match a real project instead of stock/placeholder imagery. Only use placeholders for a project section if no real photo exists yet, and mark it clearly (e.g. a `TODO` in the MDX frontmatter) so it's never mistaken for final content.

## Design read (design-taste-frontend)

Reading this as: architecture/landscape-architect portfolio for AEC-industry clients and employers in Saudi Arabia, with a dark editorial/architectural language, leaning toward Tailwind v4 utilities + native CSS + GSAP/Lenis scroll storytelling. No component library (Section 2.B aesthetic, not an official design system).

Dials: `DESIGN_VARIANCE: 7` (confident asymmetry, not chaotic), `MOTION_INTENSITY: 6` (structural scroll reveals/parallax, not cinematic overload), `VISUAL_DENSITY: 3` (generous negative space, real photography does the work).

Palette family: **Terracotta + Slate** (warm rust accent on near-black, echoes the desert/garden real photography without the banned beige+brass premium-consumer default).

## Brand tokens (source of truth — no ad-hoc colors/fonts in components)

**Color** (defined as CSS vars in `globals.css`, one theme, no light/dark split — this is a dark-only editorial site by design):
- `--bg: #14120f` — near-black, warm undertone (never pure `#000`)
- `--bg-elevated: #1c1914` — panels, cards
- `--ink: #f3ede2` — primary text, warm off-white (never pure `#fff`)
- `--ink-dim: #a89e8f` — secondary text/body
- `--ink-faint: #6f6759` — tertiary text, mono labels
- `--accent: #c2632f` — terracotta/rust, the ONLY accent color, used identically everywhere (links, active nav, key numbers, hover states)
- `--accent-soft: rgba(194,99,47,0.14)` — accent backgrounds/tints
- `--line: rgba(243,237,226,0.12)` / `--line-strong: rgba(243,237,226,0.22)` — borders/dividers

**Type**: Space Grotesk (display/headings, weights 500-700) + Manrope (body) + JetBrains Mono (labels, metadata rows, nav, numbers). No Inter. No serif — emphasis words within headlines use *italic Space Grotesk*, never a mixed font family.

**Radius** (documented exception system — three fixed values, no freelancing):
- Pills (nav, buttons, tags): `rounded-full`
- Panels (photo cards, glass metadata cards, images): `rounded-[20px]`
- Inputs: `rounded-[10px]`

**Shadow**: tinted warm-dark only, e.g. `shadow-[0_20px_60px_rgba(10,8,5,0.45)]`, glass panels get an inset highlight border `inset 0 1px 0 rgba(255,255,255,0.06)`. No pure-black drop shadows.

**Signature pattern**: the floating glass metadata card (inspired by the ZROBIM/Architector.tech references) — a `bg-elevated`-tinted glass panel overlaid on a project photo, listing labeled rows (mono, uppercase, `ink-faint` labels + `ink` values) pulled directly from real project frontmatter (employer, client, consultant, role, location, period). This is the recurring UI motif tying hero, project cards, and project detail pages together — implemented once as `ProjectMetaCard` and reused everywhere metadata is shown.

## Anti-patterns (explicit — do not do these)

- No neon/saturated gradients, no glassmorphism-for-its-own-sake — this is an architecture portfolio, tone stays measured and professional, not "SaaS startup."
- No jump-in-from-offscreen entrance animations. Motion should feel structural (reveals, parallax, camera moves), not decorative bounce.
- No stock architecture photography. Every image is either a real project photo or explicitly a placeholder pending real content.
- No BIM/Speckle viewer integration unless real exported model files are provided — do not fake a live BIM viewer.
- No client-side secrets. Any webhook/API key goes through environment variables + GitHub Secrets, never hardcoded.
- No Next.js API routes — static export supports none. Forms/webhooks call external endpoints (e.g. Formspree, Make.com) directly from client components via `fetch`.

## Structure conventions

- `src/components/` — UI components (co-locate 3D scenes under `src/components/scene/`)
- `content/projects/*.mdx` — one file per real project, parsed via Velite
- `public/images/` — optimized real project imagery (compress before adding; large PNGs/JPGs must be re-encoded, not committed raw from `extracted-assets/`)
