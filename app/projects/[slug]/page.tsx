import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ProjectMediaGallery } from "@/components/project-media-gallery";
import { getNextProject, getProject, getProjectCollection, getProjectMediaCollections, getTechnicalProofStudies, projects } from "@/data/portfolio";

const confidentialWorkflow = [
  "Architectural redesign",
  "LOD 300 architectural IFC package",
  "Architectural shop drawings",
  "BIM coordination & technical review",
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
  const collection = getProjectCollection(slug);
  const technicalProofStudies = getTechnicalProofStudies(project);
  const mediaCollections = getProjectMediaCollections(project);

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
              {collection && <div><span>Collection</span><strong>{collection.title}</strong></div>}
              {project.client && <div><span>Owner</span><strong>{project.client}</strong></div>}
              {project.consultant && <div><span>Consultant</span><strong>{project.consultant}</strong></div>}
              <div><span>{project.companyLabel ?? "Contractor"}</span><strong>{project.company}</strong></div>
              {project.officialUrl && <div><span>Source</span><a href={project.officialUrl} target="_blank" rel="noreferrer">Official project page <ArrowUpRight size={13} /></a></div>}
              <div><span>Role</span><strong>{project.role}</strong></div>
              <div><span>Location</span><strong>{project.location}</strong></div>
              {project.mapUrl && <div><span>Project location</span><a href={project.mapUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on Google Maps`}>View on Google Maps <ArrowUpRight size={13} /></a></div>}
              <div><span>Period</span><strong>{project.period}</strong></div>
              {project.duration && <div><span>Duration</span><strong>{project.duration}</strong></div>}
            </aside>
          </div>
        </div>
      </section>

      <nav className="project-content-index section-rule" aria-label={`${project.title} page sections`}>
        <div className="shell project-content-index-inner">
          <span className="mono-label">Explore this project</span>
          <a href="#project-details">Project details <ArrowUpRight size={14} /></a>
          {project.technicalStrengths?.length && <a href="#technical-strengths">My contribution <ArrowUpRight size={14} /></a>}
          {mediaCollections.map((collection) => <a key={collection.id} href={`#${collection.id}`}>{collection.title} ({collection.images.length}) <ArrowUpRight size={14} /></a>)}
          {project.gallery.length === 0 && <span className="project-content-index-note">{project.confidential ? "Restricted project material is not published" : "Public images and drawings are not available yet"}</span>}
        </div>
      </nav>

      {project.metrics && project.metrics.length > 0 && <section className="project-metrics section-rule" aria-label="Project scale"><div className="shell project-metrics-grid">{project.metrics.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div></section>}

      {mediaCollections.length > 0 && (
        <section className="section-space section-rule" id="project-gallery" aria-labelledby="project-gallery-title">
          <div className="shell">
            <div className="section-heading align-start">
              <div><p className="mono-label">Inside the project</p><h2 id="project-gallery-title">Explore the project gallery.</h2></div>
              <p className="section-note">Choose a category to view the available project material. Open any image to inspect it at full size.</p>
            </div>
            <ProjectMediaGallery projectTitle={project.title} projectSlug={project.slug} projectRole={project.role} collections={mediaCollections} studies={technicalProofStudies} modelSrc={project.modelSrc} projectLocation={project.location} />
            {project.galleryNote && <p className="gallery-note">{project.galleryNote}</p>}
          </div>
        </section>
      )}

      {project.technicalStrengths && project.technicalStrengths.length > 0 && (
        <section className="section-space section-rule technical-strengths-section" id="technical-strengths" aria-labelledby="technical-strengths-title">
          <div className="shell">
            <div className="section-heading align-start">
              <div><p className="mono-label">My contribution / Across the project</p><h2 id="technical-strengths-title">Engineering thinking.<br /><em>Buildable landscape.</em></h2></div>
              <p className="section-note">Five strengths behind my landscape technical-office contribution at King Abdullah International Gardens.</p>
            </div>
            <ol className="technical-strengths-grid">{project.technicalStrengths.map((strength, index) => (
              <li className="technical-strength-card" key={strength.title}>
                <span className="technical-strength-number">{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{strength.title}</h3><p>{strength.description}</p></div>
              </li>
            ))}</ol>
          </div>
        </section>
      )}

      <section className="section-space section-rule" id="project-details">
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
                    <h3 id="confidential-workflow-title">From redesign to coordinated documentation.</h3>
                  </div>
                  <p>Architectural redesign, LOD 300 IFC documentation, shop drawings, and BIM coordination.</p>
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



      <section className="section-space section-rule"><div className="shell next-project"><p className="mono-label">Next project</p><h2>{nextProject.title}</h2><Link className="button button-ghost" href={`/projects/${nextProject.slug}`}>View project <ArrowUpRight size={16} /></Link></div></section>
    </main>
  );
}
