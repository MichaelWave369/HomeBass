import { useMemo, useState } from "react";
import type { HangoutHotspot, Presence } from "./events";

const presences: Presence[] = [
  {
    id: "mikey",
    name: "Mikey",
    handle: "MIKEYMOREBOUNCE",
    kind: "human",
    status: "HOST",
    activity: "Holding down the couch",
  },
  {
    id: "vessie",
    name: "Vessie",
    handle: "VESSIE",
    kind: "agent",
    status: "AROUND",
    activity: "Watching Last Credit attract mode",
  },
  {
    id: "fieldliaison",
    name: "Field Liaison",
    handle: "FIELDLIAISON",
    kind: "agent",
    status: "ONLINE",
    activity: "Reading the board by the phone",
  },
];

const hotspots: HangoutHotspot[] = [
  {
    id: "couch",
    label: "The Couch",
    eyebrow: "COMMONS",
    detail:
      "The default social spot. Presence, idle chat, invites, and agent conversation eventually land here.",
  },
  {
    id: "phone",
    label: "House Phone",
    eyebrow: "CALLS",
    detail:
      "A future Commonline endpoint for calls, goofy soundboards, group lines, and incoming Porch connections.",
  },
  {
    id: "bulletin",
    label: "Bulletin Board",
    eyebrow: "TONIGHT",
    detail:
      "Events, daily challenges, tournament notices, BBS posts, and little scraps of community life.",
  },
  {
    id: "stairs",
    label: "Basement Stairs",
    eyebrow: "DOWNSTAIRS",
    detail:
      "The shortcut to Last Credit. You can already hear one cabinet making noises nobody has heard since 1993.",
  },
];

export function HangoutRoom() {
  const [selectedHotspotId, setSelectedHotspotId] = useState(hotspots[0].id);

  const selectedHotspot = useMemo(
    () =>
      hotspots.find((hotspot) => hotspot.id === selectedHotspotId) ??
      hotspots[0],
    [selectedHotspotId],
  );

  return (
    <div className="hangout-experience">
      <div className="hangout-scene" aria-label="The Hangout commons">
        <div className="hangout-wall" aria-hidden="true">
          <span className="poster poster-one">NO COVER</span>
          <span className="poster poster-two">SIDE A</span>
          <span className="window-glow" />
        </div>

        <button
          type="button"
          className="hotspot hotspot-phone"
          aria-pressed={selectedHotspotId === "phone"}
          onClick={() => setSelectedHotspotId("phone")}
        >
          <span className="pixel-phone" aria-hidden="true" />
          <strong>HOUSE PHONE</strong>
        </button>

        <button
          type="button"
          className="hotspot hotspot-board"
          aria-pressed={selectedHotspotId === "bulletin"}
          onClick={() => setSelectedHotspotId("bulletin")}
        >
          <span className="pixel-board" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <strong>BOARD</strong>
        </button>

        <button
          type="button"
          className="hotspot hotspot-couch"
          aria-pressed={selectedHotspotId === "couch"}
          onClick={() => setSelectedHotspotId("couch")}
        >
          <span className="pixel-couch" aria-hidden="true" />
          <strong>THE COUCH</strong>
        </button>

        <button
          type="button"
          className="hotspot hotspot-stairs"
          aria-pressed={selectedHotspotId === "stairs"}
          onClick={() => setSelectedHotspotId("stairs")}
        >
          <span className="pixel-stairs" aria-hidden="true" />
          <strong>BASEMENT</strong>
        </button>

        <div className="hangout-rug" aria-hidden="true" />

        <div className="presence-row" aria-label="People and agents here now">
          {presences.map((presence) => (
            <article className={`presence ${presence.kind}`} key={presence.id}>
              <span className="presence-sprite" aria-hidden="true">
                <i className="sprite-head" />
                <i className="sprite-body" />
                <i className="sprite-feet" />
              </span>
              <div>
                <strong>{presence.name}</strong>
                <span>@{presence.handle}</span>
              </div>
              <b>{presence.status}</b>
            </article>
          ))}
        </div>
      </div>

      <div className="hangout-console">
        <div className="hangout-console-copy">
          <p className="panel-kicker">{selectedHotspot.eyebrow}</p>
          <h3>{selectedHotspot.label}</h3>
          <p>{selectedHotspot.detail}</p>
        </div>

        <section className="presence-list" aria-labelledby="presence-heading">
          <div className="presence-list-title">
            <span id="presence-heading">IN THE HOUSE</span>
            <strong>{presences.length}</strong>
          </div>
          {presences.map((presence) => (
            <div className="presence-list-row" key={presence.id}>
              <span className={`presence-dot ${presence.kind}`} aria-hidden="true" />
              <div>
                <strong>{presence.name}</strong>
                <small>{presence.activity}</small>
              </div>
              <b>{presence.kind.toUpperCase()}</b>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
