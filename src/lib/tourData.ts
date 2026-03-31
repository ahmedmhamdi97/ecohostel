export interface TourStop {
  number: number;
  name: string;
  time: string;
  notes: string;
  emoji: string;
  mapsUrl: string;
}

export const TOUR_STOPS: TourStop[] = [
  {
    number: 1,
    name: "Eco Hostel",
    time: "6:00 PM",
    emoji: "🏠",
    notes: "Hey everyone! Welcome 😊 My name is [Name]. Before we start, let's do a quick round — your name and where you're from.\nThis tour will take us through the oldest parts of Granada, including areas influenced by almost 800 years of Islamic history. Let's go!",
    mapsUrl: "https://maps.google.com/?q=Eco+Hostel+Granada,+Spain",
  },
  {
    number: 2,
    name: "Puerta de Elvira",
    time: "6:05 PM",
    emoji: "🏛️",
    notes: "So this gate is from the 11th century, built during Muslim rule. This was actually the main entrance to Granada back then.\nGranada was one of the last Muslim cities in Spain, until it was reconquered in 1492 — so a lot of what you'll see today comes from that period.",
    mapsUrl: "https://maps.google.com/?q=Puerta+de+Elvira,+Granada,+Spain",
  },
  {
    number: 3,
    name: "Calle Elvira",
    time: "6:10 PM",
    emoji: "🛍️",
    notes: "This street used to be a busy Moorish market. Today you can still feel that influence — all the tea shops, spices, shawarma, and sweets.\nGranada is one of the few places in Spain where the Arabic influence is still very alive.",
    mapsUrl: "https://maps.google.com/?q=Calle+Elvira,+Granada,+Spain",
  },
  {
    number: 4,
    name: "Plaza Nueva",
    time: "6:15 PM",
    emoji: "⛲",
    notes: "Fun fact — even though it's called 'New Square,' this is actually the oldest square in Granada.\nThat big building is the old Royal Chancellery, basically the high court.\nAnd something people don't expect — there's a river flowing right underneath us, the Darro River.",
    mapsUrl: "https://maps.google.com/?q=Plaza+Nueva,+Granada,+Spain",
  },
  {
    number: 5,
    name: "Iglesia Santa Ana",
    time: "6:25 PM",
    emoji: "⛪",
    notes: "This church was built in the 16th century, right after the Christians took over — and it's built directly on top of a mosque.\nSo this is a great example of how cultures overlapped here — you'll even see some Islamic design elements still present.",
    mapsUrl: "https://maps.google.com/?q=Iglesia+de+Santa+Ana,+Granada,+Spain",
  },
  {
    number: 6,
    name: "Paseo del Río Darro",
    time: "6:30 PM",
    emoji: "🌿",
    notes: "This is one of the most beautiful streets in Granada.\nIt's also called 'Paseo de los Tristes,' or 'Promenade of the Sad,' because funeral processions used to pass through here on the way to the cemetery.\nAnd up there, you can already see parts of the Alhambra.",
    mapsUrl: "https://maps.google.com/?q=Paseo+del+Río+Darro,+Granada,+Spain",
  },
  {
    number: 7,
    name: "Cuesta del Chapiz",
    time: "6:40 PM",
    emoji: "⬆️",
    notes: "Okay, this is the workout part 😄\nWe're now entering the Albayzín, the old Muslim neighborhood — notice the narrow streets and white houses.\nThere's also a famous local figure called Chorrojumo, a 19th-century gypsy who became a symbol of Granada.",
    mapsUrl: "https://maps.google.com/?q=Cuesta+del+Chapiz,+Granada,+Spain",
  },
  {
    number: 8,
    name: "Sacromonte",
    time: "6:50 PM",
    emoji: "💃",
    notes: "This area is called Sacromonte, and it's famous for these cave houses.\nPeople have lived in them for centuries — they stay cool in summer and warm in winter.\nThis is also where traditional flamenco developed, especially within the local gypsy community.",
    mapsUrl: "https://maps.google.com/?q=Sacromonte,+Granada,+Spain",
  },
  {
    number: 9,
    name: "Vereda de Enmedio",
    time: "7:00 PM",
    emoji: "📸",
    notes: "Alright — this is one of the best photo spots of the tour.\nThat's the Alhambra — a palace and fortress built by the last Muslim rulers of Spain.\nTake your time here, this is a special view.",
    mapsUrl: "https://maps.google.com/?q=Vereda+de+Enmedio,+Granada,+Spain",
  },
  {
    number: 10,
    name: "Fuente Amapola",
    time: "7:05 PM",
    emoji: "⛲",
    notes: "Quick stop to catch our breath 😄\nThis is a quieter spot, nice for photos. There's also a poetic phrase here — Granada is full of little hidden details like this.",
    mapsUrl: "https://maps.google.com/?q=Fuente+Amapola,+Granada,+Spain",
  },
  {
    number: 11,
    name: "Plaza Larga",
    time: "7:10 PM",
    emoji: "🏡",
    notes: "This square dates back to the 14th century and has always been a local meeting place.\nIt's also seen a lot of history, including rebellions during the transition between Muslim and Christian rule.",
    mapsUrl: "https://maps.google.com/?q=Plaza+Larga,+Albaicín,+Granada,+Spain",
  },
  {
    number: 12,
    name: "Mirador San Nicolás",
    time: "7:15 PM",
    emoji: "⭐",
    notes: "⭐ This is the highlight of the tour.\nFrom here you get the most famous view of the Alhambra, with the Sierra Nevada mountains behind it.\nYou'll usually find musicians here too — feel free to take your time, photos, enjoy the atmosphere.",
    mapsUrl: "https://maps.google.com/?q=Mirador+de+San+Nicolás,+Granada,+Spain",
  },
  {
    number: 13,
    name: "Calderería Nueva",
    time: "7:30 PM",
    emoji: "🫖",
    notes: "This street is often called 'Tea Street.'\nIt feels a bit like Morocco — lots of tea houses, souvenirs, and sweets.\nIt's another great example of how strong the Arabic influence still is in Granada.",
    mapsUrl: "https://maps.google.com/?q=Calderería+Nueva,+Granada,+Spain",
  },
  {
    number: 14,
    name: "Back at Eco Hostel",
    time: "7:40 PM",
    emoji: "🥂",
    notes: "Alright guys, that's the end of the tour — thank you for joining! 🙌\nDon't forget: we have free sangria at 8 PM on the 4th floor.\nWe also have a family dinner tonight — you can buy tokens at reception, €10.\nIf you have any questions or want recommendations, just ask me!",
    mapsUrl: "https://maps.google.com/?q=Eco+Hostel+Granada,+Spain",
  },
];

export const FULL_ROUTE_URL =
  "https://www.google.com/maps/dir/Eco+Hostel+Granada+Spain/Puerta+de+Elvira+Granada+Spain/Plaza+Nueva+Granada+Spain/Sacromonte+Granada+Spain/Mirador+de+San+Nicolás+Granada+Spain/Calderería+Nueva+Granada+Spain/Eco+Hostel+Granada+Spain";
