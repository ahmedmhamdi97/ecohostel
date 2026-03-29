"use client";

import Link from "next/link";
import { Sun, Moon, MapPin, ChefHat, ScrollText, HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";

const allCards = [
  {
    id: "morning",
    label: "Morning\nShift",
    sub: "8:00 - 11:00",
    href: "/shifts?tab=morning",
    icon: Sun,
    bg: "linear-gradient(135deg, #c1440e, #e8724a)",
    glow: "0 8px 30px rgba(245,158,11,0.4)",
    activeHours: (h: number) => h >= 8 && h < 11,
    large: true,
    iconLight: true,
  },
  {
    id: "night",
    label: "Night\nShift",
    sub: "22:00 - 8:00",
    href: "/shifts?tab=night",
    icon: Moon,
    bg: "linear-gradient(135deg, #1b4332, #2d6a4f)",
    glow: "0 8px 30px rgba(99,102,241,0.4)",
    activeHours: (h: number) => h >= 22 || h < 8,
    large: true,
    iconLight: true,
  },
  {
    id: "tour",
    label: "Walking\nTour",
    sub: "18:00 - 20:00",
    href: "/guides?q=walking+tour",
    icon: MapPin,
    bg: "linear-gradient(135deg, #d4e9e2, #a8d5c2)",
    glow: "0 8px 30px rgba(16,185,129,0.4)",
    activeHours: (h: number) => h >= 18 && h < 20,
    large: false,
    iconLight: false,
  },
  {
    id: "dinner",
    label: "Recipes",
    sub: "19:15 - 22:00",
    href: "/recipes",
    icon: ChefHat,
    bg: "linear-gradient(135deg, #fde8d8, #f9c9a8)",
    glow: "0 8px 30px rgba(239,68,68,0.4)",
    activeHours: (h: number) => h >= 19 && h < 22,
    large: false,
    iconLight: false,
  },
  {
    id: "rules",
    label: "Rules",
    sub: "Hostel policy",
    href: "/guides?q=rules",
    icon: ScrollText,
    bg: "linear-gradient(135deg, #dce4f5, #b8c9ed)",
    glow: null,
    activeHours: () => false,
    large: false,
    iconLight: false,
  },
  {
    id: "wtf",
    label: "WTF do I\ndo when…",
    sub: "Troubleshooting",
    href: "/guides?q=wtf",
    icon: HelpCircle,
    bg: "linear-gradient(135deg, #fdf3d0, #f9e199)",
    glow: null,
    activeHours: () => false,
    large: false,
    iconLight: false,
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
      boxShadow: isActive && card.glow ? card.glow : undefined,
      transform: isInactive ? "scale(0.95)" : undefined,
      opacity: isInactive ? 0.6 : undefined,
      transition: "transform 0.3s ease, opacity 0.3s ease, box-shadow 0.3s ease",
    };
  };

  return (
    <>
      {/* Large cards */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {largeCards.map((card) => {
          const isActive = card.id === activeId;
          const Icon = card.icon;
          return (
            <Link key={card.href} href={card.href}>
              <div
                className={`tap-card relative rounded-3xl overflow-hidden h-48 p-5 flex flex-col justify-between${isActive ? " pulse-glow" : ""}`}
                style={getStyle(card)}
              >
                <div className="relative">
                  <div className="w-11 h-11 rounded-2xl bg-white/25 flex items-center justify-center">
                    <Icon size={22} className="text-white" strokeWidth={2} />
                  </div>
                </div>
                <div className="relative">
                  <p className="text-white font-bold text-lg leading-tight whitespace-pre-line">{card.label}</p>
                  <p className="text-white/70 text-xs mt-0.5 font-medium">{card.sub}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Small cards */}
      <div className="grid grid-cols-2 gap-4">
        {smallCards.map((card) => {
          const isActive = card.id === activeId;
          const Icon = card.icon;
          return (
            <Link key={card.href} href={card.href}>
              <div
                className={`tap-card relative rounded-3xl overflow-hidden h-36 p-4 flex flex-col justify-between${isActive ? " pulse-glow" : ""}`}
                style={getStyle(card)}
              >
                <div className="relative">
                  <div
                    className="w-9 h-9 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(27,42,74,0.1)" }}
                  >
                    <Icon size={18} className="text-zinc-700" strokeWidth={2} />
                  </div>
                </div>
                <div className="relative">
                  <p className="text-zinc-900 font-bold text-base leading-tight whitespace-pre-line">{card.label}</p>
                  <p className="text-zinc-500 text-xs mt-0.5 font-medium">{card.sub}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
