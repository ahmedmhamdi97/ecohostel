"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";

export function HomeSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/guides?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <div className="relative flex-1">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search guides and recipes…"
          className="w-full bg-zinc-100 rounded-2xl py-3.5 pl-10 pr-4 text-sm
                     text-zinc-800 placeholder:text-zinc-400 font-medium
                     focus:outline-none focus:ring-2 focus:ring-zinc-900/20 focus:bg-white
                     transition-all duration-200"
        />
      </div>
      {/* Filter button */}
      <button
        type="button"
        onClick={() => router.push("/guides")}
        className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center
                   shrink-0 active:scale-90 transition-transform duration-150"
        aria-label="Browse guides"
      >
        <SlidersHorizontal size={18} className="text-white" strokeWidth={2} />
      </button>
    </form>
  );
}
