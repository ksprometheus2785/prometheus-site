import type { Sponsor, SponsorTier } from "@/data/sponsors";
import { Reveal } from "@/components/ui/Section";

export function SponsorWall({
  tiers,
  sponsors
}: {
  tiers: Array<{ tier: SponsorTier; subtitle: string }>;
  sponsors: Sponsor[];
}) {
  return (
    <div className="space-y-8">
      {tiers.map((t, tierIdx) => {
        const list = sponsors.filter((s) => s.tier === t.tier);
        return (
          <Reveal key={t.tier} from={tierIdx % 2 === 0 ? "left" : "right"} effect="slide">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                <div className="font-display text-2xl text-white">{t.tier}</div>
                <div className="text-sm text-white/65">{t.subtitle}</div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((s, sponsorIdx) => (
                  <Reveal key={s.name} from="up" effect="pop" delay={sponsorIdx * 0.03}>
                    <a
                      href={s.url ?? "/contact"}
                      className="group block rounded-2xl border border-white/10 bg-black/25 p-6 transition hover:bg-white/10"
                    >
                      <div className="font-display text-lg text-white">{s.name}</div>
                      <div className="mt-3 h-10 rounded-lg border border-white/10 bg-white/5" />
                      <div className="mt-4 text-xs uppercase tracking-[0.22em] text-white/55">Logo: {s.logo}</div>
                    </a>
                  </Reveal>
                ))}
                {list.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white/15 bg-black/25 p-6 text-white/65">
                    Add sponsors in /src/data/sponsors.ts
                  </div>
                ) : null}
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
