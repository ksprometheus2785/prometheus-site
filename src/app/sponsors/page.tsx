import { Container } from "@/components/ui/Container";
import { Reveal, Section } from "@/components/ui/Section";
import { SponsorWall } from "@/components/sections/SponsorWall";
import { sponsorTiers, sponsors } from "@/data/sponsors";
import { team } from "@/data/team";

export default function Page() {
  return (
    <main>
      <Section
        eyebrow="Sponsors"
        title="Thanks to All Our Sponsors"
        subtitle="Sponsors keep the program fast, safe, and competitive — from materials to travel to event readiness."
      >
        <Container className="space-y-10">
          {sponsors.length ? (
            <SponsorWall tiers={sponsorTiers} sponsors={sponsors} />
          ) : (
            <Reveal from="up">
              <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-white/75 md:p-8">
                <div className="font-display text-2xl text-white">Open to Sponsor</div>
                <p className="mt-3 max-w-2xl">
                  We&apos;re currently looking for partners to help fund parts, tools, event fees, and travel. If you want to
                  support the team, reach out and we&apos;ll share sponsorship options.
                </p>
              </div>
            </Reveal>
          )}

          <Reveal from="up">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <div className="font-display text-2xl text-white">Sponsorship inquiries</div>
              <p className="mt-3 max-w-2xl text-white/75">
                We treat partners like a premium brand collaboration: clean presentation, clear impact, and consistent
                recognition across the season.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={`/contact`}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--ember-600)] px-5 py-3 font-semibold text-white shadow-[0_0_0_1px_rgba(180,20,27,.16),0_0_64px_rgba(180,20,27,.14)] transition hover:bg-[var(--ember-500)] focus:outline-none focus:ring-2 focus:ring-[var(--ember-300)]/40"
                >
                  Contact the team
                </a>
                <a
                  href={`mailto:${team.contact.email}?subject=${encodeURIComponent("FRC 2785 Sponsorship Inquiry")}`}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white/90 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/25"
                >
                  Email sponsors
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
