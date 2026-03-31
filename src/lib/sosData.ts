export interface SosStep {
  text: string;
  section?: string;
  images?: { src: string; caption: string }[];
}

export interface Emergency {
  emoji: string;
  title: string;
  steps: SosStep[];
}

export const EMERGENCIES: Emergency[] = [
  {
    emoji: "🔥",
    title: "Fire Alarm",
    steps: [
      { text: "Call 112 immediately",                                   section: "If visible fire" },
      { text: "Evacuate via Gran Vía — do not use the elevator" },
      { text: "Go to reception, check the control panel",               section: "If alarm only",
        images: [{ src: "/fire-panel.webp", caption: "Fire control panel at reception" }] },
      { text: "Identify the zone shown on the panel" },
      { text: "Silence the buzzer — press 1" },
      { text: "Check the indicated area for smoke or smell",
        images: [{ src: "/fire-panel2.webp", caption: "Zone indicator on the control panel" }] },
      { text: "If all clear, reset panel: press 1 → 2 → 3" },
    ],
  },
  {
    emoji: "🚨",
    title: "Drunk or Aggressive Guest",
    steps: [
      { text: "Warn firmly and ask them to leave" },
      { text: "If they refuse, tell them the police will be called" },
      { text: "If they continue, call 112" },
      { text: "Never engage in physical confrontation" },
      { text: "Notify the WhatsApp group" },
    ],
  },
  {
    emoji: "🛗",
    title: "Guest Trapped in Elevator",
    steps: [
      { text: "Reassure the guest calmly through the door" },
      { text: "Call ORONA: 900 210 813" },
      { text: "Never force the door open" },
      { text: "Notify the WhatsApp group" },
      { text: "Reminder: max 5 people — this is the usual cause" },
    ],
  },
  {
    emoji: "🐛",
    title: "Bedbugs",
    steps: [
      { text: "Stay calm — do NOT move the guest to another room" },
      { text: "Collect all clothing from the affected bed" },
      { text: "Wash at 60 °C and tumble dry" },
      { text: "Steam treatment will be arranged the next day" },
      { text: "Notify WhatsApp group with the room number" },
    ],
  },
  {
    emoji: "🚪",
    title: "Gran Vía Door Blocked",
    steps: [
      { text: "Check the latch first — may be a manual issue" },
      { text: "Go to reception electrical panel" },
      { text: "Find: Planta Primera / Resetear puerta GV",
        images: [{ src: "/granviadoor.webp", caption: "Electrical panel — Gran Vía door reset" }] },
      { text: "Flip switch DOWN and hold for 30 seconds" },
      { text: "Flip switch back UP" },
      { text: "Notify the morning shift" },
    ],
  },
  {
    emoji: "⚡",
    title: "Power Outage",
    steps: [
      { text: "Identify the affected area" },
      { text: "Check the electrical panel on that floor" },
      { text: "Reset any tripped breaker (flip down, then up)",
        images: [{ src: "/poweroutage.webp", caption: "Electrical panel — reset tripped breaker" }] },
      { text: "If it trips again, unplug the overloading appliance" },
      { text: "If the whole building is out, check the ground floor panel" },
    ],
  },
  {
    emoji: "👮",
    title: "Police Visit",
    steps: [
      { text: "Open the door and introduce yourself as staff" },
      { text: "Ask the reason for the visit" },
      { text: "Check in-house guest list if needed" },
      { text: "Accompany them discreetly" },
      { text: "Notify the WhatsApp group after" },
    ],
  },
  {
    emoji: "🩺",
    title: "Guest Accident",
    steps: [
      { text: "Assess severity",                                         section: "First" },
      { text: "Minor injury: use the first aid kit at reception",        section: "If minor",
        images: [{ src: "/firstaid.webp", caption: "First aid kit at reception" }] },
      { text: "Serious: call 112 and unlock the ground floor entrance",  section: "If serious",
        images: [{ src: "/firstaid2.webp", caption: "Emergency entrance — ground floor" }] },
      { text: "Report in the WhatsApp group" },
    ],
  },
  {
    emoji: "🛏️",
    title: "Room Change Request",
    steps: [
      { text: "Ask the reason for the request" },
      { text: "Check availability in the system" },
      { text: "Respect female-only dorms: 2.7 / 3.1 / 3.5 / 3.6" },
      { text: "Notify WhatsApp group — morning shift will update the system" },
    ],
  },
  {
    emoji: "🚿",
    title: "No Hot Water",
    steps: [
      { text: "Check the boiler screen at reception" },
      { text: "The indicator light must be green" },
      { text: "If off, turn it on manually" },
      { text: "Verify hot water is now working", images: [
        { src: "/hotwater.webp",  caption: "Boiler screen at reception" },
        { src: "/hotwater2.webp", caption: "Boiler indicator light" },
      ] },
    ],
  },
];
