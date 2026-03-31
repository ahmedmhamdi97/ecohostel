"use client";

import Link from "next/link";
import { Sun, Moon, Map, ChefHat, ScrollText, HelpCircle, Mountain } from "lucide-react";
import { useEffect, useState } from "react";

const allCards = [
  {
    id: "morning",
    label: "Morning\nShift",
    sub: "8:00 – 11:00",
    href: "/shifts?tab=morning",
    icon: Sun,
    bg: "linear-gradient(135deg, #b83c10 0%, #e8622a 100%)",
    glow: "0 12px 32px rgba(184,60,16,0.35)",
    activeHours: (h: number) => h >= 8 && h < 11,
    large: true,
    iconLight: true,
  },
  {
    id: "night",
    label: "Night\nShift",
    sub: "22:00 – 8:00",
    href: "/shifts?tab=night",
    icon: Moon,
    bg: "linear-gradient(135deg, #14302a 0%, #1e5c44 100%)",
    glow: "0 12px 32px rgba(20,48,42,0.4)",
    activeHours: (h: number) => h >= 22 || h < 8,
    large: true,
    iconLight: true,
  },
  {
    id: "tour",
    label: "Walking\nTour",
    sub: "14 stops · ~2 hours",
    href: "/tour",
    icon: Map,
    bg: "linear-gradient(135deg, #cde8df 0%, #9dd4c0 100%)",
    glow: null,
    activeHours: (h: number) => h >= 18 && h < 20,
    large: false,
    iconLight: false,
  },
  {
    id: "dinner",
    label: "Dinner",
    sub: "19:15 – 22:00",
    href: "/recipes",
    icon: ChefHat,
    bg: "linear-gradient(135deg, #fde2cc 0%, #f9bfa0 100%)",
    glow: null,
    activeHours: (h: number) => h >= 19 && h < 22,
    large: false,
    iconLight: false,
  },
  {
    id: "rules",
    label: "Rules",
    sub: "Hostel policy",
    href: "/rules",
    icon: ScrollText,
    bg: "linear-gradient(135deg, #dbe4f5 0%, #b6c8ec 100%)",
    glow: null,
    activeHours: () => false,
    large: false,
    iconLight: false,
  },
  {
    id: "wtf",
    label: "WTF do I\ndo when…",
    sub: "Troubleshooting",
    href: "/wtf",
    icon: HelpCircle,
    bg: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
    glow: null,
    activeHours: () => false,
    large: false,
    iconLight: false,
  },
  {
    id: "hike",
    label: "Sierra Nevada\nHike",
    sub: "Mon & Wed · Monachil",
    href: "/hike",
    icon: Mountain,
    bg: "linear-gradient(135deg, #d4e8df 0%, #a3c9b8 100%)",
    glow: null,
    activeHours: (_h: number) => {
      const now = new Date();
      const day = now.getDay();
      const h = now.getHours();
      return (day === 1 || day === 3) && h >= 8 && h < 11;
    },
    large: false,
    iconLight: false,
    fullWidth: true,
  },
];

export function ActivityCards() {
  const [hour, setHour] = useState<number | null>(null);

  useEffect(() => {
    setHour(new Date().getHours());
    const interval = setInterval(() => setHour(new Date().getHours()), 60000);
    return () => clearInterval(interval);
  }, []);

  const activeId = hour !== null
    ? (allCards.find((c) => c.activeHours(hour))?.id ?? null)
    : null;
  const anyActive = activeId !== null;

  const largeCards = allCards.filter((c) => c.large);
  const smallCards = allCards.filter((c) => !c.large);

  const getStyle = (card: typeof allCards[0]) => {
    const isActive = card.id === activeId;
    const isInactive = anyActive && !isActive;
    return {
      background: card.bg,
      boxShadow: isActive && card.glow ? card.glow : "0 2px 8px rgba(0,0,0,0.06)",
      transform: isInactive ? "scale(0.96)" : "scale(1)",
      opacity: isInactive ? 0.75 : 1,
      transition: "transform 0.25s ease, opacity 0.25s ease, box-shadow 0.25s ease",
    };
  };

  return (
    <>
      {/* Large cards */}
      <div className="grid grid-cols-2 gap-3.5 mb-3.5">
        {largeCards.map((card) => {
          const isActive = card.id === activeId;
          const Icon = card.icon;
          return (
            <Link key={card.href} href={card.href}>
              <div
                className={`tap-card relative rounded-[28px] overflow-hidden h-48 p-5 flex flex-col justify-between cursor-pointer${isActive ? " pulse-glow" : ""}`}
                style={getStyle(card)}
              >
                {/* Active badge */}
                {isActive && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/25 rounded-full px-2.5 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" style={{ animation: "pulse 2.4s ease-in-out infinite" }} />
                    <span className="text-white text-[10px] font-bold tracking-wide">NOW</span>
                  </div>
                )}
                <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Icon size={22} className="text-white" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-white font-bold text-xl leading-tight whitespace-pre-line tracking-tight">{card.label}</p>
                  <p className="text-white/65 text-xs mt-1 font-medium">{card.sub}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Small cards */}
      <div className="grid grid-cols-2 gap-3.5">
        {smallCards.map((card) => {
          const isActive = card.id === activeId;
          const Icon = card.icon;
          const isFullWidth = "fullWidth" in card && card.fullWidth;
          return (
            <Link key={card.href} href={card.href} className={isFullWidth ? "col-span-2" : ""}>
              <div
                className={`tap-card relative rounded-[28px] overflow-hidden p-4 flex cursor-pointer${isFullWidth ? " h-24 flex-row items-center gap-4" : " h-36 flex-col justify-between"}${isActive ? " pulse-glow" : ""}`}
                style={getStyle(card)}
              >
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(15,23,42,0.09)" }}
                >
                  <Icon size={19} className="text-slate-700" strokeWidth={2} />
                </div>
                <div className={isFullWidth ? "flex-1" : ""}>
                  <p className="text-slate-900 font-bold text-base leading-tight whitespace-pre-line tracking-tight">{card.label}</p>
                  <p className="text-slate-500 text-xs mt-0.5 font-medium">{card.sub}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
