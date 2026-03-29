"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChefHat, ChevronRight } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import type { Recipe } from "@/types";

interface RecipesClientProps {
  recipes: Recipe[];
}

export function RecipesClient({ recipes }: RecipesClientProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return !q ? recipes : recipes.filter((r) => r.name.toLowerCase().includes(q));
  }, [search, recipes]);

  return (
    <div className="space-y-5">
      <SearchBar value={search} onChange={setSearch} placeholder="Search recipes…" />

      {recipes.length === 0 && (
        <EmptyState message="No recipes yet. Add entries to the 'recipes' sheet." />
      )}
      {recipes.length > 0 && filtered.length === 0 && (
        <EmptyState message={`No results for "${search}"`} />
      )}

      {/* Featured (first recipe) — large card */}
      {!search && filtered.length > 0 && (
        <div>
          <Link href={`/recipes/${recipes.indexOf(filtered[0])}`}>
            <div className="tap-card relative rounded-3xl overflow-hidden h-52 bg-zinc-200">
              {filtered[0].image ? (
                <Image
                  src={filtered[0].image}
                  alt={filtered[0].name}
                  fill
                  className="object-cover"
                 
                />
              ) : (
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #2a3f6b, #1B2A4A)" }} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white/60 text-xs font-semibold mb-1">Featured Recipe</p>
                <p className="text-white font-extrabold text-lg leading-tight">{filtered[0].name}</p>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Grid — remaining recipes */}
      <div className="grid grid-cols-2 gap-3">
        {(search ? filtered : filtered.slice(1)).map((recipe, i) => {
          const idx = recipes.indexOf(recipe);
          return (
            <Link
              key={i}
              href={`/recipes/${idx}`}
              className="tap-card bg-white rounded-3xl border border-zinc-100 shadow-card overflow-hidden flex flex-col"
            >
              <div className="relative w-full aspect-[4/3] bg-zinc-100">
                {recipe.image ? (
                  <Image
                    src={recipe.image}
                    alt={recipe.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 200px"
                    className="object-cover"
                    
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-50">
                    <ChefHat size={20} className="text-zinc-300" strokeWidth={2} />
                  </div>
                )}
              </div>
              <div className="p-3 flex items-start justify-between gap-1">
                <p className="text-xs font-bold text-zinc-800 line-clamp-2 leading-snug flex-1">
                  {recipe.name || "Untitled"}
                </p>
                <ChevronRight size={14} className="text-zinc-300 shrink-0 mt-0.5" />
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
      <ChefHat size={32} className="text-zinc-200 mx-auto mb-3" strokeWidth={1.5} />
      <p className="text-zinc-400 text-sm font-medium">{message}</p>
    </div>
  );
}
