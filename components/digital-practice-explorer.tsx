"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type WorkflowModule = {
  id: string;
  code: string;
  title: string;
  status: string;
  purpose: string;
  inputs: string[];
  operations: string[];
  outputs: string[];
};

export function DigitalPracticeExplorer({ modules }: { modules: WorkflowModule[] }) {
  return (
    <Tabs defaultValue={modules[0]?.id} orientation="vertical" className="digital-explorer">
      <TabsList className="digital-explorer-nav" aria-label="Select a SHAHER TOOLS module">
        {modules.map((module, index) => (
          <TabsTrigger key={module.id} value={module.id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div><strong>{module.title}</strong><small>{module.status}</small></div>
            <em>{module.code}</em>
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="digital-explorer-stage">
        {modules.map((module) => (
          <TabsContent key={module.id} value={module.id} className="digital-module">
            <header className="digital-module-heading">
              <div>
                <p className="mono-label">{module.code} / Selected workflow</p>
                <h2>{module.title}</h2>
              </div>
              <span>{module.status}</span>
              <p>{module.purpose}</p>
            </header>

            <div className="digital-workflow-grid">
              <section>
                <p className="mono-label">Inputs</p>
                <ul>{module.inputs.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
              <section className="digital-logic">
                <p className="mono-label">Workflow logic</p>
                <ol>
                  {module.operations.map((item, index) => (
                    <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < module.operations.length - 1 && <ArrowRight aria-hidden="true" />}</li>
                  ))}
                </ol>
              </section>
              <section>
                <p className="mono-label">Outputs</p>
                <ul>{module.outputs.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            </div>

            <footer className="digital-module-note">
              <ShieldCheck size={17} />
              <p>Workflow logic only. No client model, project drawing, restricted data, or unverified performance claim is included.</p>
            </footer>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
