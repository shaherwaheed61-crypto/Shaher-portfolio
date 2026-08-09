"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

const MotionLink = motion.create(Link);
const MotionButton = motion.create("button");

type Common = {
  className?: string;
  children: ReactNode;
};

type AsLink = Common & { href: string; onClick?: () => void };
type AsButton = Common & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function MagneticButton(props: AsLink | AsButton) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  function handleMove(e: React.PointerEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.25);
    y.set(relY * 0.35);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const style = reduce ? undefined : { x: springX, y: springY };

  if ("href" in props && props.href) {
    const { href, onClick, className, children } = props;
    return (
      <MotionLink
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={style}
        className={className}
      >
        {children}
      </MotionLink>
    );
  }

  const { className, children, onClick, type, disabled } = props as AsButton;
  return (
    <MotionButton
      ref={ref as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      type={type}
      disabled={disabled}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={style}
      className={className}
    >
      {children}
    </MotionButton>
  );
}
