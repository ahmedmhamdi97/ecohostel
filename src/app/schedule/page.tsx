import { getSchedule } from "@/lib/sheets";
import Image from "next/image";
import { Calendar, RefreshCw } from "lucide-react";

export const revalidate = 300;

export default async function SchedulePage() {
  const schedules = await getSchedule();
  const latest = schedules[schedules.length - 1];

  return (
    <div className="px-5 pt-14 pb-6 space-y-6 animate-fade-up">
      <div>
        <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Schedule</h1>
        <p className="text-zinc-400 text-sm font-medium mt-1">Latest weekly shift roster</p>
      </div>

      {!latest?.image_url ? (
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
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-3 text-left inline-block">
            <p className="text-xs text-zinc-500 font-mono">
              sheet: <strong>schedule</strong> → column: <strong>image_url</strong>
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Latest schedule */}
          <div className="bg-white rounded-3xl border border-zinc-100 shadow-card overflow-hidden">
            <div className="relative w-full min-h-[340px] bg-zinc-100">
              <Image
                src={latest.image_url}
                alt="Weekly schedule"
                fill
                className="object-contain"
                unoptimized
                priority
              />
            </div>
          </div>

          {/* Info row */}
          <div className="flex items-center gap-2 px-1">
            <RefreshCw size={12} className="text-zinc-400 shrink-0" />
            <p className="text-xs text-zinc-400 font-medium">
              Updates automatically when the manager adds a new image link to the sheet.
            </p>
          </div>

          {/* Previous schedules */}
          {schedules.length > 1 && (
            <div className="space-y-3 pt-2">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                Previous schedules
              </p>
              {schedules.slice(0, -1).reverse().map((s, i) =>
                s.image_url ? (
                  <div
                    key={i}
                    className="bg-white rounded-3xl border border-zinc-100 shadow-card overflow-hidden opacity-50"
                  >
                    <div className="relative w-full min-h-[200px] bg-zinc-100">
                      <Image
                        src={s.image_url}
                        alt={`Past schedule ${i + 1}`}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                ) : null
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
