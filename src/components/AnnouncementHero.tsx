"use client";

import { useState } from "react";
import type { Announcement } from "@/types";

interface Props {
  announcements: Announcement[];
}

export function AnnouncementHero({ announcements }: Props) {
  const [idx, setIdx] = useState(0);
  const item = announcements[idx];

  return (
    <div>
      {/* Hero card */}
      <div className="relative rounded-3xl overflow-hidden h-48 bg-zinc-900">
        <div className="dot-pattern absolute inset-0" />
        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          {/* Date badge */}
          <div>
            {item.date && (
              <span className="inline-block bg-white/15 backdrop-blur-sm text-white/80
                               text-[10px] font-semibold px-2.5 py-1 rounded-full">
                {item.date}
              </span>
            )}
          </div>

          {/* Message + see more */}
          <div className="flex items-end justify-between gap-3">
            <p className="text-white font-semibold text-base leading-snug flex-1 line-clamp-2">
              {item.message}
            </p>
          </div>
        </div>
      </div>

      {/* Dots indicator */}
      {announcements.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {announcements.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`rounded-full transition-all duration-200
                ${i === idx
                  ? "w-5 h-1.5 bg-zinc-900"
                  : "w-1.5 h-1.5 bg-zinc-300"
                }`}
              aria-label={`Announcement ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
