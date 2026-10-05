import { useMemo, useState } from "react";
import {
  collectNerdsEvidence,
  isAchievementUnlocked,
  nerdsAchievements,
} from "./nerds";

type NerdsPanelProps = {
  onClose: () => void;
};

export function NerdsPanel({ onClose }: NerdsPanelProps) {
  const [refreshToken, setRefreshToken] = useState(0);

  const evidence = useMemo(() => collectNerdsEvidence(), [refreshToken]);
  const achievements = useMemo(
    () =>
      nerdsAchievements.map((achievement) => ({
        ...achievement,
        unlocked: isAchievementUnlocked(achievement, evidence),
      })),
    [evidence],
  );

  const unlocked = achievements.filter((item) => item.unlocked);
  const points = unlocked.reduce((sum, item) => sum + item.points, 0);

  return (
    <div className="nerds-overlay" role="presentation" onMouseDown={onClose}>
      <section
        className="nerds-ledger"
        role="dialog"
        aria-modal="true"
        aria-labelledby="nerds-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="close-button"
          onClick={onClose}
          aria-label="Close N.E.R.D.S."
        >
          ×
        </button>

        <header className="nerds-header">
          <div>
            <p className="panel-kicker">NOSTALGIA EXPERIENCE RECORDS & DISTINCTION SYSTEM</p>
            <h2 id="nerds-title">N.E.R.D.S.</h2>
            <p>House records backed by local evidence.</p>
          </div>

          <div className="nerds-score">
            <span>NERD POINTS</span>
            <strong>{points}</strong>
            <b>{unlocked.length}/{achievements.length} UNLOCKED</b>
          </div>
        </header>

        <div className="nerds-grid">
          {achievements.map((achievement) => (
            <article
              key={achievement.id}
              className={achievement.unlocked ? "unlocked" : "locked"}
            >
              <div className="nerds-stamp">
                <span>{achievement.category}</span>
                <strong>{achievement.unlocked ? "✓" : "?"}</strong>
              </div>

              <div>
                <span className="nerds-category">{achievement.category}</span>
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
                <small>{achievement.points} PTS</small>
              </div>
            </article>
          ))}
        </div>

        <section className="nerds-evidence" aria-labelledby="evidence-title">
          <div className="nerds-evidence-title">
            <span id="evidence-title">LOCAL EVIDENCE</span>
            <button type="button" onClick={() => setRefreshToken((value) => value + 1)}>
              REFRESH
            </button>
          </div>

          <div className="nerds-evidence-grid">
            {evidence.map((item) => (
              <div key={item.key}>
                <span>{item.label}</span>
                <strong>{String(item.value || "---")}</strong>
                <b>{item.source.toUpperCase()}</b>
              </div>
            ))}
          </div>
        </section>

        <footer className="nerds-footer">
          LOCAL-ONLY RECEIPTS FOR NOW // SIGNED PHIOS + PORCH RECEIPTS RESERVED
        </footer>
      </section>
    </div>
  );
}
