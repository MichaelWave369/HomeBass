export type BbsBoardId = "general" | "arcade" | "music" | "doors";

export type BbsBoard = {
  id: BbsBoardId;
  label: string;
  description: string;
};

export type BbsMessage = {
  id: string;
  boardId: BbsBoardId;
  handle: string;
  body: string;
  createdAt: string;
  source: "fixture" | "local";
};

export type DoorGame = {
  id: string;
  title: string;
  status: "READY" | "COMING SOON";
  players: string;
};

export const bbsBoards: BbsBoard[] = [
  { id: "general", label: "GENERAL", description: "House chatter, intros, nonsense, and whatever is happening tonight." },
  { id: "arcade", label: "ARCADE", description: "Last Credit scores, cabinet talk, challenges, and suspicious bragging." },
  { id: "music", label: "MUSIC", description: "Mixtapes, Tape Deck drops, requests, and arguments about side B." },
  { id: "doors", label: "DOOR GAMES", description: "Text games and shared BBS diversions." },
];

export const fixtureMessages: BbsMessage[] = [
  {
    id: "fixture-1",
    boardId: "general",
    handle: "SYSOP",
    body: "Welcome to AfterHours. Keep the line moving and don't kill the vibe.",
    createdAt: "23:41",
    source: "fixture",
  },
  {
    id: "fixture-2",
    boardId: "general",
    handle: "FIELDLIAISON",
    body: "Commons looks stable. Basement is louder than last time.",
    createdAt: "23:49",
    source: "fixture",
  },
  {
    id: "fixture-3",
    boardId: "arcade",
    handle: "VESSIE",
    body: "MIKEYMOREBOUNCE still has the house score. For now.",
    createdAt: "00:03",
    source: "fixture",
  },
  {
    id: "fixture-4",
    boardId: "music",
    handle: "TAPEDECK",
    body: "Side A is queued. Somebody labeled this cassette 'DO NOT ERASE' so naturally everyone touched it.",
    createdAt: "00:11",
    source: "fixture",
  },
];

export const doorGames: DoorGame[] = [
  { id: "night-run", title: "Night Run", status: "READY", players: "1P" },
  { id: "trade-wars-ish", title: "Trade Wars-ish", status: "COMING SOON", players: "MULTI" },
  { id: "basement-quest", title: "Basement Quest", status: "COMING SOON", players: "1P" },
];
