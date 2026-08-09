"use client";

/* eslint-disable react-hooks/static-components --
   Velite compiles MDX to a function body at build time; turning that compiled code into a component
   at render time is the documented Velite pattern and isn't compatible with the React Compiler's
   static-component heuristics. Safe here: `code` only changes across static builds, never at runtime. */

import * as runtime from "react/jsx-runtime";
import { useMemo } from "react";

function compileMdx(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

export function MDXContent({ code }: { code: string }) {
  const Component = useMemo(() => compileMdx(code), [code]);
  return (
    <div className="prose-project max-w-[65ch] text-sm leading-relaxed text-ink-dim [&_p]:mt-4 first:[&_p]:mt-0">
      <Component />
    </div>
  );
}
