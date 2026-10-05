# Tape Deck — Audio Surface Contract

Tape Deck is HomeBass's physical-feeling music room.

The interface is intentionally modeled around cassettes, sides, track indexes, transport buttons, labels, and stereo hardware rather than a generic streaming-player layout.

## v0.5 behavior

- cassette deck presentation
- Side A / Side B switching
- play, stop, rewind, fast-forward, and record controls
- persistent local mixtape label
- selectable tape index
- animated reels / speaker response while playing
- reserved adapter surfaces for JukeBot, PHIAudio, and a local music library
- mobile-responsive layout

## Current audio behavior

No copyrighted or remote audio is bundled.

The current deck models playback state and transport behavior only. Track entries are original HomeBass fixtures.

## Future adapter boundary

A later audio adapter may supply:

- actual playback URLs or local handles
- duration / progress events
- metadata
- waveform or level information
- queue updates
- device routing
- shared-listening synchronization
- agent DJ actions

Tape Deck should not need to know whether audio originates from JukeBot, PHIAudio, local files, or a Porch-shared source.

## Mixtape rule

A playlist is represented as a cassette artifact.

That means future mixtapes can carry:
- title
- Side A / Side B ordering
- artwork / label
- liner notes
- provenance
- sharing permissions
- optional signed creation receipt

The cassette is the user-facing object. The queue is implementation detail.
