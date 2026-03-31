import { getAnnouncements } from "@/lib/sheets";
import { AnnouncementHero } from "@/components/AnnouncementHero";
import { ActivityCards } from "@/components/ActivityCards";
import { HomeHeader } from "@/components/HomeHeader";

export const revalidate = 300;

export default async function HomePage() {
  const announcements = await getAnnouncements();

  return (
    <div className="animate-fade-up">
      {/* ── Header ────────────────────────────────────────── */}
      <HomeHeader />

      {/* ── Categories ────────────────────────────────────── */}
      <div className="mt-12 px-5">
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
