import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export const metadata: Metadata = { title: "Profile", description: "Professional profile, experience, education, and technical skills of Shaher Waheed Roshdy." };

export default function ProfilePage() {
  return (
    <main>
      <section className="page-hero"><div className="shell profile-hero"><div><p className="mono-label">Profile / Riyadh</p><h1 className="page-title">Technical-office delivery across architecture and landscape.</h1><p className="profile-summary">{portfolio.summary}</p><div className="registration-line"><span>Professional registration</span><strong>{portfolio.registration}</strong></div><div className="profile-actions"><Link className="button button-solid" href="/contact">Contact Shaher <ArrowUpRight size={15} /></Link><a className="button button-ghost" href={portfolio.cv} download>Download CV <Download size={15} /></a></div></div><div className="portrait-frame"><img src="/images/about/portrait-v2.jpg" alt="Shaher Waheed Roshdy" loading="eager" decoding="async" /></div></div></section>
      <section className="section-space section-rule"><div className="shell"><p className="mono-label">Career / 2019 — Present</p><div className="timeline">{portfolio.experienceItems.map((item) => <article className="timeline-item" key={`${item.period}-${item.company}`}><span className="timeline-period">{item.period}</span><div><h3>{item.role}</h3><p>{item.company}</p></div><p>{item.description}</p></article>)}</div></div></section>
      <section className="section-space section-rule"><div className="shell"><div className="section-heading"><div><p className="mono-label">Education & technical practice</p><h2>Built on planning, design, and construction documentation.</h2></div></div><div className="skills-layout"><article className="skill-panel"><p className="mono-label">Education</p><h3>Bachelor of Urban and Regional Planning</h3><p>Cairo University · 2016 — 2021</p><ul><li>Graduation project: Tourism development of Saint Catherine</li><li>Saudi Council of Engineers professional accreditation</li></ul></article><article className="skill-panel"><p className="mono-label">Software</p><h3>Design & documentation</h3><ul><li>Revit · AutoCAD · Civil 3D</li><li>Navisworks · ACC</li><li>SketchUp · Lumion</li></ul></article><article className="skill-panel"><p className="mono-label">Delivery</p><h3>Technical-office practice</h3><ul><li>Design development</li><li>Shop drawings & as-built packages</li><li>BOQs · RFIs · submittals</li></ul></article><article className="skill-panel"><p className="mono-label">Languages</p><h3>Professional communication</h3><ul>{portfolio.languages.map((item) => <li key={item.language}><strong>{item.language}</strong><span>{item.proficiency}</span></li>)}</ul></article></div></div></section>
    </main>
  );
}
