import { Container } from "@/components/ui/Container";
import { Reveal, Section } from "@/components/ui/Section";
import { team } from "@/data/team";

export default function Page() {
  return (
    <main>
      <Section eyebrow="About" title="About Our Team">
        <Container className="grid gap-8 lg:grid-cols-2">
          <Reveal from="left">
            <div className="space-y-4 text-white/75">
              <p className="text-lg text-white">
                {team.name} is FRC Team {team.number}, based at {team.org} in {team.location}. Rookie year:{" "}
                {team.rookieYear}.
              </p>
              <p>
                We build with intent: mechanical reliability, clean wiring, ruthless iteration, and software that stays calm
                under pressure.
              </p>
              <p>
                Our program is student-led and mentor-guided, structured like a high-performance engineering team: design,
                build, programming, CAD, strategy/scouting, media, business, and outreach.
              </p>
            </div>
          </Reveal>

          <Reveal from="right">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(180,20,27,.12),0_0_64px_rgba(180,20,27,.10)]">
              <div className="text-sm uppercase tracking-[0.22em] text-[var(--ember-300)]">What is FRC?</div>
              <div className="mt-3 space-y-3 text-white/75">
                <p>
                  Starting with a Kit of Parts, teams of high school students design, program, and build industrial-sized
                  robots to play an action-packed game, released in January. They compete on a themed field as part of a
                  three-team alliance in the spirit of Coopertition®. In 360-degree learning guided by adult mentors, each
                  FIRST® Robotics Competition team also creates a team identity, raises funds to meet its goals, and
                  advances appreciation for STEM in its community.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section eyebrow="Values" title="Our Values">
        <Container className="grid gap-6 lg:grid-cols-3">
          {[
            [
              "Simplicity of Life",
              "We keep our designs, workflows, and communication clean so the robot stays reliable under pressure."
            ],
            ["Directness of Purpose", "Every decision ties back to performance, safety, and what helps the team win."],
            ["Self-Reliance", "We learn by doing—students take ownership, mentors guide, and we build confidence through work."]
          ].map(([t, d], idx) => (
            <Reveal key={t} from={idx % 2 === 0 ? "left" : "right"} delay={idx * 0.05}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="font-display text-xl text-white">{t}</div>
                <div className="mt-2 text-white/75">{d}</div>
              </div>
            </Reveal>
          ))}
        </Container>
      </Section>

      <Section eyebrow="Team" title="Team Roles">
        <Container className="grid gap-6 lg:grid-cols-2">
          {[
            ["Build", "Fabrication, assembly, wiring standards, reliability, and pit readiness."],
            ["Programming", "Controls, autonomy, vision, instrumentation, and driver tooling."],
            ["CAD", "Mechanism design, packaging, and iteration with manufacturability in mind."],
            ["Strategy + Scouting", "Match analysis, alliance planning, and disciplined decisions."],
            ["Business + Sponsors", "Partnership value, outreach, branding, and logistics."],
            ["Outreach + Community", "STEM advocacy, demos, mentorship, and service."]
          ].map(([t, d], idx) => (
            <Reveal key={t} from={idx % 2 === 0 ? "left" : "right"} delay={idx * 0.04}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="font-display text-lg text-white">{t}</div>
                <div className="mt-2 text-white/75">{d}</div>
              </div>
            </Reveal>
          ))}
        </Container>
      </Section>
    </main>
  );
}
