export type VideoGenre = "ACTION" | "HORROR" | "SCI-FI" | "COMEDY" | "CULT";

export type VideoTape = {
  id: string;
  title: string;
  year: number;
  genre: VideoGenre;
  runtimeMinutes: number;
  rating: "PG" | "PG-13" | "R" | "NR";
  staffPick?: boolean;
  returned?: boolean;
  source: "homebass" | "phivid" | "paracut";
};

export const videoTapes: VideoTape[] = [
  {
    id: "night-shift-zero",
    title: "Night Shift Zero",
    year: 1988,
    genre: "SCI-FI",
    runtimeMinutes: 94,
    rating: "PG-13",
    staffPick: true,
    source: "homebass",
  },
  {
    id: "mall-after-midnight",
    title: "Mall After Midnight",
    year: 1991,
    genre: "HORROR",
    runtimeMinutes: 101,
    rating: "R",
    source: "homebass",
  },
  {
    id: "maximum-overdrive-club",
    title: "Maximum Overdrive Club",
    year: 1986,
    genre: "ACTION",
    runtimeMinutes: 88,
    rating: "PG-13",
    source: "homebass",
  },
  {
    id: "rewind-this",
    title: "Rewind This",
    year: 1993,
    genre: "COMEDY",
    runtimeMinutes: 96,
    rating: "PG",
    staffPick: true,
    source: "homebass",
  },
  {
    id: "phivid-shelf",
    title: "PHIVid Shelf",
    year: 2026,
    genre: "CULT",
    runtimeMinutes: 0,
    rating: "NR",
    source: "phivid",
  },
  {
    id: "paracut-screening",
    title: "Paracut Screening",
    year: 2026,
    genre: "CULT",
    runtimeMinutes: 0,
    rating: "NR",
    source: "paracut",
  },
];
