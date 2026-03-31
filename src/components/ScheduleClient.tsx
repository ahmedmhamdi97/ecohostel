"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function ScheduleClient({ imageUrl }: { imageUrl: string }) {
  const [scale, setScale] = useState(1);
  const lastDist = useRef<number | null>(null);
  const lastScale = useRef(1);
  const lastTapTime = useRef(0);

  function getDistance(touches: React.TouchList) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function handleTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 2) {
      e.preventDefault();
      lastDist.current = getDistance(e.touches);
      lastScale.current = scale;
    } else if (e.touches.length === 1) {
      const now = Date.now();
      if (now - lastTapTime.current < 300) setScale(1);
      lastTapTime.current = now;
    }
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (e.touches.length === 2 && lastDist.current !== null) {
      e.preventDefault();
      const dist = getDistance(e.touches);
      setScale(Math.min(Math.max(lastScale.current * (dist / lastDist.current), 1), 5));
    }
  }

  function handleTouchEnd() {
    lastDist.current = null;
  }

  return (
    <div
      className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden"
      style={{ touchAction: "none" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Back button */}
      <Link
        href="/"
        className="absolute top-0 left-0 z-10 m-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md active:scale-90 transition-transform"
        style={{ marginTop: "env(safe-area-inset-top, 44px)" }}
      >
        <ArrowLeft size={18} className="text-zinc-900" strokeWidth={2} />
      </Link>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt="Weekly schedule"
        draggable={false}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100vh",
          height: "100vw",
          objectFit: "contain",
          transform: `translate(-50%, -50%) rotate(90deg) scale(${scale})`,
          transformOrigin: "center center",
          transition: scale === 1 ? "transform 0.25s ease" : "none",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      />

      <p
        className="absolute bottom-0 left-0 right-0 text-white/40 text-xs text-center z-10"
        style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}
      >
        Pinch to zoom · Double-tap to reset
      </p>
    </div>
  );
}
