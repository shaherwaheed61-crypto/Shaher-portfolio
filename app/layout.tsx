import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Shaher Waheed Roshdy | Architect & Landscape Architect",
    template: "%s | Shaher Waheed Roshdy",
  },
  description:
    "Architect and Landscape Architect in Riyadh specializing in design development, shop drawings, and BIM-enabled construction documentation.",
  keywords: ["Architect Riyadh", "Landscape Architect", "Shop Drawings", "BIM Architect", "Technical Office Architect"],
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <div id="main-content">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
