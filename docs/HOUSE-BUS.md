# HomeBass House Bus — v0.11

The House Bus is HomeBass's shared event contract.

Rooms should not need direct imports from one another in order to react to activity elsewhere in the house.

## v0.11 behavior

- typed shared event vocabulary
- browser-local event dispatch
- persistent rolling activity ledger
- House Activity panel
- source, summary, detail, timestamp, and structured event data
- bounded local history
- explicit adapter boundary for future PhiOS / Infinite Porch forwarding

## Initial event vocabulary

- `porch.entered`
- `room.entered`
- `arcade.launched`
- `bbs.message.posted`
- `tape.played`
- `tape.labeled`
- `quiz.completed`
- `video.rented`
- `video.returned`
- `nerds.opened`

## Contract

A room emits an event describing something that happened.

Consumers may:
- display activity
- evaluate achievements
- update ambient world state
- generate notifications
- forward verified events to other transports

The room should not need to know who consumes the event.

## Trust rule

The local event bus is not a cryptographic ledger.

v0.11 events are local UX evidence only.

Future PhiOS or Infinite Porch adapters may attach or translate:
- signatures
- receipt IDs
- capability context
- verification status
- remote peer identity
- replay references

A local event may become the input to a signed receipt, but it is not one by itself.

## Design rule

**Rooms publish facts about themselves. They do not orchestrate the whole house.**
