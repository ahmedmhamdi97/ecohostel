export interface DinnerTask {
  id: string;
  text: string;
}

export interface DinnerSection {
  key: "before" | "during" | "after";
  title: string;
  icon: string;
  tasks: DinnerTask[];
}

export interface DinnerDay {
  slug: string;
  day: string;
  name: string;
  time: string;
  emoji: string;
  gradient: string;
}

const BEFORE: DinnerTask[] = [
  { id: "b1", text: "Set tables with plates, cutlery & glasses" },
  { id: "b2", text: "Fill water jugs and place on tables" },
  { id: "b3", text: "Update the allergen info board" },
  { id: "b4", text: "Prep and measure all ingredients" },
  { id: "b5", text: "Preheat oven / heat pans as needed" },
];

const DURING: DinnerTask[] = [
  { id: "d1", text: "Cook main dish following the recipe" },
  { id: "d2", text: "Plate and serve food to all tables" },
  { id: "d3", text: "Refill water and offer drinks" },
  { id: "d4", text: "Check in with diners for feedback" },
  { id: "d5", text: "Keep kitchen tidy while cooking" },
];

const AFTER: DinnerTask[] = [
  { id: "a1", text: "Clear all plates and glasses from tables" },
  { id: "a2", text: "Wash dishes, pots, and utensils" },
  { id: "a3", text: "Wipe down counters, stove & tables" },
  { id: "a4", text: "Empty compost and take out trash" },
  { id: "a5", text: "Reset tables for the next day" },
];

export const DINNER_SECTIONS: DinnerSection[] = [
  { key: "before", title: "Before Dinner", icon: "🌅", tasks: BEFORE },
  { key: "during", title: "During Dinner", icon: "🍽️", tasks: DURING },
  { key: "after",  title: "After Dinner",  icon: "✨", tasks: AFTER  },
];

export const DINNER_SCHEDULE: DinnerDay[] = [
  {
    slug: "monday", day: "Monday", name: "Poke Bowl",
    time: "19:15", emoji: "🥗",
    gradient: "linear-gradient(135deg, #0369a1, #38bdf8)",
  },
  {
    slug: "tuesday", day: "Tuesday", name: "Tacos",
    time: "19:15", emoji: "🌮",
    gradient: "linear-gradient(135deg, #c2410c, #fb923c)",
  },
  {
    slug: "wednesday", day: "Wednesday", name: "Paella",
    time: "19:15", emoji: "🥘",
    gradient: "linear-gradient(135deg, #b45309, #fcd34d)",
  },
  {
    slug: "thursday", day: "Thursday", name: "Burger",
    time: "19:15", emoji: "🍔",
    gradient: "linear-gradient(135deg, #1b4332, #52b788)",
  },
  {
    slug: "friday", day: "Friday", name: "Tacos",
    time: "19:15", emoji: "🌮",
    gradient: "linear-gradient(135deg, #6d28d9, #a78bfa)",
  },
  {
    slug: "saturday", day: "Saturday", name: "Paella",
    time: "19:15", emoji: "🥘",
    gradient: "linear-gradient(135deg, #be123c, #fb7185)",
  },
  {
    slug: "sunday", day: "Sunday", name: "Stroganoff",
    time: "19:15", emoji: "🍲",
    gradient: "linear-gradient(135deg, #78350f, #d97706)",
  },
];
