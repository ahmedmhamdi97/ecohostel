export interface QuizOption {
  label: string;
  text: string;
  correct: boolean;
  explanation: string;
}

export interface QuizQuestion {
  scenario: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    scenario: "The fire alarm goes off but you see no smoke or fire. What do you do first?",
    options: [
      { label: "A", text: "Evacuate everyone immediately", correct: false, explanation: "Only evacuate if real fire is confirmed." },
      { label: "B", text: "Go to reception and check the control panel", correct: true, explanation: "Correct! Identify the zone, silence the buzzer, then check the area." },
      { label: "C", text: "Call 112 immediately", correct: false, explanation: "Only call 112 if real fire is detected." },
      { label: "D", text: "Ignore it, it's probably a false alarm", correct: false, explanation: "Never ignore the alarm — always check." },
    ],
  },
  {
    scenario: "A guest is trapped in the elevator. What do you do?",
    options: [
      { label: "A", text: "Try to force the door open", correct: false, explanation: "NEVER force the door — it's dangerous." },
      { label: "B", text: "Reassure the guest and call ORONA: 900 210 813", correct: true, explanation: "Correct! Reassure the guest calmly and call ORONA." },
      { label: "C", text: "Call 112 immediately", correct: false, explanation: "ORONA handles elevator emergencies, not 112." },
      { label: "D", text: "Wait for them to get out on their own", correct: false, explanation: "Never leave them alone — always take action." },
    ],
  },
  {
    scenario: "A guest complains about bedbug bites at night. What do you do first?",
    options: [
      { label: "A", text: "Move them to another room immediately", correct: false, explanation: "This spreads bedbugs to other rooms!" },
      { label: "B", text: "Tell them to sleep on the floor", correct: false, explanation: "Not appropriate — take the situation seriously." },
      { label: "C", text: "Stay calm, keep them in same room, collect clothes and wash at 60°C", correct: true, explanation: "Correct! Do NOT move them. Collect clothing and wash at 60°C. Steam treatment arranged next day." },
      { label: "D", text: "Call 112", correct: false, explanation: "Not a 112 emergency — follow the bedbug protocol." },
    ],
  },
  {
    scenario: "The Gran Vía door isn't working with chip or code. What do you do?",
    options: [
      { label: "A", text: "Leave it broken until morning", correct: false, explanation: "Security risk — always fix it immediately." },
      { label: "B", text: "Go to reception panel, find Planta Primera, flip switch for 30 seconds", correct: true, explanation: "Correct! Flip the switch DOWN for 30s, then back UP. Notify morning shift." },
      { label: "C", text: "Call a locksmith", correct: false, explanation: "Not necessary — you can reset it yourself from the panel." },
      { label: "D", text: "Let guests use the back door", correct: false, explanation: "There is no back door." },
    ],
  },
  {
    scenario: "A very drunk guest is being aggressive. What do you do?",
    options: [
      { label: "A", text: "Push them out physically", correct: false, explanation: "NEVER physical confrontation — it escalates the situation." },
      { label: "B", text: "Warn firmly, ask to leave, call 112 if they refuse", correct: true, explanation: "Correct! Warn them, tell them police will be called, then call 112 if they continue." },
      { label: "C", text: "Give them water and let them stay", correct: false, explanation: "If aggressive, they must leave the premises." },
      { label: "D", text: "Hide in the office and wait", correct: false, explanation: "You must handle it — don't avoid confrontation." },
    ],
  },
  {
    scenario: "There is a power outage on one floor. What do you do?",
    options: [
      { label: "A", text: "Call an electrician", correct: false, explanation: "Try the breaker first — it's almost always a tripped breaker." },
      { label: "B", text: "Check the electrical panel on that floor and reset the tripped breaker", correct: true, explanation: "Correct! Flip the tripped breaker down then up. If it trips again, unplug the overloading appliance." },
      { label: "C", text: "Call 112", correct: false, explanation: "Not an emergency — check the panel first." },
      { label: "D", text: "Tell guests to use candles", correct: false, explanation: "Fire hazard — never suggest candles." },
    ],
  },
  {
    scenario: "The police knock on the door at night. What do you do?",
    options: [
      { label: "A", text: "Don't open the door", correct: false, explanation: "You must open for police — never refuse." },
      { label: "B", text: "Open the door, introduce yourself as staff, ask reason for visit", correct: true, explanation: "Correct! Open, introduce yourself, ask the reason, check guest list if needed." },
      { label: "C", text: "Call your manager before opening", correct: false, explanation: "Open first, notify the WhatsApp group after." },
      { label: "D", text: "Tell them to come back in the morning", correct: false, explanation: "Never refuse or delay police." },
    ],
  },
  {
    scenario: "A guest has a minor accident — a small cut. What do you do?",
    options: [
      { label: "A", text: "Call 112 immediately", correct: false, explanation: "Only call 112 for serious injuries." },
      { label: "B", text: "Use the first aid kit at reception", correct: true, explanation: "Correct! Handle minor injuries with the first aid kit. Call 112 only if it's serious." },
      { label: "C", text: "Send them to a hospital", correct: false, explanation: "Overkill for a minor cut — use the first aid kit." },
      { label: "D", text: "Ignore it", correct: false, explanation: "Always assist guests — never ignore injuries." },
    ],
  },
];
