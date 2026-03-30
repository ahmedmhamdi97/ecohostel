"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { BackButton } from "./BackButton";

interface RuleItem {
  text: string;
}

interface RulesSection {
  title: string;
  emoji: string;
  gradient: string;
  rules: RuleItem[];
}

const SECTIONS: RulesSection[] = [
  {
    title: "HOSTEL RULES",
    emoji: "📋",
    gradient: "linear-gradient(135deg, #1B2A4A, #2d4270)",
    rules: [
      { text: "Total silence after midnight in stairs, bathrooms and hallways" },
      { text: "Common areas closed 00:00 to 8:00 AM — respect guests and neighbors" },
      { text: "No food or drinks in the rooms" },
      { text: "Cafeteria food/drinks only in cafeteria or 4th floor common areas" },
      { text: "No alcohol brought from outside — strictly prohibited" },
      { text: "No smoking inside — only patios and outdoor areas" },
      { text: "Clean everything you use in the kitchen and leave it as you found it" },
      { text: "Drugs strictly prohibited on premises" },
      { text: "No visitors inside — friends and family wait in the café area" },
    ],
  },
  {
    title: "GENERAL INFO",
    emoji: "ℹ️",
    gradient: "linear-gradient(135deg, #1b4332, #2d6a4f)",
    rules: [
      { text: "Bed changes need reception approval in advance" },
      { text: "Label your fridge items with name and check-out date — fridge cleaned Mon & Fri" },
      { text: "Store valuables in room lockers — we sell locks, sleeping kits available" },
      { text: "Staff sleeps on 4th floor — issues outside reception hours go to them" },
      { text: "Printer service at reception — ask about fees" },
      { text: "Hair dryer at reception — free but must be returned" },
      { text: "Laundry service available — max 5kg box, 24h turnaround, washed at 30°C" },
      { text: "Free high-speed WiFi — connection issues ask reception" },
      { text: "Board games on 4th floor — cards, chess, parchís, musical instruments" },
      { text: "Family dinner every day — ask staff for details" },
    ],
  },
];

export function RulesClient() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="animate-fade-up px-5 pt-14 pb-safe">
      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        <BackButton />
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Rules</h1>
          <p className="text-zinc-400 text-sm font-medium mt-0.5">Tap a section to expand</p>
        </div>
      </div>

      {/* Accordion sections */}
      <div className="space-y-3">
        {SECTIONS.map((section, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="rounded-3xl overflow-hidden shadow-card bg-white">
              {/* Section header */}
              <button
                className="w-full flex items-center gap-3 px-5 py-4 text-left"
                style={{ background: section.gradient }}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="text-2xl leading-none">{section.emoji}</span>
                <span className="flex-1 text-white font-bold text-base tracking-wide">
                  {section.title}
                </span>
                <ChevronDown
                  size={20}
                  className="text-white/80 transition-transform duration-300"
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
                    {section.rules.map((rule, j) => (
                      <li
                        key={j}
                        className={`flex items-start gap-3 py-3 ${
                          j < section.rules.length - 1 ? "border-b border-zinc-100" : ""
                        }`}
                      >
                        <span
                          className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ background: section.gradient }}
                        >
                          {j + 1}
                        </span>
                        <p className="text-zinc-700 text-sm font-medium leading-snug flex-1">
                          {rule.text}
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
