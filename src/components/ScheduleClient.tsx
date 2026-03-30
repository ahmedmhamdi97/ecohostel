"use client";

import { useRef, useState } from "react";
import { BackButton } from "./BackButton";

export function ScheduleClient({ imageUrl }: { imageUrl: string }) {
  const [scale, setScale] = useState(1);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  const lastDist = useRef<number | null>(null);
  const lastScale = useRef(1);

  function getDistance(touches: React.TouchList) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function handleTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 2) {
      lastDist.current = getDistance(e.touches);
      lastScale.current = scale;
      // Set zoom origin to midpoint of fingers
      const mx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const my = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      setOrigin({
        x: ((mx - rect.left) / rect.width) * 100,
        y: ((my - rect.top) / rect.height) * 100,
      });
    }
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (e.touches.length === 2 && lastDist.current !== null) {
      e.preventDefault();
      const dist = getDistance(e.touches);
      const ratio = dist / lastDist.current;
      const next = Math.min(Math.max(lastScale.current * ratio, 1), 5);
      setScale(next);
    }
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (e.touches.length < 2) {
      lastDist.current = null;
    }
  }

  function handleDoubleTap() {
    setScale((s) => (s > 1 ? 1 : 2.5));
    setOrigin({ x: 50, y: 50 });
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col" style={{ touchAction: "none" }}>
      {/* Back button */}
      <div className="absolute top-0 left-0 z-10 p-4" style={{ paddingTop: "env(safe-area-inset-top, 44px)" }}>
        <BackButton className="bg-white/20 backdrop-blur-sm text-white" />
      </div>

      {/* Image container */}
      <div
        className="flex-1 overflow-hidden flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={handleDoubleTap}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt="Weekly schedule"
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transform: `rotate(180deg) scale(${scale})`,
            transformOrigin: `${origin.x}% ${origin.y}%`,
            transition: scale === 1 ? "transform 0.3s ease" : "none",
            userSelect: "none",
          }}
        />
      </div>

      {/* Hint */}
      <p className="text-white/40 text-xs text-center pb-6" style={{ paddingBottom: "max(24px, env(safe-area-inset-bottom))" }}>
        Pinch to zoom · Double-tap to reset
      </p>
    </div>
  );
}
