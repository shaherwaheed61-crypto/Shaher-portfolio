import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DigitalPracticeExplorer } from "@/components/digital-practice-explorer";
import { portfolio } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Digital Practice",
  description: `Selected Revit workflow development by ${portfolio.name}, connecting technical-office problems with structured model and documentation outputs.`,
};

export default function DigitalPracticePage() {
  return (
    <main className="digital-practice-page">
      <section className="digital-practice-hero">
        <div className="shell digital-practice-hero-grid">
          <div>
            <p className="mono-label">Digital practice / SHAHER TOOLS</p>
            <h1>Revit workflows shaped around technical-office problems.</h1>
            <p>Selected development work exploring how repeatable documentation tasks can become clearer, more controlled, and easier to quantify—while architectural and landscape judgment remains central.</p>
          </div>
          <aside aria-label="Digital practice summary">
            <div><span>Focus</span><strong>Technical-office workflow development</strong></div>
            <div><span>Platform</span><strong>{portfolio.tooling.platform}</strong></div>
            <div><span>Structure</span><strong>Independent modules / one ribbon</strong></div>
            <div><span>Public scope</span><strong>Workflow logic only</strong></div>
          </aside>
        </div>
      </section>

      <section className="digital-practice-stats section-rule" aria-label="Digital practice summary metrics">
        <div className="shell digital-practice-stats-grid">
          <div><strong>03</strong><span>Selected modules</span></div>
          <div><strong>2025+</strong><span>Current Revit target</span></div>
          <div><strong>01</strong><span>Unified SHAHER TOOLS ribbon</span></div>
          <div><strong>0</strong><span>Client files published</span></div>
        </div>
      </section>

      <section className="section-space section-rule">
        <div className="shell">
          <div className="section-heading align-start">
            <div><p className="mono-label">01 / Module explorer</p><h2>From repeatable input to documentable output.</h2></div>
            <p className="section-note">Select a module to review the intended inputs, workflow logic, and technical-office outputs without exposing project data.</p>
          </div>
          <DigitalPracticeExplorer modules={portfolio.tooling.modules} />
        </div>
      </section>

      <section className="section-space section-rule digital-principles-section">
        <div className="shell">
          <div className="section-heading align-start">
            <div><p className="mono-label">02 / Development principles</p><h2>Automation supports the delivery process.</h2></div>
            <p className="section-note">The value is in organizing a real technical-office workflow—not presenting software development as a substitute for architectural experience.</p>
          </div>
          <div className="digital-principles-grid">
            {portfolio.tooling.principles.map((principle, index) => (
              <article key={principle.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="digital-practice-close section-rule">
        <div className="shell digital-practice-close-grid">
          <div><p className="mono-label">Architecture first / Digital delivery supported</p><h2>Review the project evidence behind the wider technical practice.</h2></div>
          <div>
            <Link className="button button-solid" href="/projects">View projects <ArrowUpRight size={16} /></Link>
            <Link className="button button-ghost" href="/contact">Contact Shaher <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
