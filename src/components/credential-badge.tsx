"use client";

import Image from "next/image";
import { BadgeCheck } from "lucide-react";

export function CredentialBadge({ src, issuer }: { src: string; issuer: string }) {
  return (
    <div className="group h-24 w-24 shrink-0 [perspective:800px]">
      <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 overflow-hidden rounded-[10px] border border-line [backface-visibility:hidden]">
          <Image src={src} alt={issuer} fill sizes="96px" className="object-cover" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-[10px] border border-accent bg-bg-elevated p-1 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <BadgeCheck size={16} className="text-accent" />
          <span className="text-[9px] leading-tight text-ink-dim">{issuer}</span>
        </div>
      </div>
    </div>
  );
}
