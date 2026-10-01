import { hashString, type Lang } from "@/lib/text";
import type { NameIdea, Persona, Project } from "@/lib/types";

function clip(text: string, size = 90) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > size ? `${clean.slice(0, size)}…` : clean;
}

export function critiqueIdea(idea: string, lang: Lang) {
  const heard = clip(idea || (lang === "fa" ? "ایده‌ای که هنوز مبهم است" : "an idea that is still foggy"), 110);
  if (lang === "fa") {
    return {
      reply: `ایده را این‌طور شنیدم: «${heard}».\n\nنقطه کور اول: هنوز معلوم نیست مشتری برای چه نتیجه‌ای پول می‌دهد، نه برای چه فعالیتی.\nنقطه کور دوم: اگر سه نفر دیگر هم همین را بگویند، دلیل انتخاب تو چیست؟\nنقطه کور سوم: مسیر رسیدن به سه مشتری آزمایشی، بدون بودجه سنگین تبلیغ، نوشته نشده.\n\nهدف شفاف: تا ۳۰ روز آینده یک پیشنهاد مشخص را به یک قشر محدود بده و از سه نفر بازخورد صادقانه یا توصیه‌نامه بگیر.`,
      goal: "تا ۳۰ روز آینده یک پیشنهاد مشخص را برای یک قشر محدود اجرا کن و از سه نفر بازخورد یا توصیه‌نامه بگیر.",
    };
  }
  return {
    reply: `Here is what I heard: “${heard}”.\n\nBlind spot 1: it is still unclear which result the client pays for, rather than which activity you perform.\nBlind spot 2: if three other people claim the same thing, why would someone pick you?\nBlind spot 3: there is no path to three trial clients that does not depend on a large ad budget.\n\nClear goal: within 30 days, deliver one specific offer to a narrow group and collect honest feedback or a testimonial from three people.`,
    goal: "Within 30 days, deliver one specific offer to a narrow group and collect feedback or a testimonial from three people.",
  };
}

export function suggestCanvas(project: Project, lang: Lang) {
  const service = project.niche.service.trim() || (lang === "fa" ? "این خدمت" : "this service");
  const audience = project.niche.audience.trim() || (lang === "fa" ? "یک قشر مشخص" : "a specific group");
  const outcome = project.niche.outcome.trim() || (lang === "fa" ? "یک نتیجه قابل نشان دادن" : "a result you can show");
  if (lang === "fa") {
    return {
      value: `${service} برای ${audience} که به ${outcome} می‌رسد؛ با قیمت معلوم و تحویل زمان‌دار.`,
      channels: "آموزش کوتاه در یک پلتفرم اصلی، نمونه‌کار در استوری، و پیشنهاد مستقیم در دایرکت یا کانال.",
      customers: `${audience}؛ بودجه‌ای که برای نتیجه مشخص کنار گذاشته، نه برای «هر جور محتوا».`,
    };
  }
  return {
    value: `${service} for ${audience}, aimed at ${outcome}, with a visible price and a dated delivery.`,
    channels: "A short lesson on one main platform, proof in stories, and a direct offer in the inbox or channel.",
    customers: `${audience}; people who have set money aside for a defined result, not for “some content”.`,
  };
}

export function answerConcern(topic: string, context: string, goal: string, lang: Lang) {
  const t = clip(topic, 80);
  const c = clip(context, 140);
  const g = clip(goal, 80);
  if (lang === "fa") {
    return `موضوع: ${t}\nزمینه: ${c || "زمینه کوتاه بود؛ با همین حد جواب می‌دهم."}\nهدف خواسته‌شده: ${g || "یک متن قابل ارسال."}\n\nپاسخ پیشنهادی:\n«ممنون که رک گفتید. تفاوت این پیشنهاد در دامنه خروجی است، نه در تعارف قیمت. اگر بودجه محدودتر است، همان کیفیت را در پکیج کوچک‌تر می‌دهم تا نتیجه خراب نشود. کدام بخش خروجی برایتان ضروری است؟»\n\nاستراتژی: تخفیف نده مگر دامنه کار کم شود. سؤال آخر را باز بگذار تا مشتری انتخاب کند، نه اینکه مکالمه ببندد.`;
  }
  return `Topic: ${t}\nContext: ${c || "The context was short, so this stays specific but compact."}\nAsked outcome: ${g || "A message you can send."}\n\nSuggested reply:\n“Thank you for saying it plainly. The difference in this offer is the scope of the result, not a courtesy on the price. If the budget is tighter, I can keep the same quality in a smaller package so the result does not collapse. Which part of the output is essential for you?”\n\nStrategy: do not discount unless the scope shrinks. Leave the last question open so the client chooses, instead of ending the conversation.`;
}

export function supportReply(agent: "guide" | "summary" | "debug", text: string, lang: Lang) {
  const heard = clip(text, 140);
  if (agent === "summary") {
    return lang === "fa"
      ? `خلاصه مسئله:\n۱. خواسته اصلی: ${heard}\n۲. مانع احتمالی: خروجی مرحله قبل هنوز به یک جمله قابل تصمیم تبدیل نشده.\n۳. قدم بعدی: همان مرحله را در بیزنس‌ساز باز کن و فقط یک فیلد را تا آخر پر کن.`
      : `Issue summary:\n1. Main ask: ${heard}\n2. Likely blocker: the previous step is not yet a sentence you can decide with.\n3. Next move: reopen that step in the business builder and finish one field completely.`;
  }
  if (agent === "debug") {
    return lang === "fa"
      ? `بررسی سریع:\n- اگر دکمه تولید خاموش است، موجودی توکن را ببین. آواتار ۱۰۰ و ویدیو ۵۰ توکن برمی‌دارد.\n- اگر بنر ثبت نمی‌شود، تعداد مراحل پروژه فعال و سطح احراز هویت را با شرط همان اندازه مقایسه کن.\n- تا قبل از تأیید کارشناس، مبلغ بنر کم نمی‌شود.\nشرح تو: ${heard}`
      : `Quick check:\n- If generate is blocked, look at the token balance. Avatars cost 100 and video costs 50.\n- If a banner will not submit, compare the active project’s finished steps and identity level with that size’s rule.\n- Banner money is not taken before a reviewer approves it.\nYour note: ${heard}`;
  }
  return lang === "fa"
    ? `راهنمای گام‌به‌گام برای «${heard}»:\n۱. پروژه فعال را در «کار من» انتخاب کن.\n۲. وارد بیزنس‌ساز شو و اولین مرحله ناتمام را باز کن.\n۳. درس همان مرحله را تا پایان پخش کن.\n۴. ابزار زیر ویدیو را پر کن و خروجی را ذخیره کن.\n۵. اگر وسط کار گیر کردی، همین متن را برای منتور انسانی هم بفرست تا زیر دو ساعت جواب مشخص بگیری.`
    : `Steps for “${heard}”:\n1. Choose the active project in My work.\n2. Open the business builder and expand the first unfinished step.\n3. Play that step’s lesson through.\n4. Fill the tool under the video.\n5. If you stall, send the same note to the human mentor and expect a concrete reply inside two hours.`;
}

export function mentorReply(text: string, lang: Lang) {
  const heard = clip(text, 120);
  return lang === "fa"
    ? `مهدی کاظمی: «${heard}» را دیدم. قبل از جواب بلند، این را انجام بده: خروجی را در یک جمله بنویس و بگو مشتری با دیدنش چه تصمیمی می‌گیرد. همان جمله را همین‌جا بفرست تا متن نهایی را برایت تنظیم کنم. زمان پاسخ این گفتگو داخل تعهد زیر دو ساعت است.`
    : `Mehdi Kazemi: I saw “${heard}”. Before a long answer, do this: write the output in one sentence and say what decision the client makes after seeing it. Send that sentence here and I will shape the final wording. This thread sits inside the under-two-hour promise.`;
}

export function lessonOutput(title: string, prompt: string, lang: Lang) {
  const p = clip(prompt, 160);
  if (lang === "fa") {
    return `خروجی عملی درس «${title}»\n\nبر اساس توضیح تو: ${p}\n\nنسخه قابل استفاده:\n- جمله اصلی: یک نتیجه مشخص برای یک مخاطب مشخص، با زمان تحویل.\n- دلیل باور: یک نمونه‌کار یا یک مشاهده واقعی، نه صفت تبلیغاتی.\n- دعوت: «اگر این خروجی را برای کار خودتان می‌خواهید، بنویسید کدام بخشش ضروری است.»\n\nاین متن را می‌توانی به پروژه فعال بچسبانی و در قیف یا پکیج استفاده کنی.`;
  }
  return `Practical output for “${title}”\n\nBased on your note: ${p}\n\nUsable version:\n- Core line: one defined result for one defined audience, with a delivery time.\n- Reason to believe: one portfolio piece or one real observation, not an advertising adjective.\n- Invitation: “If you want this output for your own work, tell me which part is essential.”\n\nYou can attach this to the active project and use it in the funnel or the offer.`;
}

function syllablesOf(name: string) {
  const vowels = name.match(/[اآویوؤئَُِaeiouy]/gi);
  const count = vowels?.length ?? 1;
  return Math.max(1, Math.min(5, count));
}

function handleOf(name: string) {
  const latin = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (latin.length >= 3) return latin.slice(0, 16);
  return `brand${hashString(name) % 90 + 10}`;
}

export function generateNames(keywords: string, lang: Lang): NameIdea[] {
  const raw = keywords.trim();
  const first = raw.split(/[\s,،]+/).filter(Boolean)[0] || (lang === "fa" ? "نو" : "nova");
  const faBits = ["آوا", "هوم", "ویو", "فام", "رایا", "نِگار", "لاب", "کیا"];
  const enBits = ["ora", "haus", "ly", "lab", "kit", "studio", "andco", "wave"];
  const bits = lang === "fa" ? faBits : enBits;
  const crafted = bits.slice(0, 6).map((bit, index) => {
    const name = lang === "fa" ? `${first}${index % 2 === 0 ? "" : " "}${bit}` : `${first}${bit}`;
    const syllables = syllablesOf(name);
    const handle = handleOf(`${first}${bit}${index}`);
    return {
      name: name.replace(/\s+/g, lang === "fa" ? "‌" : ""),
      handle,
      syllables,
      ease: syllables <= 2 ? 5 : syllables === 3 ? 4 : 2,
      ir: hashString(`${name}.ir`) % 4 !== 0,
      com: hashString(`${name}.com`) % 3 !== 0,
      ig: hashString(`@${handle}`) % 5 !== 0,
    };
  });
  return crafted;
}

export function calendarReport(pillars: string[], slotCount: number, lang: Lang) {
  const filled = pillars.filter((p) => p.trim()).length;
  if (lang === "fa") {
    return `ارزیابی هوش مصنوعی:\nستون‌های پرشده: ${filled} از ۴. اسلات‌های هفته: ${slotCount}.\nواچ‌تایم احتمالی وقتی هر ستون یک وعده مشخص دارد بالاتر است. اگر بیشتر از نصف اسلات‌ها فروش مستقیم باشد، آموزش را زیاد کن.\nکلمات قابل آزمون این هفته را از خود ستون‌ها بردار، نه از هشتگ‌های کلی.`;
  }
  return `AI review:\nPillars filled: ${filled} of 4. Weekly slots: ${slotCount}.\nWatch time is more likely when each pillar makes one promise. If more than half the slots are direct sales, add education.\nTest words taken from the pillars themselves, not from generic hashtags.`;
}

export function videoBoard(prompt: string, engine: string, lang: Lang) {
  const p = clip(prompt, 120);
  if (lang === "fa") {
    return `استوری‌بورد ${engine}\nصحنه ۱ (۰–۳ ثانیه): هوک تصویری روی «${p}». حرکت سریع، بدون مقدمه لوگو.\nصحنه ۲: نشان دادن نتیجه، نه فرآیند طولانی.\nصحنه ۳: یک جمله دعوت و نام برند.\nزیرنویس درشت در محدوده امن ۹:۱۶ پیشنهاد می‌شود. این پیش‌نمایش است؛ رندر نهایی در نسخه متصل به موتور انجام می‌شود.`;
  }
  return `${engine} storyboard\nScene 1 (0–3s): a visual hook on “${p}”. Fast, no logo intro.\nScene 2: show the result, not a long process.\nScene 3: one invitation line and the brand name.\nLarge captions inside the 9:16 safe zone. This is a preview; the final render happens when the engine is connected.`;
}

export function imagePrompt(topic: string, ratio: string, colors: string, engine: string, lang: Lang) {
  const t = clip(topic, 80);
  if (lang === "fa") {
    return `پرامپت ${engine} برای ${ratio}:\n${t}، نور طبیعی، چهره واقعی و بدون پوست پلاستیکی، ترکیب خلوت، فضای منفی برای عنوان فارسی، پالت ${colors}، بدون متن داخل تصویر، جزئیات بافت پارچه و محیط، کیفیت تبلیغاتی.`;
  }
  return `${engine} prompt for ${ratio}:\n${t}, natural light, a real face without plastic skin, quiet composition, negative space for a title, palette ${colors}, no text inside the image, fabric and place texture, advertising quality.`;
}

export function voicePlan(script: string, engine: string, minutes: number, lang: Lang) {
  const s = clip(script, 100);
  if (lang === "fa") {
    return `طرح صدای ${engine} (${minutes} دقیقه):\nلحن آرام و مطمئن، مکث کوتاه بعد از جمله نتیجه.\nمتن: ${s}\nاگر ورودی از موبایل است، اول نویز را با Adobe Podcast بگیر و بعد کلون ElevenLabs را فقط برای نسخه نهایی استفاده کن. موزیک زمینه را از Suno یا Udio بدون کلام بساز.`;
  }
  return `${engine} voice plan (${minutes} min):\nCalm, sure tone, with a short pause after the result sentence.\nScript: ${s}\nIf the take is from a phone, remove noise with Adobe Podcast first and keep the ElevenLabs clone for the final version. Build a wordless bed in Suno or Udio.`;
}

export function personaCard(persona: Persona, lang: Lang) {
  if (lang === "fa") {
    return `${persona.name || "مخاطب"}، ${persona.age || "سن نامشخص"} ساله در ${persona.city || "شهر نامشخص"}، شغل: ${persona.job || "نامشخص"}.\nبودجه: ${persona.budget || "نامشخص"}. پلتفرم: ${persona.platform || "نامشخص"}.\nدغدغه: ${persona.pains || "هنوز نوشته نشده"}.\nلحن مؤثر: ${persona.tone || "هنوز انتخاب نشده"}.`;
  }
  return `${persona.name || "Audience"}, age ${persona.age || "unknown"}, in ${persona.city || "an unnamed city"}. Work: ${persona.job || "unknown"}.\nBudget: ${persona.budget || "unknown"}. Platform: ${persona.platform || "unknown"}.\nPain: ${persona.pains || "not written yet"}.\nTone that lands: ${persona.tone || "not chosen yet"}.`;
}

export function templateMessage(kind: "welcome" | "price", name: string, lang: Lang) {
  const brand = name || (lang === "fa" ? "برند" : "the brand");
  if (kind === "welcome") {
    return lang === "fa"
      ? `سلام، من ${brand} هستم. برای اینکه پیشنهاد دقیق باشد، سه چیز را بگویید: کارتان چیست، تا چه تاریخی لازم دارید، و نتیجه را کجا نشان می‌دهید؟`
      : `Hello, this is ${brand}. For a precise offer, tell me three things: what you do, the date you need it, and where the result will be shown.`;
  }
  return lang === "fa"
    ? `هزینه بر اساس خروجی است نه ساعت. سه سطح داریم: پایه، محبوب و ویژه. اگر بگویید نتیجه باید چه تصمیمی را برای مشتری شما بسازد، همان سطح را پیشنهاد می‌دهم.`
    : `The fee is based on the outcome, not the hours. There are three levels: base, popular, and signature. Tell me what decision this result should create for your client, and I will recommend the level.`;
}
