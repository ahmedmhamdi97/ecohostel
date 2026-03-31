"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function ScheduleClient({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
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
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100vh",
          height: "100vw",
          objectFit: "contain",
          transform: "translate(-50%, -50%) rotate(90deg)",
        }}
      />
    </div>
  );
}
