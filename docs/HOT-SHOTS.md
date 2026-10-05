# Hot Shots — Quiz Engine Contract

Hot Shots is HomeBass's reusable quiz and challenge surface.

The goal is not to hard-code one nostalgia quiz. The room should host multiple question packs, modes, scoring rules, daily challenges, social rounds, and future Porch competition.

## v0.6 behavior

- five-question quick round
- category display
- four-choice answer flow
- immediate answer feedback
- streak bonuses
- persistent local high score
- round-complete state
- reusable typed question model
- planned-mode surfaces for Daily Shot, Team Night, and Porch Battle
- mobile-responsive layout

## Question model

```ts
type HotShotsQuestion = {
  id: string;
  category: "ARCADE" | "TECH" | "MOVIES" | "MUSIC" | "ODDBALL";
  prompt: string;
  choices: [string, string, string, string];
  answerIndex: number;
  explanation: string;
  points: number;
};
```

## Future pack sources

Hot Shots should eventually accept question packs from:
- HomeBass built-ins
- user-created packs
- curated historical packs
- agent-generated drafts after validation
- Porch-hosted events
- seasonal / daily challenge feeds

## Authority rule

Generated or remote quiz content must not become trusted merely because an agent or peer supplied it.

Future imported packs should carry:
- source
- version
- validation state
- provenance
- optional signature / receipt
- content rating or moderation metadata

## Scoring rule

Scoring belongs to the game mode, not the question content.

This lets the same question pack power:
- solo quick rounds
- timed rounds
- team play
- elimination
- tournament ladders
- agent-vs-human matches

The question is content. The mode is behavior.
