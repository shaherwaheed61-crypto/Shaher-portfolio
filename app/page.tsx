import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react";
import { DayNightShowcase } from "@/components/day-night-showcase";
import { ProjectCard } from "@/components/project-card";
import { portfolio, projects } from "@/data/portfolio";

const featuredOrder = [
  "king-abdullah-international-gardens",
  "marsa-khuzam",
  "security-aviation-leadership-building",
  "alula-housing",
];
const featuredProjects = featuredOrder.map((slug) => projects.find((project) => project.slug === slug)).filter((project): project is (typeof projects)[number] => Boolean(project));

export default function Home() {
  return (
    <main>
      <section className="hero">
        <img className="hero-image" src="/images/gardens-project/night-masterplan-aerial.jpg" alt="Aerial night view of King Abdullah International Gardens" loading="eager" fetchPriority="high" decoding="async" />
        <div className="hero-wash" />
        <div className="hero-grid" />
        <div className="hero-content shell">
          <div className="hero-kicker"><span>{portfolio.headline}</span><span>{portfolio.location}</span></div>
          <div className="hero-copy">
            <p className="mono-label">Portfolio 2026</p>
            <h1>Shaher Waheed <span>Roshdy</span></h1>
            <p className="hero-intro">{portfolio.positioning}</p>
            <div className="hero-actions">
              <Link className="button button-solid" href="/projects">View selected work <ArrowDownRight size={16} /></Link>
              <a className="button button-ghost" href={portfolio.cv} download>Download CV <Download size={16} /></a>
            </div>
          </div>
          <aside className="hero-facts" aria-label="Professional summary">
            <div><span>Role</span><strong>Technical Office<br />Architect</strong></div>
            <div><span>Experience</span><strong>{portfolio.experience}</strong></div>
            <div><span>Practice</span><strong>Architecture<br />&amp; Landscape</strong></div>
            <div><span>Registration</span><strong>{portfolio.registration}</strong></div>
          </aside>
          <p className="hero-coordinate mono-label">24.7136° N / 46.6753° E</p>
        </div>
      </section>

      <section className="proof-strip section-rule" aria-label="Career highlights">
        <div className="shell proof-grid">
          {portfolio.proofPoints.map((point) => <div className="proof-point" key={point.label}><strong>{point.value}</strong><span>{point.label}</span></div>)}
        </div>
      </section>

      <section className="section-space section-rule">
        <div className="shell">
          <div className="section-heading">
            <div><p className="mono-label">01 / Selected work</p><h2>Projects shaped from drawing set to site.</h2></div>
            <Link className="text-link" href="/projects">All projects <ArrowUpRight size={15} /></Link>
          </div>
          <div className="featured-grid">{featuredProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index + 1} featured />)}</div>
        </div>
      </section>

      <section className="intro-band section-rule">
        <div className="shell intro-grid">
          <p className="section-index mono-label">02 / Profile</p>
          <h2>Concepts become valuable when they can be built.</h2>
          <div><p>{portfolio.summary}</p><Link className="text-link" href="/profile">Full profile <ArrowUpRight size={15} /></Link></div>
        </div>
      </section>

      <section className="delivery-path section-space section-rule">
        <div className="shell">
          <div className="section-heading align-start">
            <div><p className="mono-label">03 / One delivery path</p><h2>Architecture and landscape, carried through one technical workflow.</h2></div>
            <p className="section-note">BIM supports the process. The professional focus stays on design decisions, clear documentation, and buildable architectural and landscape packages.</p>
          </div>
          <ol className="delivery-grid">
            {portfolio.deliverySteps.map((step, index) => (
              <li className="delivery-step" key={step.title}>
                <span className="delivery-number mono-label">{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <DayNightShowcase />

      <section className="section-space section-rule capabilities-section">
        <div className="shell">
          <div className="section-heading align-start">
            <div><p className="mono-label">05 / Capabilities</p><h2>Technical clarity across architecture and landscape.</h2></div>
            <p className="section-note">A focused practice spanning design development, documentation, visualization, and BIM-enabled delivery.</p>
          </div>
          <div className="capability-grid">
            {portfolio.capabilities.map((capability, index) => <article className="capability-card" key={capability.title}><span className="capability-number mono-label">0{index + 1}</span><h3>{capability.title}</h3><p>{capability.description}</p><div className="tag-row">{capability.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></article>)}
          </div>
        </div>
      </section>

      <section className="closing-cta section-rule">
        <div className="shell closing-grid">
          <p className="mono-label">Based in Riyadh / Open across KSA</p>
          <h2>Open to architecture and landscape roles focused on technical-office delivery.</h2>
          <div className="closing-actions">
            <Link className="button button-solid" href="/contact">Contact Shaher <ArrowUpRight size={16} /></Link>
            <a className="button closing-secondary" href={portfolio.cv} download>Review CV <Download size={16} /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
