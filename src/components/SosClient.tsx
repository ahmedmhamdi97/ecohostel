"use client";

import { useState } from "react";
import { ChevronDown, PhoneCall } from "lucide-react";

interface Step {
  text: string;
  section?: string; // renders a mini-label above this step
  image?: { src: string; caption: string }; // inline image shown after this step
}

interface Emergency {
  emoji: string;
  title: string;
  steps: Step[];
}

const EMERGENCIES: Emergency[] = [
  {
    emoji: "🔥",
    title: "Fire Alarm",
    steps: [
      { text: "Call 112 immediately",                                   section: "If visible fire" },
      { text: "Evacuate via Gran Vía — do not use the elevator" },
      { text: "Go to reception, check the control panel",               section: "If alarm only",
        image: { src: "/fire-panel.webp", caption: "Fire control panel at reception" } },
      { text: "Identify the zone shown on the panel" },
      { text: "Silence the buzzer — press 1" },
      { text: "Check the indicated area for smoke or smell",
        image: { src: "/fire-panel2.webp", caption: "Zone indicator on the control panel" } },
      { text: "If all clear, reset panel: press 1 → 2 → 3" },
    ],
  },
  {
    emoji: "🚨",
    title: "Drunk or Aggressive Guest",
    steps: [
      { text: "Warn firmly and ask them to leave" },
      { text: "If they refuse, tell them the police will be called" },
      { text: "If they continue, call 112" },
      { text: "Never engage in physical confrontation" },
      { text: "Notify the WhatsApp group" },
    ],
  },
  {
    emoji: "🛗",
    title: "Guest Trapped in Elevator",
    steps: [
      { text: "Reassure the guest calmly through the door" },
      { text: "Call ORONA: 900 210 813" },
      { text: "Never force the door open" },
      { text: "Notify the WhatsApp group" },
      { text: "Reminder: max 5 people — this is the usual cause" },
    ],
  },
  {
    emoji: "🐛",
    title: "Bedbugs",
    steps: [
      { text: "Stay calm — do NOT move the guest to another room" },
      { text: "Collect all clothing from the affected bed" },
      { text: "Wash at 60 °C and tumble dry" },
      { text: "Steam treatment will be arranged the next day" },
      { text: "Notify WhatsApp group with the room number" },
    ],
  },
  {
    emoji: "🚪",
    title: "Gran Vía Door Blocked",
    steps: [
      { text: "Check the latch first — may be a manual issue" },
      { text: "Go to reception electrical panel" },
      { text: "Find: Planta Primera / Resetear puerta GV" },
      { text: "Flip switch DOWN and hold for 30 seconds" },
      { text: "Flip switch back UP" },
      { text: "Notify the morning shift" },
    ],
  },
  {
    emoji: "⚡",
    title: "Power Outage",
    steps: [
      { text: "Identify the affected area" },
      { text: "Check the electrical panel on that floor" },
      { text: "Reset any tripped breaker (flip down, then up)" },
      { text: "If it trips again, unplug the overloading appliance" },
      { text: "If the whole building is out, check the ground floor panel" },
    ],
  },
  {
    emoji: "👮",
    title: "Police Visit",
    steps: [
      { text: "Open the door and introduce yourself as staff" },
      { text: "Ask the reason for the visit" },
      { text: "Check in-house guest list if needed" },
      { text: "Accompany them discreetly" },
      { text: "Notify the WhatsApp group after" },
    ],
  },
  {
    emoji: "🩺",
    title: "Guest Accident",
    steps: [
      { text: "Assess severity",                                         section: "First" },
      { text: "Minor injury: use the first aid kit at reception",        section: "If minor" },
      { text: "Serious: call 112 and unlock the ground floor entrance",  section: "If serious" },
      { text: "Report in the WhatsApp group" },
    ],
  },
  {
    emoji: "🛏️",
    title: "Room Change Request",
    steps: [
      { text: "Ask the reason for the request" },
      { text: "Check availability in the system" },
      { text: "Respect female-only dorms: 2.7 / 3.1 / 3.5 / 3.6" },
      { text: "Notify WhatsApp group — morning shift will update the system" },
    ],
  },
  {
    emoji: "🚿",
    title: "No Hot Water",
    steps: [
      { text: "Check the boiler screen at reception" },
      { text: "The indicator light must be green" },
      { text: "If off, turn it on manually" },
      { text: "Verify hot water is now working" },
    ],
  },
];

export function SosClient() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="animate-fade-up px-5 pt-14 pb-safe">
      {/* Header */}
      <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Emergency</h1>
      <p className="text-zinc-400 text-sm font-medium mt-0.5 mb-5">
        Tap a scenario to see the steps
      </p>

      {/* Golden rule banner */}
      <div
        className="flex items-center gap-3 rounded-2xl px-4 py-3.5 mb-5"
        style={{ background: "linear-gradient(135deg, #92400e, #b45309)" }}
      >
        <span className="text-xl leading-none">⚠️</span>
        <p className="text-white font-bold text-sm">
          When in doubt → call 112
        </p>
        <a
          href="tel:112"
          onClick={(e) => e.stopPropagation()}
          className="ml-auto flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 shrink-0 active:opacity-70"
        >
          <PhoneCall size={13} className="text-white" strokeWidth={2} />
          <span className="text-white text-xs font-bold">112</span>
        </a>
      </div>

      {/* Accordion cards */}
      <div className="space-y-2.5">
        {EMERGENCIES.map((em, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className="rounded-3xl overflow-hidden shadow-card"
              style={{ background: "#fff" }}
            >
              {/* Header row */}
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center gap-3.5 px-4 py-4 text-left active:opacity-80 transition-opacity"
                style={{
                  background: isOpen
                    ? "linear-gradient(135deg, #7f1d1d, #c2410c)"
                    : "linear-gradient(135deg, #991b1b, #dc4a1e)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 text-xl leading-none"
                  style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(4px)" }}
                >
                  {em.emoji}
                </div>
                <span className="text-white font-bold text-base flex-1 leading-tight">
                  {em.title}
                </span>
                <ChevronDown
                  size={18}
                  className="text-white/70 shrink-0 transition-transform duration-300"
                  style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  strokeWidth={2.5}
                />
              </button>

              {/* Expandable steps — grid animation trick */}
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  transition: "grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <div style={{ overflow: "hidden" }}>
                  <ol className="px-4 py-4 space-y-2.5">
                    {em.steps.map((step, j) => (
                      <li key={j}>
                        {step.section && (
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1 mt-1">
                            {step.section}
                          </p>
                        )}
                        <div className="flex items-start gap-3">
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold shrink-0 mt-0.5"
                            style={{ background: "#7f1d1d", color: "#fff" }}
                          >
                            {j + 1}
                          </span>
                          <p className="text-zinc-700 text-sm font-medium leading-snug flex-1">
                            {step.text}
                          </p>
                        </div>
                        {step.image && (
                          <div className="mt-2.5 rounded-2xl overflow-hidden border border-zinc-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={step.image.src}
                              alt={step.image.caption}
                              className="w-full object-cover"
                            />
                            <p className="text-[11px] font-semibold text-zinc-400 text-center py-2 bg-zinc-50">
                              {step.image.caption}
                            </p>
                          </div>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="h-4" />
    </div>
  );
}
