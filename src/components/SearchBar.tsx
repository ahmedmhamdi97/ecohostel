"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search…" }: SearchBarProps) {
  return (
    <div className="relative flex items-center">
      <Search
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-zinc-100 rounded-2xl py-3.5 pl-10 pr-10 text-sm font-medium
                   text-zinc-800 placeholder:text-zinc-400
                   focus:outline-none focus:ring-2 focus:ring-zinc-900/20 focus:bg-white
                   transition-all duration-200"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full
                     bg-zinc-300 flex items-center justify-center"
          aria-label="Clear"
        >
          <X size={11} className="text-zinc-600" />
        </button>
      )}
    </div>
  );
}
