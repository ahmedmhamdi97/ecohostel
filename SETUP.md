# Hostel Volunteer Manual — Setup Guide

## 1. Install dependencies

```bash
npm install
```

---

## 2. Set up Google Sheets

### A. Create your spreadsheet

Create a new Google Sheet at https://sheets.google.com and set up **6 sheets** (tabs) with these exact names and columns:

| Sheet name       | Column A   | Column B     | Column C | Column D |
|------------------|------------|--------------|----------|----------|
| `tutorials`      | title      | category     | steps    | video    |
| `recipes`        | name       | ingredients  | steps    | image    |
| `shifts_morning` | task       | order        |          |          |
| `shifts_night`   | task       | order        |          |          |
| `announcements`  | message    | date         |          |          |
| `schedule`       | image_url  |              |          |          |

**Row 1 must be the header row** (column names as shown above).

### Formatting tips for steps and ingredients

Separate multiple steps/ingredients with ` | ` (pipe with spaces) in a single cell:

```
Greet the guest | Verify ID | Issue key card | Show them to the room
```

### B. Make the sheet public

1. Click **Share** (top right)
2. Under "General access", choose **Anyone with the link → Viewer**
3. Click **Done**

### C. Get your Spreadsheet ID

Your spreadsheet URL looks like:
```
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
```
Copy the `SPREADSHEET_ID` part.

---

## 3. Set up Google Sheets API

1. Go to https://console.cloud.google.com
2. Create a new project (or select an existing one)
3. Go to **APIs & Services → Library**
4. Search for **Google Sheets API** and enable it
5. Go to **APIs & Services → Credentials**
6. Click **Create Credentials → API Key**
7. Copy the API key
8. (Recommended) Click **Edit API Key** and restrict it to:
   - **API restrictions**: Google Sheets API only
   - **Website restrictions**: your Vercel domain (e.g. `https://your-app.vercel.app/*`)

---

## 4. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```
SHEETS_API_KEY=AIzaSy...your_key_here
SHEETS_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms
```

---

## 5. Run locally

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

## 6. Generate app icons

Add icons to `public/icons/`:
- `icon-192x192.png` (192×192 px)
- `icon-512x512.png` (512×512 px)

Quick option: Upload `public/icons/icon.svg` to https://realfavicongenerator.net

---

## 7. Deploy to Vercel

### Option A: Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option B: GitHub + Vercel dashboard

1. Push this project to a GitHub repository
2. Go to https://vercel.com → **Add New Project**
3. Import your GitHub repo
4. In **Environment Variables**, add:
   - `SHEETS_API_KEY` = your API key
   - `SHEETS_ID` = your spreadsheet ID
5. Click **Deploy**

Your app will be live at `https://your-app.vercel.app`

---

## 8. Install the PWA on a phone

1. Open the app URL in Chrome (Android) or Safari (iOS)
2. **Android**: tap the browser menu → "Add to Home Screen"
3. **iOS**: tap the Share button → "Add to Home Screen"

The app will then work like a native app with offline support.

---

## How managers update content

| What to update    | Where in the sheet      | Notes                                      |
|-------------------|-------------------------|--------------------------------------------|
| Announcements     | `announcements` tab     | Add a new row; newest shows first          |
| Shift tasks       | `shifts_morning/night`  | Use `order` column to set sequence (1,2,3) |
| Guides            | `tutorials` tab         | Paste YouTube URL in `video` column        |
| Recipes           | `recipes` tab           | Paste image URL in `image` column          |
| Schedule          | `schedule` tab          | Add new row with image URL                 |

Changes appear in the app within **5 minutes** (cache refresh).

---

## Folder structure

```
src/
├── app/
│   ├── layout.tsx          Root layout (nav, PWA meta, SW registration)
│   ├── page.tsx            Home screen
│   ├── shifts/page.tsx     Morning & night shift checklists
│   ├── guides/
│   │   ├── page.tsx        Guides list with search
│   │   └── [id]/page.tsx   Guide detail with video embed
│   ├── recipes/
│   │   ├── page.tsx        Recipe cards with search
│   │   └── [id]/page.tsx   Recipe detail
│   └── schedule/page.tsx   Schedule image viewer
├── components/
│   ├── BottomNav.tsx       5-tab bottom navigation
│   ├── HomeSearch.tsx      Home page search input
│   ├── SearchBar.tsx       Reusable search input
│   ├── ShiftsClient.tsx    Expandable shift cards
│   ├── ShiftChecklist.tsx  Checkbox list (persists state daily)
│   ├── GuidesClient.tsx    Filtered guides list
│   ├── RecipesClient.tsx   Filtered recipe grid
│   └── RegisterSW.tsx      Service worker registration
├── lib/
│   └── sheets.ts           Google Sheets API utility
└── types/
    └── index.ts            TypeScript interfaces
public/
├── manifest.json           PWA manifest
├── sw.js                   Service worker (offline caching)
└── icons/                  App icons (add icon-192x192.png, icon-512x512.png)
```
