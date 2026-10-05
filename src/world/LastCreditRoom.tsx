import { useMemo, useState } from "react";
import { arcadeCabinets, type ArcadeCabinet } from "./arcade";
import { emitHomeBassEvent } from "./houseBus";

const CREDIT_KEY = "homebass.last-credit.credits.v1";
const SPENT_KEY = "homebass.last-credit.spent.v1";

function loadCredits() {
  try {
    const raw = Number(localStorage.getItem(CREDIT_KEY));
    return Number.isFinite(raw) && raw >= 0 ? Math.floor(raw) : 1;
  } catch {
    return 1;
  }
}

function formatScore(score: number) {
  return score.toLocaleString("en-US");
}

export function LastCreditRoom() {
  const [selectedId, setSelectedId] = useState(arcadeCabinets[0].id);
  const [credits, setCredits] = useState(loadCredits);
  const [notice, setNotice] = useState("ATTRACT MODE // INSERT CREDIT");

  const selected = useMemo(
    () =>
      arcadeCabinets.find((cabinet) => cabinet.id === selectedId) ??
      arcadeCabinets[0],
    [selectedId],
  );

  function addCredit() {
    setCredits((current) => {
      const next = Math.min(current + 1, 99);
      localStorage.setItem(CREDIT_KEY, String(next));
      return next;
    });
    setNotice("CREDIT ADDED");
  }

  function launch(cabinet: ArcadeCabinet) {
    if (cabinet.status !== "READY") {
      setNotice(`${cabinet.title.toUpperCase()} // CABINET NOT WIRED YET`);
      return;
    }

    if (credits <= 0) {
      setNotice("INSERT CREDIT");
      return;
    }

    setCredits((current) => {
      const next = Math.max(0, current - 1);
      localStorage.setItem(CREDIT_KEY, String(next));
      const spent = Number(localStorage.getItem(SPENT_KEY) ?? "0");
      localStorage.setItem(
        SPENT_KEY,
        String(Number.isFinite(spent) ? Math.max(0, spent) + 1 : 1),
      );
      return next;
    });

    emitHomeBassEvent({
      type: "arcade.launched",
      source: "LAST CREDIT",
      summary: `Started ${cabinet.title}`,
      detail: `${cabinet.source.toUpperCase()} cabinet`,
      data: { cabinetId: cabinet.id, source: cabinet.source },
    });
    setNotice(`${cabinet.title.toUpperCase()} // LAUNCH RECEIPT QUEUED`);
  }

  return (
    <div className="last-credit-experience">
      <section className="arcade-floor" aria-label="Last Credit arcade floor">
        <div className="arcade-marquee">
          <span>LAST CREDIT</span>
          <strong>{notice}</strong>
        </div>

        <div className="cabinet-row">
          {arcadeCabinets.map((cabinet) => {
            const active = cabinet.id === selected.id;
            return (
              <button
                type="button"
                className={`arcade-cabinet accent-${cabinet.accent} ${active ? "active" : ""}`}
                key={cabinet.id}
                onClick={() => setSelectedId(cabinet.id)}
                onDoubleClick={() => launch(cabinet)}
                aria-pressed={active}
              >
                <span className="cabinet-top">{cabinet.title}</span>
                <span className="cabinet-screen" aria-hidden="true">
                  <i className="scan-one" />
                  <i className="scan-two" />
                  <b>{cabinet.status === "READY" ? "PRESS START" : "SOON"}</b>
                </span>
                <span className="cabinet-controls" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="cabinet-coin-slot">25¢</span>
              </button>
            );
          })}
        </div>

        <div className="arcade-carpet" aria-hidden="true" />
      </section>

      <aside className="arcade-console">
        <div className="credit-bank">
          <span>CREDITS</span>
          <strong>{String(credits).padStart(2, "0")}</strong>
          <button type="button" onClick={addCredit}>INSERT CREDIT</button>
        </div>

        <section className="cabinet-detail">
          <p className="panel-kicker">{selected.source.toUpperCase()}</p>
          <h3>{selected.title}</h3>
          <p className="arcade-subtitle">{selected.subtitle}</p>

          <dl>
            <div>
              <dt>STATUS</dt>
              <dd>{selected.status}</dd>
            </div>
            <div>
              <dt>PLAYERS</dt>
              <dd>{selected.players}</dd>
            </div>
            <div>
              <dt>HIGH SCORE</dt>
              <dd>
                {selected.highScore > 0
                  ? formatScore(selected.highScore)
                  : "---"}
              </dd>
            </div>
            <div>
              <dt>HANDLE</dt>
              <dd>{selected.highScoreHandle}</dd>
            </div>
          </dl>

          <button
            type="button"
            className="arcade-start"
            onClick={() => launch(selected)}
          >
            {selected.status === "READY" ? "START GAME" : "VIEW CABINET"}
          </button>
        </section>

        <section className="scoreboard" aria-labelledby="scoreboard-heading">
          <div className="scoreboard-title">
            <span id="scoreboard-heading">HOUSE SCORES</span>
            <b>TOP 3</b>
          </div>
          <ol>
            <li><span>MIKEYMOREBOUNCE</span><strong>983200</strong></li>
            <li><span>VESSIE</span><strong>812400</strong></li>
            <li><span>FIELDLIAISON</span><strong>620300</strong></li>
          </ol>
        </section>
      </aside>
    </div>
  );
}
