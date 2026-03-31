"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Bus, CheckCircle2, Clock } from "lucide-react";

const BUS_STOP_URL = "https://maps.google.com/?q=Paseo+De+Los+Basilios,+Centro,+18006+Granada,+Spain";
const MONACHIL_URL = "https://maps.google.com/?q=Monachil,+Granada,+Spain";

const MORNING_TASKS = [
  "Go down at 9:00 AM (instead of the usual 8:00 AM)",
  "Buy fruit for the pack lunches",
  "Help organize the activity",
  "Take the first aid kit and the bus ticket",
];

export function HikeClient() {
  return (
    <div className="min-h-screen animate-fade-up" style={{ background: "#f0f4f1" }}>

      {/* ── Header ───────────────────────────────────────── */}
      <div
        className="px-5 pt-14 pb-6"
        style={{ background: "linear-gradient(160deg, #1c3a2e 0%, #2d6a4f 60%, #3a8c65 100%)" }}
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
              Activity Guide
            </p>
            <h1 className="text-white text-xl font-black tracking-tight leading-none">
              Sierra Nevada Hike
            </h1>
          </div>
          <span className="text-3xl">🏔️</span>
        </div>

        {/* When + Where pills */}
        <div className="flex gap-2">
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{ background: "rgba(255,255,255,0.14)" }}
          >
            <Calendar size={12} className="text-white/80" />
            <span className="text-white/90 text-xs font-semibold">Mon & Wed</span>
          </div>
          <a
            href={MONACHIL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 active:scale-95 transition-transform"
            style={{ background: "rgba(255,255,255,0.14)" }}
          >
            <MapPin size={12} className="text-white/80" />
            <span className="text-white/90 text-xs font-semibold">Monachil, Sierra Nevada</span>
          </a>
        </div>
      </div>

      <div className="px-4 pt-4 pb-safe space-y-3">

        {/* ── Bus info card ─────────────────────────────── */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-card">
          <div
            className="px-5 py-3 flex items-center gap-2"
            style={{ background: "linear-gradient(135deg, #1c3a2e, #2d6a4f)" }}
          >
            <Bus size={16} className="text-white/80" />
            <span className="text-white font-bold text-sm">Getting There</span>
          </div>
          <div className="px-5 py-4 space-y-3">
            <div className="flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "#f0fdf4" }}
              >
                <Bus size={17} style={{ color: "#2d6a4f" }} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-zinc-900">Bus 183 → Monachil</p>
                <p className="text-zinc-500 text-xs mt-0.5 leading-snug">
                  Paseo De Los Basilios V, Centro, 18006 Granada
                </p>
              </div>
            </div>

            <a
              href={BUS_STOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm active:scale-95 transition-transform"
              style={{ background: "#f0fdf4", color: "#166534" }}
            >
              <MapPin size={15} strokeWidth={2.5} />
              Open Bus Stop in Google Maps
            </a>
          </div>
        </div>

        {/* ── Morning shift tasks card ───────────────────── */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-card">
          <div
            className="px-5 py-3 flex items-center gap-2"
            style={{ background: "linear-gradient(135deg, #b83c10, #e8622a)" }}
          >
            <Clock size={16} className="text-white/80" />
            <span className="text-white font-bold text-sm">Morning Shift — Hike Days</span>
          </div>
          <div className="px-5 py-2">
            {MORNING_TASKS.map((task, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 py-3.5 ${i < MORNING_TASKS.length - 1 ? "border-b border-zinc-100" : ""}`}
              >
                <CheckCircle2 size={18} strokeWidth={2} className="shrink-0 mt-0.5" style={{ color: "#2d6a4f" }} />
                <p className="text-zinc-700 text-sm font-medium leading-snug">{task}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
