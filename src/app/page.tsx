import { getAnnouncements } from "@/lib/sheets";
import { HomeSearch } from "@/components/HomeSearch";
import { AnnouncementHero } from "@/components/AnnouncementHero";
import { ActivityCards } from "@/components/ActivityCards";

export const revalidate = 300;

export default async function HomePage() {
  const announcements = await getAnnouncements();

  return (
    <div className="animate-fade-up">
      {/* ── Header ────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 pt-14 pb-2">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight leading-tight">
            Hello, Volunteer
          </h1>
          <p className="text-zinc-400 text-sm font-medium mt-0.5">Welcome to Eco Hostel</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="Eco Hostel" className="w-12 h-12 rounded-full shrink-0 object-cover" />
      </div>

      {/* ── Search ────────────────────────────────────────── */}
      <div className="px-5 mt-5">
        <HomeSearch />
      </div>

      {/* ── Categories ────────────────────────────────────── */}
      <div className="mt-7 px-5">
        <h2 className="text-lg font-bold text-zinc-900 mb-5">Quick Access</h2>

        <ActivityCards />
      </div>

      {/* ── Announcements ─────────────────────────────────── */}
      {announcements.length > 0 && (
        <div className="mt-7 px-5">
          <h2 className="text-lg font-bold text-zinc-900 mb-4">Announcements</h2>
          <AnnouncementHero announcements={announcements} />
        </div>
      )}

      <div className="h-6" />
    </div>
  );
}
