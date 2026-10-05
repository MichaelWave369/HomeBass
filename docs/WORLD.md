# HomeBass World Bible — v0.1

## Product premise

HomeBass is a **place first**.

The UI should feel like entering a lived-in pixel clubhouse rather than navigating a dashboard. The world borrows the readability and expressive economy of 16-bit console art while using modern display resolution, animation timing, accessibility, and lighting.

## Canonical spaces

| Space | Role |
| --- | --- |
| The Hangout | Commons, presence, friends, agents, invites, activity |
| Last Credit | Arcade, mini-games, PhiCade, tournaments, scores |
| AfterHours BBS | Boards, messages, door games, local/federated social |
| Tape Deck | Music, mixtapes, JukeBot, PHIAudio, shared listening |
| Hot Shots | Retro quiz engine, daily challenges, game-show modes |
| LackLuster | Video-store world, TV/movie culture, PHIVid, Paracut |
| N.E.R.D.S. | Cross-system achievements, records, receipts |

## Visual contract

### We want
- SNES-era composition, silhouettes, rooms, and environmental storytelling.
- Pixel edges where they add character.
- Modern high-DPI scaling.
- Comfortable text sizes.
- Rich but restrained lighting.
- Per-room color identity.
- Optional CRT overlays rather than mandatory filters.
- Idle animation and ambient life.
- Small interactive details with strong sound-design hooks.

### We do not want
- Generic vaporwave.
- Deliberately unreadable 240p UI.
- Excessive scanlines or chromatic aberration.
- Copying recognizable commercial game art.
- A conventional card dashboard wearing a pixel-art costume.

## Ecosystem boundary

HomeBass is the human-facing leisure and social world. It should consume capabilities from other projects through adapters and shared events instead of hard-coding them.

```text
PhiOS
  └─ Infinite Porch / Commons
      └─ HomeBass
          ├─ The Hangout
          ├─ Last Credit      ← PhiCade / PixelForge
          ├─ AfterHours BBS   ← Porch messaging
          ├─ Tape Deck        ← JukeBot / PHIAudio
          ├─ Hot Shots
          ├─ LackLuster       ← PHIVid / Paracut
          └─ N.E.R.D.S.       ← receipts / achievements
```

## Initial shared event vocabulary

Future rungs should stabilize these contracts before deep integrations:

- `PresenceEvent`
- `RoomEvent`
- `MessageEvent`
- `GameEvent`
- `MediaEvent`
- `AchievementEvent`
- `AgentEvent`
- `InviteEvent`

## First-rung acceptance

The v0.1 world foundation should:

1. Build as a browser-first React + TypeScript application.
2. Present HomeBass as a pixel house/world rather than a dashboard.
3. Expose all six canonical rooms.
4. Allow rooms to be selected and entered.
5. Persist a tiny local visited-room state.
6. Demonstrate N.E.R.D.S. as a cross-room achievement surface.
7. Respect reduced-motion preferences.
8. Be deployable from a subpath for future GitHub Pages use.
