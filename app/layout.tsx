import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { portfolio } from "@/data/portfolio";
import "./globals.css";

const siteUrl = "https://shaher-waheed-portfolio.shaherwaheed61.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${portfolio.name} | Architect & Landscape Architect`,
    template: `%s | ${portfolio.name}`,
  },
  description:
    "Architect and Landscape Architect in Riyadh specializing in design development, shop drawings, and BIM-enabled construction documentation.",
  keywords: ["Architect Riyadh", "Landscape Architect", "Shop Drawings", "BIM Architect", "Technical Office Architect"],
  authors: [{ name: portfolio.name, url: siteUrl }],
  creator: portfolio.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${portfolio.name} | Architect & Landscape Architect`,
    description: "Technical-office architecture and landscape portfolio focused on design development, shop drawings, and construction-ready documentation.",
    siteName: `${portfolio.displayName.primary} Portfolio`,
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolio.name,
    jobTitle: portfolio.headline,
    url: siteUrl,
    email: `mailto:${portfolio.email}`,
    telephone: portfolio.phone,
    address: { "@type": "PostalAddress", addressLocality: "Riyadh", addressCountry: "SA" },
    sameAs: [portfolio.linkedin, portfolio.behance],
    knowsAbout: ["Architecture", "Landscape Architecture", "Technical Office", "Shop Drawings", "BIM-based Documentation"],
  };

  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <div id="main-content">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
