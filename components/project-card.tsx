import Link from "next/link";
import type { Project } from "@/data/portfolio";

export function ProjectCard({ project, index, featured = false }: { project: Project; index: number; featured?: boolean }) {
  return (
    <Link className={`project-card ${featured ? "" : "compact"}`} href={`/projects/${project.slug}`}>
      {project.image ? (
        <img className="project-card-image" src={project.image} alt={`${project.title} project preview`} loading={index > 2 ? "lazy" : "eager"} />
      ) : (
        <div className="project-card-art"><span>{project.code}</span></div>
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
