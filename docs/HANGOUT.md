# The Hangout — Commons Contract

The Hangout is HomeBass's default social room and the visual commons for Infinite Porch presence.

## v0.2 behavior

- Shows a lived-in room rather than a generic presence dashboard.
- Renders human and agent occupants through the same presence shape.
- Provides interactive room hotspots:
  - The Couch
  - House Phone
  - Bulletin Board
  - Basement Stairs
- Keeps all occupants and hotspots keyboard-addressable.
- Uses the same visual language as the HomeBass world shell.

## Presence model

```ts
type Presence = {
  id: string;
  name: string;
  handle: string;
  kind: "human" | "agent";
  status: string;
  activity: string;
};
```

The current occupants are fixture data. A later Porch adapter should replace those fixtures without changing the room component's basic contract.

## Intended adapters

- Infinite Porch → live peer / agent presence
- Commonline → House Phone
- AfterHours BBS → Bulletin Board notices
- Last Credit → Basement activity / game invites
- N.E.R.D.S. → social and room achievements

## Design rule

Protocol state should become understandable world state whenever possible.

A connected peer is not merely a number in a status panel. In HomeBass, it can be somebody in the room.
