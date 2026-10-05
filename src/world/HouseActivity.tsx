import { useEffect, useState } from "react";
import {
  clearHomeBassEvents,
  readHomeBassEvents,
  subscribeHomeBassEvents,
  type HomeBassEvent,
} from "./houseBus";

function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--:--";
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function HouseActivity() {
  const [events, setEvents] = useState<HomeBassEvent[]>(readHomeBassEvents);
  const [open, setOpen] = useState(false);

  useEffect(
    () =>
      subscribeHomeBassEvents((event) => {
        setEvents((current) => [...current, event].slice(-60));
      }),
    [],
  );

  const recent = events.slice(-6).reverse();

  return (
    <section className={`house-activity ${open ? "open" : ""}`}>
      <button
        type="button"
        className="house-activity-toggle"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
      >
        <span>HOUSE BUS</span>
        <strong>{events.length}</strong>
        <b>{open ? "CLOSE" : "ACTIVITY"}</b>
      </button>

      {open && (
        <div className="house-activity-panel">
          <header>
            <div>
              <span>RECENT ACTIVITY</span>
              <strong>LOCAL EVENT LEDGER</strong>
            </div>
            <button
              type="button"
              onClick={() => {
                clearHomeBassEvents();
                setEvents([]);
              }}
            >
              CLEAR
            </button>
          </header>

          <div className="house-activity-list">
            {recent.length === 0 ? (
              <p>NO HOUSE EVENTS YET.</p>
            ) : (
              recent.map((event) => (
                <article key={event.id}>
                  <time>{formatTime(event.createdAt)}</time>
                  <div>
                    <span>{event.source}</span>
                    <strong>{event.summary}</strong>
                    {event.detail && <small>{event.detail}</small>}
                  </div>
                </article>
              ))
            )}
          </div>

          <footer>
            LOCAL BUS // ADAPTERS MAY FORWARD VERIFIED EVENTS LATER
          </footer>
        </div>
      )}
    </section>
  );
}
