"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, RotateCcw, ChevronRight } from "lucide-react";
import { TOUR_STOPS } from "@/lib/tourData";

export function TourClient() {
  const [visitedIds, setVisitedIds] = useState<Set<number>>(new Set());
  const [currentIdx, setCurrentIdx] = useState(0);
  const total = TOUR_STOPS.length;

  const markVisited = () => {
    setVisitedIds((prev) => new Set([...prev, currentIdx]));
    if (currentIdx < total - 1) setCurrentIdx(currentIdx + 1);
  };

  const reset = () => {
    setVisitedIds(new Set());
    setCurrentIdx(0);
  };

  const progressPct = (visitedIds.size / total) * 100;

  return (
    <div className="min-h-screen" style={{ background: "#f4f6f3" }}>
      {/* Header */}
      <div
        className="px-5 pt-14 pb-6"
        style={{ background: "linear-gradient(135deg, #14532d 0%, #166534 100%)" }}
      >
        <div className="flex items-center gap-3 mb-5">
          <Link
            href="/"
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <ArrowLeft size={18} className="text-white" />
          </Link>
          <div className="flex-1">
            <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-0.5">
              Volunteer Guide
            </p>
            <h1 className="text-white text-xl font-black tracking-tight leading-none">
              Granada Walking Tour
            </h1>
          </div>
          <button
            onClick={reset}
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "rgba(255,255,255,0.15)" }}
            aria-label="Reset tour"
          >
            <RotateCcw size={15} className="text-white" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-1">
          <div
            className="flex-1 h-1.5 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.2)" }}
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
        <p className="text-white/55 text-xs font-medium">{total} stops · ~2 hours</p>
      </div>

      {/* Stop list */}
      <div className="px-4 py-4 pb-safe space-y-2.5">
        {TOUR_STOPS.map((stop, idx) => {
          const isVisited = visitedIds.has(idx);
          const isCurrent = idx === currentIdx && !isVisited;
          const isUpcoming = !isVisited && !isCurrent;

          const borderColor = isVisited ? "#16a34a" : isCurrent ? "#d97706" : "#e2e8f0";
          const badgeBg = isVisited ? "#dcfce7" : isCurrent ? "#fef3c7" : "#f1f5f9";

          return (
            <div
              key={stop.number}
              className="rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: "white",
                borderLeft: `4px solid ${borderColor}`,
                opacity: isVisited ? 0.55 : 1,
                boxShadow: isCurrent
                  ? "0 4px 20px rgba(217,119,6,0.15)"
                  : "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  {/* Badge */}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: badgeBg }}
                  >
                    {isVisited ? (
                      <CheckCircle2 size={18} className="text-green-600" />
                    ) : (
                      <span
                        className="text-sm font-black"
                        style={{ color: isCurrent ? "#b45309" : "#94a3b8" }}
                      >
                        {stop.number}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Stop name + time */}
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className="font-bold text-sm leading-tight"
                        style={{ color: isUpcoming ? "#94a3b8" : "#0f172a" }}
                      >
                        {stop.name}
                      </p>
                      <span
                        className="text-xs font-semibold shrink-0 tabular-nums"
                        style={{ color: isUpcoming ? "#cbd5e1" : "#64748b" }}
                      >
                        {stop.time}
                      </span>
                    </div>

                    {/* Expanded notes for current stop */}
                    {isCurrent && (
                      <div className="mt-2.5">
                        <p className="text-slate-600 text-sm leading-relaxed">{stop.notes}</p>
                        <button
                          onClick={markVisited}
                          className="mt-3 w-full py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
