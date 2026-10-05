import { useMemo, useState } from "react";
import { demoTape, type TapeSide } from "./tapeDeck";
import { emitHomeBassEvent } from "./houseBus";

const MIXTAPE_KEY = "homebass.tape-deck.mixtape-title.v1";

function loadMixtapeTitle() {
  try {
    return localStorage.getItem(MIXTAPE_KEY) || demoTape.title;
  } catch {
    return demoTape.title;
  }
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

export function TapeDeckRoom() {
  const [side, setSide] = useState<TapeSide>("A");
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [recording, setRecording] = useState(false);
  const [mixtapeTitle, setMixtapeTitle] = useState(loadMixtapeTitle);
  const [status, setStatus] = useState("DECK A // READY");

  const track = demoTape.tracks[trackIndex];

  const sideTracks = useMemo(() => {
    const midpoint = Math.ceil(demoTape.tracks.length / 2);
    return side === "A"
      ? demoTape.tracks.slice(0, midpoint)
      : demoTape.tracks.slice(midpoint);
  }, [side]);

  function play() {
    setPlaying(true);
    setRecording(false);
    setStatus(`PLAY // ${track.title.toUpperCase()}`);
    emitHomeBassEvent({
      type: "tape.played",
      source: "TAPE DECK",
      summary: `Playing ${track.title}`,
      detail: `${track.artist} // Side ${side}`,
      data: { trackId: track.id, side },
    });
  }

  function stop() {
    setPlaying(false);
    setRecording(false);
    setStatus("STOP");
  }

  function rewind() {
    setTrackIndex(0);
    setPlaying(false);
    setRecording(false);
    setStatus("REW // COUNTER 000");
  }

  function fastForward() {
    setTrackIndex((current) => (current + 1) % demoTape.tracks.length);
    setPlaying(false);
    setRecording(false);
    setStatus("FF // NEXT TRACK");
  }

  function record() {
    setPlaying(false);
    setRecording((current) => !current);
    setStatus(recording ? "REC STOPPED" : "REC // ARMED");
  }

  function switchSide(nextSide: TapeSide) {
    setSide(nextSide);
    setTrackIndex(nextSide === "A" ? 0 : Math.ceil(demoTape.tracks.length / 2));
    setPlaying(false);
    setRecording(false);
    setStatus(`SIDE ${nextSide} // READY`);
  }

  function saveTitle() {
    const clean = mixtapeTitle.trim().slice(0, 28) || "UNTITLED MIX";
    setMixtapeTitle(clean);
    localStorage.setItem(MIXTAPE_KEY, clean);
    emitHomeBassEvent({
      type: "tape.labeled",
      source: "TAPE DECK",
      summary: `Labeled mixtape "${clean}"`,
      detail: `Side ${side}`,
      data: { label: clean, side },
    });
    setStatus("LABEL SAVED // LOCAL");
  }

  return (
    <div className="tape-deck-experience">
      <section className="stereo-stack" aria-label="Tape Deck stereo">
        <div className="stereo-top">
          <div>
            <span>HOMEBASS HI-FI</span>
            <strong>{status}</strong>
          </div>
          <b>{playing ? "SIGNAL" : recording ? "REC" : "STANDBY"}</b>
        </div>

        <div className="cassette-bay">
          <div className={`cassette ${playing ? "playing" : ""} ${recording ? "recording" : ""}`}>
            <div className="cassette-label">
              <span>{mixtapeTitle}</span>
              <strong>SIDE {side}</strong>
            </div>
            <div className="cassette-window">
              <span className="reel reel-left" />
              <span className="tape-window">{playing ? "▶" : recording ? "●" : "■"}</span>
              <span className="reel reel-right" />
            </div>
            <div className="cassette-screws" aria-hidden="true">
              <i /><i /><i /><i />
            </div>
          </div>
        </div>

        <div className="deck-counter">
          <span>TRACK {String(trackIndex + 1).padStart(2, "0")}</span>
          <strong>{track.title}</strong>
          <b>{formatTime(track.durationSeconds)}</b>
        </div>

        <div className="transport-controls" aria-label="Tape controls">
          <button type="button" onClick={rewind} aria-label="Rewind">⏪</button>
          <button type="button" onClick={play} aria-label="Play">▶</button>
          <button type="button" onClick={fastForward} aria-label="Fast forward">⏩</button>
          <button type="button" onClick={stop} aria-label="Stop">■</button>
          <button
            type="button"
            className={recording ? "active" : ""}
            onClick={record}
            aria-label="Record"
          >
            ● REC
          </button>
        </div>

        <div className="stereo-speakers" aria-hidden="true">
          <div className={playing ? "speaker-cone thump" : "speaker-cone"} />
          <div className={playing ? "speaker-cone thump delay" : "speaker-cone"} />
        </div>
      </section>

      <aside className="tape-sidecar">
        <section className="tape-label-maker">
          <p className="panel-kicker">MIXTAPE</p>
          <label htmlFor="mixtape-title">LABEL</label>
          <div>
            <input
              id="mixtape-title"
              value={mixtapeTitle}
              maxLength={28}
              onChange={(event) => setMixtapeTitle(event.target.value)}
            />
            <button type="button" onClick={saveTitle}>SAVE</button>
          </div>
          <div className="side-selector" aria-label="Cassette side">
            <button
              type="button"
              className={side === "A" ? "active" : ""}
              onClick={() => switchSide("A")}
            >
              SIDE A
            </button>
            <button
              type="button"
              className={side === "B" ? "active" : ""}
              onClick={() => switchSide("B")}
            >
              SIDE B
            </button>
          </div>
        </section>

        <section className="track-list" aria-labelledby="track-list-heading">
          <div className="track-list-title">
            <span id="track-list-heading">TAPE INDEX</span>
            <strong>{sideTracks.length} CUTS</strong>
          </div>

          {sideTracks.map((item) => {
            const absoluteIndex = demoTape.tracks.findIndex(
              (candidate) => candidate.id === item.id,
            );
            return (
              <button
                type="button"
                key={item.id}
                className={absoluteIndex === trackIndex ? "active" : ""}
                onClick={() => {
                  setTrackIndex(absoluteIndex);
                  setPlaying(false);
                  setRecording(false);
                  setStatus(`CUE // ${item.title.toUpperCase()}`);
                }}
              >
                <span>{String(absoluteIndex + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.artist}</small>
                </div>
                <b>{formatTime(item.durationSeconds)}</b>
              </button>
            );
          })}
        </section>

        <section className="audio-adapters">
          <span>DECK INPUTS</span>
          <div><strong>JukeBot</strong><b>RESERVED</b></div>
          <div><strong>PHIAudio</strong><b>RESERVED</b></div>
          <div><strong>Local Library</strong><b>PLANNED</b></div>
        </section>
      </aside>
    </div>
  );
}
