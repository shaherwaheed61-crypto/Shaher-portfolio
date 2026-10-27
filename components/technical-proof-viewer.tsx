"use client";

import Link from "next/link";
import { ArrowUpRight, Layers3, Maximize2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { TechnicalProofStudy } from "@/data/portfolio";

type TechnicalProofViewerProps = {
  projectTitle: string;
  projectRole: string;
  projectHref: string;
  studies: TechnicalProofStudy[];
  placement?: "home" | "project";
};

export function TechnicalProofViewer({
  projectTitle,
  projectRole,
  projectHref,
  studies,
  placement = "project",
}: TechnicalProofViewerProps) {
  if (studies.length === 0) return null;

  return (
    <div className={`technical-proof-viewer technical-proof-viewer--${placement}`}>
      <div className="proof-viewer-topline">
        <div>
          <span className="proof-live-mark"><Layers3 size={14} /> Interactive evidence</span>
          <strong>{projectTitle}</strong>
        </div>
        <span>{projectRole}</span>
      </div>

      <Tabs defaultValue={studies[0].id} className="proof-study-tabs">
        <div className="proof-study-nav">
          <span className="mono-label">Select drawing study</span>
          <TabsList className="proof-study-list" variant="line" aria-label="Select technical drawing study">
            {studies.map((study, index) => (
              <TabsTrigger value={study.id} key={study.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {study.title.split(" — ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {studies.map((study, studyIndex) => (
          <TabsContent value={study.id} className="proof-study-content" key={study.id}>
            <div className="proof-study-heading">
              <p className="mono-label">{String(studyIndex + 1).padStart(2, "0")} / Technical sequence</p>
              <h3>{study.title}</h3>
              <p>{study.focus}</p>
            </div>

            <Tabs defaultValue={study.stages[0].id} orientation="vertical" className="proof-stage-tabs">
              <TabsList className="proof-stage-list" variant="line" aria-label={`Evidence stages for ${study.title}`}>
                {study.stages.map((stage, stageIndex) => (
                  <TabsTrigger value={stage.id} key={stage.id}>
                    <span>{String(stageIndex + 1).padStart(2, "0")}</span>
                    <strong>{stage.label}</strong>
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="proof-stage-canvas">
                {study.stages.map((stage, stageIndex) => (
                  <TabsContent value={stage.id} className="proof-stage-content" key={stage.id}>
                    <figure>
                      <a href={stage.src} target="_blank" rel="noreferrer" aria-label={`Open ${stage.caption} at full size`}>
                        <img src={stage.src} alt={stage.alt} loading={studyIndex === 0 && stageIndex === 0 ? "eager" : "lazy"} decoding="async" />
                        <span><Maximize2 size={14} /> Full-size evidence</span>
                      </a>
                      <figcaption><span>{stage.label}</span>{stage.caption}</figcaption>
                    </figure>
                  </TabsContent>
                ))}
              </div>
            </Tabs>

            <dl className="proof-evidence-grid">
              <div><dt>Technical focus</dt><dd>{study.focus}</dd></div>
              <div><dt>My contribution</dt><dd>{study.contribution}</dd></div>
              <div><dt>Documented output</dt><dd>{study.output}</dd></div>
            </dl>
          </TabsContent>
        ))}
      </Tabs>

      <div className="proof-viewer-footer">
        <p>Public portfolio excerpts only. Sheet-control data is removed; wider built context is identified separately from drawing evidence.</p>
        {placement === "home" && <Link className="text-link" href={projectHref}>Open full case study <ArrowUpRight size={15} /></Link>}
      </div>
    </div>
  );
}
