import { bi, type Bi } from "@/lib/text";
import type { BannerSize, CanvasKey, PlanId, QaTag } from "@/lib/types";

export const STEPS: { id: number; title: Bi; hint: Bi }[] = [
  {
    id: 0,
    title: bi("ایده‌پردازی با هوش مصنوعی", "AI ideation"),
    hint: bi("ایده خام را نقد کن و به یک هدف شفاف برس.", "Critique a raw idea into a clear goal."),
  },
  {
    id: 1,
    title: bi("کشف، تفکیک و اعتبارسنجی", "Discovery and validation"),
    hint: bi("مهارت، اصطکاک بازار، نیچ و تست بتا با ۳ نفر.", "Skills, friction, niche, and a 3-person beta."),
  },
  {
    id: 2,
    title: bi("انتخاب نام برند", "Naming strategy"),
    hint: bi("سیلاب، تلفظ و آزاد بودن دامنه و هندل.", "Syllables, pronunciation, domain and handle."),
  },
  {
    id: 3,
    title: bi("بیزنس‌پلن و مدل کسب‌وکار", "Business plan canvas"),
    hint: bi("ماتریس ۹ بخشی با پیشنهاد ارزش و کانال.", "Nine-block canvas with value and channels."),
  },
  {
    id: 4,
    title: bi("مدیریت مالی و بودجه‌بندی", "Financial planning"),
    hint: bi("تفکیک CapEx و OpEx با قانون ۵۰/۳۰/۲۰.", "Split CapEx and OpEx with the 50/30/20 rule."),
  },
  {
    id: 5,
    title: bi("استراتژی‌های کلیدی", "Strategy blueprint"),
    hint: bi("سه پکیج، صفت جایگاه و قیف فروش.", "Three offers, a positioning word, and a funnel."),
  },
  {
    id: 6,
    title: bi("هویت برند و زبان بصری", "Brand identity"),
    hint: bi("پالت ۶۰-۳۰-۱۰، فونت و لحن.", "60-30-10 palette, type, and tone."),
  },
  {
    id: 7,
    title: bi("فرآیندها و اسناد کاری", "Operations"),
    hint: bi("بریف، پیش‌پرداخت، اصلاحات و متن‌های آماده.", "Brief, deposit, revisions, and scripts."),
  },
  {
    id: 8,
    title: bi("چک‌لیست آماده‌سازی و لانچ", "Launch checklist"),
    hint: bi("لوگو، نمونه‌کار، ۹ پست، متن صفحات و درگاه.", "Logo, portfolio, 9 posts, pages, and payments."),
  },
  {
    id: 9,
    title: bi("پل ارتباطی و رفع دغدغه", "Support bridge"),
    hint: bi("چالش را بفرست و متن یا استراتژی بگیر.", "Send a blocker and get a script or strategy."),
  },
  {
    id: 10,
    title: bi("شناخت مخاطب هدف", "Audience persona"),
    hint: bi("مشخصات، دغدغه‌ها و لحن مؤثر.", "Profile, pains, and the tone that lands."),
  },
];

export const CANVAS_FIELDS: { key: CanvasKey; title: Bi; prompt: Bi }[] = [
  { key: "value", title: bi("ارزش پیشنهادی", "Value proposition"), prompt: bi("چه تفاوتی رقم می‌زنی که ارزش پول دادن دارد؟", "What difference is worth paying for?") },
  { key: "customers", title: bi("بخش‌های مشتریان", "Customer segments"), prompt: bi("سن، بودجه و پلتفرم دقیق مشتری.", "Age, budget, and the platform they actually use.") },
  { key: "channels", title: bi("کانال‌های ارتباطی", "Channels"), prompt: bi("از چه طریقی تو را پیدا می‌کنند؟", "Where do they find you?") },
  { key: "relation", title: bi("ارتباط با مشتری", "Customer relationship"), prompt: bi("پشتیبانی اختصاصی، همراهی بلندمدت یا پروژه‌ای؟", "Dedicated support, retainer, or one-off projects?") },
  { key: "revenue", title: bi("جریان‌های درآمدی", "Revenue streams"), prompt: bi("تک‌پروژه، پکیج ماهانه یا ترکیبی؟", "Project fee, monthly package, or a mix?") },
  { key: "resources", title: bi("منابع کلیدی", "Key resources"), prompt: bi("ابزارهایی که بدون آن‌ها کار نمی‌خوابد.", "Tools the work cannot run without.") },
  { key: "activities", title: bi("فعالیت‌های کلیدی", "Key activities"), prompt: bi("کارهای اصلی هر روز.", "The work you repeat every day.") },
  { key: "partners", title: bi("شرکای کلیدی", "Key partners"), prompt: bi("همکار مکمل، نه رقیب.", "A complementary partner, not a competitor.") },
  { key: "costs", title: bi("ساختار هزینه‌ها", "Cost structure"), prompt: bi("هزینه ثابت و متغیر.", "Fixed and variable costs.") },
];

export const LAUNCH_ITEMS: { id: string; label: Bi }[] = [
  { id: "name", label: bi("نام برند، دامنه و هندل رزرو شده است.", "Brand name, domain, and handle are reserved.") },
  { id: "logo", label: bi("لوگو در دو نسخه روشن و تیره آماده است.", "Logo exists in light and dark versions.") },
  { id: "portfolio", label: bi("بانک نمونه‌کار حداقل ۶ پروژه آماده است.", "Portfolio has at least 6 pieces.") },
  { id: "posts", label: bi("۹ پست یا ریلز برای شروع پیج آماده است.", "9 launch posts or reels are ready.") },
  { id: "pages", label: bi("متن صفحات اصلی سایت آماده است.", "Core page copy is written.") },
  { id: "pay", label: bi("مسیر دریافت وجه (حساب تجاری یا درگاه) مشخص است.", "A payment path is defined.") },
];

export const FRICTIONS: { id: string; label: Bi }[] = [
  { id: "late", label: bi("بدقولی در تحویل", "Late delivery") },
  { id: "fake", label: bi("ادیت مصنوعی و غیرواقعی", "Overprocessed, unreal edits") },
  { id: "price", label: bi("قیمت‌های گنگ", "Vague pricing") },
  { id: "support", label: bi("نبود پشتیبانی بعد از تحویل", "No support after delivery") },
  { id: "brief", label: bi("بریف نامشخص و رفت‌وبرگشت زیاد", "Unclear briefs and endless rounds") },
  { id: "trust", label: bi("نبود نمونه‌کار قابل اعتماد", "No trustworthy portfolio") },
];

export const HARD_SKILL_HINTS = [
  bi("نورپردازی", "Lighting"),
  bi("تدوین", "Editing"),
  bi("کپی‌رایتینگ", "Copywriting"),
  bi("طراحی گرافیک", "Graphic design"),
  bi("سئو", "SEO"),
  bi("فروش تلفنی", "Sales calls"),
];

export const SOFT_SKILL_HINTS = [
  bi("گوش دادن", "Listening"),
  bi("سلیقه بصری", "Visual taste"),
  bi("نظم تحویل", "Delivery discipline"),
  bi("مذاکره", "Negotiation"),
  bi("همدلی", "Empathy"),
];

export const ADJECTIVES: { id: string; label: Bi }[] = [
  { id: "fast", label: bi("سریع‌ترین", "The fastest") },
  { id: "quality", label: bi("باکیفیت‌ترین", "The highest quality") },
  { id: "specialist", label: bi("تخصصی‌ترین", "The most specialized") },
];

export const TONES: { id: string; label: Bi; note: Bi }[] = [
  { id: "mature", label: bi("پخته و محترمانه", "Mature and respectful"), note: bi("بدون اغراق و بدون شعار توخالی.", "No hype, no empty slogans.") },
  { id: "warm", label: bi("گرم و نزدیک", "Warm and close"), note: bi("صمیمی، اما هنوز حرفه‌ای.", "Friendly, still professional.") },
  { id: "expert", label: bi("متخصص و دقیق", "Expert and precise"), note: bi("کوتاه، مستند، با عدد و مثال.", "Short, sourced, with numbers and examples.") },
];

export const PALETTES: { id: string; name: Bi; main: string; second: string; action: string }[] = [
  { id: "night", name: bi("شب ایندیگو", "Indigo night"), main: "#0F172A", second: "#6366F1", action: "#F59E0B" },
  { id: "royal", name: bi("بنفش سلطنتی", "Royal violet"), main: "#1E1B4B", second: "#7C3AED", action: "#F472B6" },
  { id: "trust", name: bi("اعتماد سبزآبی", "Trust teal"), main: "#042F2E", second: "#0F766E", action: "#FBBF24" },
  { id: "warm", name: bi("گرم و صمیمی", "Warm clay"), main: "#292524", second: "#C2410C", action: "#FDE68A" },
];

export const FONT_PAIRS: { id: string; title: Bi; detail: Bi }[] = [
  { id: "vazir", title: bi("وزیرمتن + وزیرمتن", "Vazirmatn + Vazirmatn"), detail: bi("یک خانواده، دو وزن: سیاه برای تیتر و معمولی برای متن.", "One family, two weights: black for titles, regular for body.") },
  { id: "cairo", title: bi("قاهره + وزیرمتن", "Cairo + Vazirmatn"), detail: bi("تیتر هندسی و متن خوانای فارسی.", "Geometric titles with a readable Persian body.") },
  { id: "almarai", title: bi("المرای + وزیرمتن", "Almarai + Vazirmatn"), detail: bi("تیتر نرم و مدرن، متن آرام.", "A soft modern title with a calm body.") },
];

export const PLANS: {
  id: PlanId;
  name: Bi;
  tagline: Bi;
  tokens: number;
  callMin: number;
  chatMin: number;
  mentor: Bi;
  ai: Bi;
  support: Bi;
  prices: Record<1 | 3 | 12, number>;
  popular?: boolean;
}[] = [
  {
    id: "base",
    name: bi("پایه", "Base"),
    tagline: bi("شروع", "Start"),
    tokens: 1500,
    callMin: 60,
    chatMin: 30,
    mentor: bi("۱ ساعت تماس در هفته + ۳۰ دقیقه چت در روز", "1 hour of calls each week + 30 minutes of chat a day"),
    ai: bi("مدل‌های پایه متن و تصویر", "Basic text and image models"),
    support: bi("پشتیبانی هوش مصنوعی ۲۴/۷ نامحدود", "Unlimited 24/7 AI support"),
    prices: { 1: 8985000, 3: 25955000, 12: 97820000 },
  },
  {
    id: "pro",
    name: bi("محبوب", "Pro"),
    tagline: bi("رشد", "Growth"),
    tokens: 4500,
    callMin: 90,
    chatMin: 60,
    mentor: bi("۱.۵ ساعت تماس در هفته + ۱ ساعت چت در روز", "1.5 hours of calls each week + 1 hour of chat a day"),
    ai: bi("مدل‌های پیشرفته تصویر و تولید ویدیو", "Advanced image and video models"),
    support: bi("پشتیبانی هوش مصنوعی ۲۴/۷ اختصاصی", "Dedicated 24/7 AI support"),
    prices: { 1: 14850000, 3: 41550000, 12: 153200000 },
    popular: true,
  },
  {
    id: "vip",
    name: bi("پیشرفته", "VIP"),
    tagline: bi("مقیاس", "Scale"),
    tokens: 12000,
    callMin: 180,
    chatMin: 90,
    mentor: bi("۳ ساعت تماس در هفته + ۱.۵ ساعت چت در روز", "3 hours of calls each week + 1.5 hours of chat a day"),
    ai: bi("مدل‌های فوق‌پیشرفته و آواتارساز سینمایی", "Flagship models and cinematic avatars"),
    support: bi("پشتیبانی ۲۴/۷ ویژه و فوق‌سریع", "Priority, faster 24/7 support"),
    prices: { 1: 24900000, 3: 68700000, 12: 248800000 },
  },
];

export const TOKEN_RATES: { id: string; label: Bi; cost: Bi }[] = [
  { id: "text", label: bi("متن و پرامپت استراتژیک", "Strategic text and prompts"), cost: bi("۱ توکن برای هر خروجی", "1 token per output") },
  { id: "image", label: bi("تصویر، کاور و بنر", "Images, covers, and banners"), cost: bi("۱۰ توکن برای هر تصویر", "10 tokens per image") },
  { id: "voice", label: bi("صدا و نریشن", "Voice and narration"), cost: bi("۱۵ توکن برای هر دقیقه", "15 tokens per minute") },
  { id: "video", label: bi("ویدیوی هوش مصنوعی", "AI video"), cost: bi("۵۰ توکن برای هر ۵ ثانیه", "50 tokens per 5 seconds") },
  { id: "avatar", label: bi("آواتار سخنگو", "Talking avatar"), cost: bi("۱۰۰ توکن برای هر ۳۰ ثانیه", "100 tokens per 30 seconds") },
];

export const BANNER_OFFERS: {
  size: BannerSize;
  name: Bi;
  price: number;
  needSteps: number;
  needKyc: "basic" | "verified";
  needPortfolio: boolean;
  span: string;
}[] = [
  {
    size: "special",
    name: bi("بنر بزرگ ویژه", "Featured hero banner"),
    price: 32000000,
    needSteps: 11,
    needKyc: "verified",
    needPortfolio: true,
    span: "md:col-span-2 md:row-span-2 min-h-64",
  },
  {
    size: "large",
    name: bi("بنر بزرگ", "Large banner"),
    price: 18000000,
    needSteps: 10,
    needKyc: "verified",
    needPortfolio: false,
    span: "md:col-span-2 min-h-44",
  },
  {
    size: "medium",
    name: bi("بنر متوسط", "Medium banner"),
    price: 10500000,
    needSteps: 6,
    needKyc: "basic",
    needPortfolio: true,
    span: "min-h-40",
  },
  {
    size: "small",
    name: bi("بنر کوچک", "Small banner"),
    price: 5800000,
    needKyc: "basic",
    needSteps: 0,
    needPortfolio: false,
    span: "min-h-28",
  },
];

export type StoryItem = {
  id: string;
  kind: "official" | "win";
  author: Bi;
  title: Bi;
  body: Bi;
  stat?: Bi;
};

export const STORIES: StoryItem[] = [
  {
    id: "s1",
    kind: "official",
    author: bi("آموزش رسمی", "Official lesson"),
    title: bi("ایده خام را همین‌جا خالی کن", "Dump the raw idea here"),
    body: bi(
      "در مرحله صفر فقط بنویس چه چیزی در ذهن داری. از هوش مصنوعی بخواه نقطه‌های کور را بگوید. خروجی باید یک هدف ۳۰ روزه باشد، نه یک شعار.",
      "In step zero, write what is actually in your head. Ask the model for blind spots. The output is a 30-day goal, not a slogan."
    ),
    stat: bi("مرحله ۰", "Step 0"),
  },
  {
    id: "s2",
    kind: "official",
    author: bi("آموزش رسمی", "Official lesson"),
    title: bi("قانون ۵۰ / ۳۰ / ۲۰", "The 50 / 30 / 20 rule"),
    body: bi(
      "نصف بودجه در دسترس برای عملیات، سی درصد برای دستمزد خودت و بیست درصد برای توسعه. اگر دستمزد خودت صفر بماند، کسب‌وکار زودتر از پول تمام می‌شود.",
      "Half the available budget goes to operations, thirty percent to your own pay, twenty percent to growth. If your pay stays at zero, the business ends before the money does."
    ),
    stat: bi("مرحله ۴", "Step 4"),
  },
  {
    id: "s3",
    kind: "official",
    author: bi("آموزش رسمی", "Official lesson"),
    title: bi("نام، حداکثر سه سیلاب", "Three syllables, maximum"),
    body: bi(
      "قبل از عاشق شدن به یک نام، دامنه ir و com و هندل اینستاگرام را چک کن. نامی که شنیده می‌شود ولی تایپ نمی‌شود، پیدا نمی‌شود.",
      "Before you fall for a name, check the .ir and .com domains and the Instagram handle. A name people hear but cannot type will not be found."
    ),
    stat: bi("مرحله ۲", "Step 2"),
  },
  {
    id: "s4",
    kind: "win",
    author: bi("هستی مرادی", "Hasti Moradi"),
    title: bi("پیج در ۹ روز لانچ شد", "Page launched in 9 days"),
    body: bi(
      "چک‌لیست لانچ را تمام کردم: ۶ نمونه‌کار، ۹ ریلز و یک مسیر پرداخت. اولین پیام دایرکت همان شب آمد.",
      "I finished the launch checklist: 6 portfolio pieces, 9 reels, and a payment path. The first direct message arrived that night."
    ),
    stat: bi("۹ روز", "9 days"),
  },
  {
    id: "s5",
    kind: "win",
    author: bi("آرمین توکلی", "Armin Tavakoli"),
    title: bi("۱۲۰ لید از کانال تلگرام", "120 leads from Telegram"),
    body: bi(
      "به‌جای پست پراکنده، چهار ستون محتوا چیدم و پین مسیج را به یک پیشنهاد مشخص وصل کردم.",
      "Instead of scattered posts, I set four content pillars and tied the pinned message to one clear offer."
    ),
    stat: bi("۱۲۰ لید", "120 leads"),
  },
  {
    id: "s6",
    kind: "win",
    author: bi("نیکا رضایی", "Nika Rezaei"),
    title: bi("اولین فروش پکیج برندینگ", "First branding package sold"),
    body: bi(
      "پکیج محبوب را روی خروجی بستم، نه روی ساعت. مشتری برای مجموعه پرتره اعتمادساز پول داد.",
      "I priced the popular package on the outcome, not the hours. The client paid for a trust-building portrait set."
    ),
    stat: bi("پکیج محبوب", "Popular package"),
  },
  {
    id: "s7",
    kind: "win",
    author: bi("کیان صالحی", "Kian Salehi"),
    title: bi("سه تست بتا، یک نیچ", "Three betas, one niche"),
    body: bi(
      "به سه کافه فقط تقویم محتوای یک‌هفته‌ای دادم. دو نفر ماندند و مسیر خدماتم مشخص شد.",
      "I gave three cafés a one-week content calendar. Two stayed, and the service finally had a shape."
    ),
    stat: bi("تست بتا", "Beta test"),
  },
];

export type Lesson = {
  id: string;
  module: "business" | "social" | "academy" | "website";
  course?: string;
  step?: number;
  studio?: string;
  platform?: string;
  title: Bi;
  minutes: string;
  summary: Bi;
};

const businessLessons: Lesson[] = STEPS.map((step) => ({
  id: `b${step.id}`,
  module: "business" as const,
  step: step.id,
  title: step.title,
  minutes: step.id % 2 === 0 ? "08:40" : "11:15",
  summary: step.hint,
}));

export const SOCIAL_LESSONS: Lesson[] = [
  {
    id: "s-calendar",
    module: "social",
    studio: "calendar",
    title: bi("تقویم ماهانه و هفتگی", "Monthly and weekly calendars"),
    minutes: "14:05",
    summary: bi("چهار ستون محتوا، بعد جدول انتشار روزانه.", "Four content pillars, then a daily publishing grid."),
  },
  {
    id: "s-reels",
    module: "social",
    studio: "video",
    title: bi("هوک سه‌ثانیه‌ای و برش ریلز", "The 3-second hook and reel cuts"),
    minutes: "09:50",
    summary: bi("از ویدیوی بلند به شورت، با زیرنویس و کادر امن.", "From a long video to a short, with captions and a safe frame."),
  },
  {
    id: "s-cover",
    module: "social",
    studio: "graphics",
    title: bi("کاور ۱۶:۹ و ۹:۱۶", "16:9 and 9:16 covers"),
    minutes: "07:30",
    summary: bi("سایز، کنتراست و محدوده‌ای که دست و متن در آن امن است.", "Size, contrast, and the zone where hands and type stay safe."),
  },
  {
    id: "s-voice",
    module: "social",
    studio: "audio",
    title: bi("نریشن و موزیک بدون دردسر کپی‌رایت", "Narration and music without copyright trouble"),
    minutes: "10:20",
    summary: bi("کلون صدا، حذف نویز موبایل و موزیک اختصاصی.", "Voice clone, mobile noise removal, and an original bed."),
  },
];

export const COURSES: {
  slug: string;
  title: Bi;
  blurb: Bi;
  lessons: Lesson[];
}[] = [
  {
    slug: "digital-marketing",
    title: bi("دیجیتال مارکتینگ", "Digital marketing"),
    blurb: bi("از پیام تا کانال؛ بدون پراکنده کار کردن.", "From message to channel, without scattered effort."),
    lessons: [
      { id: "dm-1", module: "academy", course: "digital-marketing", title: bi("یک پیشنهاد، یک مخاطب", "One offer, one audience"), minutes: "12:10", summary: bi("قبل از تقویم، جمله نیچ را ثابت کن.", "Lock the niche sentence before the calendar.") },
      { id: "dm-2", module: "academy", course: "digital-marketing", title: bi("قیف محتوای آموزشی", "The education content funnel"), minutes: "15:40", summary: bi("آموزش جذب می‌کند، نمونه‌کار اعتماد می‌سازد، پیشنهاد می‌فروشد.", "Education attracts, proof builds trust, the offer sells.") },
      { id: "dm-3", module: "academy", course: "digital-marketing", title: bi("متریک‌هایی که تصمیم را عوض می‌کنند", "Metrics that change the decision"), minutes: "09:25", summary: bi("واچ‌تایم، کلیک و پیام؛ نه فقط لایک.", "Watch time, clicks, and messages — not just likes.") },
    ],
  },
  {
    slug: "branding",
    title: bi("برندینگ", "Branding"),
    blurb: bi("نام، رنگ، لحن و قولی که تکرار می‌شود.", "Name, color, tone, and a promise you can repeat."),
    lessons: [
      { id: "br-1", module: "academy", course: "branding", title: bi("صفت ذهنی برند", "The mental adjective"), minutes: "08:15", summary: bi("سریع‌ترین، باکیفیت‌ترین یا تخصصی‌ترین؛ یکی را انتخاب کن.", "Fastest, finest, or most specialized. Pick one.") },
      { id: "br-2", module: "academy", course: "branding", title: bi("قانون ۶۰-۳۰-۱۰", "The 60-30-10 rule"), minutes: "06:45", summary: bi("پس‌زمینه، مکمل و رنگ عمل. بیشتر از این شلوغ است.", "Background, support, and action. More than that is noise.") },
      { id: "br-3", module: "academy", course: "branding", title: bi("لحن بدون اغراق", "Tone without hype"), minutes: "11:00", summary: bi("پخته، محترمانه و قابل اثبات.", "Mature, respectful, and provable.") },
    ],
  },
  {
    slug: "sales",
    title: bi("تکنیک‌های فروش", "Sales technique"),
    blurb: bi("قیمت ارزش‌محور و ساختار سه پکیجی.", "Value pricing and a three-package structure."),
    lessons: [
      { id: "sa-1", module: "academy", course: "sales", title: bi("فروش خروجی، نه ساعت", "Sell the outcome, not the hour"), minutes: "13:20", summary: bi("مشتری برای نتیجه پول می‌دهد.", "Clients pay for the result.") },
      { id: "sa-2", module: "academy", course: "sales", title: bi("پایه، محبوب، ویژه", "Base, popular, signature"), minutes: "10:10", summary: bi("پکیج وسط باید انتخاب پیش‌فرض باشد.", "The middle package should be the default choice.") },
      { id: "sa-3", module: "academy", course: "sales", title: bi("بریف و پیش‌پرداخت", "Brief and deposit"), minutes: "09:05", summary: bi("پنجاه درصد قبل از شروع، سقف اصلاح رایگان.", "Fifty percent before you start, and a cap on free revisions.") },
    ],
  },
  {
    slug: "closing",
    title: bi("نهایی‌سازی معامله", "Closing the deal"),
    blurb: bi("وقتی مشتری روی قیمت می‌ایستد، متن آماده داشته باش.", "When price stalls the deal, have the script ready."),
    lessons: [
      { id: "cl-1", module: "academy", course: "closing", title: bi("جواب چانه‌زنی", "Answering a price pushback"), minutes: "08:55", summary: bi("به خروجی برگرد، تخفیف عجول نده.", "Return to the outcome. Do not discount in a hurry.") },
      { id: "cl-2", module: "academy", course: "closing", title: bi("دعوت به اقدام در دایرکت", "The direct-message invitation"), minutes: "07:40", summary: bi("یک سؤال مشخص، یک قدم بعدی.", "One clear question, one next step.") },
      { id: "cl-3", module: "academy", course: "closing", title: bi("پیگیری محترمانه", "A respectful follow-up"), minutes: "06:30", summary: bi("یک یادآوری، بدون فشار نمایشی.", "One reminder, without theatrical pressure.") },
    ],
  },
];

export const WEBSITE_LESSON: Lesson = {
  id: "w-1",
  module: "website",
  title: bi("سایت‌ساز در فاز بعد چه می‌کند", "What the site builder will do next"),
  minutes: "05:45",
  summary: bi("قالب PWA، درگاه پرداخت و اتصال REST وردپرس.", "PWA templates, a payment gateway, and the WordPress REST connection."),
};

export const LESSONS: Lesson[] = [
  ...businessLessons,
  ...SOCIAL_LESSONS,
  ...COURSES.flatMap((course) => course.lessons),
  WEBSITE_LESSON,
];

export type PlatformItem = {
  slug: string;
  name: Bi;
  group: "community" | "video" | "feed";
  blurb: Bi;
  tint: string;
  topics: Bi[];
};

export const PLATFORM_GROUPS: { id: PlatformItem["group"]; title: Bi }[] = [
  { id: "community", title: bi("کانال‌محور و جامعه‌ساز", "Community platforms") },
  { id: "video", title: bi("ویدئومحور و سئو", "Video and SEO") },
  { id: "feed", title: bi("فید، اکسپلور و شبکه", "Feed, explore, and network") },
];

export const PLATFORMS: PlatformItem[] = [
  {
    slug: "telegram",
    name: bi("تلگرام", "Telegram"),
    group: "community",
    tint: "#38bdf8",
    blurb: bi("کانال، گروه و بات؛ جایی که پیام عمیق خوانده می‌شود.", "Channels, groups, and bots — where a longer message still gets read."),
    topics: [
      bi("ساختار بایو و پیام پین‌شده", "Bio and pinned message"),
      bi("استراتژی محتوای چندرسانه‌ای", "Multimedia content strategy"),
      bi("بات‌های خودکار", "Automation bots"),
      bi("فرمت‌بندی متنی", "Text formatting"),
      bi("تاپیک‌های گروهی", "Group topics"),
      bi("جذب مخاطب بیرونی و تبادلات", "Outside growth and collaborations"),
    ],
  },
  {
    slug: "eitaa",
    name: bi("ایتا", "Eitaa"),
    group: "community",
    tint: "#f59e0b",
    blurb: bi("زبان بومی، فروش مستقیم و مخاطب داخلی.", "Local language, direct sales, and a domestic audience."),
    topics: [
      bi("ساخت کانال و پیوند اختصاصی", "Channel and custom link"),
      bi("زبان محتوای بومی", "Local content language"),
      bi("فروش مستقیم", "Direct sales"),
      bi("تب‌های موضوعی", "Topic tabs"),
      bi("جذب مخاطب داخلی", "Domestic audience growth"),
    ],
  },
  {
    slug: "bale",
    name: bi("بله", "Bale"),
    group: "community",
    tint: "#22c55e",
    blurb: bi("فروشگاه کانال و پرداخت داخل برنامه.", "A channel store and in-app payment."),
    topics: [
      bi("فروشگاه متصل به کانال", "Store attached to the channel"),
      bi("پرداخت درون‌برنامه‌ای", "In-app payments"),
      bi("تعامل در وضعیت", "Status interactions"),
      bi("جذب با محتوای کاربردی", "Growth through useful content"),
    ],
  },
  {
    slug: "rubika",
    name: bi("روبیکا، کانال", "Rubika channels"),
    group: "community",
    tint: "#a855f7",
    blurb: bi("ترافیک، دانلود و پل از روبینو به کانال.", "Traffic, downloads, and the bridge from Rubino into the channel."),
    topics: [
      bi("ساختاربندی کانال", "Channel structure"),
      bi("درآمد از ترافیک و دانلود", "Revenue from traffic and downloads"),
      bi("انتشار محتوای پرحجم", "Publishing heavier files"),
      bi("هدایت از روبینو به کانال", "Moving people from Rubino to the channel"),
    ],
  },
  {
    slug: "whatsapp",
    name: bi("واتساپ", "WhatsApp"),
    group: "community",
    tint: "#16a34a",
    blurb: bi("کانال رسمی و انجمن اعضا، با بالاترین نرخ باز شدن.", "Official channel and member community, with the highest open rate."),
    topics: [
      bi("راه‌اندازی کانال رسمی", "Launching the official channel"),
      bi("انجمن برای اعضای ویژه", "A community for members"),
      bi("اطلاعیه فوری", "Urgent announcements"),
      bi("لینک‌هایی که واقعاً باز می‌شوند", "Links that actually get opened"),
    ],
  },
  {
    slug: "youtube",
    name: bi("یوتیوب", "YouTube"),
    group: "video",
    tint: "#ef4444",
    blurb: bi("سئو، تامبنیل، واچ‌تایم و شورت.", "Search, thumbnails, watch time, and Shorts."),
    topics: [
      bi("راه‌اندازی کانال", "Channel setup"),
      bi("سئوی یوتیوب", "YouTube SEO"),
      bi("تامبنیل با نرخ کلیک بالا", "High-CTR thumbnails"),
      bi("بهینه‌سازی واچ‌تایم", "Watch-time optimization"),
      bi("شورت برای جذب مشترک", "Shorts for subscribers"),
      bi("سیستم درآمدزایی", "Monetization system"),
    ],
  },
  {
    slug: "aparat",
    name: bi("آپارات", "Aparat"),
    group: "video",
    tint: "#e11d48",
    blurb: bi("سئوی فارسی و درآمد نمایش.", "Persian search and view-based revenue."),
    topics: [
      bi("سئوی محلی در گوگل", "Local Google SEO"),
      bi("ساخت پلی‌لیست", "Playlists"),
      bi("برچسب و عنوان فارسی", "Persian tags and titles"),
      bi("درآمد از سیستم نمایش", "Revenue from the view system"),
    ],
  },
  {
    slug: "tiktok",
    name: bi("تیک‌تاک", "TikTok"),
    group: "video",
    tint: "#111827",
    blurb: bi("هوک، صدای ترند و صفحه For You.", "Hooks, trending audio, and the For You page."),
    topics: [
      bi("فرمت عمودی سریع", "Fast vertical format"),
      bi("موزیک و صدای ترند", "Trending music and sounds"),
      bi("هوک سه ثانیه اول", "The first-three-seconds hook"),
      bi("شرکت در چالش‌ها", "Joining challenges"),
      bi("الگوریتم صفحه For You", "For You page algorithm"),
    ],
  },
  {
    slug: "instagram",
    name: bi("اینستاگرام", "Instagram"),
    group: "feed",
    tint: "#db2777",
    blurb: bi("ریلز، اسلاید، استوری و تبدیل فالوور به مشتری.", "Reels, carousels, stories, and turning followers into clients."),
    topics: [
      bi("بهینه‌سازی پیج تجاری", "Business profile setup"),
      bi("الگوریتم ریلز", "Reels algorithm"),
      bi("پست‌های اسلایدی", "Carousel posts"),
      bi("سناریوی استوری تعاملی", "Interactive story scripts"),
      bi("قیف تبدیل فالوور به مشتری", "Follower-to-client funnel"),
    ],
  },
  {
    slug: "rubino",
    name: bi("روبینو", "Rubino"),
    group: "feed",
    tint: "#7c3aed",
    blurb: bi("ویترین روبیکا، هشتگ داخلی و ریلز.", "Rubika’s explore tab, local hashtags, and reels."),
    topics: [
      bi("ورود به تب ویترین", "Getting into the explore tab"),
      bi("هشتگ‌گذاری داخلی", "Internal hashtags"),
      bi("ریلزهای جذاب", "Reels worth stopping for"),
      bi("شبکه‌سازی با صفحات پربازدید", "Networking with high-reach pages"),
    ],
  },
  {
    slug: "linkedin",
    name: bi("لینکدین", "LinkedIn"),
    group: "feed",
    tint: "#2563eb",
    blurb: bi("پرونده کاری، مطالعه موردی و کاروسل متنی.", "A professional profile, case studies, and text carousels."),
    topics: [
      bi("پروفایل حرفه‌ای", "Professional profile"),
      bi("تجربه کاری و مطالعه موردی", "Experience and case studies"),
      bi("اسلاید متنی PDF", "PDF text carousels"),
      bi("تعامل تخصصی", "Specialist engagement"),
    ],
  },
  {
    slug: "threads",
    name: bi("تردز", "Threads"),
    group: "feed",
    tint: "#334155",
    blurb: bi("متن کوتاه، بحث و پل به اینستاگرام.", "Short text, debate, and a bridge back to Instagram."),
    topics: [
      bi("میکروبلاگ و متن ویروسی", "Microblogging and viral lines"),
      bi("مکالمه چالش‌برانگیز", "Conversations with tension"),
      bi("کامنت‌مارکتینگ", "Comment marketing"),
      bi("اتصال به اکوسیستم اینستاگرام", "Linking the Instagram ecosystem"),
    ],
  },
];

export const VIDEO_ENGINES = [
  { id: "runway", name: "Runway Gen-3", kind: "video" as const, cost: 50 },
  { id: "sora", name: "Sora", kind: "video" as const, cost: 50 },
  { id: "kling", name: "Kling AI", kind: "video" as const, cost: 50 },
  { id: "pika", name: "Pika", kind: "video" as const, cost: 50 },
  { id: "luma", name: "Luma", kind: "video" as const, cost: 50 },
  { id: "heygen", name: "HeyGen", kind: "avatar" as const, cost: 100 },
  { id: "did", name: "D-ID", kind: "avatar" as const, cost: 100 },
  { id: "opus", name: "Opus Clip", kind: "video" as const, cost: 50 },
  { id: "klap", name: "Klap", kind: "video" as const, cost: 50 },
];

export const IMAGE_ENGINES = [
  { id: "mj", name: "Midjourney", cost: 10 },
  { id: "flux", name: "Flux", cost: 10 },
  { id: "dalle", name: "DALL·E 3", cost: 10 },
];

export const AUDIO_ENGINES = [
  { id: "eleven", name: "ElevenLabs", kind: "voice" as const, cost: 15 },
  { id: "adobe", name: "Adobe Podcast", kind: "voice" as const, cost: 15 },
  { id: "suno", name: "Suno AI", kind: "voice" as const, cost: 15 },
  { id: "udio", name: "Udio", kind: "voice" as const, cost: 15 },
];

export const RATIOS = [
  { id: "16:9", label: bi("کاور ۱۶:۹ یوتیوب و آپارات", "16:9 YouTube and Aparat cover") },
  { id: "9:16", label: bi("کاور ۹:۱۶ با محدوده امن", "9:16 cover with a safe zone") },
  { id: "banner", label: bi("بنر تلگرام و هدر لینکدین", "Telegram banner and LinkedIn header") },
];

export const QA_THREADS: {
  id: string;
  tag: QaTag;
  author: string;
  title: Bi;
  body: Bi;
  votes: number;
  answers: { author: string; body: Bi; accepted?: boolean; mentor?: boolean }[];
}[] = [
  {
    id: "q1",
    tag: "edu",
    author: "سارا کیانی",
    title: bi("قبل از نام برند باید نیچ را قفل کنم؟", "Should I lock the niche before the brand name?"),
    body: bi("دو حوزه دارم و می‌ترسم نام، دستم را ببندد.", "I have two fields and I am afraid the name will trap me."),
    votes: 28,
    answers: [
      {
        author: "مهدی کاظمی",
        mentor: true,
        accepted: true,
        body: bi(
          "اول جمله نیچ را بنویس: خدمت، قشر، نتیجه. بعد نامی بساز که به نتیجه اشاره کند نه به همه خدمات ممکن. نام گسترده، پیدا نمی‌شود.",
          "Write the niche sentence first: service, audience, result. Then pick a name that points at the result, not at every possible service. A broad name is hard to find."
        ),
      },
    ],
  },
  {
    id: "q2",
    tag: "tech",
    author: "رضا نعمتی",
    title: bi("توکن ویدیو چرا این‌قدر سریع کم می‌شود؟", "Why do video tokens drop so fast?"),
    body: bi("یک تست آواتار زدم و بخش بزرگی از اعتبار ماه رفت.", "One avatar test spent a large part of the month’s credit."),
    votes: 19,
    answers: [
      {
        author: "پشتیبان هوشمند",
        accepted: true,
        body: bi(
          "آواتار سخنگو ۱۰۰ توکن برای هر ۳۰ ثانیه است و ویدیو ۵۰ توکن برای هر ۵ ثانیه. اول با متن و استوری‌بورد جمع‌بندی کن، بعد رندر نهایی را بزن.",
          "A talking avatar is 100 tokens per 30 seconds, and video is 50 tokens per 5 seconds. Settle the script and storyboard first, then render."
        ),
      },
    ],
  },
  {
    id: "q3",
    tag: "tools",
    author: "الناز فرهمند",
    title: bi("برای کاور آپارات فلانکس بهتر است یا میدجرنی؟", "Flux or Midjourney for an Aparat cover?"),
    body: bi("عنوان فارسی باید درشت بماند و چهره مصنوعی نشود.", "The Persian title has to stay large, and the face should not look synthetic."),
    votes: 14,
    answers: [
      {
        author: "هستی مرادی",
        body: bi(
          "تصویر را با موتور بساز، متن را بعداً در لایه جدا بگذار. عنوان را به خود مدل نسپار؛ کنتراست و محدوده امن را خودت چک کن.",
          "Generate the image, then set the type on a separate layer. Do not leave the title to the model. Check contrast and the safe zone yourself."
        ),
      },
    ],
  },
  {
    id: "q4",
    tag: "edu",
    author: "پارسا احمدی",
    title: bi("مشتری روی قیمت پکیج محبوب ایستاده. چه بگویم؟", "The client is stuck on the popular package price. What do I say?"),
    body: bi("نمی‌خواهم همان اول تخفیف بدهم.", "I do not want to discount on the first push."),
    votes: 33,
    answers: [
      {
        author: "مهدی کاظمی",
        mentor: true,
        accepted: true,
        body: bi(
          "بگو تفاوت پکیج در حجم خروجی است نه در تعارف. اگر بودجه کمتر است، پکیج پایه را با همان کیفیت و دامنه کوچک‌تر پیشنهاد بده. تخفیف بدون کم کردن دامنه، ارزش را خالی می‌کند.",
          "Say the difference is the size of the outcome, not a courtesy discount. If the budget is smaller, offer the base package with the same quality and a smaller scope. A discount without a smaller scope empties the value."
        ),
      },
    ],
  },
  {
    id: "q5",
    tag: "tools",
    author: "مریم داوودی",
    title: bi("بنر متوسط چه پیش‌نیازی می‌خواهد؟", "What does a medium banner require?"),
    body: bi("می‌خواهم کافه‌ام را در بیزنس من نشان بدهم.", "I want to show my café on My Business."),
    votes: 11,
    answers: [
      {
        author: "تیم تأیید",
        accepted: true,
        body: bi(
          "بنر متوسط: حداقل ۶ مرحله بیزنس‌ساز و نمونه‌کار تأییدشده. تا قبل از تأیید کارشناس مبلغی گرفته نمی‌شود.",
          "A medium banner needs at least 6 business-builder steps and an approved portfolio. Nothing is charged before a reviewer approves it."
        ),
      },
    ],
  },
];

export const ARTICLES: {
  slug: string;
  title: Bi;
  excerpt: Bi;
  minutes: number;
  tag: Bi;
  body: Bi[];
}[] = [
  {
    slug: "scattered-tools",
    title: bi("چرا ابزارها پراکنده، کسب‌وکار را گران می‌کنند", "Why scattered tools make a business expensive"),
    excerpt: bi("اشتراک دلاری جدا برای متن، تصویر، صدا و استراتژی، مسئله اصلی تازه‌کارهاست.", "Separate subscriptions for text, image, audio, and strategy are the real beginner tax."),
    minutes: 4,
    tag: bi("محصول", "Product"),
    body: [
      bi("کسی که تازه می‌خواهد خدمتش را بفروشد، هم‌زمان باید ایده را بسنجد، نام انتخاب کند، قیمت بگذارد و محتوا بسازد. اگر هر کدام در یک ابزار جدا باشد، انرژی صرف جابه‌جایی می‌شود نه تصمیم.", "Someone launching a service has to test the idea, name it, price it, and make content at the same time. When each job lives in a different tool, energy goes to switching, not deciding."),
      bi("کسب‌وکارساز هوشمند این مسیر را در یک داشبورد جمع می‌کند: آموزش کوتاه، ابزار همان مرحله، و منتوری که خروجی را رد یا قبول می‌کند.", "AI Business OS keeps that path in one dashboard: a short lesson, the tool for that step, and a mentor who can accept or return the work."),
      bi("توکن فقط برای خروجی پردازشی است. تماشای درس و پر کردن چک‌لیست اعتبار کم نمی‌کند.", "Tokens pay for generated output. Watching a lesson or ticking a checklist does not spend credit."),
    ],
  },
  {
    slug: "fifty-rule",
    title: bi("قانون ۵۰/۳۰/۲۰ برای کار یک‌نفره", "The 50/30/20 rule for a one-person business"),
    excerpt: bi("اگر دستمزد خودت در بودجه نباشد، رشد فقط ظاهر دارد.", "If your own pay is missing from the budget, growth is only a costume."),
    minutes: 3,
    tag: bi("مالی", "Finance"),
    body: [
      bi("پنجاه درصد بودجه در دسترس برای هزینه‌های عملیاتی است: ابزار، تبلیغ، اینترنت. سی درصد دستمزد خودت. بیست درصد برای توسعه و ذخیره.", "Fifty percent of the available budget is operations: tools, ads, connectivity. Thirty percent is your pay. Twenty percent is growth and reserve."),
      bi("هزینه راه‌اندازی مثل لوگو و آموزش یک‌بار است. اشتراک و تبلیغ هر ماه برمی‌گردد. این دو را قاطی نکن.", "Startup costs such as a logo or a course happen once. Subscriptions and ads return every month. Do not mix them."),
      bi("ماشین‌حساب مرحله چهارم همین تفکیک را با عدد خودت نشان می‌دهد.", "The calculator in step four shows that split with your own numbers."),
    ],
  },
  {
    slug: "niche-sentence",
    title: bi("جمله نیچ، کوتاه‌تر از یک بیو", "A niche sentence, shorter than a bio"),
    excerpt: bi("ارائه یک خدمت مشخص برای یک قشر مشخص تا یک نتیجه مشخص.", "A specific service, for a specific group, toward a specific result."),
    minutes: 3,
    tag: bi("استراتژی", "Strategy"),
    body: [
      bi("«تولید محتوا برای همه» یک خدمت نیست. یک ابهام است. جمله درست سه جای خالی دارد: چه چیزی، برای چه کسی، به چه نتیجه‌ای.", "“Content for everyone” is not a service. It is a fog. The useful sentence has three blanks: what, for whom, and toward which result."),
      bi("اصطکاک بازار را از شکایت واقعی بردار: تأخیر، قیمت نامعلوم، ادیت غیرواقعی، بی‌پاسخی بعد از تحویل.", "Take market friction from real complaints: delay, unclear price, unreal edits, silence after delivery."),
      bi("قبل از سایت و لوگو، همان پیشنهاد را با سه نفر آزمایش کن و در ازای کار، بازخورد و توصیه‌نامه بگیر.", "Before the site and the logo, test that offer with three people and trade the work for feedback and a testimonial."),
    ],
  },
  {
    slug: "funnel",
    title: bi("قیف فروش از آموزش تا دایرکت", "A sales funnel from education to the inbox"),
    excerpt: bi("آموزش جذب می‌کند، نمونه‌کار اعتماد می‌سازد، پیشنهاد مستقیم معامله را می‌بندد.", "Education attracts, proof builds trust, and a direct offer closes."),
    minutes: 4,
    tag: bi("فروش", "Sales"),
    body: [
      bi("مرحله جذب نباید تعرفه باشد. یک نکته کاربردی است که مخاطب همان روز بتواند استفاده کند.", "The attraction step should not be a rate card. It is a useful point the audience can use the same day."),
      bi("اعتماد با نمونه‌کار و توضیح فرآیند ساخته می‌شود، نه با صفت‌های درشت.", "Trust comes from the portfolio and the process, not from oversized adjectives."),
      bi("فروش در دایرکت یا صفحه پیشنهاد اتفاق می‌افتد: سه پکیج، یک پیشنهاد پیش‌فرض، و یک متن آماده برای وقتی که بحث قیمت شروع می‌شود.", "The sale happens in the inbox or on the offer page: three packages, one default, and a script ready for the moment price becomes the topic."),
    ],
  },
];

export const SERVICES: { title: Bi; body: Bi }[] = [
  { title: bi("بیزنس‌ساز یازده‌مرحله‌ای", "Eleven-step business builder"), body: bi("از ایده خام تا پرسونا، با درس و ابزار هر مرحله.", "From a raw idea to a persona, with a lesson and a tool at every step.") },
  { title: bi("سوشال مدیا", "Social media"), body: bi("دوازده پلتفرم، تقویم، و استودیوی ویدیو، تصویر و صدا.", "Twelve platforms, a calendar, and studios for video, image, and audio.") },
  { title: bi("آموزش فروش و برند", "Sales and brand academy"), body: bi("درس کوتاه و بلافاصله یک خروجی با هوش مصنوعی.", "A short lesson, then an output made with AI.") },
  { title: bi("منتور انسانی", "Human mentor"), body: bi("چت و تماس هفتگی، با تعهد پاسخ زیر دو ساعت.", "Weekly calls and chat, with a response promise under two hours.") },
  { title: bi("بیزنس من", "My Business"), body: bi("ویترین بنر برای کسب‌وکارهایی که مرحله و هویت‌شان تأیید شده.", "A banner board for businesses whose steps and identity are approved.") },
  { title: bi("سایت‌ساز", "Website builder"), body: bi("فاز بعد: قالب PWA، درگاه و هماهنگی با وردپرس.", "Next phase: PWA templates, payments, and WordPress.") },
];

export const ROADMAP: { when: Bi; body: Bi }[] = [
  { when: bi("ماه‌های ۱ تا ۳", "Months 1–3"), body: bi("نسخه اول PWA، بیزنس‌ساز، تولید محتوا، اشتراک و چت زیر دو ساعت.", "PWA v1, the business builder, content tools, plans, and chat under two hours.") },
  { when: bi("ماه‌های ۴ تا ۶", "Months 4–6"), body: bi("بورد بیزنس من، استوری نتیجه کاربران و تنظیم مصرف توکن.", "The My Business board, user result stories, and token tuning.") },
  { when: bi("ماه‌های ۷ تا ۹", "Months 7–9"), body: bi("سایت‌ساز و بسته سئو.", "The website builder and an SEO package.") },
  { when: bi("ماه‌های ۱۰ تا ۱۲", "Months 10–12"), body: bi("زیرساخت زبان و پرداخت برای کاربران بیرون از ایران.", "Language and payment infrastructure for users outside Iran.") },
];

export const QA_TAGS: { id: "all" | QaTag; label: Bi }[] = [
  { id: "all", label: bi("همه", "All") },
  { id: "edu", label: bi("آموزشی", "Learning") },
  { id: "tech", label: bi("فنی", "Technical") },
  { id: "tools", label: bi("ابزارها", "Tools") },
];

export const WEEK_DAYS: Bi[] = [
  bi("شنبه", "Sat"),
  bi("یکشنبه", "Sun"),
  bi("دوشنبه", "Mon"),
  bi("سه‌شنبه", "Tue"),
  bi("چهارشنبه", "Wed"),
  bi("پنجشنبه", "Thu"),
  bi("جمعه", "Fri"),
];

export const MENTOR = {
  name: bi("مهدی کاظمی", "Mehdi Kazemi"),
  role: bi("کارشناس اختصاصی کسب‌وکار", "Dedicated business mentor"),
};
