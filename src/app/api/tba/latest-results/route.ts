import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type TbaEvent = {
  key: string;
  name: string;
  start_date?: string | null;
  end_date?: string | null;
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
};

type TbaRankings = {
  rankings?: Array<{
    team_key?: string | null;
    rank?: number | null;
  }> | null;
};

type TbaAward = {
  name?: string | null;
};

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

const TEAM_KEY = "frc2785" as const;

function toSortableDate(value?: string | null) {
  if (!value) return 0;
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? ms : 0;
}

function formatRecord(record?: { wins?: number | null; losses?: number | null; ties?: number | null } | null) {
  const wins = record?.wins ?? null;
  const losses = record?.losses ?? null;
  const ties = record?.ties ?? null;
  if (wins === null || losses === null || ties === null) return null;
  return `${wins}-${losses}-${ties}`;
}

type FetchOk<T> = { ok: true; status: number; data: T };
type FetchErr = { ok: false; status: number; bodyText?: string };

export async function GET(request: Request) {
  const apiKey = process.env.TBA_API_KEY;
  const debug = new URL(request.url).searchParams.get("debug") === "1";

  if (!apiKey) {
    const payload: LatestResultsResponse = {
      teamKey: TEAM_KEY,
      year: new Date().getFullYear(),
      eventKey: null,
      eventName: null,
      startDate: null,
      endDate: null,
      rank: null,
      record: null,
      awards: []
    };
    if (debug) {
      return NextResponse.json({ ...payload, debug: { error: "missing_tba_api_key" } }, { status: 200 });
    }
    return NextResponse.json(payload, { status: 200 });
  }

  const authKey: string = apiKey;

  async function tbaFetch<T>(path: string): Promise<FetchOk<T> | FetchErr> {
    try {
      const res = await fetch(`https://www.thebluealliance.com/api/v3${path}`, {
        headers: { "X-TBA-Auth-Key": authKey },
        cache: "no-store"
      });
      if (!res.ok) {
        const bodyText = debug ? (await res.text().catch(() => "")) : undefined;
        return { ok: false, status: res.status, bodyText };
      }
      const data = (await res.json()) as T;
      return { ok: true, status: res.status, data };
    } catch {
      return { ok: false, status: 0 };
    }
  }

  const currentYear = new Date().getFullYear();
  const candidateYears = [currentYear, currentYear - 1];

  let yearUsed: number | null = null;
  let selectedEvent: TbaEvent | null = null;
  const debugEvents: Array<{ year: number; status: number; count: number; sample?: unknown }> = [];
  const debugErrors: Array<{ year: number; status: number; bodyText?: string }> = [];

  for (const y of candidateYears) {
    const eventsRes = await tbaFetch<TbaEvent[]>(`/team/${TEAM_KEY}/events/${y}`);
    if (!eventsRes.ok) {
      if (debug) debugErrors.push({ year: y, status: eventsRes.status, bodyText: eventsRes.bodyText });
      continue;
    }

    const events = Array.isArray(eventsRes.data) ? eventsRes.data : [];
    if (process.env.NODE_ENV !== "production") {
      console.log("[tba/latest-results] events length", y, events.length);
    }
    if (debug) {
      debugEvents.push({
        year: y,
        status: eventsRes.status,
        count: events.length,
        sample: events.slice(0, 2)
      });
    }

    if (events.length === 0) continue;

    const sorted = [...events].sort((a, b) => {
      const aKey = toSortableDate(a.end_date) || toSortableDate(a.start_date);
      const bKey = toSortableDate(b.end_date) || toSortableDate(b.start_date);
      return bKey - aKey;
    });

    selectedEvent = sorted[0] ?? events[0] ?? null;
    yearUsed = y;
    if (process.env.NODE_ENV !== "production") {
      console.log("[tba/latest-results] selected event", selectedEvent);
    }
    break;
  }

  if (!selectedEvent || !yearUsed) {
    const payload: LatestResultsResponse = {
      teamKey: TEAM_KEY,
      year: currentYear,
      eventKey: null,
      eventName: null,
      startDate: null,
      endDate: null,
      rank: null,
      record: null,
      awards: []
    };
    if (debug) {
      return NextResponse.json(
        {
          ...payload,
          debug: {
            events: debugEvents,
            errors: debugErrors
          }
        },
        { status: 200 }
      );
    }
    return NextResponse.json(payload, { status: 200 });
  }

  const statusRes = await tbaFetch<TbaTeamEventStatus | null>(`/team/${TEAM_KEY}/event/${selectedEvent.key}/status`);
  const status = statusRes.ok ? statusRes.data : null;
  if (process.env.NODE_ENV !== "production") {
    console.log("[tba/latest-results] raw status", status);
  }
  let rank: number | null = status?.qual?.ranking?.rank ?? null;
  const record = formatRecord(status?.qual?.ranking?.record ?? null);

  if (status !== null && rank === null) {
    const rankingsRes = await tbaFetch<TbaRankings>(`/event/${selectedEvent.key}/rankings`);
    const rankings = rankingsRes.ok ? rankingsRes.data : null;
    const found = rankings?.rankings?.find((r) => r.team_key === TEAM_KEY);
    rank = found?.rank ?? null;
  }

  const awardsRes = await tbaFetch<TbaAward[]>(`/team/${TEAM_KEY}/event/${selectedEvent.key}/awards`);
  const awards = awardsRes.ok ? awardsRes.data : null;
  const awardNames =
    awards
      ?.map((a) => a.name ?? "")
      .map((n) => n.trim())
      .filter(Boolean) ?? [];
  const uniqueAwards = Array.from(new Set(awardNames));

  const payload: LatestResultsResponse = {
    teamKey: TEAM_KEY,
    year: yearUsed,
    eventKey: selectedEvent.key ?? null,
    eventName: selectedEvent.name ?? null,
    startDate: selectedEvent.start_date ?? null,
    endDate: selectedEvent.end_date ?? null,
    rank,
    record,
    awards: uniqueAwards
  };

  if (debug) {
    return NextResponse.json(
      {
        ...payload,
        debug: {
          events: debugEvents,
          errors: debugErrors,
          selectedEvent
        }
      },
      { status: 200 }
    );
  }

  return NextResponse.json(payload, { status: 200 });
}
