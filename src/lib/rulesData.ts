export interface RuleItem {
  text: string;
}

export interface RulesSection {
  title: string;
  emoji: string;
  gradient: string;
  rules: RuleItem[];
}

export const RULES_SECTIONS: RulesSection[] = [
  {
    title: "HOSTEL RULES",
    emoji: "📋",
    gradient: "linear-gradient(135deg, #1B2A4A, #2d4270)",
    rules: [
      { text: "Total silence after midnight in stairs, bathrooms and hallways" },
      { text: "Common areas closed 00:00 to 8:00 AM — respect guests and neighbors" },
      { text: "No food or drinks in the rooms" },
      { text: "Cafeteria food/drinks only in cafeteria or 4th floor common areas" },
      { text: "No alcohol brought from outside — strictly prohibited" },
      { text: "No smoking inside — only patios and outdoor areas" },
      { text: "Clean everything you use in the kitchen and leave it as you found it" },
      { text: "Drugs strictly prohibited on premises" },
      { text: "No visitors inside — friends and family wait in the café area" },
    ],
  },
  {
    title: "GENERAL INFO",
    emoji: "ℹ️",
    gradient: "linear-gradient(135deg, #1b4332, #2d6a4f)",
    rules: [
      { text: "Bed changes need reception approval in advance" },
      { text: "Label your fridge items with name and check-out date — fridge cleaned Mon & Fri" },
      { text: "Store valuables in room lockers — we sell locks, sleeping kits available" },
      { text: "Staff sleeps on 4th floor — issues outside reception hours go to them" },
      { text: "Printer service at reception — ask about fees" },
      { text: "Hair dryer at reception — free but must be returned" },
      { text: "Laundry service available — max 5kg box, 24h turnaround, washed at 30°C" },
      { text: "Free high-speed WiFi — connection issues ask reception" },
      { text: "Board games on 4th floor — cards, chess, parchís, musical instruments" },
      { text: "Family dinner every day — ask staff for details" },
    ],
  },
];
