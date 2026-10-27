"use client";

import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type CapabilityEvidenceItem = {
  title: string;
  description: string;
  tools: string[];
  evidence: Array<{
    statement: string;
    project: {
      slug: string;
      code: string;
      title: string;
      role: string;
      confidential?: boolean;
    };
  }>;
};

export function CapabilityEvidence({ capabilities }: { capabilities: CapabilityEvidenceItem[] }) {
  return (
    <Tabs defaultValue="capability-1" orientation="vertical" className="capability-evidence-browser">
      <TabsList className="capability-evidence-nav" aria-label="Select a capability">
        {capabilities.map((capability, index) => (
          <TabsTrigger key={capability.title} value={`capability-${index + 1}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{capability.title}</strong>
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="capability-evidence-stage">
        {capabilities.map((capability, index) => (
          <TabsContent key={capability.title} value={`capability-${index + 1}`} className="capability-evidence-content">
            <header>
              <p className="mono-label">Evidence, not keywords</p>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
              <div className="capability-evidence-tools" aria-label="Primary tools">
                {capability.tools.map((tool) => <span key={tool}>{tool}</span>)}
              </div>
            </header>

            <div className="capability-evidence-projects">
              {capability.evidence.map(({ project, statement }) => (
                <article key={project.slug}>
                  <div className="capability-evidence-project-heading">
                    <span>{project.code}</span>
                    {project.confidential && <small><ShieldCheck size={13} /> Confidential scope protected</small>}
                  </div>
                  <h4>{project.title}</h4>
                  <strong>{project.role}</strong>
                  <p>{statement}</p>
                  <Link href={`/projects/${project.slug}`}>Review evidence <ArrowUpRight size={14} /></Link>
                </article>
              ))}
            </div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
