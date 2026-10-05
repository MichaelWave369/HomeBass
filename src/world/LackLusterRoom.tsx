import { useMemo, useState } from "react";
import { videoTapes, type VideoGenre, type VideoTape } from "./lackluster";
import { emitHomeBassEvent } from "./houseBus";

const RENTALS_KEY = "homebass.lackluster.rentals.v1";

function loadRentals(): string[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(RENTALS_KEY) ?? "[]");
    return Array.isArray(parsed)
      ? parsed.filter((value): value is string => typeof value === "string")
      : [];
  } catch {
    return [];
  }
}

function formatRuntime(minutes: number) {
  if (minutes <= 0) return "---";
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return `${hours}h ${remainder}m`;
}

export function LackLusterRoom() {
  const [genre, setGenre] = useState<VideoGenre | "ALL">("ALL");
  const [selectedId, setSelectedId] = useState(videoTapes[0].id);
  const [rentals, setRentals] = useState<string[]>(loadRentals);
  const [notice, setNotice] = useState("WELCOME TO LACKLUSTER VIDEO");

  const visibleTapes = useMemo(
    () =>
      genre === "ALL"
        ? videoTapes
        : videoTapes.filter((tape) => tape.genre === genre),
    [genre],
  );

  const selected =
    videoTapes.find((tape) => tape.id === selectedId) ?? videoTapes[0];

  function rentTape(tape: VideoTape) {
    if (tape.source !== "homebass") {
      setNotice(`${tape.title.toUpperCase()} // ADAPTER NOT CONNECTED`);
      return;
    }

    const exists = rentals.includes(tape.id);
    const next = exists
      ? rentals.filter((id) => id !== tape.id)
      : [...rentals, tape.id];

    setRentals(next);
    localStorage.setItem(RENTALS_KEY, JSON.stringify(next));
    emitHomeBassEvent({
      type: exists ? "video.returned" : "video.rented",
      source: "LACKLUSTER",
      summary: `${exists ? "Returned" : "Rented"} ${tape.title}`,
      detail: `${tape.year} // ${tape.genre}`,
      data: { tapeId: tape.id, year: tape.year, rented: !exists },
    });
    setNotice(
      exists
        ? `${tape.title.toUpperCase()} // RETURNED`
        : `${tape.title.toUpperCase()} // RENTED`,
    );
  }

  return (
    <div className="lackluster-experience">
      <section className="video-store" aria-label="LackLuster video store">
        <div className="video-store-marquee">
          <span>LACKLUSTER VIDEO</span>
          <strong>{notice}</strong>
        </div>

        <div className="genre-strip" aria-label="Video genres">
          {(["ALL", "ACTION", "HORROR", "SCI-FI", "COMEDY", "CULT"] as const).map(
            (item) => (
              <button
                type="button"
                key={item}
                className={genre === item ? "active" : ""}
                onClick={() => setGenre(item)}
              >
                {item}
              </button>
            ),
          )}
        </div>

        <div className="video-shelves">
          {visibleTapes.map((tape) => {
            const rented = rentals.includes(tape.id);
            const selectedTape = selected.id === tape.id;

            return (
              <button
                type="button"
                key={tape.id}
                className={`vhs-case ${selectedTape ? "selected" : ""} ${rented ? "rented" : ""}`}
                onClick={() => setSelectedId(tape.id)}
                onDoubleClick={() => rentTape(tape)}
                aria-pressed={selectedTape}
              >
                <span className="vhs-cover-art" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <strong>{tape.title}</strong>
                <span>{tape.year}</span>
                {tape.staffPick && <b>STAFF PICK</b>}
                {rented && <em>OUT</em>}
              </button>
            );
          })}
        </div>

        <div className="rental-counter">
          <span>RETURNS</span>
          <strong>BE KIND. OR DON'T. JUST REWIND.</strong>
          <b>LATE FEE: $3.50*</b>
        </div>
      </section>

      <aside className="video-sidecar">
        <section className="membership-card">
          <p className="panel-kicker">MEMBER CARD</p>
          <h3>LACKLUSTER #000369</h3>
          <dl>
            <div><dt>RENTALS OUT</dt><dd>{rentals.length}</dd></div>
            <div><dt>ACCOUNT</dt><dd>ACTIVE</dd></div>
            <div><dt>LATE FEES</dt><dd>$0.00</dd></div>
            <div><dt>SHAME</dt><dd>MODERATE</dd></div>
          </dl>
        </section>

        <section className="selected-tape">
          <span>{selected.genre}</span>
          <h3>{selected.title}</h3>
          <p>
            {selected.year} · {selected.rating} · {formatRuntime(selected.runtimeMinutes)}
          </p>

          <div className="tape-source">
            <span>SOURCE</span>
            <strong>{selected.source.toUpperCase()}</strong>
          </div>

          <button type="button" onClick={() => rentTape(selected)}>
            {selected.source !== "homebass"
              ? "VIEW SHELF"
              : rentals.includes(selected.id)
                ? "RETURN TAPE"
                : "RENT TAPE"}
          </button>
        </section>

        <section className="staff-picks">
          <span>STAFF PICKS</span>
          {videoTapes
            .filter((tape) => tape.staffPick)
            .map((tape) => (
              <button
                type="button"
                key={tape.id}
                onClick={() => setSelectedId(tape.id)}
              >
                <strong>{tape.title}</strong>
                <b>{tape.year}</b>
              </button>
            ))}
        </section>

        <section className="video-adapters">
          <span>BACK ROOM</span>
          <div><strong>PHIVid</strong><b>RESERVED</b></div>
          <div><strong>Paracut</strong><b>RESERVED</b></div>
          <div><strong>Watch Rooms</strong><b>PLANNED</b></div>
        </section>
      </aside>
    </div>
  );
}
