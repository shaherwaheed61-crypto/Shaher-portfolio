"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/data/portfolio";
import { getProjectCollection, projectCollections } from "@/data/portfolio";

const filters = ["All", "Landscape", "Architecture", "Shop Drawings", "Technical Office", "BIM", "Visualization"];

export function ProjectsFilter({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesFilter = filter === "All" || project.categories.includes(filter);
      const collection = getProjectCollection(project.slug);
      const searchable = `${project.title} ${project.company} ${project.location} ${project.role} ${project.categories.join(" ")} ${collection?.title ?? ""}`.toLowerCase();
      return matchesFilter && (!normalized || searchable.includes(normalized));
    });
  }, [filter, query, projects]);

  return (
    <>
      <div className="projects-toolbar">
        <div className="filter-row" aria-label="Filter projects">
          {filters.map((item) => <button key={item} className={`filter-button ${filter === item ? "active" : ""}`} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        <label className="search-field">
          <Search size={16} />
          <span className="sr-only">Search projects</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects" />
        </label>
      </div>
      <div className="project-collections">
        {visible.length ? projectCollections.map((collection, groupIndex) => {
          const members = visible.filter((project) => collection.projectSlugs.includes(project.slug));
          if (!members.length) return null;
          return <section className="project-collection-group" key={collection.id} aria-labelledby={`collection-${collection.id}`}>
            <header className="project-collection-heading"><span className="mono-label">{String(groupIndex + 1).padStart(2, "0")} / Collection</span><div><h3 id={`collection-${collection.id}`}>{collection.title}</h3><p>{collection.context}</p></div></header>
            <div className="project-directory">{members.map((project) => <ProjectCard key={project.slug} project={project} index={projects.findIndex((item) => item.slug === project.slug) + 1} />)}</div>
          </section>;
        }) : <p className="empty-state">No projects match this filter.</p>}
      </div>
    </>
  );
}
