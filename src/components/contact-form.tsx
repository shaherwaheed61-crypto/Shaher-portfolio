"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/data/profile";

type Status = "idle" | "error" | "sent";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setError("Please fill in your name, email, and message.");
      setStatus("error");
      return;
    }

    const subject = encodeURIComponent(`Project inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setError(null);
    setStatus("sent");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
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

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="label">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="rounded-[10px] border border-line-strong bg-bg-elevated px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
          placeholder="Project scope, timeline, location..."
        />
      </div>

      {status === "error" && error && <p className="text-sm text-accent">{error}</p>}
      {status === "sent" && (
        <p className="text-sm text-ink-dim">
          Opening your email client to send this to {profile.email}.
        </p>
      )}

      <button
        type="submit"
        className="w-fit rounded-full bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.08em] text-bg transition-transform hover:-translate-y-[1px]"
      >
        Send Message
      </button>
    </form>
  );
}
