"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/Section";
import { team } from "@/data/team";

type Kind = "Join (Student)" | "Mentor" | "Sponsor" | "General";

export function ContactPanel() {
  const [kind, setKind] = useState<Kind>("Join (Student)");
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  const subject = useMemo(() => {
    switch (kind) {
      case "Sponsor":
        return "FRC 2785 Sponsorship Inquiry";
      case "Mentor":
        return "FRC 2785 Mentor Interest";
      case "Join (Student)":
        return "FRC 2785 Student Interest";
      default:
        return "FRC 2785 Contact";
    }
  }, [kind]);

  function submit() {
    const body = [`Type: ${kind}`, `Name: ${name || "—"}`, `Email: ${from || "—"}`, "", message || "—"].join("\n");

    const url = `mailto:${team.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <Reveal from="left" className="lg:col-span-5">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="font-display text-2xl text-white">Direct lines</div>
          <div className="mt-4 space-y-3 text-white/75">
            <a
              className="block underline decoration-white/25 underline-offset-4 hover:decoration-white/60"
              href={`mailto:${team.contact.email}`}
            >
              {team.contact.email}
            </a>
            <div className="grid gap-2 text-sm">
              {[
                ["Instagram", team.contact.instagram],
                ["YouTube", team.contact.youtube],
                ["TikTok", team.contact.tiktok],
                ["GitHub", team.contact.github]
              ].map(([label, href]) => (
                <a key={label} className="hover:text-white" href={href}>
                  {label} →
                </a>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-black/25 p-4 text-sm text-white/65">
            This form opens your mail client. Add a hosted form later via an API route or form provider.
          </div>
        </div>
      </Reveal>

      <Reveal from="right" className="lg:col-span-7">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="font-display text-2xl text-white">Contact form</div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <label className="space-y-2">
              <div className="text-xs uppercase tracking-[0.22em] text-white/55">Type</div>
              <select
                value={kind}
                onChange={(e) => setKind(e.target.value as Kind)}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[var(--ember-300)]/40"
              >
                {["Join (Student)", "Mentor", "Sponsor", "General"].map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <div className="text-xs uppercase tracking-[0.22em] text-white/55">Your email</div>
              <input
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--ember-300)]/40"
                placeholder="name@email.com"
              />
            </label>
          </div>

          <label className="mt-3 block space-y-2">
            <div className="text-xs uppercase tracking-[0.22em] text-white/55">Name</div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--ember-300)]/40"
              placeholder="Your name"
            />
          </label>

          <label className="mt-3 block space-y-2">
            <div className="text-xs uppercase tracking-[0.22em] text-white/55">Message</div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={7}
              className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--ember-300)]/40"
              placeholder="Tell us what you’re looking for. Keep it direct."
            />
          </label>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={submit}
              className="inline-flex items-center justify-center rounded-full bg-[var(--ember-600)] px-5 py-3 font-semibold text-white shadow-[0_0_0_1px_rgba(180,20,27,.16),0_0_64px_rgba(180,20,27,.14)] transition hover:bg-[var(--ember-500)] focus:outline-none focus:ring-2 focus:ring-[var(--ember-300)]/40"
            >
              Send
            </button>
            <a
              href={`mailto:${team.contact.email}?subject=${encodeURIComponent(subject)}`}
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white/90 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/25"
            >
              Open email
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
