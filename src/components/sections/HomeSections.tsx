"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal, Section } from "@/components/ui/Section";
import { seasons } from "@/data/seasons";
import { galleryItems } from "@/data/gallery";
import { sponsors } from "@/data/sponsors";

type LatestResultsResponse = {
  teamKey: "frc2785";
  year: number;
  eventKey: string | null;
  eventName: string | null;
  startDate: string | null;
  endDate: string | null;
  rank: number | null;
  record: string | null;
  awards: string[];
};

type YearEventsResponse = {
  teamKey: "frc2785";
  year: number;
  events: Array<{
    key: string;
    name: string;
    location: string;
    dates: string;
    ranking: string | null;
    record: string | null;
  }>;
};

export function HomeSections() {
  const featured = seasons.find((s) => s.featured) ?? seasons[0];
  const latest = seasons[0];
  const galleryPreview = galleryItems.filter((i) => i.type === "image").slice(0, 6);
  const sponsorPreview = sponsors.slice(0, 6);
  const [latestLive, setLatestLive] = useState<LatestResultsResponse | null>(null);
  const [latestLiveState, setLatestLiveState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [featuredLive, setFeaturedLive] = useState<YearEventsResponse | null>(null);
  const [featuredLiveState, setFeaturedLiveState] = useState<"idle" | "loading" | "ready" | "error">("idle");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLatestLiveState("loading");
        const res = await fetch("/api/tba/latest-results");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as LatestResultsResponse;
        if (cancelled) return;
        setLatestLive(data);
        setLatestLiveState("ready");
      } catch {
        if (cancelled) return;
        setLatestLiveState("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setFeaturedLiveState("loading");
        const res = await fetch(`/api/tba/year-events?year=${encodeURIComponent(String(featured.year))}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as YearEventsResponse;
        if (cancelled) return;
        setFeaturedLive(data);
        setFeaturedLiveState("ready");
      } catch {
        if (cancelled) return;
        setFeaturedLiveState("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [featured.year]);

  const latestCard = useMemo(() => {
    if (latestLiveState === "ready" && latestLive?.eventKey) return latestLive;
    return null;
  }, [latestLive, latestLiveState]);

  const snapshotEvents = useMemo(() => {
    if (featuredLiveState === "ready" && featuredLive?.events.length) return featuredLive.events;
    return featured.events;
  }, [featured.events, featuredLive, featuredLiveState]);

  return (
    <>
      <Section
        eyebrow="OVERVIEW"
        title="Prometheus is built to compete."
        subtitle="We take engineering, strategy, and teamwork seriously — from kickoff to eliminations."
        hideHeader
      >
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-20">
          <Reveal from="left" className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <Image
                src="/media/brand/P1012336.jpg"
                alt="Team Prometheus"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain bg-transparent"
                priority={false}
              />
            </div>
          </Reveal>

          <Reveal from="right" className="lg:col-span-6">
            <div className="space-y-4">
              <div className="text-xs uppercase tracking-[0.32em] text-white/55">OVERVIEW</div>
              <div className="text-base text-white/80 md:text-lg">We&apos;re FRC Team 2785</div>
              <div className="font-display text-5xl leading-[0.98] tracking-[-0.01em] text-white md:text-7xl">
                Prometheus
              </div>
              <div className="max-w-lg text-base text-white/75 md:text-lg">
                a student-led, mentor-guided engineering team based in Kent.
              </div>
              <div className="mt-6 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-black/25">
                <div className="aspect-video w-full">
                  <iframe
                    className="h-full w-full"
                    src="https://www.youtube.com/embed/xzseZGDW_Iw?rel=0"
                    title="Prometheus | About Us"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section
        eyebrow="FEATURED SEASON"
        title="Rebuilt 2026"
        subtitle="This season we're focused on fast cycles, consistent mechanisms, and staying calm in eliminations."
      >
        <Container className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
          <Reveal from="left" className="lg:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm uppercase tracking-[0.28em] text-[var(--ember-300)]">Snapshot</div>
              <div className="mt-4 grid gap-4">
                {snapshotEvents.slice(0, 2).map((e, idx) => (
                  <Reveal key={e.key} from="up" effect="pop" delay={idx * 0.04}>
                    <div className="rounded-xl border border-white/10 bg-black/25 p-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div className="font-display text-lg text-white">{e.name}</div>
                        <div className="text-xs text-white/55">{e.dates}</div>
                      </div>
                      <div className="mt-2 text-sm text-white/75">{e.location}</div>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
                          Ranking: {(e as { ranking?: string | null }).ranking ?? "TBD"}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
                          Record: {(e as { record?: string | null }).record ?? "TBD"}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal from="up" effect="fade" className="mt-6">
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/seasons"
                    className="inline-flex items-center justify-center rounded-full bg-[var(--ember-600)] px-5 py-3 font-semibold text-white shadow-[0_0_0_1px_rgba(180,20,27,.16),0_0_64px_rgba(180,20,27,.14)] transition hover:bg-[var(--ember-500)] focus:outline-none focus:ring-2 focus:ring-[var(--ember-300)]/40"
                  >
                    View full history
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white/90 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/25"
                  >
                    How we operate
                  </Link>
                </div>
              </Reveal>
            </div>
          </Reveal>

          <Reveal from="right" className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm uppercase tracking-[0.28em] text-[var(--ember-300)]">Latest Results</div>
              <div className="mt-4 rounded-xl border border-white/10 bg-black/25 p-4">
                {latestCard ? (
                  <>
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="font-display text-xl text-white">{latestCard.eventName ?? "Latest event"}</div>
                      <div className="text-xs text-white/55">{latestCard.year}</div>
                    </div>
                    <div className="mt-2 text-white/75">
                      {latestCard.startDate && latestCard.endDate
                        ? `${latestCard.startDate} → ${latestCard.endDate}`
                        : "Dates unavailable"}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
                        Record: {latestCard.record ?? "TBD"}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
                        Rank: {latestCard.rank ?? "TBD"}
                      </span>
                    </div>
                    {latestCard.awards.length ? (
                      <div className="mt-4 space-y-2 text-sm text-white/75">
                        {latestCard.awards.slice(0, 3).map((name) => (
                          <div key={name} className="flex items-center justify-between gap-3">
                            <div className="truncate">{name}</div>
                            <div className="text-white/55">Award</div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </>
                ) : (
                  <>
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="font-display text-xl text-white">{latest.year}</div>
                      <div className="text-xs text-white/55">
                        {latestLiveState === "loading"
                          ? "Loading live results…"
                          : "This season we&apos;re focused on fast cycles, consistent mechanisms, and staying calm in eliminations."}
                      </div>
                    </div>
                    <div className="mt-2 text-white/75">
                      This season we&apos;re focused on fast cycles, consistent mechanisms, and staying calm in eliminations.
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-white/75">
                      {latest.events.slice(0, 3).map((e) => (
                        <div key={e.key} className="flex items-center justify-between gap-3">
                          <div className="truncate">{e.name}</div>
                          <div className="text-white/55">{e.record ?? "TBD"}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section
        eyebrow="Gallery"
        title="Moments, machines, and momentum."
      >
        <Container>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {galleryPreview.map((item) => (
              <Link
                key={item.id}
                href="/gallery"
                className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={item.thumb ?? item.src}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60" />
                </div>
                <div
                  className="absolute inset-0 opacity-0 transition group-hover:opacity-100"
                  style={{ background: "radial-gradient(700px 260px at 30% 20%, rgba(180,20,27,.16), transparent 65%)" }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-xs uppercase tracking-[0.22em] text-white/75">{item.category}</div>
                  <div className="mt-1 font-display text-lg text-white">{item.title}</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white/90 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--ember-300)]/35"
            >
              Open full gallery
            </Link>
          </div>
        </Container>
      </Section>

      <Section
        eyebrow="SPONSORS"
        title="Our sponsors make this possible."
      >
        <Container className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sponsorPreview.map((s, idx) => (
              <Reveal key={s.name} from={idx % 2 === 0 ? "left" : "right"} delay={idx * 0.04}>
                <a
                  href={s.url ?? "/sponsors"}
                  className="group block rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
                >
                  <div className="text-xs uppercase tracking-[0.22em] text-white/55">{s.tier}</div>
                  <div className="mt-2 font-display text-xl text-white">{s.name}</div>
                  <div className="mt-3 h-10 w-full rounded-lg border border-white/10 bg-white/5" />
                  <div className="mt-4 text-sm text-white/70 group-hover:text-white/85">View sponsorship impact →</div>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/sponsors"
              className="inline-flex items-center justify-center rounded-full bg-[var(--ember-600)] px-5 py-3 font-semibold text-white shadow-[0_0_0_1px_rgba(180,20,27,.16),0_0_64px_rgba(180,20,27,.14)] transition hover:bg-[var(--ember-500)] focus:outline-none focus:ring-2 focus:ring-[var(--ember-300)]/40"
            >
              Sponsor the team
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white/90 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/25"
            >
              Join / Mentor
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
