"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Clock, Users, ChevronRight } from "lucide-react";
import { DINNER_SCHEDULE } from "@/lib/dinnerData";

export function DinnerCarousel() {
  const today = new Date().getDay(); // 0=Sun … 6=Sat
  const todayIdx = today === 0 ? 6 : today - 1; // 0=Mon … 6=Sun

  const [active, setActive] = useState(todayIdx);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const router = useRouter();

  const scrollToCard = useCallback((i: number) => {
    cardRefs.current[i]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, []);

  // Center today's card on first load (no animation)
  useEffect(() => {
    cardRefs.current[todayIdx]?.scrollIntoView({
      behavior: "instant" as ScrollBehavior,
      block: "nearest",
      inline: "center",
    });
  }, [todayIdx]);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const containerCenter =
      container.getBoundingClientRect().left + container.offsetWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dist = Math.abs(rect.left + rect.width / 2 - containerCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActive(closest);
  }, []);

  return (
    <div>
      {/* Swipeable cards */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
        style={{ paddingLeft: "9%", paddingRight: "9%", scrollPaddingInline: "9%", gap: 14, paddingTop: 6, paddingBottom: 6 }}
        onScroll={handleScroll}
      >
        {DINNER_SCHEDULE.map((dinner, i) => {
          const isActive = i === active;
          const isToday = i === todayIdx;

          return (
            <div
              key={dinner.slug}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="snap-center shrink-0"
              style={{ width: "82%" }}
            >
              {/* Inner card — scales for non-active */}
              <div
                className="tap-card rounded-3xl overflow-hidden shadow-lg"
                style={{
                  background: dinner.gradient,
                  height: 220,
                  transform: isActive ? "scale(1)" : "scale(0.91)",
                  opacity: isActive ? 1 : 0.72,
                  transition: "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.35s ease",
                }}
                onClick={() => {
                  if (isActive) {
                    router.push(`/recipes/${dinner.slug}`);
                  } else {
                    scrollToCard(i);
                  }
                }}
              >
                <div className="p-6 h-full flex flex-col justify-between">
                  {/* Top row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-white/65 text-xs font-semibold uppercase tracking-wider">
                        {dinner.day}
                      </span>
                      {isToday && (
                        <span className="bg-white/25 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          Today
                        </span>
                      )}
                    </div>
                    {isActive && (
                      <ChevronRight size={18} className="text-white/60" strokeWidth={2.5} />
                    )}
                  </div>

                  {/* Bottom — name + meta */}
                  <div>
                    <h2 className="text-white font-extrabold text-[1.6rem] leading-tight mb-4">
                      {dinner.name}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1">
                        <Clock size={12} className="text-white/80" strokeWidth={2} />
                        <span className="text-white/90 text-xs font-semibold">{dinner.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1">
                        <Users size={12} className="text-white/80" strokeWidth={2} />
                        <span className="text-white/90 text-xs font-semibold">{dinner.volunteers} volunteers</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center items-center gap-1.5 mt-4">
        {DINNER_SCHEDULE.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToCard(i)}
            style={{
              width: i === active ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: i === active ? "#1B2A4A" : "#d1d5db",
              transition: "width 0.3s ease, background 0.3s ease",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}
