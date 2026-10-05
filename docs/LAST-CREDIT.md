# Last Credit — Arcade Contract

Last Credit is the HomeBass arcade layer. It should feel like a room full of machines, not a game launcher with an arcade skin.

## v0.3 behavior

- Selectable pixel cabinets.
- Attract-mode presentation.
- Local credit bank with persisted credits.
- Cabinet status, player count, source, and score metadata.
- House scoreboard.
- Start action that consumes a credit for ready cabinets.
- Clear adapter boundary for HomeBass-native games, PhiCade, and PixelForge.

## Cabinet model

```ts
type ArcadeCabinet = {
  id: string;
  title: string;
  subtitle: string;
  source: "homebass" | "phicade" | "pixelforge";
  status: "READY" | "COMING SOON";
  players: number;
  highScore: number;
  highScoreHandle: string;
  accent: "cyan" | "amber" | "magenta" | "green";
};
```

## Future launch contract

A later runtime adapter should accept:

```ts
type ArcadeLaunchRequest = {
  cabinetId: string;
  source: "homebass" | "phicade" | "pixelforge";
  credits: number;
};
```

The world layer should not need to know whether a cabinet launches:

- a native HomeBass mini-game,
- a PhiCade emulator core,
- a PixelForge runtime title,
- a replay,
- an agent match,
- or a network session.

The cabinet is the fiction. The adapter is the machinery.
