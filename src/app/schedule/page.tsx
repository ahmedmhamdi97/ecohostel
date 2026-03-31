import { getSchedule } from "@/lib/sheets";
import { ScheduleClient } from "@/components/ScheduleClient";
import { Calendar } from "lucide-react";

export const revalidate = 300;

export default async function SchedulePage() {
  const schedules = await getSchedule();
  const latest = schedules[schedules.length - 1];

  if (!latest?.image_url) {
    return (
      <div className="px-5 pt-14 pb-6 flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white rounded-3xl border border-zinc-100 shadow-card p-10 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-zinc-100 flex items-center justify-center mx-auto">
            <Calendar size={28} className="text-zinc-400" strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-zinc-700 font-bold text-base">No schedule uploaded yet</p>
            <p className="text-zinc-400 text-sm mt-1 font-medium">
              Add an image URL to the &ldquo;schedule&rdquo; sheet.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <ScheduleClient imageUrl={latest.image_url} />;
}
