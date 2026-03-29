import Link from "next/link";
import { getAnnouncements } from "@/lib/sheets";
import { HomeSearch } from "@/components/HomeSearch";
import { AnnouncementHero } from "@/components/AnnouncementHero";
import { Sun, Moon, MapPin, ChefHat, ScrollText, HelpCircle } from "lucide-react";

export const revalidate = 300;

const shiftCategories = [
  {
    label: "Morning\nShift",
    sub: "8:00 - 11:00",
    href: "/shifts?tab=morning",
    icon: Sun,
    bg: "linear-gradient(135deg, #2d6a4f, #52b788)",
  },
  {
    label: "Night\nShift",
    sub: "22:00 - 8:00",
    href: "/shifts?tab=night",
    icon: Moon,
    bg: "linear-gradient(135deg, #1b4332, #2d6a4f)",
  },
];

const smallCategories = [
  {
    label: "Walking\nTour",
    sub: "18:00 - 20:00",
    href: "/guides?q=walking+tour",
    icon: MapPin,
    bg: "linear-gradient(135deg, #d4e9e2, #a8d5c2)",
  },
  {
    label: "Recipes",
    sub: "19:15 - 22:00",
    href: "/recipes",
    icon: ChefHat,
    bg: "linear-gradient(135deg, #fde8d8, #f9c9a8)",
  },
  {
    label: "Rules",
    sub: "Hostel policy",
    href: "/guides?q=rules",
    icon: ScrollText,
    bg: "linear-gradient(135deg, #dce4f5, #b8c9ed)",
  },
  {
    label: "WTF do I\ndo when…",
    sub: "Troubleshooting",
    href: "/guides?q=wtf",
    icon: HelpCircle,
    bg: "linear-gradient(135deg, #fdf3d0, #f9e199)",
  },
];

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

        {/* Shift cards — large */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {shiftCategories.map(({ label, sub, href, icon: Icon, bg }) => (
            <Link key={href} href={href}>
              <div
                className="tap-card relative rounded-3xl overflow-hidden h-48 p-5 flex flex-col justify-between"
                style={{ background: bg }}
              >
                <div className="relative">
                  <div className="w-11 h-11 rounded-2xl bg-white/25 flex items-center justify-center">
                    <Icon size={22} className="text-white" strokeWidth={2} />
                  </div>
                </div>
                <div className="relative">
                  <p className="text-white font-bold text-lg leading-tight whitespace-pre-line">{label}</p>
                  <p className="text-white/70 text-xs mt-0.5 font-medium">{sub}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Other cards — small */}
        <div className="grid grid-cols-2 gap-4">
          {smallCategories.map(({ label, sub, href, icon: Icon, bg }) => (
            <Link key={href} href={href}>
              <div
                className="tap-card relative rounded-3xl overflow-hidden h-36 p-4 flex flex-col justify-between"
                style={{ background: bg }}
              >
                <div className="relative">
                  <div className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ background: "rgba(27,42,74,0.1)" }}>
                    <Icon size={18} className="text-zinc-700" strokeWidth={2} />
                  </div>
                </div>
                <div className="relative">
                  <p className="text-zinc-900 font-bold text-base leading-tight whitespace-pre-line">{label}</p>
                  <p className="text-zinc-500 text-xs mt-0.5 font-medium">{sub}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
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
