export type ArcadeSource = "homebass" | "phicade" | "pixelforge";

export type ArcadeCabinet = {
  id: string;
  title: string;
  subtitle: string;
  source: ArcadeSource;
  status: "READY" | "COMING SOON";
  players: number;
  highScore: number;
  highScoreHandle: string;
  accent: "cyan" | "amber" | "magenta" | "green";
};

export type ArcadeLaunchRequest = {
  cabinetId: string;
  source: ArcadeSource;
  credits: number;
};

export const arcadeCabinets: ArcadeCabinet[] = [
  {
    id: "dial-up-defender",
    title: "Dial-Up Defender",
    subtitle: "Protect the connection",
    source: "homebass",
    status: "READY",
    players: 1,
    highScore: 983200,
    highScoreHandle: "MIKEYMOREBOUNCE",
    accent: "cyan",
  },
  {
    id: "cassette-rescue",
    title: "Cassette Rescue",
    subtitle: "Pencil not included",
    source: "homebass",
    status: "READY",
    players: 1,
    highScore: 812400,
    highScoreHandle: "VESSIE",
    accent: "amber",
  },
  {
    id: "phi-cade",
    title: "PhiCade",
    subtitle: "Installed cores + library",
    source: "phicade",
    status: "COMING SOON",
    players: 2,
    highScore: 0,
    highScoreHandle: "---",
    accent: "green",
  },
  {
    id: "pixelforge",
    title: "PixelForge",
    subtitle: "Original runtime games",
    source: "pixelforge",
    status: "COMING SOON",
    players: 2,
    highScore: 0,
    highScoreHandle: "---",
    accent: "magenta",
  },
];
