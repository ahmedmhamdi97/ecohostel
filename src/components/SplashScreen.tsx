"use client";

import { useEffect, useRef, useState } from "react";
import { SPLASH_DURATION_MS } from "@/constants";

const SPLASH_KEY = "splash-seen";

export function SplashScreen() {
  const ref = useRef<HTMLDivElement>(null);
  const alreadySeen =
    typeof window !== "undefined" && !!sessionStorage.getItem(SPLASH_KEY);
  const [visible, setVisible] = useState(!alreadySeen);

  useEffect(() => {
    if (sessionStorage.getItem(SPLASH_KEY)) return;

    sessionStorage.setItem(SPLASH_KEY, "1");

    const timer = setTimeout(() => setVisible(false), SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={ref}
      className="splash-screen fixed inset-0 flex flex-col overflow-hidden"
      style={{ zIndex: 9999, pointerEvents: "none" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-amber-200 via-orange-300 to-stone-600" />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/splash.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/5 to-black/70" />

      <div className="absolute inset-x-0 bottom-0 px-8 pb-20 flex flex-col items-center">
        <img
          src="/logo.png"
          alt="Eco Hostel"
          className="w-20 h-20 mb-5 drop-shadow-lg"
        />

        <h1 className="text-white text-4xl font-extrabold tracking-tight text-center leading-tight drop-shadow-lg">
          ECO HOSTEL
        </h1>
        <p className="text-white/70 text-base font-medium mt-2 text-center">
          Volunteer Hub
        </p>

        <div className="mt-10 w-28 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.2)" }}>
          <div className="h-full rounded-full splash-progress" style={{ background: "rgba(255,255,255,0.8)" }} />
        </div>
      </div>
    </div>
  );
}
