import Link from "next/link";
import type { Project } from "@/data/portfolio";

export function ProjectCard({ project, index, featured = false }: { project: Project; index: number; featured?: boolean }) {
  return (
    <Link className={`project-card ${featured ? "" : "compact"}`} href={`/projects/${project.slug}`}>
      {project.image ? (
        <img className="project-card-image" src={project.image} alt={`${project.title} project preview`} loading={index > 2 ? "lazy" : "eager"} fetchPriority={index === 1 ? "high" : "auto"} decoding="async" />
      ) : (
        <div className={`project-card-art ${project.confidential ? "confidential-card-art" : ""}`}>
          <span>{project.code}</span>
          {project.confidential && (
            <ol className="confidential-card-flow" aria-hidden="true">
              <li><small>01</small><strong>Approved inputs</strong></li>
              <li><small>02</small><strong>Revit documentation</strong></li>
              <li><small>03</small><strong>Technical packages</strong></li>
            </ol>
          )}
        </div>
      )}
      <div className="project-card-shade" />
      <div className="project-card-top">
        <span className="project-card-index">{String(index).padStart(2, "0")}</span>
        <span className="project-card-category">{project.confidential ? "Confidential / Selected scope" : project.categories.slice(0, 2).join(" / ")}</span>
      </div>
      <div className="project-card-content">
        <p>{project.company}</p>
        <h3>{project.title}</h3>
        <span>{project.location}</span>
      </div>
    </Link>
  );
}
