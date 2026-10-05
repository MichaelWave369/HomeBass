import { useEffect, useMemo, useState, type CSSProperties } from "react";

type HubRoom = {
  id: string;
  name: string;
  short: string;
  status: string;
  className: string;
};

type WorldHubProps = {
  rooms: HubRoom[];
  selectedId: string;
  visited: string[];
  onSelect: (roomId: string) => void;
  onEnter: (roomId: string) => void;
};

type Position = {
  col: number;
  row: number;
};

const COLS = 3;
const ROWS = 2;

function indexToPosition(index: number): Position {
  return {
    col: index % COLS,
    row: Math.floor(index / COLS),
  };
}

function positionToIndex(position: Position) {
  return position.row * COLS + position.col;
}

export function WorldHub({
  rooms,
  selectedId,
  visited,
  onSelect,
  onEnter,
}: WorldHubProps) {
  const selectedIndex = Math.max(
    0,
    rooms.findIndex((room) => room.id === selectedId),
  );

  const [position, setPosition] = useState<Position>(
    indexToPosition(selectedIndex),
  );
  const [facing, setFacing] = useState<"left" | "right">("right");
  const [moving, setMoving] = useState(false);

  const currentIndex = positionToIndex(position);
  const currentRoom = rooms[currentIndex] ?? rooms[0];

  useEffect(() => {
    const next = indexToPosition(selectedIndex);
    setPosition(next);
  }, [selectedIndex]);

  useEffect(() => {
    if (currentRoom && currentRoom.id !== selectedId) {
      onSelect(currentRoom.id);
    }
  }, [currentRoom, onSelect, selectedId]);

  const avatarStyle = useMemo(
    () => ({
      "--avatar-x": `${position.col * 33.333 + 16.666}%`,
      "--avatar-y": `${position.row * 50 + 74}%`,
    }) as CSSProperties,
    [position],
  );

  function move(dx: number, dy: number) {
    setPosition((current) => {
      const next = {
        col: Math.max(0, Math.min(COLS - 1, current.col + dx)),
        row: Math.max(0, Math.min(ROWS - 1, current.row + dy)),
      };

      if (dx < 0) setFacing("left");
      if (dx > 0) setFacing("right");

      setMoving(true);
      window.setTimeout(() => setMoving(false), 150);
      return next;
    });
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        return;
      }

      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        event.preventDefault();
        move(-1, 0);
      } else if (
        event.key === "ArrowRight" ||
        event.key.toLowerCase() === "d"
      ) {
        event.preventDefault();
        move(1, 0);
      } else if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") {
        event.preventDefault();
        move(0, -1);
      } else if (
        event.key === "ArrowDown" ||
        event.key.toLowerCase() === "s"
      ) {
        event.preventDefault();
        move(0, 1);
      } else if (event.key === "Enter" && currentRoom) {
        event.preventDefault();
        onEnter(currentRoom.id);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentRoom, onEnter]);

  return (
    <>
      <div className="walkable-house" aria-label="Walkable HomeBass house">
        <div className="house-room-grid">
          {rooms.map((room, index) => {
            const selected = index === currentIndex;
            const isVisited = visited.includes(room.id);

            return (
              <button
                type="button"
                key={room.id}
                className={`world-room ${room.className} ${selected ? "selected" : ""}`}
                onClick={() => {
                  const nextPosition = indexToPosition(index);
                  setPosition(nextPosition);
                  onSelect(room.id);
                }}
                onDoubleClick={() => onEnter(room.id)}
                aria-pressed={selected}
              >
                <span className="world-room-light" aria-hidden="true" />
                <span className="world-room-sign">{room.name}</span>
                <span className="world-room-short">{room.short}</span>
                <span className="world-room-status">{room.status}</span>
                <span className="world-room-furniture" aria-hidden="true" />
                <span className="world-room-door" aria-hidden="true" />
                {isVisited && <span className="world-visited">✓</span>}
              </button>
            );
          })}
        </div>

        <div
          className={`world-avatar facing-${facing} ${moving ? "moving" : ""}`}
          style={avatarStyle}
          aria-label={`Player standing by ${currentRoom?.name ?? "HomeBass"}`}
        >
          <span className="avatar-shadow" aria-hidden="true" />
          <span className="avatar-sprite" aria-hidden="true">
            <i className="avatar-hair" />
            <i className="avatar-head" />
            <i className="avatar-shirt" />
            <i className="avatar-legs" />
          </span>
          <span className="avatar-label">YOU</span>
        </div>

        <div className="world-hint">
          <span>MOVE: WASD / ARROWS</span>
          <strong>ENTER: GO IN</strong>
        </div>
      </div>

      <div className="mobile-dpad" aria-label="Movement controls">
        <button type="button" onClick={() => move(0, -1)} aria-label="Move up">▲</button>
        <button type="button" onClick={() => move(-1, 0)} aria-label="Move left">◀</button>
        <button
          type="button"
          className="dpad-enter"
          onClick={() => currentRoom && onEnter(currentRoom.id)}
        >
          ENTER
        </button>
        <button type="button" onClick={() => move(1, 0)} aria-label="Move right">▶</button>
        <button type="button" onClick={() => move(0, 1)} aria-label="Move down">▼</button>
      </div>
    </>
  );
}
