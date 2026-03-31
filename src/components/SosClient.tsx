"use client";

import { useState } from "react";
import { ChevronDown, PhoneCall } from "lucide-react";
import { EMERGENCIES } from "@/lib/sosData";

export function SosClient() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="animate-fade-up px-5 pt-14 pb-safe">
      {/* Header */}
      <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Emergency</h1>
      <p className="text-zinc-400 text-sm font-medium mt-0.5 mb-5">
        Tap a scenario to see the steps
      </p>

      {/* Phone numbers banner */}
      <div
        className="rounded-2xl px-4 py-3.5 mb-3"
        style={{ background: "linear-gradient(135deg, #1B2A4A, #2d4270)" }}
      >
        <p className="text-white font-bold text-sm mb-2">☎ IMPORTANT PHONE NUMBERS</p>
        <div className="flex items-center justify-between">
          <p className="text-white/80 text-xs">General Emergencies / Police / Fire Brigade / Ambulance</p>
          <a
            href="tel:112"
            className="ml-3 flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 shrink-0 active:opacity-70"
          >
            <PhoneCall size={12} className="text-white" strokeWidth={2} />
            <span className="text-white text-xs font-bold">112</span>
          </a>
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <p className="text-white/80 text-xs">Elevator ORONA</p>
          <a
            href="tel:900210813"
            className="ml-3 flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 shrink-0 active:opacity-70"
          >
            <PhoneCall size={12} className="text-white" strokeWidth={2} />
            <span className="text-white text-xs font-bold">900 210 813</span>
          </a>
        </div>
      </div>

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
                aria-expanded={isOpen}
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
                        {step.images?.map((img, imgIdx) => (
                          <div key={imgIdx} className="mt-2.5 rounded-2xl overflow-hidden border border-zinc-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={img.src}
                              alt={img.caption}
                              className="w-full object-cover"
                            />
                            <p className="text-[11px] font-semibold text-zinc-400 text-center py-2 bg-zinc-50">
                              {img.caption}
                            </p>
                          </div>
                        ))}
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
