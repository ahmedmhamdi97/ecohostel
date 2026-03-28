import Link from "next/link";
import { getAnnouncements } from "@/lib/sheets";
import { HomeSearch } from "@/components/HomeSearch";
import { AnnouncementHero } from "@/components/AnnouncementHero";
import { Sun, Moon, MapPin, ChefHat, ScrollText, HelpCircle } from "lucide-react";

export const revalidate = 300;

const smallCategories = [
  {
    label: "Morning\nShift",
    sub: "Opening tasks",
    href: "/shifts?tab=morning",
    icon: Sun,
    bg: "linear-gradient(135deg, #fbbf24, #f97316)",
  },
  {
    label: "Night\nShift",
    sub: "Closing tasks",
    href: "/shifts?tab=night",
    icon: Moon,
    bg: "linear-gradient(135deg, #6366f1, #7c3aed)",
  },
  {
    label: "Walking\nTour",
    sub: "City highlights",
    href: "/guides?q=walking+tour",
    icon: MapPin,
    bg: "linear-gradient(135deg, #34d399, #0d9488)",
  },
  {
    label: "Recipes",
    sub: "Kitchen guide",
    href: "/recipes",
    icon: ChefHat,
    bg: "linear-gradient(135deg, #fb7185, #db2777)",
  },
  {
    label: "Rules",
    sub: "Hostel policy",
    href: "/guides?q=rules",
    icon: ScrollText,
    bg: "linear-gradient(135deg, #52525b, #18181b)",
  },
  {
    label: "WTF do I\ndo when…",
    sub: "Troubleshooting",
    href: "/guides?q=wtf",
    icon: HelpCircle,
    bg: "linear-gradient(135deg, #facc15, #fb923c)",
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
        <h2 className="text-lg font-bold text-zinc-900 mb-4">Quick Access</h2>

        <div className="grid grid-cols-2 gap-3">
          {smallCategories.map(({ label, sub, href, icon: Icon, bg }) => (
            <Link key={href} href={href}>
              <div
                className="relative rounded-3xl overflow-hidden h-36 p-4 flex flex-col justify-between active:scale-[0.97] transition-transform"
                style={{ background: bg }}
              >
                <div className="dot-pattern absolute inset-0" />
                <div className="relative">
                  <div className="w-9 h-9 rounded-2xl bg-white/25 flex items-center justify-center">
                    <Icon size={18} className="text-white" strokeWidth={2.2} />
                  </div>
                </div>
                <div className="relative">
                  <p className="text-white font-bold text-base leading-tight whitespace-pre-line">{label}</p>
                  <p className="text-white/70 text-xs mt-0.5 font-medium">{sub}</p>
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
