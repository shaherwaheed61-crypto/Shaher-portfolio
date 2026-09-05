import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getNextProject, getProject, projects } from "@/data/portfolio";

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const nextProject = getNextProject(slug);

  return (
    <main>
      <section className="project-hero">
        {project.image ? <img className="project-hero-image" src={project.image} alt={`${project.title} project hero`} /> : <div className="project-art"><strong>{project.code}</strong></div>}
        <div className="shell project-hero-content">
          <Link className="back-link" href="/projects"><ArrowLeft size={14} /> Project index</Link>
          <h1>{project.title}</h1>
          <div className="project-hero-bottom">
            <p className="project-hero-summary">{project.summary}</p>
            <aside className="project-fact-card" aria-label="Project facts">
              <div><span>Employer</span><strong>{project.company}</strong></div>
              {project.client && <div><span>Client</span><strong>{project.client}</strong></div>}
              {project.consultant && <div><span>Consultant</span><strong>{project.consultant}</strong></div>}
              {project.officialUrl && <div><span>Source</span><a href={project.officialUrl} target="_blank" rel="noreferrer">Official project page <ArrowUpRight size={13} /></a></div>}
              <div><span>Role</span><strong>{project.role}</strong></div>
              <div><span>Location</span><strong>{project.location}</strong></div>
              <div><span>Period</span><strong>{project.period}</strong></div>
            </aside>
          </div>
        </div>
      </section>

      {project.metrics && project.metrics.length > 0 && <section className="project-metrics section-rule" aria-label="Project scale"><div className="shell project-metrics-grid">{project.metrics.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div></section>}

      <section className="section-space section-rule"><div className="shell project-narrative"><p className="mono-label">Role / Contribution</p><div>{project.confidentialNote && <p className="confidential-note">{project.confidentialNote}</p>}{project.roleSummary && <div className="role-focus"><span>My role</span><strong>{project.role}</strong><p>{project.roleSummary}</p></div>}<div className="project-copy-grid"><div><h2>From design intent to construction-ready delivery.</h2><p>{project.overview}</p></div><ul className="bullet-list">{project.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="project-deliverables"><h3>Deliverables</h3><div className="tag-row">{project.deliverables.map((item) => <span key={item}>{item}</span>)}</div><h3 style={{ marginTop: 34 }}>Tools</h3><div className="tag-row">{project.tools.map((item) => <span key={item}>{item}</span>)}</div></div></div></div></section>

      {project.gallery.length > 0 && <section className="section-space section-rule"><div className="shell"><div className="section-heading"><div><p className="mono-label">Project gallery / {String(project.gallery.length).padStart(2, "0")}</p><h2>Selected project views.</h2></div></div><div className="gallery">{project.gallery.map((image, index) => <figure key={image.src}><img src={image.src} alt={image.alt} loading={index > 1 ? "lazy" : "eager"} /><figcaption><span>{image.caption}</span><span>{String(index + 1).padStart(2, "0")}</span></figcaption></figure>)}</div></div></section>}

      <section className="section-space section-rule"><div className="shell next-project"><p className="mono-label">Next project</p><h2>{nextProject.title}</h2><Link className="button button-ghost" href={`/projects/${nextProject.slug}`}>View project <ArrowUpRight size={16} /></Link></div></section>
    </main>
  );
}
