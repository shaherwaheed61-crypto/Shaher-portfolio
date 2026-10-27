import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { credentials, portfolio } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "About Me",
  description: `Meet ${portfolio.name}: architect and landscape architect based in Riyadh. Explore professional experience, education, registration, and certificates.`,
};

export default function Home() {
  const registration = portfolio.registrationDetails;

  return (
    <main>
      <section className="page-hero profile-page-hero about-me-page-hero" id="about">
        <div className="shell profile-hero">
          <div>
            <p className="mono-label">About Me / Riyadh, Saudi Arabia</p>
            <h1 className="page-title">Shaher Wahid <span>Rushdi.</span></h1>
            <p className="about-me-role">Architect &amp; Landscape Architect <span>·</span> Technical Office <span>·</span> BIM</p>
            <p className="profile-summary profile-lead">{portfolio.personalIntro}</p>
            <p className="profile-summary">{portfolio.personalApproach}</p>
            <div className="registration-line"><span>Professional registration</span><strong>{portfolio.registration}</strong></div>
            <div className="profile-actions">
              <a className="button button-solid" href="#credentials">View credentials <ArrowUpRight size={15} /></a>
              <a className="button button-ghost" href={portfolio.cv} download>Download CV <Download size={15} /></a>
            </div>
          </div>
          <figure className="profile-portrait"><div className="portrait-frame"><img src="/images/about/portrait-v2.jpg" alt="Portrait of Shaher Wahid Rushdi" loading="eager" decoding="async" /></div><figcaption>Shaher Wahid Rushdi <span>01 / About Me</span></figcaption></figure>
        </div>
      </section>

      <section className="profile-value section-rule">
        <div className="shell profile-value-grid">
          <div><p className="mono-label">A little about me</p><h2>Design ambition.<br /><em>Buildable clarity.</em></h2></div>
          <div className="profile-value-copy">
            <p>{portfolio.summary}</p>
            <div className="about-me-facts"><span><strong>{portfolio.experience}</strong> Experience</span><span><strong>SCE</strong> Accredited</span><span><strong>Riyadh</strong> Based in Saudi Arabia</span></div>
          </div>
        </div>
      </section>

      <section className="section-space section-rule" id="credentials">
        <div className="shell">
          <div className="section-heading align-start"><div><p className="mono-label">01 / Credentials</p><h2>Professional registration.</h2></div><p className="section-note">My Saudi Council of Engineers accreditation and supporting documents.</p></div>
          <article className="registration-card">
            <div><p className="mono-label">Professional registration</p><h2>{registration.authority}</h2><p>{registration.accreditation}</p></div>
            <dl>
              <div><dt>Specialization</dt><dd>{registration.specialization}</dd></div>
              <div><dt>Membership no.</dt><dd>{registration.membership}</dd></div>
              <div><dt>Accredited since</dt><dd>{registration.accreditedSince}</dd></div>
              <div><dt>Valid until</dt><dd>{registration.validUntil}</dd></div>
            </dl>
            <figure className="registration-certificate">
              <a href={registration.certificate.document} target="_blank" rel="noopener noreferrer" aria-label="Open SCE professional accreditation certificate PDF in a new tab">
                <img src={registration.certificate.image} alt="Saudi Council of Engineers professional accreditation certificate" width={1800} height={1273} loading="lazy" decoding="async" />
              </a>
              <figcaption><span>Professional accreditation certificate</span><a className="text-link" href={registration.certificate.document} target="_blank" rel="noopener noreferrer">View certificate (PDF)<span className="sr-only"> — opens in a new tab</span></a></figcaption>
            </figure>
          </article>
        </div>
      </section>

      <section className="section-space section-rule">
        <div className="shell">
          <div className="section-heading"><div><p className="mono-label">02 / Selected training</p><h2>BIM and information-management credentials.</h2></div></div>
          <div className="credentials-grid">{credentials.map((credential) => <article className="credential-card" key={credential.title}><img src={credential.image} alt={`${credential.title} certificate`} loading="lazy" /><div><p className="mono-label">{credential.issuer}</p><h2>{credential.title}</h2>{credential.id && <p>Credential ID: {credential.id}</p>}</div></article>)}</div>
        </div>
      </section>

      <section className="section-space section-rule">
        <div className="shell">
          <div className="section-heading"><div><p className="mono-label">03 / Career</p><h2>My professional journey.</h2></div></div>
          <div className="timeline about-career-timeline">{portfolio.experienceItems.map((item) => <article className="timeline-item" key={`${item.period}-${item.company}`}><span className="timeline-period">{item.period}</span><div><h3>{item.role}</h3><p>{item.company}</p></div><span className="career-location">{item.location}</span></article>)}</div>
        </div>
      </section>

      <section className="section-space section-rule">
        <div className="shell">
          <div className="section-heading"><div><p className="mono-label">04 / Education &amp; skills</p><h2>The foundations behind my practice.</h2></div></div>
          <div className="skills-layout">
            <article className="skill-panel"><p className="mono-label">Education</p><h3>Bachelor of Urban and Regional Planning</h3><p>Cairo University · 2016 — 2021</p></article>
            <article className="skill-panel"><p className="mono-label">Software</p><h3>Design &amp; documentation</h3><ul><li>Revit · AutoCAD · Civil 3D</li><li>Navisworks · ACC</li><li>SketchUp · Lumion</li></ul></article>
            <article className="skill-panel"><p className="mono-label">Professional skills</p><h3>Technical-office practice</h3><ul><li>Design development</li><li>Shop drawings &amp; as-built packages</li><li>BOQs · RFIs · submittals</li></ul></article>
            <article className="skill-panel"><p className="mono-label">Languages</p><h3>Communication</h3><ul>{portfolio.languages.map((item) => <li key={item.language}><strong>{item.language}</strong><span>{item.proficiency}</span></li>)}</ul></article>
          </div>
        </div>
      </section>

      <section className="closing-cta section-rule">
        <div className="shell closing-grid">
          <p className="mono-label">Based in Riyadh / Open across KSA</p>
          <h2>Let&apos;s connect about architecture, landscape, and technical delivery.</h2>
          <div className="closing-actions"><Link className="button button-solid" href="/contact">Contact Shaher <ArrowUpRight size={16} /></Link><a className="button closing-secondary" href={portfolio.cv} download>Review CV <Download size={16} /></a></div>
        </div>
      </section>
    </main>
  );
}
