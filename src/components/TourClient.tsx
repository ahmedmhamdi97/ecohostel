"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, RotateCcw, ChevronRight, MapPin, Map } from "lucide-react";
import { TOUR_STOPS, FULL_ROUTE_URL } from "@/lib/tourData";

export function TourClient() {
  const [visitedIds, setVisitedIds] = useState<Set<number>>(new Set());
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  const total = TOUR_STOPS.length;

  // First unvisited stop — gets the amber "you are here" highlight
  const suggestedIdx = TOUR_STOPS.findIndex((_, i) => !visitedIds.has(i));

  const markVisited = (idx: number) => {
    setVisitedIds((prev) => new Set([...prev, idx]));
    setExpandedIdx(null);
  };

  const reset = () => {
    setVisitedIds(new Set());
    setExpandedIdx(0);
  };

  const progressPct = (visitedIds.size / total) * 100;
  const isComplete = visitedIds.size === total;

  return (
    <div className="min-h-screen" style={{ background: "#f0f4f1" }}>

      {/* ── Header ───────────────────────────────────────── */}
      <div
        className="px-5 pt-14 pb-5"
        style={{ background: "linear-gradient(160deg, #0f3d22 0%, #166534 60%, #15803d 100%)" }}
      >
        <div className="flex items-center gap-3 mb-5">
          <Link
            href="/"
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "rgba(255,255,255,0.14)" }}
          >
            <ArrowLeft size={18} className="text-white" />
          </Link>
          <div className="flex-1">
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-0.5">
              Volunteer Guide
            </p>
            <h1 className="text-white text-xl font-black tracking-tight leading-none">
              Granada Walking Tour
            </h1>
          </div>
          <button
            onClick={reset}
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "rgba(255,255,255,0.14)" }}
            aria-label="Reset tour"
          >
            <RotateCcw size={15} className="text-white" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="flex-1 h-1.5 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.18)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%`, background: "white" }}
            />
          </div>
          <span className="text-white/80 text-xs font-bold tabular-nums">
            {visitedIds.size}/{total}
          </span>
        </div>

        {/* Full route button */}
        <a
          href={FULL_ROUTE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 w-full rounded-2xl px-4 py-2.5 active:scale-95 transition-transform"
          style={{ background: "rgba(255,255,255,0.13)" }}
        >
          <Map size={15} className="text-white/80 shrink-0" />
          <span className="text-white/90 text-xs font-semibold flex-1">View Full Route on Google Maps</span>
          <ChevronRight size={14} className="text-white/50" />
        </a>
      </div>

      {/* ── Tour complete banner ─────────────────────────── */}
      {isComplete && (
        <div
          className="mx-4 mt-4 rounded-2xl px-4 py-3 flex items-center gap-3"
          style={{ background: "linear-gradient(135deg, #14532d, #166534)" }}
        >
          <span className="text-2xl">🎉</span>
          <div>
            <p className="text-white font-bold text-sm">Tour complete!</p>
            <p className="text-white/70 text-xs">Don't forget: FREE SANGRIA at 8PM on the 4th floor!</p>
          </div>
        </div>
      )}

      {/* ── Stop list ────────────────────────────────────── */}
      <div className="px-4 pt-4 pb-safe">
        {TOUR_STOPS.map((stop, idx) => {
          const isVisited = visitedIds.has(idx);
          const isSuggested = idx === suggestedIdx;
          const isExpanded = expandedIdx === idx;
          const isLast = idx === total - 1;

          return (
            <div key={stop.number} className="flex gap-0">

              {/* ── Timeline column ── */}
              <div className="flex flex-col items-center" style={{ width: 44, minWidth: 44 }}>
                {/* Badge */}
                <div
                  className="flex items-center justify-center rounded-2xl shrink-0 transition-all duration-300"
                  style={{
                    width: 36,
                    height: 36,
                    background: isVisited
                      ? "#dcfce7"
                      : isSuggested
                      ? "linear-gradient(135deg, #d97706, #b45309)"
                      : "white",
                    boxShadow: isSuggested
                      ? "0 4px 14px rgba(217,119,6,0.35)"
                      : "0 1px 4px rgba(0,0,0,0.07)",
                    border: !isVisited && !isSuggested ? "1.5px solid #e2e8f0" : "none",
                  }}
                >
                  {isVisited ? (
                    <CheckCircle2 size={17} className="text-green-600" />
                  ) : isSuggested ? (
                    <span className="text-white font-black text-xs">{stop.number}</span>
                  ) : (
                    <span style={{ fontSize: 16 }}>{stop.emoji}</span>
                  )}
                </div>

                {/* Connector line */}
                {!isLast && (
                  <div
                    className="flex-1 w-px my-1"
                    style={{
                      background: isVisited
                        ? "linear-gradient(to bottom, #86efac, #bbf7d0)"
                        : "#e2e8f0",
                      minHeight: 12,
                    }}
                  />
                )}
              </div>

              {/* ── Card ── */}
              <div
                className="flex-1 mb-2.5 rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: isVisited ? "rgba(255,255,255,0.5)" : "white",
                  boxShadow: isExpanded && !isVisited
                    ? "0 6px 24px rgba(217,119,6,0.12), 0 1px 4px rgba(0,0,0,0.06)"
                    : "0 1px 4px rgba(0,0,0,0.05)",
                  opacity: isVisited ? 0.55 : 1,
                  borderLeft: isSuggested ? "3px solid #d97706" : isVisited ? "3px solid #86efac" : "3px solid #e2e8f0",
                }}
              >
                {/* Tappable header row */}
                <button
                  className="w-full p-3.5 flex items-center gap-2 text-left active:bg-zinc-50 transition-colors"
                  onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                >
                  {!isVisited && (
                    <span className="text-base leading-none shrink-0">{stop.emoji}</span>
                  )}
                  <p
                    className="font-bold text-sm leading-tight flex-1"
                    style={{ color: !isVisited ? "#0f172a" : "#94a3b8" }}
                  >
                    {stop.name}
                  </p>
                  <span
                    className="text-xs font-semibold shrink-0 tabular-nums"
                    style={{ color: isVisited ? "#cbd5e1" : "#64748b" }}
                  >
                    {stop.time}
                  </span>
                  {/* Map pin */}
                  {!isVisited && (
                    <a
                      href={stop.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center rounded-xl active:scale-90 transition-transform shrink-0"
                      style={{
                        width: 30,
                        height: 30,
                        background: isSuggested ? "#fff7ed" : "#f1f5f9",
                      }}
                      aria-label={`Open ${stop.name} in Google Maps`}
                    >
                      <MapPin
                        size={14}
                        strokeWidth={2}
                        style={{ color: isSuggested ? "#d97706" : "#94a3b8" }}
                      />
                    </a>
                  )}
                </button>

                {/* Expandable content — any stop */}
                {isExpanded && !isVisited && (
                  <div className="px-3.5 pb-3.5">
                    <p className="text-slate-600 text-sm leading-relaxed">{stop.notes}</p>

                    <a
                      href={stop.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-transform active:scale-95"
                      style={{ background: "#f0fdf4", color: "#15803d" }}
                    >
                      <MapPin size={13} strokeWidth={2.5} />
                      Open in Google Maps
                    </a>

                    <button
                      onClick={() => markVisited(idx)}
                      className="mt-2 w-full py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                      style={{
                        background:
                          idx === total - 1
                            ? "linear-gradient(135deg, #14532d 0%, #166534 100%)"
                            : "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
                      }}
                    >
                      {idx === total - 1 ? "Complete Tour  ✓" : "Mark as Visited"}
                      {idx < total - 1 && <ChevronRight size={15} />}
                    </button>
                  </div>
                )}
              </div>

            </div>
          );
        })}

        <div className="h-4" />
      </div>
    </div>
  );
}
