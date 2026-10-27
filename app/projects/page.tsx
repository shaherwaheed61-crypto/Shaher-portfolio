import type { Metadata } from "next";
import { ArrowUpRight, Timer } from "lucide-react";
import Link from "next/link";
import { ProjectAtlas } from "@/components/project-atlas";
import { ProjectsFilter } from "@/components/projects-filter";
import { portfolio, projects } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Projects",
  description: `Explore ${portfolio.name}'s architectural and landscape projects. Open a project for site photographs, drawings, design work, and interactive models.`,
};

const projectOrder = ["king-abdullah-international-gardens", "housing-projects-parks", "marsa-khuzam", "alula-housing", "sedayem-jeddah-streetscape", "jeddah-park", "security-aviation-leadership-building", "blue-development", "niqat-project", "zad-engineering"];
const collection = [...projects].sort((a, b) => projectOrder.indexOf(a.slug) - projectOrder.indexOf(b.slug));
const atlasProjects = projects
  .filter((project) => project.atlasRegion)
  .map((project) => ({
    slug: project.slug,
    code: project.code,
    title: project.title,
    role: project.role,
    location: project.location,
    mapUrl: project.mapUrl,
    confidential: project.confidential,
    metrics: project.metrics,
    atlasRegion: project.atlasRegion!,
  }));

export default function ProjectsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="shell page-hero-grid">
          <p className="mono-label">Project collection / {String(projects.length).padStart(2, "0")}</p>
          <div><h1 className="page-title">Explore the work.</h1><p className="page-lead">Choose a project to discover its story, my contribution, photographs, drawings, and available 3D models.</p><Link className="button button-solid projects-review-link" href="/quick-review">Watch portfolio film <Timer size={16} /></Link></div>
        </div>
      </section>

      <section className="section-space section-rule project-atlas-section" id="project-atlas">
        <div className="shell">
          <div className="section-heading align-start">
            <div><p className="mono-label">01 / Project footprint</p><h2>Across Saudi Arabia<br />and Egypt.</h2></div>
            <p className="section-note">Explore landscape and architectural work in Riyadh, Jeddah, AlUla, and Cairo. Choose a country, then a highlighted city to discover its projects.</p>
          </div>
          <ProjectAtlas projects={atlasProjects} />
        </div>
      </section>

      <section className="section-space section-rule" id="project-collection">
        <div className="shell">
          <div className="section-heading align-start project-directory-heading">
            <div><p className="mono-label">02 / Project collection</p><h2>A closer look starts here.</h2><p className="project-collection-intro">Open a project cover to explore everything inside.</p></div>
            <a className="text-link portfolio-download" href={portfolio.workSamplesPdf} download>Download selected portfolio (PDF)</a>
          </div>
          <ProjectsFilter projects={collection} />
          <Link className="model-home-link" href="/digital-practice"><span>Digital practice / SHAHER TOOLS</span><strong>Explore my custom Revit workflows.</strong><ArrowUpRight size={21} /></Link>
        </div>
      </section>
    </main>
  );
}
