"use client";

import { useState } from "react";

export function DayNightShowcase() {
  const [mode, setMode] = useState<"day" | "night">("day");
  const isDay = mode === "day";

  return (
    <section className="day-night-section section-rule">
      <div className="shell day-night-grid">
        <div className="day-night-copy">
          <p className="mono-label">03 / Design study</p>
          <h2>One facade. Two atmospheres.</h2>
          <p>Day and night studies test material balance, lighting hierarchy, and the way architecture is experienced after sunset.</p>
          <div className="render-switch" aria-label="Choose facade view">
            <button className={isDay ? "active" : ""} type="button" onClick={() => setMode("day")} aria-pressed={isDay}>Day</button>
            <button className={!isDay ? "active" : ""} type="button" onClick={() => setMode("night")} aria-pressed={!isDay}>Night</button>
          </div>
        </div>
        <div className="render-frame">
          <img key={mode} src={isDay ? "/images/freelance/classic-villa-day.jpg" : "/images/freelance/classic-villa-night.jpg"} alt={`Classic villa facade — ${mode} render`} />
          <div className="render-caption"><span className="mono-label">Classic residence</span><span className="mono-label">{mode} / 01</span></div>
        </div>
      </div>
    </section>
  );
}
