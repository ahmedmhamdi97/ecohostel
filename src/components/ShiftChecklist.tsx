"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import type { ShiftTask } from "@/types";

interface ShiftChecklistProps {
  tasks: ShiftTask[];
  shiftType: "morning" | "night";
}

export function ShiftChecklist({ tasks, shiftType }: ShiftChecklistProps) {
  const today = new Date().toISOString().split("T")[0];
  const storageKey = `shift-${shiftType}-${today}`;

  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setChecked(new Set(JSON.parse(saved)));
    } catch { /* ignore */ }
    setMounted(true);
  }, [storageKey]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(storageKey, JSON.stringify([...checked]));
  }, [checked, storageKey, mounted]);

  const toggle = (i: number) =>
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  const done = checked.size;
  const total = tasks.length;
  const pct = total > 0 ? (done / total) * 100 : 0;

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-zinc-100 shadow-card p-8 text-center">
        <p className="text-zinc-400 text-sm font-medium">
          No tasks found. Add tasks to the sheet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-zinc-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${pct}%`, background: "#1B2A4A" }}
          />
        </div>
        <span className="text-xs font-semibold text-zinc-500 tabular-nums whitespace-nowrap">
          {done}/{total}
        </span>
      </div>

      {/* Tasks */}
      <ul className="space-y-2">
        {tasks.map((task, i) => {
          const isDone = checked.has(i);
          return (
            <li key={i}>
              <button
                onClick={() => toggle(i)}
                className={`w-full flex items-center gap-3.5 p-4 rounded-2xl text-left
                            transition-all duration-200 active:scale-[0.98]
                            ${isDone
                              ? "border"
                              : "bg-white border border-zinc-100 shadow-card"
                            }`}
                style={isDone ? { background: "#1B2A4A", borderColor: "#2a3f6b" } : undefined}
              >
                {isDone ? (
                  <CheckCircle2 size={22} className="text-white shrink-0" strokeWidth={2} />
                ) : (
                  <Circle size={22} className="text-zinc-300 shrink-0" strokeWidth={1.5} />
                )}
                <span className={`text-sm font-semibold transition-colors ${
                  isDone ? "text-white line-through decoration-white/40" : "text-zinc-700"
                }`}>
                  {task.task}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {done > 0 && (
        <button
          onClick={() => setChecked(new Set())}
          className="w-full py-3 text-xs font-semibold text-zinc-400 hover:text-zinc-600 transition-colors"
        >
          Reset checklist
        </button>
      )}
    </div>
  );
}
