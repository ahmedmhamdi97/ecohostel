"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BookOpen, Play, ChevronRight } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import type { Tutorial } from "@/types";

interface GuidesClientProps {
  tutorials: Tutorial[];
  initialSearch?: string;
}

export function GuidesClient({ tutorials, initialSearch = "" }: GuidesClientProps) {
  const [search, setSearch] = useState(initialSearch);

  // Collect unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(tutorials.map((t) => t.category).filter(Boolean)));
    return ["All", ...cats];
  }, [tutorials]);

  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return tutorials.filter((t) => {
      const matchSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q);
      const matchCat =
        activeCategory === "All" || t.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [search, activeCategory, tutorials]);

  return (
    <div className="space-y-5">
      <SearchBar value={search} onChange={setSearch} placeholder="Search guides…" />

      {/* Category pills */}
      {categories.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5 -mx-5 px-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold
                          transition-all duration-200
                          ${activeCategory === cat
                            ? "text-white shadow-md"
                            : "bg-zinc-100 text-zinc-500"
                          }`}
              style={activeCategory === cat ? { background: "#1B2A4A" } : undefined}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {tutorials.length === 0 && (
        <EmptyState message="No guides yet. Add entries to the 'tutorials' sheet." />
      )}
      {tutorials.length > 0 && filtered.length === 0 && (
        <EmptyState message={`No results for "${search || activeCategory}"`} />
      )}

      {/* Guide list */}
      <div className="space-y-3">
        {filtered.map((tutorial, i) => {
          const idx = tutorials.indexOf(tutorial);
          return (
            <Link
              key={i}
              href={`/guides/${idx}`}
              className="tap-card flex items-center gap-4 bg-white rounded-3xl border border-zinc-100
                         shadow-card p-4"
            >
              {/* Icon thumb */}
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0
                               ${tutorial.video ? "" : "bg-zinc-100"}`}
                   style={tutorial.video ? { background: "#1B2A4A" } : undefined}>
                {tutorial.video ? (
                  <Play size={18} className="text-white ml-0.5" fill="white" />
                ) : (
                  <BookOpen size={18} className="text-zinc-400" strokeWidth={2} />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-zinc-900 text-sm line-clamp-1">
                  {tutorial.title || "Untitled guide"}
                </p>
                {tutorial.category && (
                  <p className="text-xs text-zinc-400 font-medium mt-0.5">{tutorial.category}</p>
                )}
                {tutorial.video && (
                  <p className="text-[10px] text-zinc-500 font-semibold mt-1">Includes video</p>
                )}
              </div>

              <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                <ChevronRight size={14} className="text-zinc-500" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="bg-white rounded-3xl border border-zinc-100 shadow-card p-10 text-center">
      <BookOpen size={32} className="text-zinc-200 mx-auto mb-3" strokeWidth={1.5} />
      <p className="text-zinc-400 text-sm font-medium">{message}</p>
    </div>
  );
}
