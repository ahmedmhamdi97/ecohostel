import { getRecipes, parseSteps, parseIngredients } from "@/lib/sheets";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, UtensilsCrossed, List } from "lucide-react";
import { notFound } from "next/navigation";

export const revalidate = 300;

interface Props {
  params: Promise<{ id: string }>;
}

export default async function RecipeDetailPage({ params }: Props) {
  const [recipes, { id }] = await Promise.all([getRecipes(), params]);
  const idx = parseInt(id, 10);

  if (isNaN(idx) || idx < 0 || idx >= recipes.length) notFound();

  const recipe = recipes[idx];
  const ingredients = parseIngredients(recipe.ingredients);
  const steps = parseSteps(recipe.steps);

  return (
    <div className="min-h-screen bg-zinc-50 animate-fade-up">
      {/* Hero image */}
      <div className="relative w-full h-64 bg-zinc-200">
        {recipe.image ? (
          <Image src={recipe.image} alt={recipe.name} fill className="object-cover"  priority />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 to-zinc-900 dot-pattern" />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />

        {/* Back button over image */}
        <div className="absolute top-0 left-0 right-0 px-5 py-5">
          <Link
            href="/recipes"
            className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center
                       border border-white/30 active:opacity-70 transition-opacity"
          >
            <ArrowLeft size={18} className="text-white" strokeWidth={2} />
          </Link>
        </div>
      </div>

      {/* Content card — overlaps image */}
      <div className="-mt-6 rounded-t-4xl bg-zinc-50 relative z-10 px-5 pt-7 pb-10 space-y-7">
        <h1 className="text-2xl font-extrabold text-zinc-900 leading-snug tracking-tight">
          {recipe.name || "Untitled recipe"}
        </h1>

        {/* Ingredients */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-full bg-zinc-900 flex items-center justify-center">
              <UtensilsCrossed size={13} className="text-white" strokeWidth={2} />
            </div>
            <h2 className="text-sm font-bold text-zinc-900">Ingredients</h2>
            {ingredients.length > 0 && (
              <span className="ml-auto text-xs font-semibold text-zinc-400">
                {ingredients.length} items
              </span>
            )}
          </div>

          {ingredients.length === 0 ? (
            <p className="text-zinc-400 text-sm font-medium">No ingredients listed.</p>
          ) : (
            <div className="bg-white rounded-3xl border border-zinc-100 shadow-card overflow-hidden">
              {ingredients.map((ing, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-4 py-3.5
                              ${i < ingredients.length - 1 ? "border-b border-zinc-100" : ""}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0" />
                  <span className="text-zinc-700 text-sm font-medium">{ing}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Steps */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-full bg-zinc-900 flex items-center justify-center">
              <List size={13} className="text-white" strokeWidth={2.5} />
            </div>
            <h2 className="text-sm font-bold text-zinc-900">Instructions</h2>
            {steps.length > 0 && (
              <span className="ml-auto text-xs font-semibold text-zinc-400">
                {steps.length} steps
              </span>
            )}
          </div>

          {steps.length === 0 ? (
            <p className="text-zinc-400 text-sm font-medium">No steps added yet.</p>
          ) : (
            <ol className="space-y-4">
              {steps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-2xl bg-zinc-900 text-white
                                   text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <div className="flex-1 bg-white rounded-2xl border border-zinc-100 shadow-card p-3.5">
                    <p className="text-zinc-700 text-sm leading-relaxed font-medium">{step}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
