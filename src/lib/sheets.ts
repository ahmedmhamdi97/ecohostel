import type { Tutorial, Recipe, ShiftTask, Announcement, Schedule } from "@/types";

const BASE = "https://sheets.googleapis.com/v4/spreadsheets";

type Row = string[];

// Convert a 2D array (rows) into an array of objects using the first row as keys
function toObjects<T>(rows: Row[]): T[] {
  if (!rows || rows.length < 2) return [];
  const headers = rows[0];
  return rows.slice(1)
    .filter((row) => row.some((cell) => cell?.trim()))  // skip blank rows
    .map((row) => {
      const obj: Record<string, string> = {};
      headers.forEach((header, i) => {
        obj[header.trim()] = (row[i] ?? "").trim();
      });
      return obj as T;
    });
}

async function fetchSheet(sheetName: string): Promise<Row[]> {
  const id = process.env.SHEETS_ID;
  const key = process.env.SHEETS_API_KEY;

  if (!id || !key) {
    console.warn("SHEETS_ID or SHEETS_API_KEY not set — returning empty data");
    return [];
  }

  const url = `${BASE}/${id}/values/${encodeURIComponent(sheetName)}?key=${key}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!res.ok) {
      console.error(`Sheets API error for "${sheetName}": ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    return data.values ?? [];
  } catch (err) {
    console.error(`Failed to fetch sheet "${sheetName}":`, err);
    return [];
  }
}

// ─── Public data-access functions ─────────────────────────────────────────────

export async function getTutorials(): Promise<Tutorial[]> {
  const rows = await fetchSheet("tutorials");
  return toObjects<Tutorial>(rows);
}

export async function getRecipes(): Promise<Recipe[]> {
  const rows = await fetchSheet("recipes");
  return toObjects<Recipe>(rows);
}

const MORNING_TASKS_FALLBACK: ShiftTask[] = [
  { task: "Come down to reception at 8:00 AM with the iPhone",          order: 1  },
  { task: "Check for late check-in envelopes from night shift",         order: 2  },
  { task: "Clean living room tables, kitchen counter and stove",        order: 3  },
  { task: "Wash any dishes left in sink, dry and put away",             order: 4  },
  { task: "Put away kitchen items drying on the rack",                  order: 5  },
  { task: "Clean microwave inside and out",                             order: 6  },
  { task: "Empty toaster crumbs",                                       order: 7  },
  { task: "Put stools back down",                                       order: 8  },
  { task: "Arrange cushions in living room and TV Room",                order: 9  },
  { task: "Replace worn kitchen cloths and sponges",                    order: 10 },
  { task: "Tidy up TV Room",                                            order: 11 },
  { task: "Dust furniture surfaces",                                    order: 12 },
  { task: "Empty ashtrays on balconies, sweep cigarette butts",         order: 13 },
  { task: "Bring in any cork stools left on balconies",                 order: 14 },
  { task: "Mon & Fri: clean storage room and kitchen fridges",          order: 15 },
  { task: "Mon & Wed: go down at 9:00 AM to buy fruit for hiking",      order: 16 },
];

export async function getMorningTasks(): Promise<ShiftTask[]> {
  const rows = await fetchSheet("shifts_morning");
  const tasks = toObjects<{ task: string; order: string }>(rows).map(
    (t) => ({ task: t.task, order: Number(t.order) })
  );
  if (tasks.length === 0) return MORNING_TASKS_FALLBACK;
  return tasks.sort((a, b) => a.order - b.order);
}

const NIGHT_TASKS_FALLBACK: ShiftTask[] = [
  { task: "Put new bags in trash bins, tie with a knot",        order: 1  },
  { task: "Clear guests from common areas by midnight",         order: 2  },
  { task: "Turn off the music",                                 order: 3  },
  { task: "Put stools and benches on top of tables",            order: 4  },
  { task: "No stools left on balconies",                        order: 5  },
  { task: "Clear and dry the sink area",                        order: 6  },
  { task: "Wash dishes and glasses from dinner",                order: 7  },
  { task: "Store the pan back in storage",                      order: 8  },
  { task: "Sweep and mop kitchen, living area, TV Room",        order: 9  },
  { task: "Check phone is not on silent (Fermax app open)",     order: 10 },
  { task: "Do a round through the hostel — check noise levels", order: 11 },
  { task: "Fri only: take out the cardboard",                   order: 12 },
];

export async function getNightTasks(): Promise<ShiftTask[]> {
  const rows = await fetchSheet("shifts_night");
  const tasks = toObjects<{ task: string; order: string }>(rows).map(
    (t) => ({ task: t.task, order: Number(t.order) })
  );
  if (tasks.length === 0) return NIGHT_TASKS_FALLBACK;
  return tasks.sort((a, b) => a.order - b.order);
}

export async function getAnnouncements(): Promise<Announcement[]> {
  const rows = await fetchSheet("announcements");
  const items = toObjects<Announcement>(rows);
  // Show newest first
  return items.reverse();
}

export async function getSchedule(): Promise<Schedule[]> {
  const rows = await fetchSheet("schedule");
  return toObjects<Schedule>(rows);
}

// ─── Slug helper ──────────────────────────────────────────────────────────────
// Converts a title to a URL-safe slug for stable guide routing.
// e.g. "Walking Tour Guide" → "walking-tour-guide"
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ─── Step parser ──────────────────────────────────────────────────────────────
// Steps in the sheet are separated by " | " (pipe with spaces) or newlines
export function parseSteps(raw: string): string[] {
  if (!raw) return [];
  return raw
    .split(/\s*\|\s*|\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

// ─── Ingredient parser ────────────────────────────────────────────────────────
export function parseIngredients(raw: string): string[] {
  return parseSteps(raw); // same pipe/newline format
}

// ─── YouTube embed helper ─────────────────────────────────────────────────────
export function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    // youtube.com/watch?v=ID
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    // youtu.be/ID
    if (u.hostname === "youtu.be") {
      const id = u.pathname.slice(1);
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    // not a valid URL
  }
  return null;
}
