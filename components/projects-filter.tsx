"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/data/portfolio";

const filters = ["All", "Landscape", "Architecture", "Shop Drawings", "BIM", "Visualization"];

export function ProjectsFilter({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesFilter = filter === "All" || project.categories.includes(filter);
      const searchable = `${project.title} ${project.company} ${project.location} ${project.categories.join(" ")}`.toLowerCase();
      return matchesFilter && (!normalized || searchable.includes(normalized));
    });
  }, [filter, query, projects]);

  return (
    <>
      <div className="projects-toolbar">
        <div className="filter-row" aria-label="Filter projects">
          {filters.map((item) => <button key={item} className={`filter-button ${filter === item ? "active" : ""}`} type="button" onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        <label className="search-field">
          <Search size={16} />
          <span className="sr-only">Search projects</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects" />
        </label>
      </div>
      <div className="project-directory">
        {visible.length ? visible.map((project, index) => <ProjectCard key={project.slug} project={project} index={index + 1} />) : <p className="empty-state">No projects match this filter.</p>}
      </div>
    </>
  );
}
