import type { Metadata } from "next";
import { ArrowUpRight, Download, MessageCircle } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export const metadata: Metadata = { title: "Contact", description: `Contact ${portfolio.name} for architectural, landscape, technical-office, and BIM opportunities.` };

export default function ContactPage() {
  return (
    <main>
      <section className="page-hero contact-page"><div className="shell contact-grid"><div><p className="mono-label">Contact / Riyadh</p><h1 className="page-title">Let&apos;s shape the next project.</h1><p className="page-lead">Open to architectural and landscape opportunities focused on design development, technical-office delivery, and BIM-enabled shop drawings.</p><div className="contact-actions"><a className="button button-solid" href={`mailto:${portfolio.email}`}>Send an email <ArrowUpRight size={16} /></a><a className="button button-ghost" href={portfolio.whatsapp} target="_blank" rel="noreferrer">WhatsApp <MessageCircle size={16} /></a><a className="button button-ghost" href={portfolio.cv} download>Download CV <Download size={16} /></a></div></div><div className="contact-list"><a href={`mailto:${portfolio.email}`}><span>Email</span><strong>{portfolio.email}</strong></a><a href={`tel:${portfolio.tel}`}><span>Phone</span><strong>{portfolio.phone}</strong></a><a href={portfolio.whatsapp} target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>Start a conversation ↗</strong></a><a href={portfolio.linkedin} target="_blank" rel="noreferrer"><span>LinkedIn</span><strong>Professional profile ↗</strong></a><a href={portfolio.behance} target="_blank" rel="noreferrer"><span>Behance</span><strong>Selected visuals ↗</strong></a><a href={portfolio.cv} download><span>CV</span><strong>Download PDF ↓</strong></a><div><span>Location</span><strong>{portfolio.location}</strong></div></div></div></section>
    </main>
  );
}
