"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Sun, Moon, ArrowLeft } from "lucide-react";
import { ShiftChecklist } from "@/components/ShiftChecklist";
import type { ShiftTask } from "@/types";

interface ShiftsClientProps {
  morningTasks: ShiftTask[];
  nightTasks: ShiftTask[];
}

export function ShiftsClient({ morningTasks, nightTasks }: ShiftsClientProps) {
  const params = useSearchParams();
  const active = params.get("tab") === "night" ? "night" : "morning";
  const router = useRouter();

  const tasks = active === "morning" ? morningTasks : nightTasks;
  const isMorning = active === "morning";

  return (
    <div className="animate-fade-up">
      {/* ── Hero photo ───────────────────────────────────── */}
      <div className="relative h-72 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={isMorning ? "/hostel.jpg" : "/hostel-night.jpg"}
          alt={isMorning ? "Morning shift" : "Night shift"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="absolute top-14 left-5 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm
                     flex items-center justify-center shadow-md active:scale-90 transition-transform"
        >
          <ArrowLeft size={18} className="text-zinc-900" strokeWidth={2.2} />
        </button>
      </div>

      {/* ── White sheet ──────────────────────────────────── */}
      <div className="relative -mt-6 bg-white rounded-t-3xl min-h-screen px-5 pt-6 pb-8">

        {/* Title row */}
        <div className="flex items-start justify-between mb-1">
          <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
            {isMorning ? "Morning Shift" : "Night Shift"}
          </h1>
          <div className="flex items-center gap-1.5 mt-1">
            {isMorning
              ? <Sun size={18} className="text-amber-400" strokeWidth={2.2} />
              : <Moon size={18} className="text-indigo-400" strokeWidth={2.2} />
            }
          </div>
        </div>
        <p className="text-zinc-400 text-sm font-medium mb-6">
          {tasks.length} tasks · {isMorning ? "Opening duties" : "Closing duties"}
        </p>

        {/* Checklist */}
        <ShiftChecklist tasks={tasks} shiftType={active} />
      </div>
    </div>
  );
}
