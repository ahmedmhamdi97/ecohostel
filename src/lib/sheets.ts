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

export async function getMorningTasks(): Promise<ShiftTask[]> {
  const rows = await fetchSheet("shifts_morning");
  const tasks = toObjects<ShiftTask>(rows);
  return tasks.sort((a, b) => Number(a.order) - Number(b.order));
}

export async function getNightTasks(): Promise<ShiftTask[]> {
  const rows = await fetchSheet("shifts_night");
  const tasks = toObjects<ShiftTask>(rows);
  return tasks.sort((a, b) => Number(a.order) - Number(b.order));
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
