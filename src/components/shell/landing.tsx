"use client";

import { ArrowLeft, ArrowRight, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useApp, useT } from "@/lib/store";
import type { Intake, IntakeAnswer } from "@/lib/types";
import { digits } from "@/lib/text";
import { cn } from "@/lib/utils";

const QUESTIONS: { title: { fa: string; en: string }; hint: { fa: string; en: string }; options: { fa: string; en: string }[] }[] = [
  {
    hint: { fa: "جایگاه الان", en: "Where you are" },
    title: { fa: "وضعیت فعلی شما چیست؟", en: "Where are you right now?" },
    options: [
      { fa: "تازه در ابتدای راه هستم و به دنبال یک نقشه راه اصولی برای شروع هستم.", en: "I am just starting and want a clear map." },
      { fa: "کسب‌وکار دارم، اما در زمینه رشد، فروش و جذب مشتری ثابت مانده‌ام.", en: "I have a business, but growth, sales, and customers have stalled." },
      { fa: "ادمین یا تولیدکننده محتوا هستم و می‌خواهم سرعت و کیفیت کارهایم را چندین برابر کنم.", en: "I make content and want much more speed and quality." },
      { fa: "صاحب یک کسب‌وکار مستقر هستم و به دنبال سیستم‌سازی و استفاده از هوش مصنوعی برای کاهش هزینه‌ها هستم.", en: "I run an established business and want systems and AI to cut cost." },
    ],
  },
  {
    hint: { fa: "مانع درآمد", en: "What blocks income" },
    title: { fa: "بزرگ‌ترین مانع فعلی شما برای رسیدن به درآمد بیشتر چیست؟", en: "What is the biggest block to more income?" },
    options: [
      { fa: "ندانستن مراحل دقیق و سردرگمی در مسیر راه‌اندازی.", en: "I do not know the exact steps and feel lost at launch." },
      { fa: "ضعف در برندسازی و دیده نشدن در شبکه‌های اجتماعی.", en: "Weak branding, and I am not seen on social networks." },
      { fa: "کمبود زمان و هزینه بالا برای تولید محتوای جذاب.", en: "Too little time, and attractive content costs too much." },
      { fa: "نداشتن استراتژی فروش و ناتوانی در تبدیل فالوور به مشتری.", en: "No sales strategy, so followers do not become customers." },
    ],
  },
  {
    hint: { fa: "نتیجه مطلوب", en: "The result you want" },
    title: { fa: "نتیجه ایده‌آل شما بعد از استفاده از این پلتفرم چیست؟", en: "What result do you want from this platform?" },
    options: [
      { fa: "راه‌اندازی یک کسب‌وکار شخصی با سودآوری مستمر.", en: "A personal business with steady profit." },
      { fa: "رسیدن به جایگاه یک برند معتبر و شناخته‌شده در نیچ تخصصی خودم.", en: "A known brand inside my niche." },
      { fa: "مدیریت کامل و سریع تمام فرآیندهای تولید محتوا بدون خستگی.", en: "Fast, complete content production without burnout." },
      { fa: "رسیدن به اتوماسیون کامل کسب‌وکار با کمترین درگیری انسانی.", en: "A business that runs with very little manual work." },
    ],
  },
];

type Choice = IntakeAnswer["choice"] | "";

const emptyAnswers = (): { choice: Choice; note: string }[] =>
  QUESTIONS.map(() => ({ choice: "", note: "" }));

function toEnglishDigits(value: string) {
  return value.replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)));
}

function normalizePhone(value: string) {
  let digitsOnly = toEnglishDigits(value).replace(/[^\d]/g, "");
  if (digitsOnly.startsWith("0098")) digitsOnly = digitsOnly.slice(4);
  else if (digitsOnly.startsWith("98")) digitsOnly = digitsOnly.slice(2);
  else if (digitsOnly.startsWith("0")) digitsOnly = digitsOnly.slice(1);
  return digitsOnly;
}

export function Landing() {
  const { lang, setLang, intake, completeIntake, clearIntake, setAuthed } = useApp();
  const { t } = useT();
  const { setTheme } = useTheme();
  const [phase, setPhase] = useState<"hero" | "identity" | "questions">(intake ? "hero" : "hero");
  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [answers, setAnswers] = useState(emptyAnswers);
  const [error, setError] = useState("");

  const BackIcon = lang === "fa" ? ArrowRight : ArrowLeft;
  const NextIcon = lang === "fa" ? ArrowLeft : ArrowRight;
  const question = QUESTIONS[step];
  const current = answers[step];

  function submitIdentity() {
    if (firstName.trim().length < 2 || lastName.trim().length < 2) {
      setError(t("نام و نام خانوادگی را کامل بنویس.", "Enter your first and last name."));
      return;
    }
    if (!/^9\d{9}$/.test(normalizePhone(phone))) {
      setError(t("شماره موبایل را مثل ۰۹۱۲۳۴۵۶۷۸۹ بنویس.", "Enter a mobile number like 09123456789."));
      return;
    }
    if (code.trim().length < 3) {
      setError(t("کد اختصاصی خودت را وارد کن.", "Enter your personal code."));
      return;
    }
    setError("");
    setStep(0);
    setPhase("questions");
  }

  function submitQuestion() {
    if (!current?.choice) {
      setError(t("یک گزینه را انتخاب کن، یا توضیحات را بنویس.", "Choose an option, or write your own note."));
      return;
    }
    if (current.choice === "note" && current.note.trim().length < 3) {
      setError(t("در قسمت توضیحات بنویس چه چیزی مدنظرت است.", "Write what you mean in the note."));
      return;
    }
    setError("");
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
      return;
    }
    const mobile = normalizePhone(phone);
    const profile: Intake = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: `0${mobile}`,
      code: code.trim(),
      answers: answers.map((item) => ({
        choice: item.choice || "note",
        note: item.note.trim(),
      })),
    };
    completeIntake(profile);
  }

  return (
    <div className="relative min-h-dvh overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 start-[-4rem] size-80 rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="absolute top-1/3 end-[-6rem] size-96 rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute bottom-0 start-1/4 size-72 rounded-full bg-violet-500/15 blur-3xl" />
      </div>
      <header className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-4">
        <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/30">
          <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
            <path d="M5 16 12 4l7 12H5Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="12" cy="14" r="1.3" fill="#FBBF24" />
          </svg>
        </span>
        <span className="font-extrabold">{t("لیوشا", "Liosha")}</span>
        <div className="ms-auto flex items-center gap-1.5">
          <div className="flex items-center rounded-full border border-border bg-background/70 p-0.5 text-[11px] font-semibold">
            <button type="button" onClick={() => setLang("fa")} className={`rounded-full px-2 py-1 ${lang === "fa" ? "bg-primary text-primary-foreground" : ""}`}>
              فا
            </button>
            <button type="button" onClick={() => setLang("en")} className={`rounded-full px-2 py-1 ${lang === "en" ? "bg-primary text-primary-foreground" : ""}`}>
              EN
            </button>
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-9"
            aria-label={t("تغییر روشن و تیره", "Toggle color theme")}
            onClick={() => setTheme(document.documentElement.classList.contains("dark") ? "light" : "dark")}
          >
            <Sun className="hidden dark:block" />
            <Moon className="dark:hidden" />
          </Button>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-6xl gap-6 px-4 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:pt-6">
        <section className="pt-2 lg:pt-8">
          <p className="text-xs font-semibold tracking-wide text-indigo-600 dark:text-indigo-300">
            {t("میز کار ساخت کسب‌وکار", "The desk for building a business")}
          </p>
          <h1 className="mt-3 max-w-xl text-4xl font-extrabold leading-[1.25] sm:text-5xl">
            {t("قبل از میز کار، لیوشا تو را می‌شناسد.", "Liosha learns who you are before the desk opens.")}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-8 text-muted-foreground sm:text-base">
            {t(
              "صفحه اصلی قفل است. نام، شماره و کد اختصاصی‌ات را می‌نویسی، بعد سه سؤال کوتاه را جواب می‌دهی. اگر هیچ گزینه‌ای مال تو نبود، توضیحات خودت را بفرست.",
              "The desk stays closed until you add your name, phone, and personal code, then answer three short questions. If none of the choices fit, send your own note."
            )}
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[
              [t("نقشه راه", "A map"), t("از ایده تا اولین فروش، مرحله‌به‌مرحله.", "From idea to first sale, one step at a time.")],
              [t("محتوا", "Content"), t("تقویم، تصویر، ویدیو و صدا در یک استودیو.", "Calendar, image, video, and voice in one studio.")],
              [t("فروش", "Sales"), t("آموزش بستن فروش، بدون پراکنده کردن ابزار.", "Closing lessons, without a pile of separate tools.")],
            ].map(([title, body]) => (
              <li key={title} className="glass px-4 py-3">
                <p className="font-bold">{title}</p>
                <p className="mt-1 text-xs leading-6 text-muted-foreground">{body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="glass p-5 sm:p-6">
          {intake && phase === "hero" ? (
            <div className="space-y-4">
              <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-300">{t("خوش برگشتی", "Welcome back")}</p>
              <h2 className="text-2xl font-extrabold">
                {intake.firstName} {intake.lastName}
              </h2>
              <p className="text-sm leading-7 text-muted-foreground">
                {t("میز کار با همین مشخصات باز می‌شود.", "The desk opens with this profile.")}
              </p>
              <dl className="grid gap-2 text-sm">
                <div className="flex justify-between gap-3 rounded-2xl bg-muted/60 px-3 py-2">
                  <dt className="text-muted-foreground">{t("شماره", "Phone")}</dt>
                  <dd className="num font-semibold">{digits(intake.phone, lang)}</dd>
                </div>
                <div className="flex justify-between gap-3 rounded-2xl bg-muted/60 px-3 py-2">
                  <dt className="text-muted-foreground">{t("کد اختصاصی", "Personal code")}</dt>
                  <dd className="font-semibold">{intake.code}</dd>
                </div>
              </dl>
              <Button type="button" className="h-11 w-full" onClick={() => setAuthed(true)}>
                {t("ورود به میز کار", "Open the desk")}
              </Button>
              <button
                type="button"
                className="w-full text-center text-xs text-muted-foreground underline-offset-2 hover:underline"
                onClick={() => {
                  clearIntake();
                  setPhase("hero");
                  setAnswers(emptyAnswers());
                  setFirstName("");
                  setLastName("");
                  setPhone("");
                  setCode("");
                  setError("");
                }}
              >
                {t("شروع دوباره با مشخصات جدید", "Start again with a new profile")}
              </button>
            </div>
          ) : null}

          {!intake && phase === "hero" ? (
            <div className="space-y-4">
              <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-300">{t("ورود به لیوشا", "Enter Liosha")}</p>
              <h2 className="text-2xl font-extrabold leading-snug">
                {t("چهار چیز از تو می‌پرسیم، بعد میز کار باز می‌شود.", "Four details, then the desk opens.")}
              </h2>
              <ol className="space-y-2 text-sm leading-7 text-muted-foreground">
                <li>{t("۱. نام و نام خانوادگی", "1. First and last name")}</li>
                <li>{t("۲. شماره موبایل", "2. Mobile number")}</li>
                <li>{t("۳. کد اختصاصی خودت", "3. Your personal code")}</li>
                <li>{t("۴. سه سؤال کوتاه، یا توضیح آزاد", "4. Three short questions, or your own note")}</li>
              </ol>
              <Button type="button" className="h-11 w-full" onClick={() => setPhase("identity")}>
                {t("شروع", "Start")}
                <NextIcon />
              </Button>
            </div>
          ) : null}

          {phase === "identity" ? (
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                submitIdentity();
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-300">{t("مشخصات", "Profile")}</p>
                  <h2 className="text-xl font-extrabold">{t("خودت را معرفی کن", "Introduce yourself")}</h2>
                </div>
                <span className="num rounded-full bg-muted px-2 py-1 text-[11px]">{digits(1, lang)} / {digits(2, lang)}</span>
              </div>
              <label className="grid gap-1.5 text-sm">
                <span className="font-medium">{t("نام", "First name")}</span>
                <Input className="h-11" value={firstName} onChange={(event) => setFirstName(event.target.value)} autoComplete="given-name" />
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="font-medium">{t("نام خانوادگی", "Last name")}</span>
                <Input className="h-11" value={lastName} onChange={(event) => setLastName(event.target.value)} autoComplete="family-name" />
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="font-medium">{t("شماره موبایل", "Mobile number")}</span>
                <Input className="h-11" inputMode="tel" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" placeholder="09123456789" />
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="font-medium">{t("کد اختصاصی", "Personal code")}</span>
                <Input className="h-11" value={code} onChange={(event) => setCode(event.target.value)} autoComplete="off" placeholder={t("کدی که برای تو صادر شده", "The code issued for you")} />
              </label>
              {error ? <p className="text-sm text-destructive">{error}</p> : null}
              <div className="flex gap-2">
                <Button type="button" variant="outline" className="h-11" onClick={() => { setPhase("hero"); setError(""); }}>
                  <BackIcon />
                  {t("بازگشت", "Back")}
                </Button>
                <Button type="submit" className="h-11 flex-1">
                  {t("ادامه به سؤال‌ها", "Continue to the questions")}
                </Button>
              </div>
            </form>
          ) : null}

          {phase === "questions" && question && current ? (
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                submitQuestion();
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-300">
                  {t(question.hint.fa, question.hint.en)}
                </p>
                <span className="num rounded-full bg-muted px-2 py-1 text-[11px]">
                  {digits(step + 1, lang)} / {digits(QUESTIONS.length, lang)}
                </span>
              </div>
              <h2 className="text-xl font-extrabold leading-snug">{t(question.title.fa, question.title.en)}</h2>
              <div className="grid gap-2" role="radiogroup" aria-label={t(question.title.fa, question.title.en)}>
                {question.options.map((option, index) => {
                  const id = String(index + 1) as IntakeAnswer["choice"];
                  const selected = current.choice === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => {
                        setError("");
                        setAnswers((items) => items.map((item, itemIndex) => (itemIndex === step ? { ...item, choice: id } : item)));
                      }}
                      className={cn(
                        "rounded-2xl border px-3 py-3 text-start text-sm leading-7",
                        selected ? "border-indigo-400 bg-indigo-500/10" : "border-border hover:bg-muted/70"
                      )}
                    >
                      <span className="me-2 font-bold text-indigo-600 dark:text-indigo-300">{digits(index + 1, lang)}.</span>
                      {t(option.fa, option.en)}
                    </button>
                  );
                })}
                <button
                  type="button"
                  role="radio"
                  aria-checked={current.choice === "note"}
                  onClick={() => {
                    setError("");
                    setAnswers((items) => items.map((item, itemIndex) => (itemIndex === step ? { ...item, choice: "note" } : item)));
                  }}
                  className={cn(
                    "rounded-2xl border px-3 py-3 text-start text-sm font-semibold",
                    current.choice === "note" ? "border-fuchsia-400 bg-fuchsia-500/10" : "border-border hover:bg-muted/70"
                  )}
                >
                  {t("توضیحات", "Write my own note")}
                </button>
              </div>
              {current.choice === "note" ? (
                <label className="grid gap-1.5 text-sm">
                  <span className="font-medium">{t("اگر چیز دیگری مدنظرت است بنویس", "Write anything else you want to send")}</span>
                  <Textarea
                    className="min-h-28"
                    value={current.note}
                    onChange={(event) =>
                      setAnswers((items) => items.map((item, itemIndex) => (itemIndex === step ? { ...item, note: event.target.value } : item)))
                    }
                  />
                </label>
              ) : null}
              {error ? <p className="text-sm text-destructive">{error}</p> : null}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11"
                  onClick={() => {
                    setError("");
                    if (step === 0) setPhase("identity");
                    else setStep(step - 1);
                  }}
                >
                  <BackIcon />
                  {t("بازگشت", "Back")}
                </Button>
                <Button type="submit" className="h-11 flex-1">
                  {step === QUESTIONS.length - 1 ? t("ورود به میز کار", "Open the desk") : t("سؤال بعدی", "Next question")}
                </Button>
              </div>
            </form>
          ) : null}
        </section>
      </main>
    </div>
  );
}
