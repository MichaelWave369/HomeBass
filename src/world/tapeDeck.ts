export type TapeSide = "A" | "B";

export type TapeTrack = {
  id: string;
  title: string;
  artist: string;
  durationSeconds: number;
  source: "homebass" | "jukebot" | "phiaudio";
};

export type Mixtape = {
  id: string;
  title: string;
  side: TapeSide;
  tracks: TapeTrack[];
};

export const demoTape: Mixtape = {
  id: "house-tape-001",
  title: "HOME AFTER DARK",
  side: "A",
  tracks: [
    {
      id: "track-1",
      title: "Porch Light",
      artist: "HomeBass House Band",
      durationSeconds: 214,
      source: "homebass",
    },
    {
      id: "track-2",
      title: "Last Token",
      artist: "Cabinet Ghosts",
      durationSeconds: 188,
      source: "homebass",
    },
    {
      id: "track-3",
      title: "Carrier Tone",
      artist: "14.4K",
      durationSeconds: 201,
      source: "homebass",
    },
    {
      id: "track-4",
      title: "Side B Forever",
      artist: "The Rewinds",
      durationSeconds: 232,
      source: "homebass",
    },
  ],
};
