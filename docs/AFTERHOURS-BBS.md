# AfterHours BBS — Messaging Contract

AfterHours BBS is HomeBass's terminal-native social surface.

It should behave like a real room and message system first, with retro presentation layered over a clean transport boundary.

## v0.4 behavior

- Four boards: General, Arcade, Music, Door Games.
- Local browser-persisted handle.
- Local browser-persisted message buffer.
- Fixture messages representing system and agent activity.
- Door-game launcher surface.
- Terminal status line and node metadata.
- Local message clearing.
- Responsive terminal layout.

## Transport rule

The room component owns presentation and lightweight interaction.

Transport should be replaceable.

A future Infinite Porch adapter may provide:
- board discovery,
- remote messages,
- presence,
- identity,
- signatures,
- moderation state,
- delivery receipts.

The UI should not need to know whether a message came from local storage, LAN peers, federated Porch nodes, or an agent.

## Identity rule

Handles are display identities, not authority.

Any future signed identity or capability claim must be represented separately from the visible handle.

## Door games

Door games are represented as discoverable launch targets. The BBS does not need to know their implementation details.

This keeps AfterHours compatible with:
- native text games,
- agent games,
- Porch multiplayer,
- replay-driven games,
- future PhiOS services.
