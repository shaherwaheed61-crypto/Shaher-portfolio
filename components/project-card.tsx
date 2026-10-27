import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/portfolio";

const imageLabels = { site: "Site photography", drawing: "Drawing preview", visualization: "Design visualization", model: "3D model preview" };

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link className="project-cover-card" id={project.interactiveModel ? `${project.slug}-interactive-model` : undefined} href={`/projects/${project.slug}`} aria-label={`Explore ${project.title}`}>
      <div className={`project-cover-media ${project.imageKind === "drawing" ? "project-cover-media--drawing" : ""} ${project.imageKind === "model" ? "project-cover-media--model" : ""}`}>
        {project.image ? (
          <img src={project.image} alt={`${project.title} — ${project.imageKind ? imageLabels[project.imageKind] : "project cover"}`} loading={index > 2 ? "lazy" : "eager"} decoding="async" />
        ) : (
          <div className="project-cover-placeholder" aria-hidden="true"><span>{project.code}</span><div>{project.deliverables.slice(0, 3).map((item) => <small key={item}>{item}</small>)}</div></div>
        )}
        <span className="project-cover-kind">{project.imageKind ? imageLabels[project.imageKind] : project.confidential ? "Confidential scope" : "Project overview"}</span>
        <span className="project-cover-open" aria-hidden="true"><ArrowUpRight size={22} /></span>
      </div>
      <div className="project-cover-copy">
        <div className="project-cover-meta"><span>{String(index).padStart(2, "0")} / {project.categories.slice(0, 2).join(" · ")}</span><span>{project.location}</span></div>
        <h3>{project.title}</h3>
        <p>{project.role}</p>
        <span className="project-cover-link">Explore project <ArrowUpRight size={15} aria-hidden="true" /></span>
      </div>
    </Link>
  );
}
