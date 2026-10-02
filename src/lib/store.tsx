"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js";
import { PLANS } from "@/lib/catalog";
import { blankProject, freshAccount, seedData } from "@/lib/seed";
import { bi, uid, type Bi, type Lang } from "@/lib/text";
import type {
  AppData,
  BannerRequest,
  BillingMonths,
  ChatMessage,
  Creation,
  Intake,
  KycLevel,
  PlanId,
  Project,
  QaTag,
} from "@/lib/types";

const KEY = "abos.v1";
const DIR_KEY = "liosha.accounts.v1";
const STORAGE_VERSION = 2;

type UiState = {
  supportOpen: boolean;
  supportMode: "ai" | "human";
  storyId: string | null;
};

type AppContextValue = AppData & {
  hydrated: boolean;
  ui: UiState;
  displayName: string;
  activeProject?: Project;
  setLang: (lang: Lang) => void;
  /**
   * Saves a new profile in this browser only. Returns false if that phone
   * already has a local profile. This is not server authentication.
   */
  registerAccount: (intake: Intake) => boolean;
  /** Loads the local profile for an E.164 number. Returns false if none exists. */
  signIn: (phone: string) => boolean;
  signOut: () => void;
  spendTokens: (amount: number, label: Bi) => boolean;
  setPlan: (plan: PlanId, months: BillingMonths) => void;
  setKyc: (kyc: KycLevel) => void;
  updateProject: (id: string, recipe: (project: Project) => Project) => void;
  addProject: (name: string) => string;
  removeProject: (id: string) => void;
  setActiveProject: (id: string) => void;
  markWatched: (lessonId: string) => void;
  saveLessonOutput: (lessonId: string, text: string) => void;
  addQuestion: (input: { title: string; body: string; tag: QaTag }) => void;
  vote: (id: string, delta: number) => void;
  addTicket: (subject: string, body: string) => void;
  answerTicket: (id: string, reply: string) => void;
  pushAi: (message: ChatMessage) => void;
  pushMentor: (message: ChatMessage) => void;
  bookCall: (day: string, time: string, note: string) => boolean;
  consumeMentorChat: (minutes: number) => boolean;
  addBannerRequest: (input: Omit<BannerRequest, "id" | "at" | "status">) => void;
  setBannerStatus: (id: string, status: BannerRequest["status"]) => void;
  addCreation: (input: Omit<Creation, "id" | "at">) => void;
  seeStory: (id: string) => void;
  openSupport: (mode?: "ai" | "human") => void;
  closeSupport: () => void;
  openStory: (id: string | null) => void;
  resetDemo: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

const serverSnapshot = seedData();
let current = serverSnapshot;

function readDir(): Record<string, AppData> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(DIR_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, AppData>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function migratePlan(version: number, id: string): PlanId {
  if (version >= 2 && (id === "eco" || id === "plus" || id === "pro")) return id;
  if (id === "base" || id === "eco") return "eco";
  if (id === "pro" || id === "plus") return version >= 2 && id === "pro" ? "pro" : "plus";
  if (id === "vip") return "pro";
  return "eco";
}

function migrateStored(version: number, data: AppData): AppData {
  let intake = data.intake ?? null;
  if (intake) {
    const country = intake.country || "IR";
    let phone = intake.phone || "";
    if (phone && !phone.startsWith("+")) {
      const parsed = parsePhoneNumberFromString(phone, country as CountryCode);
      if (parsed?.isValid()) phone = parsed.number;
    }
    intake = { ...intake, country, phone };
  }
  const fullName = intake ? `${intake.firstName} ${intake.lastName}`.replace(/\s+/g, " ").trim() : "";
  const authed = Boolean(data.authed && intake && fullName && intake.phone.startsWith("+"));
  if (!authed) return { ...seedData(), lang: data.lang === "en" ? "en" : "fa" };
  const projects = (data.projects ?? []).filter((project) => project.id !== "atelier" && project.id !== "cafe");
  return {
    ...data,
    plan: migratePlan(version, String(data.plan)),
    intake,
    authed: true,
    name: fullName,
    projects,
    activeProjectId: projects.some((project) => project.id === data.activeProjectId) ? data.activeProjectId : "",
    ledger: (data.ledger ?? []).filter((item) => item.id !== "l1" && item.id !== "l2"),
  };
}

function readStored() {
  if (typeof window === "undefined") return serverSnapshot;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seedData();
    const parsed = JSON.parse(raw) as { version?: number; data?: AppData };
    if (parsed.data && Array.isArray(parsed.data.projects)) {
      return migrateStored(parsed.version ?? 1, parsed.data);
    }
  } catch {
    localStorage.removeItem(KEY);
  }
  return seedData();
}

function persist(data: AppData) {
  localStorage.setItem(KEY, JSON.stringify({ version: STORAGE_VERSION, data }));
  if (data.authed && data.intake?.phone) {
    const dir = readDir();
    dir[data.intake.phone] = data;
    localStorage.setItem(DIR_KEY, JSON.stringify(dir));
  }
}

if (typeof window !== "undefined") current = readStored();

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return current;
}

function getServerSnapshot() {
  return serverSnapshot;
}

function setData(recipe: (data: AppData) => AppData) {
  const next = recipe(current);
  if (next === current) return;
  current = next;
  persist(current);
  listeners.forEach((listener) => listener());
}

const emptySubscribe = () => () => {};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [ui, setUi] = useState<UiState>({
    supportOpen: false,
    supportMode: "ai",
    storyId: null,
  });

  useEffect(() => {
    document.documentElement.lang = data.lang === "fa" ? "fa" : "en";
    document.documentElement.dir = data.lang === "fa" ? "rtl" : "ltr";
  }, [data.lang]);

  const setLang = useCallback((lang: Lang) => {
    setData((s) => ({ ...s, lang }));
  }, []);

  const registerAccount = useCallback((intake: Intake) => {
    if (readDir()[intake.phone]) return false;
    const lang = current.lang;
    setData(() => freshAccount(intake, lang));
    return true;
  }, []);

  const signIn = useCallback((phone: string) => {
    const saved = readDir()[phone];
    if (!saved?.intake?.phone) return false;
    setData(() => ({ ...saved, authed: true }));
    return true;
  }, []);

  const signOut = useCallback(() => {
    if (current.authed && current.intake?.phone) {
      const dir = readDir();
      dir[current.intake.phone] = current;
      localStorage.setItem(DIR_KEY, JSON.stringify(dir));
    }
    const lang = current.lang;
    setData(() => ({ ...seedData(), lang }));
  }, []);

  const spendTokens = useCallback((amount: number, label: Bi) => {
    if (current.tokens < amount) return false;
    setData((s) => ({
      ...s,
      tokens: s.tokens - amount,
      ledger: [{ id: uid(), label, amount: -amount, at: Date.now() }, ...s.ledger].slice(0, 40),
    }));
    return true;
  }, []);

  const setPlan = useCallback((plan: PlanId, months: BillingMonths) => {
    const meta = PLANS.find((item) => item.id === plan);
    if (!meta) return;
    setData((s) => ({
      ...s,
      plan,
      months,
      daysLeft: months === 12 ? 365 : months === 3 ? 90 : 30,
      tokens: s.tokens + meta.tokens,
      mentorCallLeft: meta.callMin,
      mentorChatLeft: meta.chatMin,
      ledger: meta.tokens
        ? [
            {
              id: uid(),
              label: bi(`اعتبار پلن ${meta.name.fa}`, `${meta.name.en} plan credit`),
              amount: meta.tokens,
              at: Date.now(),
            },
            ...s.ledger,
          ].slice(0, 40)
        : s.ledger,
    }));
  }, []);

  const setKyc = useCallback((kyc: KycLevel) => {
    setData((s) => ({ ...s, kyc }));
  }, []);

  const updateProject = useCallback((id: string, recipe: (project: Project) => Project) => {
    setData((s) => ({
      ...s,
      projects: s.projects.map((project) => (project.id === id ? recipe(project) : project)),
    }));
  }, []);

  const addProject = useCallback((name: string) => {
    const created = blankProject(name);
    setData((s) => ({
      ...s,
      projects: [created, ...s.projects],
      activeProjectId: created.id,
    }));
    return created.id;
  }, []);

  const removeProject = useCallback((id: string) => {
    setData((s) => {
      const projects = s.projects.filter((project) => project.id !== id);
      return {
        ...s,
        projects,
        activeProjectId:
          s.activeProjectId === id ? projects[0]?.id ?? "" : s.activeProjectId,
      };
    });
  }, []);

  const setActiveProject = useCallback((id: string) => {
    setData((s) => ({ ...s, activeProjectId: id }));
  }, []);

  const markWatched = useCallback((lessonId: string) => {
    setData((s) =>
      s.watched.includes(lessonId) ? s : { ...s, watched: [...s.watched, lessonId] }
    );
  }, []);

  const saveLessonOutput = useCallback((lessonId: string, text: string) => {
    setData((s) => ({ ...s, lessonOutputs: { ...s.lessonOutputs, [lessonId]: text } }));
  }, []);

  const addQuestion = useCallback((input: { title: string; body: string; tag: QaTag }) => {
    setData((s) => ({
      ...s,
      questions: [
        {
          id: uid(),
          title: input.title,
          body: input.body,
          tag: input.tag,
          votes: 0,
          at: Date.now(),
          answers: [],
        },
        ...s.questions,
      ],
    }));
  }, []);

  const vote = useCallback((id: string, delta: number) => {
    setData((s) => ({
      ...s,
      votes: { ...s.votes, [id]: (s.votes[id] ?? 0) + delta },
    }));
  }, []);

  const addTicket = useCallback((subject: string, body: string) => {
    setData((s) => ({
      ...s,
      tickets: [
        { id: uid(), subject, body, status: "open", reply: "", at: Date.now() },
        ...s.tickets,
      ],
    }));
  }, []);

  const answerTicket = useCallback((id: string, reply: string) => {
    setData((s) => ({
      ...s,
      tickets: s.tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, reply, status: "answered" } : ticket
      ),
    }));
  }, []);

  const pushAi = useCallback((message: ChatMessage) => {
    setData((s) => ({ ...s, aiChat: [...s.aiChat, message].slice(-40) }));
  }, []);

  const pushMentor = useCallback((message: ChatMessage) => {
    setData((s) => ({ ...s, mentorChat: [...s.mentorChat, message].slice(-40) }));
  }, []);

  const bookCall = useCallback((day: string, time: string, note: string) => {
    if (current.mentorCallLeft < 30) return false;
    setData((s) => ({
      ...s,
      mentorCallLeft: s.mentorCallLeft - 30,
      calls: [{ id: uid(), day, time, note }, ...s.calls],
    }));
    return true;
  }, []);

  const consumeMentorChat = useCallback((minutes: number) => {
    let ok = false;
    setData((s) => {
      if (s.mentorChatLeft < minutes) return s;
      ok = true;
      return { ...s, mentorChatLeft: s.mentorChatLeft - minutes };
    });
    return ok;
  }, []);

  const addBannerRequest = useCallback((input: Omit<BannerRequest, "id" | "at" | "status">) => {
    setData((s) => ({
      ...s,
      bannerRequests: [
        { ...input, id: uid(), at: Date.now(), status: "pending" },
        ...s.bannerRequests,
      ],
    }));
  }, []);

  const setBannerStatus = useCallback((id: string, status: BannerRequest["status"]) => {
    setData((s) => ({
      ...s,
      bannerRequests: s.bannerRequests.map((item) =>
        item.id === id ? { ...item, status } : item
      ),
    }));
  }, []);

  const addCreation = useCallback((input: Omit<Creation, "id" | "at">) => {
    setData((s) => ({
      ...s,
      creations: [{ ...input, id: uid(), at: Date.now() }, ...s.creations].slice(0, 12),
    }));
  }, []);

  const seeStory = useCallback((id: string) => {
    setData((s) =>
      s.seenStories.includes(id) ? s : { ...s, seenStories: [...s.seenStories, id] }
    );
  }, []);

  const openSupport = useCallback((mode: "ai" | "human" = "ai") => {
    setUi((s) => ({ ...s, supportOpen: true, supportMode: mode }));
  }, []);

  const closeSupport = useCallback(() => {
    setUi((s) => ({ ...s, supportOpen: false }));
  }, []);

  const openStory = useCallback((id: string | null) => {
    setUi((s) => ({ ...s, storyId: id }));
  }, []);

  const resetDemo = useCallback(() => {
    current = seedData();
    localStorage.removeItem(KEY);
    localStorage.removeItem(DIR_KEY);
    listeners.forEach((listener) => listener());
    setUi({ supportOpen: false, supportMode: "ai", storyId: null });
  }, []);

  const activeProject = data.projects.find((project) => project.id === data.activeProjectId);

  const value = useMemo<AppContextValue>(
    () => ({
      ...data,
      hydrated,
      ui,
      displayName: data.authed && data.name.trim() ? data.name.trim() : data.lang === "en" ? "Account" : "حساب کاربری",
      activeProject,
      setLang,
      registerAccount,
      signIn,
      signOut,
      spendTokens,
      setPlan,
      setKyc,
      updateProject,
      addProject,
      removeProject,
      setActiveProject,
      markWatched,
      saveLessonOutput,
      addQuestion,
      vote,
      addTicket,
      answerTicket,
      pushAi,
      pushMentor,
      bookCall,
      consumeMentorChat,
      addBannerRequest,
      setBannerStatus,
      addCreation,
      seeStory,
      openSupport,
      closeSupport,
      openStory,
      resetDemo,
    }),
    [
      data,
      hydrated,
      ui,
      activeProject,
      setLang,
      registerAccount,
      signIn,
      signOut,
      spendTokens,
      setPlan,
      setKyc,
      updateProject,
      addProject,
      removeProject,
      setActiveProject,
      markWatched,
      saveLessonOutput,
      addQuestion,
      vote,
      addTicket,
      answerTicket,
      pushAi,
      pushMentor,
      bookCall,
      consumeMentorChat,
      addBannerRequest,
      setBannerStatus,
      addCreation,
      seeStory,
      openSupport,
      closeSupport,
      openStory,
      resetDemo,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

export function useT() {
  const { lang } = useApp();
  const t = useCallback((fa: string, en: string) => (lang === "fa" ? fa : en), [lang]);
  return { t, lang };
}
