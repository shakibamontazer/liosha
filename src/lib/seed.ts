import { bi, uid } from "@/lib/text";
import type { AppData, CanvasKey, Project } from "@/lib/types";

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

function studioProject(): Project {
  const project = blankProject("آتلیه نور");
  project.id = "atelier";
  project.createdAt = Date.now() - 1000 * 60 * 60 * 24 * 12;
  project.ideaThread = [
    {
      id: "m1",
      role: "user",
      text: "یک آتلیه پرتره می‌خواهم که به صاحب کسب‌وکار عکس اعتمادساز بدهد، نه عکس مناسبتی عمومی.",
      at: Date.now() - 86400000 * 11,
    },
    {
      id: "m2",
      role: "ai",
      text: "ایده شنیده شد. نقطه کور: «عکس خوب» فعالیت است، «اعتماد مشتریِ مشتریِ تو» نتیجه است.",
      at: Date.now() - 86400000 * 11 + 1000,
    },
  ];
  project.clearGoal =
    "تا ۳۰ روز آینده مجموعه پرتره اعتمادساز را برای سه صاحب برند شخصی اجرا کن و یک توصیه‌نامه از هر کدام بگیر.";
  project.skillsHard = ["نورپردازی", "رتوش طبیعی"];
  project.skillsSoft = ["گوش دادن", "نظم تحویل"];
  project.frictions = ["fake", "late", "price"];
  project.niche = {
    service: "مجموعه پرتره محیطی",
    audience: "صاحبان برند شخصی و مشاوران",
    outcome: "تصویری که در صفحه معرفی، اعتماد می‌سازد",
  };
  project.beta = [
    { name: "هستی", note: "پرتره صفحه درباره ما", status: "done" },
    { name: "آرمین", note: "سه عکس لینکدین", status: "active" },
    { name: "کیان", note: "کاور پیشنهاد خدمات", status: "pending" },
  ];
  project.selectedName = "نورگاه";
  project.nameIdeas = [
    { name: "نورگاه", handle: "norgah", syllables: 2, ease: 5, ir: true, com: true, ig: true },
  ];
  project.canvas = {
    value: "پرتره واقعی برای صاحب برندی که باید در سه ثانیه قابل اعتماد به نظر برسد.",
    customers: "مشاوران و صاحبان پیج تخصصی، ۲۵ تا ۴۰ سال، بودجه پروژه مشخص.",
    channels: "ریلز آموزشی نور، نمونه‌کار استوری، دایرکت.",
    relation: "همراهی تا تحویل نسخه نهایی و یک نوبت اصلاح.",
    revenue: "پروژه‌ای، با سه پکیج.",
    resources: "دوربین، نور قابل‌حمل، نمونه تماس‌ها.",
    activities: "جلسه شناخت، عکاسی، انتخاب فریم، تحویل.",
    partners: "تدوینگر ریلز و نویسنده بیو.",
    costs: "حمل‌ونقل، بک‌آپ، تبلیغ محدود.",
  };
  project.budget = 85000000;
  project.capex = [
    { id: "c1", name: "نور پرتابل", amount: 28000000 },
    { id: "c2", name: "طراحی لوگو", amount: 6000000 },
  ];
  project.opex = [
    { id: "o1", name: "تبلیغ تست", amount: 5000000 },
    { id: "o2", name: "اینترنت و نرم‌افزار", amount: 1300000 },
  ];
  project.packages = [
    { tier: "base", name: "پرتره معرفی", price: 4500000, features: "۶ فریم نهایی و راهنمای استفاده در پروفایل" },
    { tier: "popular", name: "مجموعه اعتماد", price: 8900000, features: "۱۲ فریم، دو فضا، نسخه تیره و روشن کاور" },
    { tier: "vip", name: "روز برند", price: 16000000, features: "نیم‌روز عکاسی، ریلز پشت‌صحنه، بیو و کاور" },
  ];
  project.adjective = "specialist";
  project.funnel = {
    attract: "ریلزی که یک اشتباه نور را در ۳۰ ثانیه نشان می‌دهد.",
    trust: "قبل و بعد سه مشتری آزمایشی، بدون رتوش پلاستیکی.",
    sell: "دعوت به انتخاب بین سه پکیج در دایرکت.",
  };
  project.paletteId = "night";
  project.colors = { main: "#0F172A", second: "#6366F1", action: "#F59E0B" };
  project.fontPair = "vazir";
  project.tone = "mature";
  project.briefQuestions = ["نتیجه عکس در کدام صفحه دیده می‌شود؟", "", ""];
  project.checklist = { name: true, logo: true };
  project.persona = {
    name: "هستی",
    age: "32",
    city: "تهران",
    job: "مشاور برند شخصی",
    budget: "حدود ۹ میلیون برای یک مجموعه",
    platform: "اینستاگرام و لینکدین",
    pains: "",
    tone: "",
  };
  project.calendar = {
    pillars: ["آموزش نور", "نمونه‌کار", "پشت‌صحنه", "دعوت به پروژه"],
    slots: [
      { id: "sl1", day: 0, platform: "اینستاگرام", format: "ریلز", time: "18:30" },
      { id: "sl2", day: 2, platform: "لینکدین", format: "اسلاید", time: "09:00" },
    ],
    aiReport: "",
    humanNote: "لحن مخاطب در دایرکت جدی است؛ شوخی تبلیغاتی را کم کن.",
  };
  return project;
}

function cafeProject(): Project {
  const project = blankProject("کافه متن");
  project.id = "cafe";
  project.createdAt = Date.now() - 1000 * 60 * 60 * 24 * 3;
  project.ideaThread = [
    {
      id: "c-m1",
      role: "user",
      text: "برای کافه‌های محله‌ای تقویم محتوا می‌سازم تا منو و فضای داخلی‌شان دیده شود.",
      at: Date.now() - 86400000 * 2,
    },
    {
      id: "c-m2",
      role: "ai",
      text: "مخاطب هنوز «همه کافه‌ها» است. شهر و نوع کافه را کوچک کن.",
      at: Date.now() - 86400000 * 2 + 2000,
    },
  ];
  project.clearGoal = "تا ۳۰ روز آینده برای سه کافه مستقل یک هفته محتوا آزمایشی بساز و بازخورد صاحب کافه را ثبت کن.";
  return project;
}

export function seedData(): AppData {
  const atelier = studioProject();
  const cafe = cafeProject();
  return {
    lang: "fa",
    authed: true,
    name: "نیکا رضایی",
    tokens: 3200,
    plan: "pro",
    months: 1,
    daysLeft: 18,
    kyc: "basic",
    activeProjectId: atelier.id,
    projects: [atelier, cafe],
    watched: ["b0", "b1", "b2", "s-calendar", "dm-1"],
    lessonOutputs: {},
    questions: [],
    votes: {},
    tickets: [],
    calls: [],
    aiChat: [
      {
        id: "ai-hello",
        role: "ai",
        text: "سلام نیکا. من راهنمای داخل پلتفرم‌ام. بگو روی کدام مرحله گیر کرده‌ای تا همان را قدم‌به‌قدم باز کنم.",
        at: Date.now() - 3600000,
      },
    ],
    mentorChat: [
      {
        id: "hm-hello",
        role: "mentor",
        text: "مهدی کاظمی هستم، منتور این دوره. پیام‌ات اینجاست و خارج از چت پلتفرم پیگیری نمی‌شود. تعهد پاسخ: کمتر از دو ساعت.",
        at: Date.now() - 7200000,
      },
    ],
    bannerRequests: [],
    creations: [],
    ledger: [
      { id: "l1", label: bi("نقد ایده آتلیه نور", "Atelier idea critique"), amount: -1, at: Date.now() - 86400000 * 4 },
      { id: "l2", label: bi("کاور ریلز آزمایشی", "Trial reel cover"), amount: -10, at: Date.now() - 86400000 },
    ],
    seenStories: [],
    mentorCallLeft: 90,
    mentorChatLeft: 60,
  };
}

export const DEMO_USER = {
  name: bi("نیکا رضایی", "Nika Rezaei"),
  handle: "@nika",
};
