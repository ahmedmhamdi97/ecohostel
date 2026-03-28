"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();
  const homeActive = pathname === "/";
  const scheduleActive = pathname.startsWith("/schedule");
  const sosActive = pathname.startsWith("/sos");

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}
    >
      <div className="pointer-events-auto flex items-center gap-2 bg-zinc-900 rounded-full px-3 py-2.5 shadow-2xl">

        {/* SOS */}
        <Link
          href="/sos"
          className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 active:scale-90
            ${sosActive ? "bg-red-500" : "bg-red-500/20"}`}
        >
          <span className={`text-xs font-black tracking-wider ${sosActive ? "text-white" : "text-red-400"}`}>
            SOS
          </span>
        </Link>

        {/* Home — larger, centre */}
        <Link
          href="/"
          className={`flex items-center justify-center w-14 h-14 rounded-full transition-all duration-200 active:scale-90
            ${homeActive ? "bg-white" : "hover:bg-white/10"}`}
        >
          <Home
            size={22}
            strokeWidth={homeActive ? 2.2 : 1.8}
            className={homeActive ? "text-zinc-900" : "text-zinc-400"}
          />
        </Link>

        {/* Schedule */}
        <Link
          href="/schedule"
          className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 active:scale-90
            ${scheduleActive ? "bg-white" : "hover:bg-white/10"}`}
        >
          <Calendar
            size={20}
            strokeWidth={scheduleActive ? 2.2 : 1.8}
            className={scheduleActive ? "text-zinc-900" : "text-zinc-400"}
          />
        </Link>

      </div>
    </nav>
  );
}
