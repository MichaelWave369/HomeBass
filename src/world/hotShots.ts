export type HotShotsCategory =
  | "ARCADE"
  | "TECH"
  | "MOVIES"
  | "MUSIC"
  | "ODDBALL";

export type HotShotsQuestion = {
  id: string;
  category: HotShotsCategory;
  prompt: string;
  choices: [string, string, string, string];
  answerIndex: number;
  explanation: string;
  points: number;
};

export const hotShotsQuestions: HotShotsQuestion[] = [
  {
    id: "q1",
    category: "TECH",
    prompt: "Which storage medium was famous for holding about 1.44 MB?",
    choices: ["3.5-inch floppy disk", "VHS tape", "Audio cassette", "LaserDisc"],
    answerIndex: 0,
    explanation: "The common high-density 3.5-inch floppy held about 1.44 MB.",
    points: 100,
  },
  {
    id: "q2",
    category: "ARCADE",
    prompt: "What does '1UP' traditionally mean in video games?",
    choices: ["Extra life", "High score", "Player two", "Bonus stage"],
    answerIndex: 0,
    explanation: "1UP conventionally means an extra life or extra player life.",
    points: 100,
  },
  {
    id: "q3",
    category: "TECH",
    prompt: "What sound did dial-up users hear while a modem connected?",
    choices: ["Handshake tones", "Tape hiss only", "Morse code", "FM radio static"],
    answerIndex: 0,
    explanation: "Dial-up modems exchanged audible handshake tones while negotiating a connection.",
    points: 150,
  },
  {
    id: "q4",
    category: "MOVIES",
    prompt: "What physical format was commonly rewound before returning it to a video store?",
    choices: ["VHS cassette", "DVD", "LaserDisc", "CD-ROM"],
    answerIndex: 0,
    explanation: "VHS tapes needed to be rewound; DVDs and LaserDiscs did not.",
    points: 100,
  },
  {
    id: "q5",
    category: "MUSIC",
    prompt: "Why did people sometimes keep a pencil near cassette tapes?",
    choices: [
      "To manually turn the reels",
      "To clean the speakers",
      "To tune the radio",
      "To mark CD tracks",
    ],
    answerIndex: 0,
    explanation: "A pencil could fit the cassette hub and manually wind loose tape.",
    points: 150,
  },
  {
    id: "q6",
    category: "ODDBALL",
    prompt: "Which phrase became closely associated with VHS rental etiquette?",
    choices: ["Be kind, rewind", "Insert coin", "You've got mail", "Press any key"],
    answerIndex: 0,
    explanation: "Video rental culture famously used the phrase 'Be kind, rewind.'",
    points: 100,
  },
];

export function buildHotShotsRound(count = 5): HotShotsQuestion[] {
  return hotShotsQuestions.slice(0, Math.min(count, hotShotsQuestions.length));
}
