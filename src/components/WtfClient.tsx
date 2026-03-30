"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { BackButton } from "./BackButton";

interface Scenario {
  emoji: string;
  title: string;
  steps: string[];
}

const SCENARIOS: Scenario[] = [
  {
    emoji: "🛋️",
    title: "Sleeping in Common Areas at Night",
    steps: [
      "People can't sleep in the common areas at night.",
      "If you see someone passed out on the couch or floor, wake them up politely and tell them to go to their room.",
      "If they're not even a guest, tell them they can't stay and they need to leave.",
      "If they refuse or things feel weird, message the volunteer/staff group immediately so others know what's going on.",
    ],
  },
  {
    emoji: "🌙",
    title: "Bringing Someone Back After a Night Out",
    steps: [
      "No hooking up in common areas or volunteer dorms. Seriously.",
      "If you bring someone back and you're trying to get lucky, talk to the senior volunteer or reception and see if a private room is free.",
      "Sometimes volunteers can get a discounted private room (~30€) if available.",
      "Don't put other volunteers in an awkward situation by trying to fuck in shared spaces.",
    ],
  },
];

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
