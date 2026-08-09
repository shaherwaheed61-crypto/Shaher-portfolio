"use client";

import dynamic from "next/dynamic";

const ProjectMap = dynamic(() => import("@/components/project-map").then((m) => m.ProjectMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] w-full items-center justify-center rounded-[20px] border border-line">
      <span className="label">Loading map</span>
    </div>
  )
});

export function ProjectMapLoader() {
  return <ProjectMap />;
}
