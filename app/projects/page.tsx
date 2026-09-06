import type { Metadata } from "next";
import { ProjectsFilter } from "@/components/projects-filter";
import { portfolio, projects } from "@/data/portfolio";

export const metadata: Metadata = { title: "Projects", description: `Selected architectural, landscape, shop-drawing, BIM, and visualization projects by ${portfolio.name}.` };

export default function ProjectsPage() {
  return (
    <main>
      <section className="page-hero"><div className="shell page-hero-grid"><p className="mono-label">Project index / {String(projects.length).padStart(2, "0")}</p><div><h1 className="page-title">Selected work across architecture and landscape.</h1><p className="page-lead">Filter the project directory by discipline or search by project, company, or location.</p></div></div></section>
      <section className="section-space"><div className="shell"><ProjectsFilter projects={projects} /></div></section>
    </main>
  );
}
