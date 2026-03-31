"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Bus, CheckCircle2, Clock, ChevronDown, Map } from "lucide-react";

const BUS_STOP_URL = "https://maps.google.com/?q=Paseo+De+Los+Basilios,+Centro,+18006+Granada,+Spain";
const MONACHIL_URL = "https://maps.google.com/?q=Monachil,+Granada,+Spain";

const MORNING_TASKS = [
  "Go down at 9:00 AM (instead of the usual 8:00 AM)",
  "Buy fruit for the pack lunches",
  "Help organize the activity",
  "Take the first aid kit and the bus ticket",
];

const ROUTE_STEPS: { caption: string; img: string }[] = [
  { img: "/hike/step-01.webp", caption: "Start of trail — enter past the no-entry signs at the edge of the village" },
  { img: "/hike/step-02.webp", caption: "Cross the main square and continue straight" },
  { img: "/hike/step-03.webp", caption: "Turn right at the white building with the orange fence" },
  { img: "/hike/step-04.webp", caption: "Head uphill on the paved road with the railing on the right" },
  { img: "/hike/step-05.webp", caption: "Enter the olive grove — follow the dirt path into the trees" },
  { img: "/hike/step-06.webp", caption: "Continue on the open road past the Parking Privado sign" },
  { img: "/hike/step-07.webp", caption: "Take the dirt path on the left at the fork" },
  { img: "/hike/step-08.webp", caption: "Walk through the shaded olive grove" },
  { img: "/hike/step-09.webp", caption: "Follow the rocky trail uphill — canyon walls start appearing" },
  { img: "/hike/step-10.webp", caption: "Cross the concrete bridge (as marked)" },
  { img: "/hike/step-11.webp", caption: "Open meadow — follow the trail signpost ahead" },
  { img: "/hike/step-12.webp", caption: "Enter the rocky canyon — follow the yellow trail signs" },
  { img: "/hike/step-13.webp", caption: "Follow the blue arrow markers painted on the rocks" },
  { img: "/hike/step-14.webp", caption: "Cross the red suspension bridge through the rock arch" },
  { img: "/hike/step-15.webp", caption: "Check the wooden signpost and follow the direction it points" },
  { img: "/hike/step-16.webp", caption: "Continue on the wide open mountain path" },
  { img: "/hike/step-17.webp", caption: "Reach the rocky plateau — great views start here" },
  { img: "/hike/step-18.webp", caption: "First panoramic viewpoint — Granada valley below" },
  { img: "/hike/step-19.webp", caption: "Rocky descent path — take it slow, loose stones" },
  { img: "/hike/step-20.webp", caption: "The rocky peak ahead — you're almost at the top!" },
  { img: "/hike/step-21.webp", caption: "Pass the olive grove and green netting — back toward the village" },
  { img: "/hike/step-22.webp", caption: "Trail marker post — follow the path back down" },
  { img: "/hike/step-23.webp", caption: "Final descent — Monachil village visible below" },
  { img: "/hike/step-24.webp", caption: "Continue along the wide gravel path" },
  { img: "/hike/step-25.webp", caption: "Follow the trail as it curves around the hillside" },
  { img: "/hike/step-26.webp", caption: "Stay on the main path — ignore smaller side trails" },
  { img: "/hike/step-27.webp", caption: "Back to the village — hike complete! 🎉" },
];

export function HikeClient() {
  const [routeOpen, setRouteOpen] = useState(false);

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

        {/* ── Morning shift tasks ────────────────────────── */}
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

        {/* ── Photo route guide ──────────────────────────── */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-card">
          {/* Toggle header */}
          <button
            className="w-full flex items-center gap-2 px-5 py-4 text-left"
            style={{ background: "linear-gradient(135deg, #1c3a2e, #2d6a4f)" }}
            onClick={() => setRouteOpen(!routeOpen)}
          >
            <Map size={16} className="text-white/80 shrink-0" />
            <span className="text-white font-bold text-sm flex-1">Photo Route Guide</span>
            <span className="text-white/60 text-xs font-medium mr-1">{ROUTE_STEPS.length} steps</span>
            <ChevronDown
              size={18}
              className="text-white/70 transition-transform duration-300 shrink-0"
              style={{ transform: routeOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>

          {/* Expandable steps */}
          <div
            className="grid transition-all duration-300 ease-in-out"
            style={{ gridTemplateRows: routeOpen ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <div className="divide-y divide-zinc-100">
                {ROUTE_STEPS.map((step, i) => (
                  <div key={i} className="flex gap-0">
                    {/* Step number column */}
                    <div className="flex flex-col items-center py-3 pl-4 pr-2" style={{ minWidth: 36 }}>
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-black shrink-0"
                        style={{ background: "linear-gradient(135deg, #1c3a2e, #2d6a4f)" }}
                      >
                        {i + 1}
                      </div>
                      {i < ROUTE_STEPS.length - 1 && (
                        <div className="w-px flex-1 mt-1" style={{ background: "#e4e9e6", minHeight: 8 }} />
                      )}
                    </div>

                    {/* Photo + caption */}
                    <div className="flex-1 py-3 pr-4 pl-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={step.img}
                        alt={step.caption}
                        className="w-full rounded-2xl object-cover mb-2"
                        style={{ height: 200 }}
                        loading="lazy"
                      />
                      <p className="text-zinc-700 text-xs font-medium leading-snug">{step.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
