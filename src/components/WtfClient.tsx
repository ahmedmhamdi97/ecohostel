"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { BackButton } from "./BackButton";
import { SCENARIOS } from "@/lib/wtfData";

export function WtfClient() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="animate-fade-up px-5 pt-14 pb-safe">
      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        <BackButton />
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">WTF do I do when…</h1>
          <p className="text-zinc-400 text-sm font-medium mt-0.5">Tap a scenario to see what to do</p>
        </div>
      </div>

      {/* Accordion cards */}
      <div className="space-y-2.5">
        {SCENARIOS.map((s, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="rounded-3xl overflow-hidden shadow-card bg-white">
              {/* Header */}
              <button
                className="w-full flex items-center gap-3 px-5 py-4 text-left"
                style={{ background: "linear-gradient(135deg, #78350f, #b45309)" }}
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="text-2xl leading-none">{s.emoji}</span>
                <span className="flex-1 text-white font-bold text-sm leading-snug">
                  {s.title}
                </span>
                <ChevronDown
                  size={20}
                  className="text-white/80 transition-transform duration-300 shrink-0"
                  style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>

              {/* Expandable content */}
              <div
                className="grid transition-all duration-300 ease-in-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <ol className="px-5 py-3 space-y-0">
                    {s.steps.map((step, j) => (
                      <li
                        key={j}
                        className={`flex items-start gap-3 py-3 ${
                          j < s.steps.length - 1 ? "border-b border-zinc-100" : ""
                        }`}
                      >
                        <span
                          className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ background: "linear-gradient(135deg, #78350f, #b45309)" }}
                        >
                          {j + 1}
                        </span>
                        <p className="text-zinc-700 text-sm font-medium leading-snug flex-1">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
