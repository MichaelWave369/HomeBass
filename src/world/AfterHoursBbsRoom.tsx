import { FormEvent, useMemo, useState } from "react";
import {
  bbsBoards,
  doorGames,
  fixtureMessages,
  type BbsBoardId,
  type BbsMessage,
} from "./bbs";
import { emitHomeBassEvent } from "./houseBus";

const STORAGE_KEY = "homebass.afterhours.messages.v1";
const HANDLE_KEY = "homebass.afterhours.handle.v1";

function loadLocalMessages(): BbsMessage[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadHandle() {
  try {
    return localStorage.getItem(HANDLE_KEY) || "GUEST369";
  } catch {
    return "GUEST369";
  }
}

export function AfterHoursBbsRoom() {
  const [boardId, setBoardId] = useState<BbsBoardId>("general");
  const [messages, setMessages] = useState<BbsMessage[]>(loadLocalMessages);
  const [handle, setHandle] = useState(loadHandle);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("NODE 01 // 14.4K // CONNECTED");

  const activeBoard = useMemo(
    () => bbsBoards.find((board) => board.id === boardId) ?? bbsBoards[0],
    [boardId],
  );

  const visibleMessages = useMemo(
    () =>
      [...fixtureMessages, ...messages]
        .filter((message) => message.boardId === boardId)
        .slice(-8),
    [boardId, messages],
  );

  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanBody = draft.trim();
    const cleanHandle = handle.trim().toUpperCase().slice(0, 18) || "GUEST369";

    if (!cleanBody) {
      setStatus("MESSAGE EMPTY // NICE TRY");
      return;
    }

    const nextMessage: BbsMessage = {
      id: `local-${Date.now()}`,
      boardId,
      handle: cleanHandle,
      body: cleanBody.slice(0, 240),
      createdAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      source: "local",
    };

    const next = [...messages, nextMessage].slice(-50);
    setMessages(next);
    setHandle(cleanHandle);
    setDraft("");
    setStatus("MESSAGE POSTED // LOCAL NODE");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    localStorage.setItem(HANDLE_KEY, cleanHandle);
    emitHomeBassEvent({
      type: "bbs.message.posted",
      source: "AFTERHOURS",
      summary: `@${cleanHandle} posted to ${activeBoard.label}`,
      detail: cleanBody.slice(0, 72),
      data: { boardId, handle: cleanHandle },
    });
  }

  function clearLocalMessages() {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
    setStatus("LOCAL MESSAGE BUFFER CLEARED");
  }

  return (
    <div className="afterhours-experience">
      <section className="bbs-terminal" aria-label="AfterHours BBS terminal">
        <div className="bbs-bezel">
          <div className="bbs-screen">
            <header className="bbs-header">
              <div>
                <strong>AFTERHOURS BBS</strong>
                <span>{status}</span>
              </div>
              <b>HOMEBASE NODE</b>
            </header>

            <div className="bbs-layout">
              <nav className="bbs-board-menu" aria-label="BBS boards">
                {bbsBoards.map((board, index) => (
                  <button
                    type="button"
                    key={board.id}
                    className={board.id === boardId ? "active" : ""}
                    aria-pressed={board.id === boardId}
                    onClick={() => {
                      setBoardId(board.id);
                      setStatus(`BOARD ${index + 1} // ${board.label}`);
                    }}
                  >
                    <span>[{index + 1}]</span>
                    <strong>{board.label}</strong>
                  </button>
                ))}
              </nav>

              <section className="bbs-message-pane" aria-live="polite">
                <div className="bbs-board-heading">
                  <span>{activeBoard.label}</span>
                  <small>{activeBoard.description}</small>
                </div>

                {boardId === "doors" ? (
                  <div className="door-grid">
                    {doorGames.map((game) => (
                      <button
                        type="button"
                        key={game.id}
                        onClick={() =>
                          setStatus(
                            game.status === "READY"
                              ? `${game.title.toUpperCase()} // DOOR OPEN REQUEST`
                              : `${game.title.toUpperCase()} // NOT INSTALLED`,
                          )
                        }
                      >
                        <strong>{game.title}</strong>
                        <span>{game.players}</span>
                        <b>{game.status}</b>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="bbs-message-list">
                    {visibleMessages.map((message) => (
                      <article key={message.id} className={message.source}>
                        <header>
                          <strong>@{message.handle}</strong>
                          <span>{message.createdAt}</span>
                        </header>
                        <p>{message.body}</p>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {boardId !== "doors" && (
              <form className="bbs-composer" onSubmit={submitMessage}>
                <label>
                  HANDLE
                  <input
                    value={handle}
                    onChange={(event) => setHandle(event.target.value)}
                    maxLength={18}
                    autoComplete="off"
                    spellCheck={false}
                  />
                </label>
                <label className="message-input">
                  MESSAGE
                  <input
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    maxLength={240}
                    placeholder="TYPE SOMETHING..."
                    autoComplete="off"
                  />
                </label>
                <button type="submit">POST</button>
              </form>
            )}

            <footer className="bbs-footer">
              <span>ANSI-ish // LOCAL FIRST // SYSOP: HOMEBASS</span>
              <button type="button" onClick={clearLocalMessages}>CLEAR LOCAL</button>
            </footer>
          </div>

          <div className="terminal-controls" aria-hidden="true">
            <span />
            <span />
            <span />
            <b>HB-14400</b>
          </div>
        </div>
      </section>

      <aside className="bbs-sidecar">
        <section>
          <p className="panel-kicker">CALLER</p>
          <h3>@{handle || "GUEST369"}</h3>
          <dl>
            <div><dt>NODE</dt><dd>01</dd></div>
            <div><dt>SPEED</dt><dd>14.4K</dd></div>
            <div><dt>MODE</dt><dd>LOCAL</dd></div>
            <div><dt>PORCH</dt><dd>ADAPTER READY</dd></div>
          </dl>
        </section>

        <section className="bbs-note">
          <span>SYSOP NOTE</span>
          <p>
            Current posts persist only on this browser. A later Infinite Porch
            adapter can swap in real peer transport without changing the room.
          </p>
        </section>
      </aside>
    </div>
  );
}
