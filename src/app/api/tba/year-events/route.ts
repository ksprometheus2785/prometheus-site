import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type TbaEvent = {
  key: string;
  name: string;
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

const TEAM_KEY = "frc2785" as const;

function toSortableDate(value?: string | null) {
  if (!value) return 0;
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? ms : 0;
}

function formatDateRange(start?: string | null, end?: string | null, year?: number) {
  if (!start && !end) return String(year);
  if (start && end && start !== end) return `${start} → ${end}`;
  return start ?? end ?? String(year);
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

export async function GET(request: Request) {
  const apiKey = process.env.TBA_API_KEY;
  const url = new URL(request.url);
  const yearParam = url.searchParams.get("year");
  const year = yearParam ? Number(yearParam) : new Date().getFullYear();

  const payload: YearEventsResponse = { teamKey: TEAM_KEY, year, events: [] };

  if (!apiKey || !Number.isFinite(year)) {
    return NextResponse.json(payload, { status: 200 });
  }

  const authKey: string = apiKey;

  const eventsRes = await fetch(`https://www.thebluealliance.com/api/v3/team/${TEAM_KEY}/events/${year}`, {
    headers: { "X-TBA-Auth-Key": authKey },
    cache: "no-store"
  });

  if (!eventsRes.ok) {
    return NextResponse.json(payload, { status: 200 });
  }

  const events = ((await eventsRes.json()) as TbaEvent[])
    .filter((e) => e?.key && e?.name)
    .sort((a, b) => {
      const aKey = toSortableDate(a.end_date) || toSortableDate(a.start_date);
      const bKey = toSortableDate(b.end_date) || toSortableDate(b.start_date);
      return bKey - aKey;
    });

  const base = events.map((e) => ({
    key: e.key,
    name: e.name,
    location: formatLocation(e),
    dates: formatDateRange(e.start_date, e.end_date, year)
  }));

  const enriched = await Promise.all(
    base.map(async (evt) => {
      try {
        const statusRes = await fetch(`https://www.thebluealliance.com/api/v3/team/${TEAM_KEY}/event/${evt.key}/status`, {
          headers: { "X-TBA-Auth-Key": authKey },
          cache: "no-store"
        });

        const status = (statusRes.ok ? ((await statusRes.json()) as TbaTeamEventStatus) : null) ?? null;
        const rank = status?.qual?.ranking?.rank ?? null;
        const record = formatRecord(status?.qual?.ranking?.record ?? null);

        return {
          ...evt,
          ranking: rank !== null ? String(rank) : null,
          record
        };
      } catch {
        return { ...evt, ranking: null, record: null };
      }
    })
  );

  return NextResponse.json({ ...payload, events: enriched }, { status: 200 });
}

