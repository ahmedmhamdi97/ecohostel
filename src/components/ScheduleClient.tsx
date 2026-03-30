"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function ScheduleClient({ imageUrl }: { imageUrl: string }) {
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);

  const lastDist = useRef<number | null>(null);
  const lastScale = useRef(1);
  const lastTx = useRef(0);
  const lastTy = useRef(0);
  const lastSingleTouch = useRef({ x: 0, y: 0 });
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
      lastTx.current = tx;
      lastTy.current = ty;
    } else if (e.touches.length === 1) {
      const now = Date.now();
      if (now - lastTapTime.current < 300) {
        setScale(1);
        setTx(0);
        setTy(0);
      }
      lastTapTime.current = now;
      lastSingleTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      lastTx.current = tx;
      lastTy.current = ty;
    }
  }

  function handleTouchMove(e: React.TouchEvent) {
    e.preventDefault();
    if (e.touches.length === 2 && lastDist.current !== null) {
      const dist = getDistance(e.touches);
      const ratio = dist / lastDist.current;
      const next = Math.min(Math.max(lastScale.current * ratio, 1), 5);
      setScale(next);
    } else if (e.touches.length === 1 && scale > 1) {
      const dx = e.touches[0].clientX - lastSingleTouch.current.x;
      const dy = e.touches[0].clientY - lastSingleTouch.current.y;
      setTx(lastTx.current + dx);
      setTy(lastTy.current + dy);
    }
  }

  function handleTouchEnd() {
    lastDist.current = null;
    if (scale <= 1) { setTx(0); setTy(0); }
  }

  return (
    <div
      className="fixed inset-0 bg-black"
      style={{ touchAction: "none" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Back button → home */}
      <Link
        href="/"
        className="absolute top-0 left-0 z-10 m-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md active:scale-90 transition-transform"
        style={{ marginTop: "env(safe-area-inset-top, 44px)" }}
      >
        <ArrowLeft size={18} className="text-zinc-900" strokeWidth={2} />
      </Link>

      {/* Image — full width, rotated 90°, pinch-to-zoom */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt="Weekly schedule"
          draggable={false}
          style={{
            width: "100vw",
            objectFit: "contain",
            transform: `rotate(90deg) scale(${scale}) translate(${tx / scale}px, ${ty / scale}px)`,
            transition: scale === 1 && tx === 0 && ty === 0 ? "transform 0.25s ease" : "none",
            userSelect: "none",
            WebkitUserSelect: "none",
          }}
        />
      </div>

      {/* Hint */}
      <p
        className="absolute bottom-0 left-0 right-0 text-white/40 text-xs text-center"
        style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}
      >
        Pinch to zoom · Double-tap to reset
      </p>
    </div>
  );
}
