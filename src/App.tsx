import { useEffect, useMemo, useState } from "react";
import { HangoutRoom } from "./world/HangoutRoom";
import { LastCreditRoom } from "./world/LastCreditRoom";
import { AfterHoursBbsRoom } from "./world/AfterHoursBbsRoom";
import { TapeDeckRoom } from "./world/TapeDeckRoom";
import { HotShotsRoom } from "./world/HotShotsRoom";
import { LackLusterRoom } from "./world/LackLusterRoom";
import { NerdsPanel } from "./world/NerdsPanel";
import { WorldHub } from "./world/WorldHub";
import { FrontPorch } from "./world/FrontPorch";

type Room = {
  id: string;
  name: string;
  short: string;
  subtitle: string;
  description: string;
  status: string;
  className: string;
};

const rooms: Room[] = [
  {
    id: "hangout",
    name: "The Hangout",
    short: "COMMONS",
    subtitle: "The heart of HomeBass",
    description:
      "The shared room: couches, people, agents, chatter, invitations, and whatever is happening tonight.",
    status: "OPEN",
    className: "room-hangout",
  },
  {
    id: "last-credit",
    name: "Last Credit",
    short: "ARCADE",
    subtitle: "One more game",
    description:
      "Cabinets, original mini-games, PhiCade titles, scoreboards, tournaments, replays, and agent challengers.",
    status: "1UP",
    className: "room-arcade",
  },
  {
    id: "afterhours",
    name: "AfterHours BBS",
    short: "BBS",
    subtitle: "14.4K node connected",
    description:
      "Boards, handles, messages, door games, local communities, and Porch-native social traffic through a terminal.",
    status: "ONLINE",
    className: "room-bbs",
  },
  {
    id: "tape-deck",
    name: "Tape Deck",
    short: "A / B",
    subtitle: "Make a mixtape",
    description:
      "Music, playlists-as-cassettes, JukeBot, PHIAudio, agent DJs, local libraries, and shared listening.",
    status: "PLAY",
    className: "room-tape",
  },
  {
    id: "hot-shots",
    name: "Hot Shots",
    short: "QUIZ",
    subtitle: "Prove that useless memory",
    description:
      "Retro quizzes, timeline games, audio clues, daily challenges, team nights, and deeply unnecessary arguments about 1987.",
    status: "READY",
    className: "room-quiz",
  },
  {
    id: "lackluster",
    name: "LackLuster",
    short: "VIDEO",
    subtitle: "Be kind. Or don't. Rewind.",
    description:
      "A pixel video store for movie and TV culture, VHS browsing, trivia, PHIVid, Paracut, and shared watch rooms.",
    status: "OPEN",
    className: "room-video",
  },
];

const VISITED_KEY = "homebass.visited.v1";

function loadVisited(): string[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(VISITED_KEY) ?? "[]");
    return Array.isArray(parsed)
      ? parsed.filter((value): value is string => typeof value === "string")
      : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [selectedId, setSelectedId] = useState(rooms[0].id);
  const [enteredRoom, setEnteredRoom] = useState<Room | null>(null);
  const [visited, setVisited] = useState<string[]>(loadVisited);
  const [nerdsOpen, setNerdsOpen] = useState(false);
  const [scene, setScene] = useState<"porch" | "house">("porch");

  const selected = useMemo(
    () => rooms.find((room) => room.id === selectedId) ?? rooms[0],
    [selectedId],
  );

  const allVisited = rooms.every((room) => visited.includes(room.id));

  useEffect(() => {
    localStorage.setItem(VISITED_KEY, JSON.stringify(visited));
  }, [visited]);

  useEffect(() => {
    if (!enteredRoom) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setEnteredRoom(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enteredRoom]);

  function enter(room: Room) {
    setSelectedId(room.id);
    setEnteredRoom(room);
    setVisited((current) =>
      current.includes(room.id) ? current : [...current, room.id],
    );
  }

  return (
    <main className="app-shell">
      <div className="night-sky" aria-hidden="true" />

      <header className="topbar">
        <div>
          <p className="eyebrow">INFINITE PORCH // COMMONS NODE</p>
          <h1>HOME<span>BASS</span></h1>
          <p className="tagline">Come hang out.</p>
        </div>

        <div className="hud" aria-label="HomeBass status">
          <div><span>NODE</span><strong>LOCAL</strong></div>
          <div><span>HOUSE</span><strong>OPEN</strong></div>
          <div><span>VISITED</span><strong>{visited.length}/{rooms.length}</strong></div>
        </div>
      </header>

      {scene === "porch" ? (
        <FrontPorch onEnterHouse={() => setScene("house")} />
      ) : (
        <section className="world-layout">
          <div className="house-wrap">
            <div className="roof" aria-hidden="true">
              <span className="chimney" />
              <span className="antenna" />
            </div>

            <WorldHub
              rooms={rooms}
              selectedId={selected.id}
              visited={visited}
              onSelect={setSelectedId}
              onEnter={(roomId) => {
                const room = rooms.find((candidate) => candidate.id === roomId);
                if (room) enter(room);
              }}
            />

            <div className="foundation">
              <div className="speaker">
                <span className="woofer woofer-small" />
                <span className="woofer woofer-large" />
              </div>
              <div className="foundation-copy">
                <span>HOMEBASE SIGNAL</span>
                <strong>LOW END // HIGH TRUST</strong>
              </div>
              <button
                type="button"
                className="return-porch-button"
                onClick={() => setScene("porch")}
              >
                FRONT PORCH
              </button>
            </div>
          </div>

          <aside className="room-panel">
            <p className="panel-kicker">{selected.short}</p>
            <h2>{selected.name}</h2>
            <p className="panel-subtitle">{selected.subtitle}</p>
            <p>{selected.description}</p>

            <button className="enter-button" onClick={() => enter(selected)}>
              ENTER ROOM
            </button>

            <p className="microcopy">
              Walk with WASD / arrows, press Enter at a room, or click directly.
            </p>

            <button
              type="button"
              className={`nerds-card nerds-card-button ${allVisited ? "unlocked" : ""}`}
              onClick={() => setNerdsOpen(true)}
            >
              <div>
                <span>N.E.R.D.S.</span>
                <strong>{allVisited ? "FIRST NIGHT UNLOCKED" : "OPEN RECORDS"}</strong>
              </div>
              <b>{visited.length}/{rooms.length}</b>
            </button>
          </aside>
        </section>
      )}

      <footer className="ticker" aria-label="HomeBass activity">
        <span className="ticker-label">AFTERHOURS</span>
        <div className="ticker-track">
          THE HANGOUT IS OPEN · LAST CREDIT ATTRACT MODE RUNNING · TAPE DECK SIDE A READY · NO COVER CHARGE ·
        </div>
      </footer>

      {nerdsOpen && <NerdsPanel onClose={() => setNerdsOpen(false)} />}

      {enteredRoom && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setEnteredRoom(null)}>
          <section
            className={`room-modal ${enteredRoom.className}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="room-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={() => setEnteredRoom(null)}
              aria-label="Close room"
            >
              ×
            </button>
            <p className="panel-kicker">{enteredRoom.short}</p>
            <h2 id="room-modal-title">{enteredRoom.name}</h2>
            <p className="panel-subtitle">{enteredRoom.subtitle}</p>
            {enteredRoom.id === "hangout" ? (
              <HangoutRoom />
            ) : enteredRoom.id === "last-credit" ? (
              <LastCreditRoom />
            ) : enteredRoom.id === "afterhours" ? (
              <AfterHoursBbsRoom />
            ) : enteredRoom.id === "tape-deck" ? (
              <TapeDeckRoom />
            ) : enteredRoom.id === "hot-shots" ? (
              <HotShotsRoom />
            ) : enteredRoom.id === "lackluster" ? (
              <LackLusterRoom />
            ) : (
              <>
                <div className="modal-scene">
                  <span className="modal-sign">{enteredRoom.status}</span>
                  <span className="modal-floor" />
                  <span className="modal-prop prop-one" />
                  <span className="modal-prop prop-two" />
                </div>
                <p>{enteredRoom.description}</p>
                <p className="microcopy">
                  Room shell. Future modules mount here through shared HomeBass contracts.
                </p>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
