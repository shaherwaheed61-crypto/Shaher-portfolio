import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { DayNightShowcase } from "@/components/day-night-showcase";
import { ProjectCard } from "@/components/project-card";
import { portfolio, projects } from "@/data/portfolio";

const featuredProjects = projects.filter((project) => project.featured).slice(0, 4);

export default function Home() {
  return (
    <main>
      <section className="hero">
        <img className="hero-image" src="/images/gardens-project/night-masterplan-aerial.jpg" alt="Aerial night view of King Abdullah International Gardens" />
        <div className="hero-wash" />
        <div className="hero-grid" />
        <div className="hero-content shell">
          <div className="hero-kicker"><span>Architect / Landscape Architect</span><span>Riyadh, Saudi Arabia</span></div>
          <div className="hero-copy">
            <p className="mono-label">Portfolio 2026</p>
            <h1>Shaher Waheed<span>Roshdy</span></h1>
            <p className="hero-intro">{portfolio.positioning}</p>
            <div className="hero-actions">
              <Link className="button button-solid" href="/projects">View selected work <ArrowDownRight size={16} /></Link>
              <Link className="button button-ghost" href="/profile">Profile</Link>
            </div>
          </div>
          <aside className="hero-facts" aria-label="Professional summary">
            <div><span>Experience</span><strong>{portfolio.experience}</strong></div>
            <div><span>Location</span><strong>{portfolio.location}</strong></div>
            <div><span>Focus</span><strong>Design development<br />&amp; shop drawings</strong></div>
          </aside>
          <p className="hero-coordinate mono-label">24.7136° N / 46.6753° E</p>
        </div>
      </section>

      <section className="intro-band section-rule">
        <div className="shell intro-grid">
          <p className="section-index mono-label">01 / Profile</p>
          <h2>Concepts become valuable when they can be built.</h2>
          <div><p>{portfolio.summary}</p><Link className="text-link" href="/profile">Full profile <ArrowUpRight size={15} /></Link></div>
        </div>
      </section>

      <section className="section-space section-rule">
        <div className="shell">
          <div className="section-heading">
            <div><p className="mono-label">02 / Selected work</p><h2>Projects shaped from drawing set to site.</h2></div>
            <Link className="text-link" href="/projects">All projects <ArrowUpRight size={15} /></Link>
          </div>
          <div className="featured-grid">{featuredProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index + 1} featured />)}</div>
        </div>
      </section>

      <DayNightShowcase />

      <section className="section-space section-rule capabilities-section">
        <div className="shell">
          <div className="section-heading align-start">
            <div><p className="mono-label">04 / Capabilities</p><h2>Technical clarity across architecture and landscape.</h2></div>
            <p className="section-note">A focused practice spanning design development, documentation, visualization, and BIM-enabled delivery.</p>
          </div>
          <div className="capability-grid">
            {portfolio.capabilities.map((capability, index) => <article className="capability-card" key={capability.title}><span className="capability-number mono-label">0{index + 1}</span><h3>{capability.title}</h3><p>{capability.description}</p><div className="tag-row">{capability.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></article>)}
          </div>
        </div>
      </section>

      <section className="closing-cta section-rule">
        <div className="shell closing-grid">
          <p className="mono-label">Available in Riyadh / KSA</p>
          <h2>Let&apos;s turn the next design into a coordinated package.</h2>
          <Link className="button button-solid" href="/contact">Start a conversation <ArrowUpRight size={16} /></Link>
        </div>
      </section>
    </main>
  );
}
