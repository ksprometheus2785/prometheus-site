export type SeasonEvent = {
  key: string;
  name: string;
  location: string;
  dates: string;
  ranking?: string;
  record?: string;
  awards?: string[];
  notable?: string;
};

export type SeasonEntry = {
  year: number;
  game?: string;
  featured?: boolean;
  tbaTeamKey: "frc2785";
  tbaYearKey: string;
  summary: string;
  events: SeasonEvent[];
  media?: {
    cover?: string;
    gallery?: string[];
    video?: string;
  };
};

export const seasons: SeasonEntry[] = [
  {
    year: 2026,
    featured: true,
    tbaTeamKey: "frc2785" as const,
    tbaYearKey: "2026frc2785",
    summary:
      "A precision-focused season built around reliability, fast cycles, and calm execution in eliminations.",
    events: [
      {
        key: "2026TODO",
        name: "District Event (Placeholder)",
        location: "New England District",
        dates: "Mar 2026",
        ranking: "TBD",
        record: "TBD",
        awards: ["TBD"],
        notable: "Replace with The Blue Alliance event data when ready."
      }
    ],
    media: {
      cover: "/media/seasons/2026/cover.jpg",
      video: "https://www.youtube.com/"
    }
  },
  ...[2022, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009].map(
    (year) => ({
      year,
      tbaTeamKey: "frc2785" as const,
      tbaYearKey: `${year}frc2785`,
      summary:
        "Season record, awards, and event results ready to be filled in from The Blue Alliance (structured placeholders).",
      events: [
        {
          key: `${year}TODO`,
          name: "Event (Placeholder)",
          location: "TBD",
          dates: "TBD",
          ranking: "TBD",
          record: "TBD",
          awards: ["TBD"],
          notable: "Add notable achievements, robot notes, and media links."
        }
      ],
      media: {
        cover: `/media/seasons/${year}/cover.jpg`
      }
    })
  )
].sort((a, b) => b.year - a.year);
