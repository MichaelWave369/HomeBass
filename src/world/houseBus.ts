export type HomeBassEventType =
  | "porch.entered"
  | "room.entered"
  | "arcade.launched"
  | "bbs.message.posted"
  | "tape.played"
  | "tape.labeled"
  | "quiz.completed"
  | "video.rented"
  | "video.returned"
  | "nerds.opened";

export type HomeBassEventSource =
  | "PORCH"
  | "HOUSE"
  | "LAST CREDIT"
  | "AFTERHOURS"
  | "TAPE DECK"
  | "HOT SHOTS"
  | "LACKLUSTER"
  | "N.E.R.D.S.";

export type HomeBassEvent = {
  id: string;
  type: HomeBassEventType;
  source: HomeBassEventSource;
  summary: string;
  detail?: string;
  createdAt: string;
  data?: Record<string, string | number | boolean>;
};

const LEDGER_KEY = "homebass.house-bus.events.v1";
const EVENT_NAME = "homebass:event";
const MAX_EVENTS = 60;

function safeParse(raw: string | null): HomeBassEvent[] {
  if (!raw) return [];
  try {
    const value = JSON.parse(raw);
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function readHomeBassEvents(): HomeBassEvent[] {
  try {
    return safeParse(localStorage.getItem(LEDGER_KEY));
  } catch {
    return [];
  }
}

export function emitHomeBassEvent(
  event: Omit<HomeBassEvent, "id" | "createdAt">,
): HomeBassEvent {
  const fullEvent: HomeBassEvent = {
    ...event,
    id: `hb-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };

  try {
    const next = [...readHomeBassEvents(), fullEvent].slice(-MAX_EVENTS);
    localStorage.setItem(LEDGER_KEY, JSON.stringify(next));
  } catch {
    // The live event still dispatches even when persistence is unavailable.
  }

  window.dispatchEvent(
    new CustomEvent<HomeBassEvent>(EVENT_NAME, { detail: fullEvent }),
  );

  return fullEvent;
}

export function subscribeHomeBassEvents(
  listener: (event: HomeBassEvent) => void,
): () => void {
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<HomeBassEvent>;
    listener(customEvent.detail);
  };

  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
}

export function clearHomeBassEvents() {
  try {
    localStorage.removeItem(LEDGER_KEY);
  } catch {
    // Nothing else to do.
  }
}
