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
    notes: "Introduce yourself, ask everyone their name and where they're from. Start walking toward Puerta Elvira.",
    mapsUrl: "https://maps.google.com/?q=Eco+Hostel+Granada,+Spain",
  },
  {
    number: 2,
    name: "Puerta de Elvira",
    time: "6:05 PM",
    emoji: "🏛️",
    notes: "Ancient gate built 11th century, main entrance during Islamic rule. Granada history dates to 1500–2000 BC.",
    mapsUrl: "https://maps.google.com/?q=Puerta+de+Elvira,+Granada,+Spain",
  },
  {
    number: 3,
    name: "Calle Elvira",
    time: "6:10 PM",
    emoji: "🛍️",
    notes: "Try shawarma at Mar Chica, baklavas at Petra bakery, second-hand items at CasaKuna.",
    mapsUrl: "https://maps.google.com/?q=Calle+Elvira,+Granada,+Spain",
  },
  {
    number: 4,
    name: "Plaza Nueva",
    time: "6:15 PM",
    emoji: "⛲",
    notes: "Royal Chancellery (old courthouse). Darro River runs BENEATH this square! Sometimes gypsies do flamenco here at night. Tapas: Los Manueles (croquettes), Los Diamantes (fried fish).",
    mapsUrl: "https://maps.google.com/?q=Plaza+Nueva,+Granada,+Spain",
  },
  {
    number: 5,
    name: "Iglesia Santa Ana",
    time: "6:25 PM",
    emoji: "⛪",
    notes: "16th century church built ON TOP of a mosque. Has Islamic elements — 3 copper balls on roof symbolize Judaism, Christianity and Islam. Free entry!",
    mapsUrl: "https://maps.google.com/?q=Iglesia+de+Santa+Ana,+Granada,+Spain",
  },
  {
    number: 6,
    name: "Paseo del Río Darro",
    time: "6:30 PM",
    emoji: "🌿",
    notes: "One of Granada's most charming streets. Called Paseo de los Tristes (Promenade of the Sad) because funeral processions passed here. Visit Bañuelo nearby.",
    mapsUrl: "https://maps.google.com/?q=Paseo+del+Río+Darro,+Granada,+Spain",
  },
  {
    number: 7,
    name: "Cuesta del Chapiz",
    time: "6:40 PM",
    emoji: "⬆️",
    notes: "Climb up! Look for Palace of Córdovas, Casas del Chapiz, House of Morocco, old orphanage. Sculpture of Chorrojumo — Granada's most famous 19th century gypsy.",
    mapsUrl: "https://maps.google.com/?q=Cuesta+del+Chapiz,+Granada,+Spain",
  },
  {
    number: 8,
    name: "Sacromonte",
    time: "6:50 PM",
    emoji: "💃",
    notes: "Gypsy cave neighborhood, over 10,000 years of history! White cave facades carved into the hillside. Recommend La Rocío flamenco show €30, tickets at reception.",
    mapsUrl: "https://maps.google.com/?q=Sacromonte,+Granada,+Spain",
  },
  {
    number: 9,
    name: "Vereda de Enmedio",
    time: "7:00 PM",
    emoji: "📸",
    notes: "Picturesque path with incredible views of the Alhambra. Best photo spot of the tour!",
    mapsUrl: "https://maps.google.com/?q=Vereda+de+Enmedio,+Granada,+Spain",
  },
  {
    number: 10,
    name: "Fuente Amapola",
    time: "7:05 PM",
    emoji: "⛲",
    notes: "Beautiful fountain with a famous phrase. Good rest spot after the uphill climb.",
    mapsUrl: "https://maps.google.com/?q=Fuente+Amapola,+Granada,+Spain",
  },
  {
    number: 11,
    name: "Plaza Larga",
    time: "7:10 PM",
    emoji: "🏡",
    notes: "Historic square dating back to 14th century. Site of a famous rebellion in the 15th century.",
    mapsUrl: "https://maps.google.com/?q=Plaza+Larga,+Albaicín,+Granada,+Spain",
  },
  {
    number: 12,
    name: "Mirador San Nicolás",
    time: "7:15 PM",
    emoji: "⭐",
    notes: "HIGHLIGHT! Granada's most famous viewpoint. Best view of the Alhambra with Sierra Nevada behind it. Often has live music. Give guests extra time for photos here!",
    mapsUrl: "https://maps.google.com/?q=Mirador+de+San+Nicolás,+Granada,+Spain",
  },
  {
    number: 13,
    name: "Calderería Nueva",
    time: "7:30 PM",
    emoji: "🫖",
    notes: "Known as Tea Street — feels like Morocco! Souvenirs, baklava, Moroccan tea shops.",
    mapsUrl: "https://maps.google.com/?q=Calderería+Nueva,+Granada,+Spain",
  },
  {
    number: 14,
    name: "Back at Eco Hostel",
    time: "7:40 PM",
    emoji: "🥂",
    notes: "Tell guests: FREE SANGRIA at 8PM on the 4th floor! Explain family dinner and how tokens work (1 token = €1, buy at reception).",
    mapsUrl: "https://maps.google.com/?q=Eco+Hostel+Granada,+Spain",
  },
];

export const FULL_ROUTE_URL =
  "https://www.google.com/maps/dir/Eco+Hostel+Granada+Spain/Puerta+de+Elvira+Granada+Spain/Plaza+Nueva+Granada+Spain/Sacromonte+Granada+Spain/Mirador+de+San+Nicolás+Granada+Spain/Calderería+Nueva+Granada+Spain/Eco+Hostel+Granada+Spain";
