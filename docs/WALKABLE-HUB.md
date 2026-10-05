# Walkable House Hub — v0.9

HomeBass should increasingly behave like a place, not a menu.

v0.9 establishes the first movement layer for the house shell.

## Controls

Desktop:
- Arrow keys or WASD move between room zones.
- Enter opens the currently selected room.
- Mouse / pointer still works for direct room selection and entry.

Mobile:
- On-screen directional controls move the avatar.
- ENTER opens the selected room.

## World model

The first hub is intentionally grid-based: six canonical spaces arranged in a 3 × 2 house layout.

This is not the final movement engine.

The purpose of this rung is to establish:
- a player position,
- room adjacency,
- keyboard and touch navigation,
- room selection derived from world position,
- a visible avatar,
- a clean seam for future free movement.

## Future evolution

The grid can later be replaced with a more continuous map without changing room modules.

Potential future additions:
- collision maps
- doors / stairs
- animated room transitions
- NPC and agent movement
- Porch peers walking through the commons
- exterior yard / porch
- day and night state
- room-to-room audio bleed
- controller / gamepad input

## Accessibility rule

World navigation must never be the only way to access a room.

Pointer controls, keyboard focus, semantic buttons, and direct room entry remain available alongside the game-like movement layer.
