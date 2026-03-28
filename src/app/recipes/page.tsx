import { getRecipes } from "@/lib/sheets";
import { RecipesClient } from "@/components/RecipesClient";

export const revalidate = 300;

export default async function RecipesPage() {
  const recipes = await getRecipes();

  return (
    <div className="px-5 pt-12 pb-6 space-y-5 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Recipes</h1>
        <p className="text-slate-500 text-sm mt-1">
          Ingredients and steps for every dish
        </p>
      </div>

      <RecipesClient recipes={recipes} />
    </div>
  );
}
