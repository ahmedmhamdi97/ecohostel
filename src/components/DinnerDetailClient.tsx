"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Circle } from "lucide-react";
import type { DinnerDay, DinnerSection } from "@/lib/dinnerData";

interface Props {
  dinner: DinnerDay;
  sections: DinnerSection[];
}

export function DinnerDetailClient({ dinner, sections }: Props) {
  const router = useRouter();
  const storageKey = `dinner-${dinner.slug}-${new Date().toDateString()}`;
  const [checked, setChecked] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setChecked(new Set(JSON.parse(saved) as string[]));
    } catch {
      // ignore
    }
  }, [storageKey]);

  const toggleTask = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem(storageKey, JSON.stringify(Array.from(next)));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const allTasks = sections.flatMap((s) => s.tasks);
  const completed = allTasks.filter((t) => checked.has(t.id)).length;
  const total = allTasks.length;
  const progress = total > 0 ? completed / total : 0;

  return (
    <div className="min-h-screen animate-fade-up" style={{ background: "#f2f5f0" }}>
      {/* Hero gradient */}
      <div className="relative" style={{ height: 220, background: dinner.gradient }}>
        {/* Back button */}
        <div className="absolute top-14 left-5">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-white/30 active:opacity-70 transition-opacity"
            style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
          >
            <ArrowLeft size={18} className="text-white" strokeWidth={2} />
          </button>
        </div>

        {/* Title */}
        <div className="absolute bottom-6 left-5 right-5">
          <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">
            {dinner.day}
          </p>
          <h1 className="text-white font-extrabold text-3xl leading-tight tracking-tight">
            {dinner.name}
          </h1>
        </div>
      </div>

      {/* Content sheet — overlaps hero */}
      <div
        className="-mt-5 relative z-10 px-5 pt-7 pb-safe space-y-6"
        style={{ background: "#f2f5f0", borderRadius: "2rem 2rem 0 0" }}
      >
        {/* Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wide">
              Progress
            </span>
            <span className="text-xs font-bold text-zinc-900">
              {completed}/{total} tasks
            </span>
          </div>
          <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress * 100}%`, background: dinner.gradient }}
            />
          </div>
        </div>

        {/* Task sections */}
        {sections.map((section) => {
          const sectionDone = section.tasks.filter((t) => checked.has(t.id)).length;
          return (
            <div key={section.key}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg leading-none">{section.icon}</span>
                <h2 className="text-sm font-bold text-zinc-900">{section.title}</h2>
                <span className="ml-auto text-xs font-semibold text-zinc-400">
                  {sectionDone}/{section.tasks.length}
                </span>
              </div>

              <div className="bg-white rounded-3xl border border-zinc-100 shadow-card overflow-hidden">
                {section.tasks.map((task, i) => {
                  const done = checked.has(task.id);
                  return (
                    <button
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors active:bg-zinc-50
                        ${i < section.tasks.length - 1 ? "border-b border-zinc-100" : ""}
                        ${done ? "bg-zinc-50/60" : ""}`}
                    >
                      {done ? (
                        <CheckCircle2
                          size={20}
                          strokeWidth={2}
                          style={{ color: "#1B2A4A", flexShrink: 0 }}
                        />
                      ) : (
                        <Circle size={20} strokeWidth={1.5} className="text-zinc-300 shrink-0" />
                      )}
                      <span
                        className={`text-sm font-medium leading-snug ${
                          done ? "line-through text-zinc-400" : "text-zinc-700"
                        }`}
                      >
                        {task.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
