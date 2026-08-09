"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/data/profile";
import { services } from "@/data/services";

type Status = "idle" | "error" | "sent";

export function ServiceRequestForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const service = String(form.get("service") ?? "").trim();
    const timeline = String(form.get("timeline") ?? "").trim();
    const brief = String(form.get("brief") ?? "").trim();

    if (!name || !email || !service || !brief) {
      setError("Please fill in your name, email, service, and a short brief.");
      setStatus("error");
      return;
    }

    const subject = encodeURIComponent(`Service request: ${service}`);
    const bodyLines = [
      `Service: ${service}`,
      timeline ? `Timeline: ${timeline}` : null,
      "",
      brief,
      "",
      `${name}`,
      `${email}`
    ].filter((line) => line !== null);
    const body = encodeURIComponent(bodyLines.join("\n"));
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setError(null);
    setStatus("sent");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="rounded-[10px] border border-line-strong bg-bg-elevated px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
            placeholder="Your name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="rounded-[10px] border border-line-strong bg-bg-elevated px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="service" className="label">
            Service
          </label>
          <select
            id="service"
            name="service"
            defaultValue=""
            className="rounded-[10px] border border-line-strong bg-bg-elevated px-4 py-3 text-sm text-ink focus:border-accent focus:outline-none"
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((service) => (
              <option key={service.title} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="timeline" className="label">
            Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            defaultValue=""
            className="rounded-[10px] border border-line-strong bg-bg-elevated px-4 py-3 text-sm text-ink focus:border-accent focus:outline-none"
          >
            <option value="">No fixed timeline</option>
            <option value="Under 2 weeks">Under 2 weeks</option>
            <option value="2-4 weeks">2-4 weeks</option>
            <option value="1-3 months">1-3 months</option>
            <option value="Ongoing">Ongoing</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="brief" className="label">
          Project brief
        </label>
        <textarea
          id="brief"
          name="brief"
          rows={5}
          className="rounded-[10px] border border-line-strong bg-bg-elevated px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
          placeholder="Scope, location, drawing stage, deliverables..."
        />
      </div>

      {status === "error" && error && <p className="text-sm text-accent">{error}</p>}
      {status === "sent" && (
        <p className="text-sm text-ink-dim">
          Opening your email client to send this request to {profile.email}.
        </p>
      )}

      <button
        type="submit"
        className="w-fit rounded-full bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.08em] text-bg transition-transform hover:-translate-y-[1px]"
      >
        Send Request
      </button>
    </form>
  );
}
