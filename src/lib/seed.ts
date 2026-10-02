import { bi, uid, type Lang } from "@/lib/text";
import type { AppData, CanvasKey, Intake, Project } from "@/lib/types";

export const emptyCanvas = (): Record<CanvasKey, string> => ({
  value: "",
  customers: "",
  channels: "",
  relation: "",
  revenue: "",
  resources: "",
  activities: "",
  partners: "",
  costs: "",
});

export function blankProject(name: string): Project {
  return {
    id: uid(),
    name,
    createdAt: Date.now(),
    ideaThread: [],
    clearGoal: "",
    skillsHard: [],
    skillsSoft: [],
    frictions: [],
    niche: { service: "", audience: "", outcome: "" },
    beta: [
      { name: "", note: "", status: "pending" },
      { name: "", note: "", status: "pending" },
      { name: "", note: "", status: "pending" },
    ],
    nameIdeas: [],
    selectedName: "",
    canvas: emptyCanvas(),
    budget: 0,
    capex: [{ id: uid(), name: "", amount: 0 }],
    opex: [{ id: uid(), name: "", amount: 0 }],
    packages: [
      { tier: "base", name: "", price: 0, features: "" },
      { tier: "popular", name: "", price: 0, features: "" },
      { tier: "vip", name: "", price: 0, features: "" },
    ],
    adjective: "",
    funnel: { attract: "", trust: "", sell: "" },
    paletteId: "",
    colors: { main: "#0F172A", second: "#6366F1", action: "#F59E0B" },
    fontPair: "",
    tone: "",
    briefQuestions: ["", "", ""],
    deposit: 50,
    revisionLimit: 2,
    checklist: {},
    concerns: [],
    persona: {
      name: "",
      age: "",
      city: "",
      job: "",
      budget: "",
      platform: "",
      pains: "",
      tone: "",
    },
    calendar: {
      pillars: ["", "", "", ""],
      slots: [],
      aiReport: "",
      humanNote: "",
    },
    platformNotes: {},
    doneTopics: {},
    imports: [],
  };
}


/** Logged-out shell. Personal projects are created only after signup. */
export function seedData(): AppData {
  return {
    lang: "fa",
    authed: false,
    intake: null,
    name: "",
    tokens: 0,
    plan: "eco",
    months: 1,
    daysLeft: 0,
    kyc: "none",
    activeProjectId: "",
    projects: [],
    watched: [],
    lessonOutputs: {},
    questions: [],
    votes: {},
    tickets: [],
    calls: [],
    aiChat: [],
    mentorChat: [],
    bannerRequests: [],
    creations: [],
    ledger: [],
    seenStories: [],
    mentorCallLeft: 60,
    mentorChatLeft: 30,
  };
}

/** A new local profile. Demo businesses are not copied onto this account. */
export function freshAccount(intake: Intake, lang: Lang): AppData {
  const fullName = `${intake.firstName} ${intake.lastName}`.replace(/\s+/g, " ").trim();
  return {
    ...seedData(),
    lang,
    authed: true,
    intake,
    name: fullName,
    tokens: 1500,
    ledger: [{ id: uid(), label: bi("اعتبار شروع", "Starting credit"), amount: 1500, at: Date.now() }],
    aiChat: [
      {
        id: "ai-hello",
        role: "ai",
        text:
          lang === "en"
            ? `Hello ${fullName}. Tell me which step you are stuck on and I will open that step.`
            : `سلام ${intake.firstName}. بگو روی کدام مرحله گیر کرده‌ای تا همان را قدم‌به‌قدم باز کنم.`,
        at: Date.now(),
      },
    ],
    mentorChat: [
      {
        id: "hm-hello",
        role: "mentor",
        text:
          lang === "en"
            ? "I'm Mehdi Kazemi, the mentor on this desk. Replies stay inside Liosha."
            : "مهدی کاظمی هستم، منتور این میز کار. پاسخ‌ها همین‌جا می‌ماند.",
        at: Date.now(),
      },
    ],
  };
}
