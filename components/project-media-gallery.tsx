"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import { Maximize2, ArrowUpRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DayNightShowcase } from "@/components/day-night-showcase";
import { TechnicalProofViewer } from "@/components/technical-proof-viewer";
import type { ProjectImage, ProjectMediaCollection, TechnicalProofStudy } from "@/data/portfolio";

const ModelViewer = lazy(() => import("@/components/niqat-model-viewer").then((module) => ({ default: module.NiqatModelViewer })));

type Props = {
  projectTitle: string;
  projectSlug: string;
  collections: ProjectMediaCollection[];
  studies: TechnicalProofStudy[];
  projectRole: string;
  modelSrc?: string;
  projectLocation: string;
};

function groupImages(images: ProjectImage[], fallback: string) {
  return images.reduce<{ title: string; images: ProjectImage[] }[]>((groups, image) => {
    const title = image.group ?? fallback;
    const group = groups.find((candidate) => candidate.title === title);
    if (group) group.images.push(image);
    else groups.push({ title, images: [image] });
    return groups;
  }, []);
}

export function ProjectMediaGallery({ projectTitle, projectSlug, collections, studies, projectRole, modelSrc, projectLocation }: Props) {
  const [active, setActive] = useState(collections[0]?.id ?? "site-photos");

  useEffect(() => {
    const selectFromHash = () => {
      const hash = window.location.hash.slice(1);
      const requested = hash === "technical-proof" ? "drawings" : hash;
      const target = collections.find((collection) => collection.id === requested);
      if (target) setActive(target.id);
    };
    setActive(collections[0]?.id ?? "site-photos");
    selectFromHash();
    window.addEventListener("hashchange", selectFromHash);
    return () => window.removeEventListener("hashchange", selectFromHash);
  }, [collections, projectSlug]);

  if (collections.length === 0) return null;

  return (
    <div className="project-media-gallery">
      {collections.map((collection) => <span className="project-media-anchor" id={collection.id} aria-hidden="true" key={collection.id} />)}
      {studies.length > 0 && <span className="project-media-anchor" id="technical-proof" aria-hidden="true" />}
      <Tabs value={collections.some((collection) => collection.id === active) ? active : collections[0].id} onValueChange={(value) => {
        setActive(value as ProjectMediaCollection["id"]);
        window.history.replaceState(null, "", `#${value}`);
      }} className="project-media-tabs">
        <TabsList variant="line" className="project-media-tab-list" aria-label={`${projectTitle} media categories`}>
          {collections.map((collection) => (
            <TabsTrigger value={collection.id} key={collection.id}>{collection.title}<span>{collection.images.length}</span></TabsTrigger>
          ))}
        </TabsList>
        {collections.map((collection) => {
          const groups = groupImages(collection.images, collection.title);
          return (
            <TabsContent value={collection.id} className="project-media-panel" key={collection.id}>
              <div className="project-media-panel-heading"><h3>{collection.title}</h3><p>{collection.description}</p></div>
              {collection.kind === "model" && modelSrc && (
                <div className="project-model-gallery">
                  <Suspense fallback={<p className="model-loading">Loading the interactive model…</p>}><ModelViewer modelSrc={modelSrc} projectTitle={projectTitle} projectLocation={projectLocation} /></Suspense>
                  <p>Drag to rotate · Scroll to zoom · Right drag to pan</p>
                </div>
              )}
              <div className="gallery-groups">
                {groups.map((group) => (
                  <div className="gallery-group" key={group.title}>
                    {groups.length > 1 && <div className="gallery-group-heading"><h4>{group.title}</h4><span>{group.images.length} views</span></div>}
                    <div className={`gallery ${collection.kind === "drawing" ? "gallery--drawings" : ""} ${collection.kind === "model" ? "gallery--model" : ""}`}>
                      {group.images.map((image, index) => (
                        <figure key={image.src}>
                          <a className="gallery-image-link" href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`Open ${image.caption} at full size`}>
                            <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
                            <span className="gallery-open"><Maximize2 size={13} /> Open image</span>
                          </a>
                          <figcaption><span>{image.caption}</span><span>{String(index + 1).padStart(2, "0")}</span></figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {collection.kind === "drawing" && studies.length > 0 && (
                <details className="project-drawing-studies">
                  <summary>Explore coordinated drawing studies <ArrowUpRight size={17} aria-hidden="true" /></summary>
                  <TechnicalProofViewer projectTitle={projectTitle} projectRole={projectRole} projectHref={`/projects/${projectSlug}`} studies={studies} />
                </details>
              )}
              {collection.kind === "visualization" && projectSlug === "zad-engineering" && <DayNightShowcase />}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
