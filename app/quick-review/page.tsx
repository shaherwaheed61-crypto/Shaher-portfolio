import type { Metadata } from "next";
import behanceSources from "@/data/behance-review-sources.json";
import filmSelection from "@/data/review-film-selection.json";
import filmTimeline from "@/data/portfolio-film-timeline.json";
import { PortfolioFilmPlayer } from "@/components/portfolio-film-player";
import Link from "next/link";
import { ArrowUpRight, Download, Timer } from "lucide-react";
import { CapabilityEvidence } from "@/components/capability-evidence";
import { credentials, getProject, portfolio } from "@/data/portfolio";

const selectedBehance = behanceSources.filter((project) => !filmSelection.excludedBehanceIds.includes(project.id));
const drawingSheetCount = filmSelection.kaigDrawingScenes.reduce((count, scene) => count + scene.images.length, 0);

export const metadata: Metadata = {
  title: "Portfolio Film",
  description: `Watch ${portfolio.name}'s 90-second portfolio film: nine project stories, role diagrams, landscape shop drawings, architectural work and BIM.`,
};

const evidence = [
  {
    project: getProject("king-abdullah-international-gardens")!,
    label: "Landscape technical office",
    proof: ["2,000,000 m² overall development", "Approx. SAR 3 billion project value", "Three public drawing studies"],
  },
  {
    project: getProject("security-aviation-leadership-building")!,
    label: "Architectural technical office",
    proof: ["Architectural redesign", "Architectural IFC package at LOD 300", "Architectural shop drawings & project BIM coordination"],
  },
  {
    project: getProject("zad-engineering")!,
    label: "Architecture & visualization",
    proof: ["Technical Office Architect", "Working, shop & as-built packages", "Residential and commercial design work"],
  },
];

const capabilityEvidence = portfolio.capabilities.map((capability) => ({
  title: capability.title,
  description: capability.description,
  tools: capability.tools,
  evidence: capability.evidence.map(({ projectSlug, statement }) => {
    const project = getProject(projectSlug)!;
    return {
      statement,
      project: {
        slug: project.slug,
        code: project.code,
        title: project.title,
        role: project.role,
        confidential: project.confidential,
      },
    };
  }),
}));

export default function QuickReviewPage() {
  return (
    <main className="quick-review-page">
      <section className="review-film-section">
        <div className="shell">
          <div className="review-film-heading">
            <div><p className="mono-label quick-review-status"><Timer size={14} /> 01:30 / Project stories</p><h1>Projects. Roles. <em>Evidence.</em></h1></div>
            <p>Explore the work by client agency. Project introductions identify the owner, consultant where documented, and my contribution, followed by drawings, architectural models, selected design work, and my certificates.</p>
          </div>
          <PortfolioFilmPlayer film={filmTimeline} />
          <div className="quick-review-actions">
            <a className="button button-solid" href={filmTimeline.video} download="Shaher-Wahid-Rushdi-Portfolio-Film.mp4">Download the film <Download size={16} /></a>
            <Link className="button button-ghost" href="/projects/king-abdullah-international-gardens#drawings">Explore KAIG drawings <ArrowUpRight size={16} /></Link>
          </div>
          <details className="review-film-transcript"><summary>Read the film transcript</summary><ol>
            {filmTimeline.chapters.map((chapter) => {
              const project = chapter.slug ? getProject(chapter.slug) : undefined;
              const time = `${Math.floor(chapter.start / 60).toString().padStart(2, "0")}:${Math.floor(chapter.start % 60).toString().padStart(2, "0")}`;
              return <li key={chapter.id}><strong>{time}</strong> {chapter.title}. {project ? `${project.client ? `Owner: ${project.client}. ` : ""}${project.consultant ? `Consultant: ${project.consultant}. ` : ""}${project.roleSummary}` : chapter.id === "intro" ? `${portfolio.role}. ${portfolio.experience} of experience, based in Riyadh.` : chapter.id === "selected-work" ? `${selectedBehance.length} selected Behance projects: residential, landscape, commercial and facade visualization.` : chapter.id === "credentials" ? `${portfolio.registration}. ${credentials.map((credential) => `${credential.title} — ${credential.issuer}`).join("; ")}. Actual certificate images appear in the film.` : `${portfolio.registration}. ${portfolio.email} · ${portfolio.phone}.`}{chapter.id === "kaig" && ` Includes ${drawingSheetCount} landscape shop drawing excerpts: plans, levels, sections and construction details.`}</li>;
            })}
          </ol></details>
        </div>
      </section>

      <section className="quick-review-scale section-rule" aria-label="Verified career scale">
        <div className="shell quick-review-scale-grid">
          <div><strong>5+</strong><span>Years of experience</span></div>
          <div><strong>2M m²</strong><span>Largest project area</span></div>
          <div><strong>19</strong><span>Landscape parks</span></div>
          <div><strong>231K m²</strong><span>Total parks area</span></div>
        </div>
      </section>

      <section className="section-space section-rule" id="evidence">
        <div className="shell">
          <div className="section-heading align-start">
            <div><p className="mono-label">01 / Evidence</p><h2>Three projects. One delivery path.</h2></div>
            <p className="section-note">A concise cross-section of landscape scale, architectural BIM delivery, and design communication.</p>
          </div>

          <div className="quick-evidence-list">
            {evidence.map(({ project, label, proof }, index) => (
              <article className="quick-evidence-card" key={project.slug}>
                <Link className="quick-evidence-image" href={`/projects/${project.slug}`} aria-label={`Open ${project.title} case study`}>
                  {project.image ? <img src={project.image} alt={`${project.title} project preview`} loading={index === 0 ? "eager" : "lazy"} decoding="async" /> : <div className="quick-evidence-confidential" aria-hidden="true"><small>Confidential scope</small><strong>{project.code}</strong><p>No project imagery published</p></div>}
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </Link>
                <div className="quick-evidence-copy">
                  <p className="mono-label">{label}</p>
                  <h3>{project.title}</h3>
                  <strong>{project.role}</strong>
                  <p>{project.summary}</p>
                  <ul>{proof.map((item) => <li key={item}>{item}</li>)}</ul>
                  <Link className="text-link" href={`/projects/${project.slug}`}>Open case study <ArrowUpRight size={15} /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space section-rule quick-review-delivery">
        <div className="shell">
          <div className="section-heading align-start">
            <div><p className="mono-label">02 / Proven capabilities</p><h2>Every capability links back to project evidence.</h2></div>
            <p className="section-note">Architecture and landscape remain the core professional direction; BIM supports clearer and more reliable technical-office delivery.</p>
          </div>
          <CapabilityEvidence capabilities={capabilityEvidence} />
          <div className="capability-positioning-line">
            <span>Professional direction</span>
            <p>Architect & Landscape Architect first · Technical Office delivery throughout · BIM as a supporting method.</p>
          </div>
        </div>
      </section>

      <section className="quick-review-close section-rule">
        <div className="shell quick-review-close-grid">
          <div><p className="mono-label">Review complete</p><h2>Continue with the technical evidence or start a conversation.</h2></div>
          <div className="quick-review-actions">
            <Link className="button button-solid" href="/projects/king-abdullah-international-gardens#drawings">Open technical proof <ArrowUpRight size={16} /></Link>
            <Link className="button button-ghost" href="/contact">Contact Shaher <ArrowUpRight size={16} /></Link>
            <a className="text-link" href={portfolio.workSamplesPdf} download>Download portfolio PDF <Download size={14} /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
