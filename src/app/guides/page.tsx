import { getTutorials } from "@/lib/sheets";
import { GuidesClient } from "@/components/GuidesClient";
import { BackButton } from "@/components/BackButton";

export const revalidate = 300;

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const [tutorials, resolvedParams] = await Promise.all([
    getTutorials(),
    searchParams,
  ]);
  const initialSearch = resolvedParams.q ?? "";

  return (
    <div className="px-5 pt-14 pb-6 space-y-6 animate-fade-up">
      <div className="flex items-center gap-4">
        <BackButton />
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Guides</h1>
          <p className="text-zinc-400 text-sm font-medium mt-1">
            Step-by-step tutorials for every task
          </p>
        </div>
      </div>
      <GuidesClient tutorials={tutorials} initialSearch={initialSearch} />
    </div>
  );
}
