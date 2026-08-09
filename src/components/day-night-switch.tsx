"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

export function DayNightSwitch({
  day,
  night,
  alt,
  aspectClassName = "aspect-[4/5] sm:aspect-[3/4]",
  cordClassName = "right-8"
}: {
  day: string;
  night: string;
  alt: string;
  aspectClassName?: string;
  cordClassName?: string;
}) {
  const [isNight, setIsNight] = useState(false);
  const reduce = useReducedMotion();

  function pull() {
    setIsNight((v) => !v);
  }

  return (
    <div className={`relative w-full overflow-hidden rounded-[20px] border border-line ${aspectClassName}`}>
      <Image src={day} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: isNight ? 1 : 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image src={night} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(194,99,47,0.25),transparent_60%)]"
          animate={{ opacity: isNight ? 1 : 0 }}
          transition={{ duration: 1.1, delay: 0.15 }}
        />
      </motion.div>

      <span className="label absolute left-4 top-4 z-10 rounded-full bg-bg-elevated/80 px-3 py-1.5 backdrop-blur-md">
        Pull the cord {isNight ? "(night)" : "(day)"}
      </span>

      <div className={`absolute top-0 z-10 flex justify-center ${cordClassName}`}>
        <div className="h-6 w-px bg-ink/40" />
      </div>
      <motion.button
        type="button"
        aria-label="Toggle day and night view"
        onClick={pull}
        drag={reduce ? false : "y"}
        dragConstraints={{ top: 0, bottom: 56 }}
        dragElastic={0.15}
        onDragEnd={(_, info) => {
          if (info.offset.y > 30) pull();
        }}
        whileTap={{ scale: 0.95 }}
        className={`absolute top-6 z-10 flex h-9 w-9 -translate-x-1/2 cursor-grab items-center justify-center rounded-full border border-line-strong bg-bg-elevated/90 text-accent shadow-[0_10px_30px_rgba(10,8,5,0.5)] backdrop-blur-md active:cursor-grabbing ${cordClassName}`}
      >
        <span className="h-2 w-2 rounded-full bg-accent" />
      </motion.button>
    </div>
  );
}
