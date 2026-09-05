import type { Metadata } from "next";
import { ProjectsFilter } from "@/components/projects-filter";
import { projects } from "@/data/portfolio";

export const metadata: Metadata = { title: "Projects", description: "Selected architectural, landscape, shop-drawing, BIM, and visualization projects by Shaher Waheed Roshdy." };

export default function ProjectsPage() {
  return (
    <main>
      <section className="page-hero"><div className="shell page-hero-grid"><p className="mono-label">Project index / 06</p><div><h1 className="page-title">Selected work across architecture and landscape.</h1><p className="page-lead">Filter the project directory by discipline or search by project, company, or location.</p></div></div></section>
      <section className="section-space"><div className="shell"><ProjectsFilter projects={projects} /></div></section>
    </main>
  );
}
