import { BackButton } from "@/components/BackButton";

export default function HobbiesPage() {
  return (
    <div className="animate-fade-up px-5 pt-14 pb-safe">
      <div className="flex items-center gap-4 mb-5">
        <BackButton />
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Hobbies</h1>
          <p className="text-zinc-400 text-sm font-medium mt-0.5">Things to do</p>
        </div>
      </div>
    </div>
  );
}
