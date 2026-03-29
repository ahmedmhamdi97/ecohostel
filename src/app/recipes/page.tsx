import { DinnerCarousel } from "@/components/DinnerCarousel";
import { BackButton } from "@/components/BackButton";

export default function RecipesPage() {
  return (
    <div className="pt-14 pb-safe animate-fade-up">
      <div className="flex items-center gap-4 px-5 mb-8">
        <BackButton />
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Dinner</h1>
          <p className="text-zinc-400 text-sm mt-0.5">This week&apos;s menu</p>
        </div>
      </div>
      <DinnerCarousel />
    </div>
  );
}
