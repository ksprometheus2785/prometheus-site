"use client";

import { useMemo, useState } from "react";
import type { SeasonEntry } from "@/data/seasons";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Section";

export function SeasonArchive({ seasons }: { seasons: SeasonEntry[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return seasons;
    return seasons.filter((s) => String(s.year).includes(q) || (s.game ?? "").toLowerCase().includes(q));
  }, [query, seasons]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by year…"
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--ember-300)]/40 md:max-w-xs"
        />
        <div className="text-xs text-white/55">Data source: The Blue Alliance</div>
      </div>

      <div className="grid gap-4">
        {filtered.map((season, idx) => (
          <Reveal key={season.year} from={idx % 2 === 0 ? "left" : "right"} effect="slide">
            <div
              className={cn(
                "rounded-2xl border border-white/10 bg-white/5 p-6",
                season.featured ? "shadow-[0_0_0_1px_rgba(180,20,27,.12),0_0_64px_rgba(180,20,27,.10)]" : ""
              )}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex items-baseline gap-3">
                    <div className="font-display text-2xl text-white">{season.year}</div>
                    {season.featured ? (
                      <span className="rounded-full border border-[rgba(180,20,27,.32)] bg-[rgba(180,20,27,.14)] px-3 py-1 text-xs font-semibold text-[var(--ember-300)]">
                        Featured
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-2 max-w-2xl text-white/75">{season.summary}</div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {season.events.map((e, eventIdx) => (
                  <Reveal key={e.key} from="up" effect={eventIdx % 3 === 0 ? "pop" : "slide"} delay={eventIdx * 0.03}>
                    <div className="rounded-xl border border-white/10 bg-black/25 p-4">
                      <div className="flex items-baseline justify-between gap-3">
                        <div className="font-display text-lg text-white">{e.name}</div>
                        <div className="text-xs text-white/55">{e.dates}</div>
                      </div>
                      <div className="mt-1 text-sm text-white/75">{e.location}</div>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
                          Ranking: {e.ranking ?? "TBD"}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
                          Record: {e.record ?? "TBD"}
                        </span>
                      </div>
                      {e.awards?.length ? (
                        <div className="mt-3 text-xs text-white/65">Awards: {e.awards.join(" · ")}</div>
                      ) : null}
                      {e.notable ? <div className="mt-2 text-sm text-white/65">{e.notable}</div> : null}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
