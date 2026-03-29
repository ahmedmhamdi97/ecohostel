import { DinnerCarousel } from "@/components/DinnerCarousel";
import { BackButton } from "@/components/BackButton";

export default function RecipesPage() {
  return (
    <div
      className="flex flex-col animate-fade-up"
      style={{
        height: "calc(100dvh - 80px)",
        paddingTop: "env(safe-area-inset-top, 44px)",
        justifyContent: "space-evenly",
      }}
    >
      <div className="flex items-center gap-4 px-5">
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
