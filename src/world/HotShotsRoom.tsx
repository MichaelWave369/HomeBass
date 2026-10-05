import { useMemo, useState } from "react";
import { buildHotShotsRound } from "./hotShots";
import { emitHomeBassEvent } from "./houseBus";

const HIGH_SCORE_KEY = "homebass.hot-shots.high-score.v1";

function loadHighScore() {
  try {
    const value = Number(localStorage.getItem(HIGH_SCORE_KEY));
    return Number.isFinite(value) && value >= 0 ? Math.floor(value) : 0;
  } catch {
    return 0;
  }
}

export function HotShotsRoom() {
  const questions = useMemo(() => buildHotShotsRound(5), []);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(loadHighScore);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const question = questions[questionIndex];

  function chooseAnswer(index: number) {
    if (selectedAnswer !== null || finished) return;

    setSelectedAnswer(index);

    if (index === question.answerIndex) {
      const nextStreak = streak + 1;
      const bonus = Math.max(0, nextStreak - 1) * 25;
      const nextScore = score + question.points + bonus;

      setStreak(nextStreak);
      setScore(nextScore);

      if (nextScore > highScore) {
        setHighScore(nextScore);
        localStorage.setItem(HIGH_SCORE_KEY, String(nextScore));
      }
    } else {
      setStreak(0);
    }
  }

  function nextQuestion() {
    if (selectedAnswer === null) return;

    if (questionIndex >= questions.length - 1) {
      emitHomeBassEvent({
        type: "quiz.completed",
        source: "HOT SHOTS",
        summary: `Finished a Hot Shots round with ${score} points`,
        detail: `${questions.length} questions`,
        data: { score, questions: questions.length },
      });
      setFinished(true);
      return;
    }

    setQuestionIndex((current) => current + 1);
    setSelectedAnswer(null);
  }

  function restart() {
    setQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setSelectedAnswer(null);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="hot-shots-experience">
        <section className="hot-shots-stage">
          <div className="quiz-marquee">
            <span>HOT SHOTS</span>
            <strong>ROUND COMPLETE</strong>
          </div>

          <div className="quiz-finale">
            <span>FINAL SCORE</span>
            <strong>{score.toLocaleString("en-US")}</strong>
            <p>
              {score >= highScore && score > 0
                ? "HOUSE RECORD TERRITORY."
                : "THE USELESS KNOWLEDGE VAULT REMAINS OPEN."}
            </p>
            <button type="button" onClick={restart}>
              PLAY AGAIN
            </button>
          </div>
        </section>

        <aside className="quiz-sidecar">
          <section className="quiz-stat-card">
            <span>HIGH SCORE</span>
            <strong>{highScore.toLocaleString("en-US")}</strong>
          </section>
          <section className="quiz-coming-soon">
            <span>NEXT MODES</span>
            <div><strong>Daily Shot</strong><b>PLANNED</b></div>
            <div><strong>Team Night</strong><b>PLANNED</b></div>
            <div><strong>Porch Battle</strong><b>PLANNED</b></div>
          </section>
        </aside>
      </div>
    );
  }

  return (
    <div className="hot-shots-experience">
      <section className="hot-shots-stage" aria-label="Hot Shots quiz stage">
        <div className="quiz-marquee">
          <span>HOT SHOTS</span>
          <strong>
            QUESTION {questionIndex + 1}/{questions.length}
          </strong>
        </div>

        <div className="quiz-scoreboard">
          <div>
            <span>SCORE</span>
            <strong>{score.toLocaleString("en-US")}</strong>
          </div>
          <div>
            <span>STREAK</span>
            <strong>{streak}</strong>
          </div>
          <div>
            <span>CATEGORY</span>
            <strong>{question.category}</strong>
          </div>
        </div>

        <div className="quiz-question-card">
          <p className="quiz-category">{question.category}</p>
          <h3>{question.prompt}</h3>

          <div className="quiz-answers">
            {question.choices.map((choice, index) => {
              const answered = selectedAnswer !== null;
              const correct = index === question.answerIndex;
              const selected = index === selectedAnswer;

              let stateClass = "";
              if (answered && correct) stateClass = "correct";
              else if (answered && selected) stateClass = "wrong";

              return (
                <button
                  type="button"
                  key={choice}
                  className={stateClass}
                  disabled={answered}
                  onClick={() => chooseAnswer(index)}
                >
                  <span>{String.fromCharCode(65 + index)}</span>
                  <strong>{choice}</strong>
                </button>
              );
            })}
          </div>

          <div className="quiz-feedback" aria-live="polite">
            {selectedAnswer === null ? (
              <p>LOCK IN AN ANSWER.</p>
            ) : (
              <>
                <strong>
                  {selectedAnswer === question.answerIndex
                    ? `NICE SHOT +${question.points + Math.max(0, streak - 1) * 25}`
                    : "BRICKED IT"}
                </strong>
                <p>{question.explanation}</p>
                <button type="button" onClick={nextQuestion}>
                  {questionIndex === questions.length - 1
                    ? "SEE SCORE"
                    : "NEXT SHOT"}
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      <aside className="quiz-sidecar">
        <section className="quiz-stat-card">
          <span>HIGH SCORE</span>
          <strong>{highScore.toLocaleString("en-US")}</strong>
          <small>LOCAL HOUSE RECORD</small>
        </section>

        <section className="quiz-category-board">
          <span>CATEGORIES</span>
          {["ARCADE", "TECH", "MOVIES", "MUSIC", "ODDBALL"].map((category) => (
            <div
              key={category}
              className={category === question.category ? "active" : ""}
            >
              <strong>{category}</strong>
              <b>{category === question.category ? "LIVE" : "IN DECK"}</b>
            </div>
          ))}
        </section>

        <section className="quiz-coming-soon">
          <span>MODES</span>
          <div><strong>Quick Round</strong><b>ACTIVE</b></div>
          <div><strong>Daily Shot</strong><b>PLANNED</b></div>
          <div><strong>Team Night</strong><b>PLANNED</b></div>
          <div><strong>Porch Battle</strong><b>PLANNED</b></div>
        </section>
      </aside>
    </div>
  );
}
