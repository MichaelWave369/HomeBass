# N.E.R.D.S. — Achievement & Receipt Contract

**N.E.R.D.S.** stands for **Nostalgia Experience Records & Distinction System**.

It is HomeBass's cross-house achievement layer.

The long-term goal is not merely cosmetic badges. N.E.R.D.S. should be able to explain why an achievement is unlocked and what evidence supports it.

## v0.8 behavior

- global N.E.R.D.S. ledger panel
- achievement catalog
- local evidence collector
- evidence-backed unlock evaluation
- aggregate NERD points
- manual evidence refresh
- local-only evidence source labels
- reserved future path for signed PhiOS / Infinite Porch receipts

## Initial achievements

- FIRST NIGHT
- CALLER ID
- SYSOP ENERGY
- LABEL MAKER
- HOT SHOT
- BE KIND, REWIND
- LAST CREDIT

## Evidence rule

An achievement should be derived from evidence, not silently toggled by UI code.

For v0.8 that evidence is browser-local state.

Future evidence may come from:
- signed PhiOS receipts
- Infinite Porch events
- PhiCade score receipts
- verified multiplayer sessions
- PHIAudio / PHIVid creation records
- agent activity receipts
- local device events

## Authority rule

A pretty badge is not proof.

N.E.R.D.S. should preserve the distinction between:
1. display state,
2. local evidence,
3. signed evidence,
4. externally verified evidence.

This lets HomeBass stay playful while still fitting the wider PhiOS capability / authority model.

## Portability

N.E.R.D.S. achievements should be portable across HomeBass interfaces because the evaluation lives in a shared data contract, not in one visual component.
