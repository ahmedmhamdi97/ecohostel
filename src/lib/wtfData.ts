export interface Scenario {
  emoji: string;
  title: string;
  steps: string[];
}

export const SCENARIOS: Scenario[] = [
  {
    emoji: "🛋️",
    title: "Sleeping in Common Areas at Night",
    steps: [
      "People can't sleep in the common areas at night.",
      "If you see someone passed out on the couch or floor, wake them up politely and tell them to go to their room.",
      "If they're not even a guest, tell them they can't stay and they need to leave.",
      "If they refuse or things feel weird, message the volunteer/staff group immediately so others know what's going on.",
    ],
  },
  {
    emoji: "🌙",
    title: "Bringing Someone Back After a Night Out",
    steps: [
      "No hooking up in common areas or volunteer dorms. Seriously.",
      "If you bring someone back and you're trying to get lucky, talk to the senior volunteer or reception and see if a private room is free.",
      "Sometimes volunteers can get a discounted private room (~30€) if available.",
      "Don't put other volunteers in an awkward situation by trying to use shared spaces.",
    ],
  },
];
