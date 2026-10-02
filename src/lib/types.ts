import type { Bi } from "@/lib/text";

export type PlanId = "eco" | "plus" | "pro";
export type BillingMonths = 1 | 3 | 12;
export type KycLevel = "none" | "basic" | "verified";
export type BannerSize = "special" | "large" | "medium" | "small";
export type QaTag = "edu" | "tech" | "tools";

export type ChatMessage = {
  id: string;
  role: "user" | "ai" | "mentor";
  text: string;
  at: number;
};

export type BetaTester = {
  name: string;
  note: string;
  status: "pending" | "active" | "done";
};

export type MoneyLine = { id: string; name: string; amount: number };

export type OfferPackage = {
  tier: "base" | "popular" | "vip";
  name: string;
  price: number;
  features: string;
};

export type CanvasKey =
  | "value"
  | "customers"
  | "channels"
  | "relation"
  | "revenue"
  | "resources"
  | "activities"
  | "partners"
  | "costs";

export type Persona = {
  name: string;
  age: string;
  city: string;
  job: string;
  budget: string;
  platform: string;
  pains: string;
  tone: string;
};

export type Concern = {
  id: string;
  topic: string;
  context: string;
  goal: string;
  answer: string;
};

export type CalendarSlot = {
  id: string;
  day: number;
  platform: string;
  format: string;
  time: string;
};

export type Project = {
  id: string;
  name: string;
  createdAt: number;
  ideaThread: ChatMessage[];
  clearGoal: string;
  skillsHard: string[];
  skillsSoft: string[];
  frictions: string[];
  niche: { service: string; audience: string; outcome: string };
  beta: BetaTester[];
  nameIdeas: NameIdea[];
  selectedName: string;
  canvas: Record<CanvasKey, string>;
  budget: number;
  capex: MoneyLine[];
  opex: MoneyLine[];
  packages: OfferPackage[];
  adjective: string;
  funnel: { attract: string; trust: string; sell: string };
  paletteId: string;
  colors: { main: string; second: string; action: string };
  fontPair: string;
  tone: string;
  briefQuestions: string[];
  deposit: number;
  revisionLimit: number;
  checklist: Record<string, boolean>;
  concerns: Concern[];
  persona: Persona;
  calendar: {
    pillars: string[];
    slots: CalendarSlot[];
    aiReport: string;
    humanNote: string;
  };
  platformNotes: Record<string, string>;
  doneTopics: Record<string, string[]>;
  imports: { id: string; title: string; text: string; at: number }[];
};

export type NameIdea = {
  name: string;
  handle: string;
  syllables: number;
  ease: number;
  ir: boolean;
  com: boolean;
  ig: boolean;
};

export type LedgerItem = { id: string; label: Bi; amount: number; at: number };

export type UserQuestion = {
  id: string;
  title: string;
  body: string;
  tag: QaTag;
  votes: number;
  at: number;
  answers: { id: string; author: string; body: string; accepted: boolean }[];
};

export type Ticket = {
  id: string;
  subject: string;
  body: string;
  status: "open" | "answered";
  reply: string;
  at: number;
};

export type CallBooking = { id: string; day: string; time: string; note: string };

export type BannerRequest = {
  id: string;
  projectId: string;
  size: BannerSize;
  headline: string;
  subline: string;
  fileName: string;
  status: "pending" | "approved" | "rejected" | "live";
  at: number;
};

export type Creation = {
  id: string;
  kind: "text" | "image" | "voice" | "video" | "avatar";
  title: string;
  detail: string;
  tokens: number;
  at: number;
};

export type IntakeAnswer = {
  choice: "1" | "2" | "3" | "4" | "note";
  note: string;
};

export type Intake = {
  firstName: string;
  lastName: string;
  /** ISO 3166-1 alpha-2, for example IR. */
  country: string;
  /** E.164, for example +989121234567. */
  phone: string;
  code: string;
  answers: IntakeAnswer[];
};

export type AppData = {
  lang: "fa" | "en";
  authed: boolean;
  intake: Intake | null;
  name: string;
  tokens: number;
  plan: PlanId;
  months: BillingMonths;
  daysLeft: number;
  kyc: KycLevel;
  activeProjectId: string;
  projects: Project[];
  watched: string[];
  lessonOutputs: Record<string, string>;
  questions: UserQuestion[];
  votes: Record<string, number>;
  tickets: Ticket[];
  calls: CallBooking[];
  aiChat: ChatMessage[];
  mentorChat: ChatMessage[];
  bannerRequests: BannerRequest[];
  creations: Creation[];
  ledger: LedgerItem[];
  seenStories: string[];
  mentorCallLeft: number;
  mentorChatLeft: number;
};
