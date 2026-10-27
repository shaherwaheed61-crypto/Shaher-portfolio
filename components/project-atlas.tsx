"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, ExternalLink, LockKeyhole, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { AtlasRegion, Project } from "@/data/portfolio";
import geography from "@/data/project-atlas-geography.json";

type AtlasProject = Pick<Project, "slug" | "code" | "title" | "role" | "location" | "mapUrl" | "confidential" | "metrics"> & {
  atlasRegion: AtlasRegion;
};

const regions: Array<{
  id: AtlasRegion;
  country: "saudi" | "egypt";
  label: string;
  coordinate: string;
  position: { left: string; top: string };
  description: string;
}> = [
  {
    id: "alula",
    country: "saudi",
    label: "AlUla",
    coordinate: "26.61° N / 37.92° E",
    position: { left: "25.2%", top: "37.7%" },
    description: "Landscape delivery shaped around a heritage-sensitive regional context.",
  },
  {
    id: "riyadh",
    country: "saudi",
    label: "Riyadh",
    coordinate: "24.71° N / 46.68° E",
    position: { left: "55.2%", top: "47.5%" },
    description: "Mega-project landscape, parks, public realm, and confidential architectural delivery.",
  },
  {
    id: "jeddah",
    country: "saudi",
    label: "Jeddah",
    coordinate: "21.49° N / 39.19° E",
    position: { left: "29.6%", top: "64.5%" },
    description: "Streetscape and park packages supporting large residential developments.",
  },
  {
    id: "cairo",
    country: "egypt",
    label: "Cairo",
    coordinate: "30.04° N / 31.24° E",
    position: { left: geography.egypt.cairo.left, top: geography.egypt.cairo.top },
    description: "Architectural work with the Niqat team, with interactive models and dedicated project case studies.",
  },
];

// Natural Earth 1:110m Saudi Arabia outline, projected to this fixed 900 × 650 viewBox.
const saudiOutline = "M649 325 L650 333 L662 367 L755 385 L761 377 L775 401 L754 470 L662 503 L573 517 L544 532 L522 568 L507 573 L499 562 L488 564 L458 560 L452 557 L416 558 L408 561 L395 552 L387 568 L390 583 L377 594 L373 579 L363 569 L361 555 L345 543 L329 515 L320 487 L299 464 L285 458 L264 426 L261 402 L262 382 L244 344 L230 331 L213 324 L203 304 L205 297 L196 279 L187 271 L175 246 L156 219 L140 195 L125 196 L130 177 L131 165 L135 151 L169 157 L183 146 L190 134 L214 129 L219 118 L229 112 L198 78 L260 61 L266 56 L303 65 L349 89 L436 157 L494 160 L521 163 L529 180 L551 179 L563 208 L578 216 L584 228 L605 242 L606 256 L603 267 L607 279 L616 288 L620 300 L625 308 L634 315 L643 312 L649 325 Z";

const countries = [
  { id: "saudi", label: "Saudi Arabia", defaultRegion: "riyadh", outline: saudiOutline, labelPosition: { x: 500, y: 434 } },
  { id: "egypt", label: "Egypt", defaultRegion: "cairo", outline: geography.egypt.path, labelPosition: { x: 425, y: 422 } },
] as const;

export function ProjectAtlas({ projects }: { projects: AtlasProject[] }) {
  const [selectedRegion, setSelectedRegion] = useState<AtlasRegion>("riyadh");
  const country = countries.find((item) => item.id === regions.find((region) => region.id === selectedRegion)?.country) ?? countries[0];
  const visibleRegions = regions.filter((region) => region.country === country.id);
  const regionProjects = (region: AtlasRegion) => projects.filter((project) => project.atlasRegion === region);

  return (
    <Tabs value={selectedRegion} onValueChange={(value) => setSelectedRegion(value as AtlasRegion)} className="project-atlas">
      <div className="atlas-country-switch" role="group" aria-label="Select a country">
        {countries.map((item) => {
          const count = projects.filter((project) => regions.some((region) => region.country === item.id && region.id === project.atlasRegion)).length;
          return <button key={item.id} type="button" aria-pressed={country.id === item.id} aria-label={`${item.label}, ${count} projects`} onClick={() => setSelectedRegion(item.defaultRegion)}>
            <span>{item.label}</span><small>{count} projects</small>
          </button>;
        })}
      </div>
      <div className="project-atlas-layout">
        <section className="atlas-field" aria-label={`${country.label} project regions map`}>
          <div className="atlas-field-heading">
            <span className="mono-label">{country.label} / Project footprint</span>
            <p>Choose a highlighted city to explore its projects.</p>
          </div>
          <div className="atlas-map-frame">
            <svg className="atlas-country-map" viewBox="0 0 900 650" role="img" aria-label={`${country.label} country outline with highlighted project cities`}>
              <defs>
                <linearGradient id="atlas-country-fill" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#262a27" /><stop offset="1" stopColor="#131716" /></linearGradient>
              </defs>
              <path className="atlas-country-shadow" d={country.outline} />
              <path className="atlas-country" d={country.outline} />
              <text className="atlas-country-name" x={country.labelPosition.x} y={country.labelPosition.y} textAnchor="middle">{country.label.toUpperCase()}</text>
            </svg>
            <TabsList className="atlas-city-pins" aria-label="Select a project city">
              {visibleRegions.map((region) => {
                const count = regionProjects(region.id).length;
                return (
                  <TabsTrigger key={region.id} value={region.id} className="atlas-city-pin" style={region.position} aria-label={`${region.label}, ${count} public case ${count === 1 ? "study" : "studies"}`}>
                    <span className="atlas-pin-dot" aria-hidden="true" />
                    <span className="atlas-pin-label"><strong>{region.label}</strong><small>{count} {count === 1 ? "project" : "projects"}</small></span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>
          <div className="atlas-map-legend"><span><i aria-hidden="true" /> {visibleRegions.length} project {visibleRegions.length === 1 ? "city" : "cities"}</span><span>Country overview</span></div>
          <p className="atlas-disclaimer">City markers are regional references. Project Location links open available Google Maps references.</p>
        </section>

        <section className="atlas-details" aria-live="polite">
          {regions.map((region) => (
            <TabsContent key={region.id} value={region.id} className="atlas-region-content">
              <header className="atlas-region-heading">
                <div>
                  <p className="mono-label">{region.coordinate}</p>
                  <h3>{region.label} delivery hub</h3>
                </div>
                <span>{String(regionProjects(region.id).length).padStart(2, "0")}</span>
                <p>{region.description}</p>
              </header>

              <div className="atlas-project-list">
                {regionProjects(region.id).map((project) => (
                  <article className="atlas-project" key={project.slug}>
                    <Link className="atlas-project-open" href={`/projects/${project.slug}`} aria-label={`Open full project details for ${project.title}`}>
                      <div className="atlas-project-code"><span>{project.code}</span></div>
                      <div className="atlas-project-copy">
                        <p>{project.role}</p>
                        <h4>{project.title}</h4>
                        <span>{project.metrics?.[0] ? `${project.metrics[0].value} · ${project.metrics[0].label}` : project.location}</span>
                      </div>
                      <ArrowUpRight className="atlas-project-arrow" size={18} aria-hidden="true" />
                    </Link>
                    <div className="atlas-project-actions">
                      {project.mapUrl ? (
                        <a href={project.mapUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} location in a new tab`}>
                          Location <ExternalLink size={14} />
                        </a>
                      ) : project.confidential ? (
                        <span><LockKeyhole size={14} /> City-level only</span>
                      ) : (
                        <span><MapPin size={14} /> {project.location}</span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </TabsContent>
          ))}
        </section>
      </div>
    </Tabs>
  );
}
