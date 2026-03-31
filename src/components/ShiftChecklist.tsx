"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import type { ShiftTask } from "@/types";

interface ShiftChecklistProps {
  tasks: ShiftTask[];
  shiftType: "morning" | "night";
}

const GRADIENT = {
  morning: "linear-gradient(135deg, #c1440e, #e8724a)",
  night:   "linear-gradient(135deg, #1b4332, #2d6a4f)",
};

const ACCENT = {
  morning: "#c1440e",
  night:   "#1b4332",
};

export function ShiftChecklist({ tasks, shiftType }: ShiftChecklistProps) {
  const today = new Date().toISOString().split("T")[0];
  const storageKey = `shift-${shiftType}-${today}`;

  const [checked, setChecked] = useState<Set<number>>(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? new Set<number>(JSON.parse(saved)) : new Set();
    } catch (err) {
      console.warn("Failed to load shift checklist progress:", err);
      return new Set();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify([...checked]));
    } catch (err) {
      console.warn("Failed to save shift checklist progress:", err);
    }
  }, [checked, storageKey]);

  const toggle = (i: number) =>
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  const done  = checked.size;
  const total = tasks.length;
  const pct   = total > 0 ? (done / total) * 100 : 0;

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
    <div className="space-y-4">
      {/* Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-wide">
            Progress
          </span>
          <span className="text-xs font-bold text-zinc-900">{done}/{total} tasks</span>
        </div>
        <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, background: GRADIENT[shiftType] }}
          />
        </div>
      </div>

      {/* Task list */}
      <div className="bg-white rounded-3xl border border-zinc-100 shadow-card overflow-hidden">
        {tasks.map((task, i) => {
          const isDone = checked.has(i);
          return (
            <button
              key={i}
              onClick={() => toggle(i)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors active:bg-zinc-50
                ${i < tasks.length - 1 ? "border-b border-zinc-100" : ""}
                ${isDone ? "bg-zinc-50/60" : ""}`}
            >
              {isDone ? (
                <CheckCircle2
                  size={20}
                  strokeWidth={2}
                  style={{ color: ACCENT[shiftType], flexShrink: 0 }}
                />
              ) : (
                <Circle size={20} strokeWidth={1.5} className="text-zinc-300 shrink-0" />
              )}
              <span className={`text-sm font-medium leading-snug ${
                isDone ? "line-through text-zinc-400" : "text-zinc-700"
              }`}>
                {task.task}
              </span>
            </button>
          );
        })}
      </div>

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
