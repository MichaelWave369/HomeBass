import { useState } from "react";
import { porchNodeFixture } from "./porch";
import { emitHomeBassEvent } from "./houseBus";

const ENTRY_KEY = "homebass.porch.entries.v1";

function readEntries() {
  try {
    const value = Number(localStorage.getItem(ENTRY_KEY) ?? "0");
    return Number.isFinite(value) && value >= 0 ? Math.floor(value) : 0;
  } catch {
    return 0;
  }
}

type FrontPorchProps = {
  onEnterHouse: () => void;
};

export function FrontPorch({ onEnterHouse }: FrontPorchProps) {
  const [entries, setEntries] = useState(readEntries);
  const [porchLight, setPorchLight] = useState(true);
  const [notice, setNotice] = useState("PORCH LIGHT ON // HOUSE OPEN");

  function enterHouse() {
    const next = entries + 1;
    setEntries(next);
    localStorage.setItem(ENTRY_KEY, String(next));
    setNotice("FRONT DOOR // OPEN");
    emitHomeBassEvent({
      type: "porch.entered",
      source: "PORCH",
      summary: "Entered HomeBass through the front door",
      detail: `House entry #${next}`,
      data: { entries: next },
    });
    onEnterHouse();
  }

  function ringBell() {
    setNotice("DING DONG // SOMEBODY YELLED 'COME IN'");
  }

  return (
    <section className={`front-porch-scene ${porchLight ? "lit" : "dark"}`}>
      <div className="porch-sky" aria-hidden="true">
        <span className="porch-moon" />
        <span className="porch-cloud cloud-one" />
        <span className="porch-cloud cloud-two" />
      </div>

      <div className="porch-house-exterior" aria-label="HomeBass exterior">
        <div className="porch-exterior-roof" aria-hidden="true">
          <span className="porch-chimney" />
          <span className="porch-antenna" />
        </div>

        <div className="porch-house-face">
          <span className="porch-window window-left" aria-hidden="true" />
          <span className="porch-window window-right" aria-hidden="true" />

          <button
            type="button"
            className="front-door"
            onClick={enterHouse}
            aria-label="Enter HomeBass"
          >
            <span className="door-number">369</span>
            <span className="door-knob" aria-hidden="true" />
            <strong>ENTER</strong>
          </button>

          <div className="porch-awning" aria-hidden="true" />
          <div className="porch-floor" aria-hidden="true" />

          <button
            type="button"
            className="doorbell"
            onClick={ringBell}
            aria-label="Ring doorbell"
          >
            BELL
          </button>

          <button
            type="button"
            className="porch-light-switch"
            onClick={() => {
              setPorchLight((current) => !current);
              setNotice(
                porchLight
                  ? "PORCH LIGHT OFF // WHY WOULD YOU DO THAT"
                  : "PORCH LIGHT ON // CIVILIZATION RESTORED",
              );
            }}
          >
            LIGHT
          </button>

          <span className="porch-bike" aria-hidden="true">
            <i />
            <i />
            <b />
          </span>
        </div>

        <div className="porch-yard" aria-hidden="true">
          <span className="mailbox">HOME<br />BASS</span>
          <span className="walkway" />
          <span className="yard-grass grass-one" />
          <span className="yard-grass grass-two" />
        </div>
      </div>

      <aside className="porch-status-panel">
        <div>
          <p className="panel-kicker">INFINITE PORCH // {porchNodeFixture.nodeName}</p>
          <h2>Come on in.</h2>
          <p>
            HomeBass starts outside now. The Porch is the boundary between the
            wider commons and the house itself.
          </p>
        </div>

        <div className="porch-notice" aria-live="polite">
          {notice}
        </div>

        <section className="porch-peer-list" aria-labelledby="porch-peer-title">
          <header>
            <span id="porch-peer-title">ON THE PORCH</span>
            <b>{porchNodeFixture.peers.length}</b>
          </header>

          {porchNodeFixture.peers.map((peer) => (
            <div key={peer.id}>
              <span className={`porch-peer-dot ${peer.kind}`} />
              <strong>{peer.name}</strong>
              <small>{peer.kind.toUpperCase()}</small>
              <b>{peer.status}</b>
            </div>
          ))}
        </section>

        <div className="porch-node-meta">
          <div><span>MODE</span><strong>{porchNodeFixture.mode}</strong></div>
          <div><span>TRANSPORT</span><strong>{porchNodeFixture.transport}</strong></div>
          <div><span>ENTRIES</span><strong>{entries}</strong></div>
        </div>

        <button type="button" className="porch-enter-button" onClick={enterHouse}>
          OPEN FRONT DOOR
        </button>

        <p className="microcopy">
          Porch peers are fixtures in v0.10. Real Infinite Porch discovery comes
          through an adapter later.
        </p>
      </aside>
    </section>
  );
}
