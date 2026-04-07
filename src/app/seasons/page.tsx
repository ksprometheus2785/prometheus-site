import { seasons as fallbackSeasons, type SeasonEntry, type SeasonEvent } from "@/data/seasons";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SeasonArchive } from "@/components/sections/SeasonArchive";

type TbaEvent = {
  key: string;
  name: string;
  year?: number | null;
  start_date?: string | null;
  end_date?: string | null;
  city?: string | null;
  state_prov?: string | null;
  country?: string | null;
  location_name?: string | null;
};

type TbaTeamEventStatus = {
  qual?: {
    ranking?: {
      rank?: number | null;
      record?: {
        wins?: number | null;
        losses?: number | null;
        ties?: number | null;
      } | null;
    } | null;
  } | null;
} | null;

type TbaAward = {
  name?: string | null;
};

const TEAM_KEY = "frc2785" as const;

function toSortableDate(value?: string | null) {
  if (!value) return 0;
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? ms : 0;
}

function formatDateRange(start?: string | null, end?: string | null, year?: number | null) {
  if (!start && !end) return year ? String(year) : "TBA";
  if (start && end && start !== end) return `${start} → ${end}`;
  return start ?? end ?? "TBA";
}

function formatLocation(e: TbaEvent) {
  const parts = [e.city, e.state_prov, e.country].map((p) => (p ?? "").trim()).filter(Boolean);
  if (parts.length) return parts.join(", ");
  return (e.location_name ?? "").trim() || "TBA";
}

function formatRecord(record?: { wins?: number | null; losses?: number | null; ties?: number | null } | null) {
  const wins = record?.wins ?? null;
  const losses = record?.losses ?? null;
  const ties = record?.ties ?? null;
  if (wins === null || losses === null || ties === null) return null;
  return `${wins}-${losses}-${ties}`;
}

export default async function Page() {
  const apiKey = process.env.TBA_API_KEY;
  const currentYear = new Date().getFullYear();

  let seasons: SeasonEntry[] = fallbackSeasons;

  if (apiKey) {
    try {
      const res = await fetch(`https://www.thebluealliance.com/api/v3/team/${TEAM_KEY}/events`, {
        headers: { "X-TBA-Auth-Key": apiKey },
        cache: "no-store"
      });

      if (res.ok) {
        const allEvents = (await res.json()) as TbaEvent[];
        const byYear = new Map<number, TbaEvent[]>();

        for (const e of allEvents) {
          const y = e.year ?? (e.start_date ? new Date(`${e.start_date}T00:00:00Z`).getUTCFullYear() : null);
          if (!y) continue;
          const list = byYear.get(y) ?? [];
          list.push(e);
          byYear.set(y, list);
        }

        const years = Array.from(byYear.keys()).sort((a, b) => b - a);
        const enrichYears = new Set([currentYear, currentYear - 1]);

        const buildSeason = async (year: number): Promise<SeasonEntry> => {
          const events = (byYear.get(year) ?? []).sort((a, b) => {
            const aKey = toSortableDate(a.end_date) || toSortableDate(a.start_date);
            const bKey = toSortableDate(b.end_date) || toSortableDate(b.start_date);
            return bKey - aKey;
          });

          const baseEvents: SeasonEvent[] = events.map((e) => ({
            key: e.key,
            name: e.name,
            location: formatLocation(e),
            dates: formatDateRange(e.start_date, e.end_date, year)
          }));

          if (!enrichYears.has(year) || baseEvents.length === 0) {
            return {
              year,
              featured: year === currentYear,
              tbaTeamKey: TEAM_KEY,
              tbaYearKey: `${year}${TEAM_KEY}`,
              summary: "Event list from The Blue Alliance.",
              events: baseEvents
            };
          }

          const enriched = await Promise.all(
            baseEvents.map(async (evt) => {
              const [statusRes, awardsRes] = await Promise.all([
                fetch(`https://www.thebluealliance.com/api/v3/team/${TEAM_KEY}/event/${evt.key}/status`, {
                  headers: { "X-TBA-Auth-Key": apiKey },
                  cache: "no-store"
                }),
                fetch(`https://www.thebluealliance.com/api/v3/team/${TEAM_KEY}/event/${evt.key}/awards`, {
                  headers: { "X-TBA-Auth-Key": apiKey },
                  cache: "no-store"
                })
              ]);

              const status = (statusRes.ok ? ((await statusRes.json()) as TbaTeamEventStatus) : null) ?? null;
              const rank = status?.qual?.ranking?.rank ?? null;
              const record = formatRecord(status?.qual?.ranking?.record ?? null);

              const awardsJson = awardsRes.ok ? ((await awardsRes.json()) as TbaAward[]) : [];
              const awardNames = awardsJson.map((a) => (a.name ?? "").trim()).filter(Boolean);
              const uniqueAwards = Array.from(new Set(awardNames));

              return {
                ...evt,
                ranking: rank !== null ? String(rank) : undefined,
                record: record ?? undefined,
                awards: uniqueAwards.length ? uniqueAwards : undefined
              } satisfies SeasonEvent;
            })
          );

          return {
            year,
            featured: year === currentYear,
            tbaTeamKey: TEAM_KEY,
            tbaYearKey: `${year}${TEAM_KEY}`,
            summary: "Event list from The Blue Alliance (live).",
            events: enriched
          };
        };

        seasons = await Promise.all(years.map((y) => buildSeason(y)));
      }
    } catch {
      seasons = fallbackSeasons;
    }
  }

  return (
    <main>
      <Section
        eyebrow="Competition History"
        title="Competition history"
        subtitle="Live season events pulled from The Blue Alliance."
      >
        <Container>
          <SeasonArchive seasons={seasons} />
        </Container>
      </Section>
    </main>
  );
}
