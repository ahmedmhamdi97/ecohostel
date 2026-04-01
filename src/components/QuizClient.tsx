"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { QUIZ_QUESTIONS } from "@/lib/quizData";

type Phase = "question" | "answered" | "result";

interface BouncingMeme {
  id: number;
  src: string;
  size: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  midX: number;
  midY: number;
  duration: number;
  delay: number;
  rotation: number;
}

interface Confetti {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
}

function ConfettiRain() {
  const [pieces, setPieces] = useState<Confetti[]>([]);

  useEffect(() => {
    const colors = ["#f59e0b", "#10b981", "#3b82f6", "#ec4899", "#8b5cf6", "#ef4444", "#14b8a6"];
    setPieces(
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 6 + Math.random() * 8,
        delay: Math.random() * 2,
        duration: 2.5 + Math.random() * 2,
        rotation: Math.random() * 360,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: "-20px",
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.id % 2 === 0 ? "50%" : "2px",
            animation: `confettiFall ${p.duration}s ${p.delay}s ease-in forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function BouncingMemes({ src }: { src: string }) {
  const [memes, setMemes] = useState<BouncingMeme[]>([]);

  useEffect(() => {
    const COUNT = 4;
    // Pre-generate unique keyframe paths for each meme
    setMemes(
      Array.from({ length: COUNT }, (_, i) => ({
        id: i,
        src,
        size: 80 + i * 15,
        startX: 10 + Math.random() * 60,
        startY: 10 + Math.random() * 30,
        endX:   10 + Math.random() * 60,
        endY:   50 + Math.random() * 30,
        midX:   10 + Math.random() * 60,
        midY:   20 + Math.random() * 50,
        duration: 2.2 + i * 0.4,
        delay: i * 0.25,
        rotation: -25 + Math.random() * 50,
      }))
    );
  }, [src]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {memes.map((m) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={m.id}
          src={m.src}
          alt="meme"
          style={{
            position: "absolute",
            width: m.size,
            height: m.size,
            objectFit: "contain",
            left: `${m.startX}%`,
            top: `${m.startY}%`,
            animation: `bounce-${m.id} ${m.duration}s ${m.delay}s cubic-bezier(0.36, 0.07, 0.19, 0.97) 3 both`,
          }}
        />
      ))}
      <style>{memes.map((m) => `
        @keyframes bounce-${m.id} {
          0%   { transform: translate(0, 0)              rotate(${m.rotation}deg) scale(0.8); opacity: 0; }
          15%  { transform: translate(0, 0)              rotate(${m.rotation}deg) scale(1.1); opacity: 1; }
          40%  { transform: translate(${m.midX - m.startX}vw, ${m.midY - m.startY}vh) rotate(${-m.rotation}deg) scale(1); }
          70%  { transform: translate(${m.endX - m.startX}vw, ${m.endY - m.startY}vh) rotate(${m.rotation * 1.5}deg) scale(1.05); }
          90%  { transform: translate(${m.midX - m.startX + 10}vw, ${m.startY - m.startY + 5}vh) rotate(${-m.rotation}deg) scale(0.95); }
          100% { transform: translate(${m.endX - m.startX - 5}vw, ${m.endY - m.startY + 10}vh) rotate(${m.rotation}deg) scale(0.9); opacity: 0.8; }
        }
      `).join("\n")}</style>
    </div>
  );
}

export function QuizClient() {
  const total = QUIZ_QUESTIONS.length;
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("question");
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showEffect, setShowEffect] = useState(false);
  const effectShown = useRef(false);

  const question = QUIZ_QUESTIONS[idx];
  const progress = idx / total;
  const passed = score >= Math.ceil(total * 0.75); // 75% to pass

  const choose = (optIdx: number) => {
    if (phase !== "question") return;
    setSelected(optIdx);
    if (question.options[optIdx].correct) setScore((s) => s + 1);
    setPhase("answered");
  };

  const next = () => {
    if (idx < total - 1) {
      setIdx((i) => i + 1);
      setSelected(null);
      setPhase("question");
    } else {
      setPhase("result");
      if (!effectShown.current) {
        effectShown.current = true;
        setShowEffect(true);
        setTimeout(() => setShowEffect(false), passed ? 5000 : 4000);
      }
    }
  };

  const reset = () => {
    setIdx(0);
    setScore(0);
    setSelected(null);
    setPhase("question");
    setShowEffect(false);
    effectShown.current = false;
  };

  // ── Result screen ─────────────────────────────────────────
  if (phase === "result") {
    return (
      <>
        {showEffect && passed && <ConfettiRain />}
        {showEffect && passed && <BouncingMemes src="/meme2.png" />}
        {showEffect && !passed && <BouncingMemes src="/meme.png" />}

        <div
          className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
          style={{ background: passed ? "linear-gradient(160deg, #0f3d22, #166534)" : "linear-gradient(160deg, #450a0a, #991b1b)" }}
        >
          <div className="text-7xl mb-4">{passed ? "🧠" : "💀"}</div>
          <h1 className="text-white text-3xl font-black tracking-tight mb-2">
            {passed ? "High IQ Person" : "Low IQ mamawevo"}
          </h1>
          <p className="text-white/80 text-base font-medium mb-2">
            {passed
              ? "You can now start doing the night shift."
              : "Read the emergency manual again."}
          </p>
          <p className="text-white/60 text-sm mb-8">
            Score: {score}/{total} · {Math.round((score / total) * 100)}%
          </p>

          {/* Score dots */}
          <div className="flex gap-2 mb-8 flex-wrap justify-center">
            {QUIZ_QUESTIONS.map((q, i) => {
              // We can't easily reconstruct per-question correctness after the fact
              // so just show overall pass/fail color
              return (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full"
                  style={{ background: i < score ? "white" : "rgba(255,255,255,0.25)" }}
                />
              );
            })}
          </div>

          <button
            onClick={reset}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm active:scale-95 transition-transform"
            style={{ background: "rgba(255,255,255,0.2)", color: "white" }}
          >
            <RotateCcw size={16} strokeWidth={2} />
            Try Again
          </button>

          <Link
            href="/"
            className="mt-3 text-white/50 text-sm font-medium py-2"
          >
            Back to Home
          </Link>
        </div>
      </>
    );
  }

  // ── Question screen ───────────────────────────────────────
  const correctIdx = question.options.findIndex((o) => o.correct);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f4f6f3" }}>
      {/* Header */}
      <div
        className="px-5 pt-14 pb-5 shrink-0"
        style={{ background: "linear-gradient(160deg, #450a0a 0%, #991b1b 100%)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Link
            href="/"
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <ArrowLeft size={18} className="text-white" />
          </Link>
          <div className="flex-1">
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-0.5">Emergency Quiz</p>
            <h1 className="text-white text-lg font-black tracking-tight leading-none">Test Your Knowledge</h1>
          </div>
          <span className="text-white/70 text-sm font-bold tabular-nums">{idx + 1}/{total}</span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.2)" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${((idx + (phase === "answered" ? 1 : 0)) / total) * 100}%`, background: "white" }}
          />
        </div>
      </div>

      {/* Question + options */}
      <div className="flex-1 px-4 pt-5 pb-safe overflow-y-auto">
        {/* Score chip */}
        <div className="flex justify-end mb-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: "#dcfce7", color: "#166534" }}
          >
            ✓ {score} correct
          </span>
        </div>

        {/* Scenario card */}
        <div
          className="rounded-3xl p-5 mb-4"
          style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
        >
          <p className="text-slate-900 font-bold text-base leading-snug">{question.scenario}</p>
        </div>

        {/* Options */}
        <div className="space-y-2.5 mb-4">
          {question.options.map((opt, i) => {
            const isSelected = selected === i;
            const isCorrect = opt.correct;
            const showResult = phase === "answered";

            let bg = "white";
            let border = "1.5px solid #e2e8f0";
            let textColor = "#0f172a";

            if (showResult) {
              if (isCorrect) {
                bg = "#dcfce7"; border = "2px solid #16a34a"; textColor = "#14532d";
              } else if (isSelected && !isCorrect) {
                bg = "#fee2e2"; border = "2px solid #dc2626"; textColor = "#7f1d1d";
              } else {
                bg = "#f8fafc"; textColor = "#94a3b8";
              }
            } else if (isSelected) {
              bg = "#eff6ff"; border = "2px solid #3b82f6";
            }

            return (
              <button
                key={i}
                onClick={() => choose(i)}
                disabled={phase === "answered"}
                className="w-full text-left rounded-2xl p-4 transition-all duration-200 active:scale-[0.98] flex items-start gap-3"
                style={{ background: bg, border, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              >
                <span
                  className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 mt-0.5"
                  style={{
                    background: showResult && isCorrect ? "#16a34a" : showResult && isSelected ? "#dc2626" : "#f1f5f9",
                    color: showResult && (isCorrect || (isSelected && !isCorrect)) ? "white" : "#64748b",
                  }}
                >
                  {opt.label}
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-sm leading-snug" style={{ color: textColor }}>{opt.text}</p>
                  {showResult && (isCorrect || isSelected) && (
                    <p
                      className="text-xs mt-1 leading-snug font-medium"
                      style={{ color: isCorrect ? "#16a34a" : "#dc2626" }}
                    >
                      {isCorrect ? "✓ " : "✗ "}{opt.explanation}
                    </p>
                  )}
                </div>
                {showResult && isCorrect && <span className="text-lg leading-none shrink-0">✅</span>}
                {showResult && isSelected && !isCorrect && <span className="text-lg leading-none shrink-0">❌</span>}
              </button>
            );
          })}
        </div>

        {/* Explanation for wrong answer — show correct answer's explanation too */}
        {phase === "answered" && selected !== null && !question.options[selected].correct && (
          <div
            className="rounded-2xl px-4 py-3 mb-4"
            style={{ background: "#fef9c3", border: "1.5px solid #fde047" }}
          >
            <p className="text-yellow-800 text-xs font-semibold leading-snug">
              💡 Correct answer: <strong>{question.options[correctIdx].label}) {question.options[correctIdx].text}</strong>
            </p>
          </div>
        )}

        {/* Next button */}
        {phase === "answered" && (
          <button
            onClick={next}
            className="w-full py-4 rounded-2xl font-bold text-white text-sm active:scale-95 transition-transform"
            style={{ background: "linear-gradient(135deg, #991b1b, #dc2626)" }}
          >
            {idx < total - 1 ? "Next Scenario →" : "See Results"}
          </button>
        )}
      </div>
    </div>
  );
}
