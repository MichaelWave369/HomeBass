export type NerdsEvidence = {
  key: string;
  label: string;
  value: string | number | boolean;
  source: "localStorage" | "session";
};

export type NerdsAchievement = {
  id: string;
  title: string;
  description: string;
  points: number;
  category: "HOUSE" | "ARCADE" | "BBS" | "MUSIC" | "QUIZ" | "VIDEO";
  evidenceKeys: string[];
};

export const nerdsAchievements: NerdsAchievement[] = [
  {
    id: "first-night",
    title: "FIRST NIGHT",
    description: "Visit every major room in HomeBass.",
    points: 250,
    category: "HOUSE",
    evidenceKeys: ["visited.rooms"],
  },
  {
    id: "caller-id",
    title: "CALLER ID",
    description: "Set a persistent AfterHours BBS handle.",
    points: 100,
    category: "BBS",
    evidenceKeys: ["bbs.handle"],
  },
  {
    id: "sysop-energy",
    title: "SYSOP ENERGY",
    description: "Post at least one local message to AfterHours.",
    points: 150,
    category: "BBS",
    evidenceKeys: ["bbs.messages"],
  },
  {
    id: "label-maker",
    title: "LABEL MAKER",
    description: "Name a mixtape in Tape Deck.",
    points: 100,
    category: "MUSIC",
    evidenceKeys: ["tape.label"],
  },
  {
    id: "hot-shot",
    title: "HOT SHOT",
    description: "Set a non-zero Hot Shots house score.",
    points: 200,
    category: "QUIZ",
    evidenceKeys: ["quiz.highScore"],
  },
  {
    id: "be-kind-rewind",
    title: "BE KIND, REWIND",
    description: "Rent at least one tape from LackLuster.",
    points: 125,
    category: "VIDEO",
    evidenceKeys: ["video.rentals"],
  },
  {
    id: "last-credit",
    title: "LAST CREDIT",
    description: "Spend at least one arcade credit.",
    points: 175,
    category: "ARCADE",
    evidenceKeys: ["arcade.spent"],
  },
];

const keys = {
  visited: "homebass.visited.v1",
  bbsHandle: "homebass.afterhours.handle.v1",
  bbsMessages: "homebass.afterhours.messages.v1",
  tapeLabel: "homebass.tape-deck.mixtape-title.v1",
  quizHighScore: "homebass.hot-shots.high-score.v1",
  videoRentals: "homebass.lackluster.rentals.v1",
  arcadeCredits: "homebass.last-credit.credits.v1",
  arcadeSpent: "homebass.last-credit.spent.v1",
} as const;

function readArray(key: string): unknown[] {
  try {
    const value = JSON.parse(localStorage.getItem(key) ?? "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function readNumber(key: string, fallback = 0): number {
  try {
    const value = Number(localStorage.getItem(key));
    return Number.isFinite(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

export function collectNerdsEvidence(): NerdsEvidence[] {
  const visited = readArray(keys.visited).filter(
    (value): value is string => typeof value === "string",
  );
  const messages = readArray(keys.bbsMessages);
  const rentals = readArray(keys.videoRentals);
  const handle = localStorage.getItem(keys.bbsHandle) ?? "";
  const tapeLabel = localStorage.getItem(keys.tapeLabel) ?? "";
  const quizHighScore = readNumber(keys.quizHighScore, 0);
  const arcadeCredits = readNumber(keys.arcadeCredits, 1);
  const arcadeSpent = readNumber(keys.arcadeSpent, 0);

  return [
    {
      key: "visited.rooms",
      label: "Rooms visited",
      value: visited.length,
      source: "localStorage",
    },
    {
      key: "bbs.handle",
      label: "BBS handle",
      value: handle,
      source: "localStorage",
    },
    {
      key: "bbs.messages",
      label: "Local BBS posts",
      value: messages.length,
      source: "localStorage",
    },
    {
      key: "tape.label",
      label: "Mixtape label",
      value: tapeLabel,
      source: "localStorage",
    },
    {
      key: "quiz.highScore",
      label: "Hot Shots high score",
      value: quizHighScore,
      source: "localStorage",
    },
    {
      key: "video.rentals",
      label: "Videos currently rented",
      value: rentals.length,
      source: "localStorage",
    },
    {
      key: "arcade.credits",
      label: "Arcade credits remaining",
      value: arcadeCredits,
      source: "localStorage",
    },
    {
      key: "arcade.spent",
      label: "Arcade credits spent",
      value: arcadeSpent,
      source: "localStorage",
    },
  ];
}

export function isAchievementUnlocked(
  achievement: NerdsAchievement,
  evidence: NerdsEvidence[],
): boolean {
  const byKey = new Map(evidence.map((item) => [item.key, item.value]));

  switch (achievement.id) {
    case "first-night":
      return Number(byKey.get("visited.rooms") ?? 0) >= 6;
    case "caller-id":
      return String(byKey.get("bbs.handle") ?? "").trim().length > 0;
    case "sysop-energy":
      return Number(byKey.get("bbs.messages") ?? 0) > 0;
    case "label-maker":
      return String(byKey.get("tape.label") ?? "").trim().length > 0;
    case "hot-shot":
      return Number(byKey.get("quiz.highScore") ?? 0) > 0;
    case "be-kind-rewind":
      return Number(byKey.get("video.rentals") ?? 0) > 0;
    case "last-credit":
      return Number(byKey.get("arcade.spent") ?? 0) > 0;
    default:
      return false;
  }
}
