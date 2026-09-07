import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Maximize2 } from "lucide-react";
import { getNextProject, getProject, projects } from "@/data/portfolio";

const confidentialWorkflow = [
  "Approved design inputs",
  "Architectural Revit model",
  "Working & shop drawings",
  "Details, quantities & submittals",
  "Review & issue resolution",
];

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
  const galleryGroups = project.gallery.reduce<{ title: string; images: typeof project.gallery }[]>((groups, image) => {
    const title = image.group ?? "Selected views";
    const existing = groups.find((group) => group.title === title);
    if (existing) existing.images.push(image);
    else groups.push({ title, images: [image] });
    return groups;
  }, []);
  const drawingEvidenceGroups = ["Landscape shop drawing plans", "Sections & construction details"];
  const includesDrawingEvidence = galleryGroups.some((group) => drawingEvidenceGroups.includes(group.title));

  return (
    <main>
      <section className="project-hero">
        {project.image ? <img className="project-hero-image" src={project.image} alt={`${project.title} project hero`} loading="eager" fetchPriority="high" decoding="async" /> : <div className="project-art"><strong>{project.code}</strong></div>}
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

      <section className="section-space section-rule">
        <div className="shell project-narrative">
          <p className="mono-label">Case study / Evidence</p>
          <div>
            {project.confidentialNote && <p className="confidential-note">{project.confidentialNote}</p>}
            {project.roleSummary && <div className="role-focus"><span>My role</span><strong>{project.role}</strong><p>{project.roleSummary}</p></div>}
            <div className="project-copy-grid">
              <div>
                <p className="mono-label project-copy-label">Project context</p>
                <h2>{project.caseStudyHeading}</h2>
                <p>{project.overview}</p>
              </div>
              <div>
                <p className="mono-label project-copy-label">Contribution highlights</p>
                <ul className="bullet-list">{project.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </div>

            {project.confidential && (
              <section className="confidential-workflow" aria-labelledby="confidential-workflow-title">
                <div className="confidential-workflow-heading">
                  <div>
                    <p className="mono-label">Public workflow</p>
                    <h3 id="confidential-workflow-title">A safe view of the delivery process.</h3>
                  </div>
                  <p>{project.gallery.length > 0 ? "Only the approved exterior visualization is shown. No drawings, model files, room data, technical quantities, or restricted information are published." : "No project drawings, model files, room data, technical quantities, or restricted information are published."}</p>
                </div>
                <ol className="confidential-workflow-grid">
                  {confidentialWorkflow.map((step, index) => (
                    <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></li>
                  ))}
                </ol>
              </section>
            )}

            <div className="project-deliverables"><h3>Deliverables</h3><div className="tag-row">{project.deliverables.map((item) => <span key={item}>{item}</span>)}</div><h3 style={{ marginTop: 34 }}>Tools</h3><div className="tag-row">{project.tools.map((item) => <span key={item}>{item}</span>)}</div></div>
          </div>
        </div>
      </section>

      {project.gallery.length > 0 && <section className="section-space section-rule"><div className="shell"><div className="section-heading"><div><p className="mono-label">Public evidence / {String(project.gallery.length).padStart(2, "0")}</p><h2>{includesDrawingEvidence ? "Built context and technical evidence." : "Selected project views."}</h2>{project.galleryNote && <p className="gallery-note">{project.galleryNote}</p>}</div></div><div className="gallery-groups">{galleryGroups.map((group, groupIndex) => <section className="gallery-group" key={group.title} aria-labelledby={`gallery-group-${groupIndex}`}>
        {galleryGroups.length > 1 && <div className="gallery-group-heading"><span className="mono-label">{String(groupIndex + 1).padStart(2, "0")}</span><h3 id={`gallery-group-${groupIndex}`}>{group.title}</h3><span>{String(group.images.length).padStart(2, "0")} views</span></div>}
        <div className={`gallery ${drawingEvidenceGroups.includes(group.title) ? "gallery--drawings" : ""}`}>{group.images.map((image, index) => <figure key={image.src}><a className="gallery-image-link" href={image.src} target="_blank" rel="noreferrer" aria-label={`Open ${image.caption} at full size`}><img src={image.src} alt={image.alt} loading={groupIndex === 0 && index < 2 ? "eager" : "lazy"} decoding="async" /><span className="gallery-open"><Maximize2 size={13} /> Open image</span></a><figcaption><span>{image.caption}</span><span>{String(index + 1).padStart(2, "0")}</span></figcaption></figure>)}</div>
      </section>)}</div></div></section>}

      <section className="section-space section-rule"><div className="shell next-project"><p className="mono-label">Next project</p><h2>{nextProject.title}</h2><Link className="button button-ghost" href={`/projects/${nextProject.slug}`}>View project <ArrowUpRight size={16} /></Link></div></section>
    </main>
  );
}
