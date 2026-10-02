"use client";

import { ArrowLeft, ArrowRight, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import type { CountryCode } from "libphonenumber-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PhoneField } from "@/components/shell/phone-field";
import { useApp, useT } from "@/lib/store";
import { validatePhone } from "@/lib/phone";
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

const emptyAnswers = (): { choice: Choice; note: string }[] => QUESTIONS.map(() => ({ choice: "", note: "" }));

const LOCAL_NOTE = {
  fa: "حساب فقط روی همین دستگاه ذخیره می‌شود. سرور ورود وجود ندارد و رمز عبور گرفته یا ذخیره نمی‌شود.",
  en: "The account stays on this device. There is no sign-in server, and no password is asked for or stored.",
};

export function Landing() {
  const { lang, setLang, registerAccount, signIn } = useApp();
  const { t } = useT();
  const { setTheme } = useTheme();
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [phase, setPhase] = useState<"form" | "questions">("form");
  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState<CountryCode | "">("");
  const [national, setNational] = useState("");
  const [loginCountry, setLoginCountry] = useState<CountryCode | "">("");
  const [loginNational, setLoginNational] = useState("");
  const [code, setCode] = useState("");
  const [phoneE164, setPhoneE164] = useState("");
  const [answers, setAnswers] = useState(emptyAnswers);
  const [error, setError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const BackIcon = lang === "fa" ? ArrowRight : ArrowLeft;
  const NextIcon = lang === "fa" ? ArrowLeft : ArrowRight;
  const question = QUESTIONS[step];
  const current = answers[step];

  function openAuth(next: "login" | "signup") {
    setMode(next);
    setPhase("form");
    setError("");
    setCountryError("");
    setPhoneError("");
    document.getElementById("auth")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function submitLogin() {
    setCountryError("");
    setPhoneError("");
    if (!loginCountry) {
      setCountryError(t("اول کشور را انتخاب کن.", "Choose a country first."));
      return;
    }
    const checked = validatePhone(loginCountry, loginNational);
    if (!checked.ok) {
      setPhoneError(t("این شماره با کشور انتخاب‌شده جور نیست.", "This number does not match the selected country."));
      return;
    }
    if (!signIn(checked.e164)) {
      setPhoneError(t("حسابی با این شماره روی این دستگاه نیست. ثبت‌نام کن.", "No account with this number is stored on this device. Sign up."));
    }
  }

  function submitIdentity() {
    setError("");
    setCountryError("");
    setPhoneError("");
    if (firstName.trim().length < 2 || lastName.trim().length < 2) {
      setError(t("نام و نام خانوادگی را کامل بنویس.", "Enter your first and last name."));
      return;
    }
    if (!country) {
      setCountryError(t("اول کشور را انتخاب کن.", "Choose a country first."));
      return;
    }
    const checked = validatePhone(country, national);
    if (!checked.ok) {
      setPhoneError(t("این شماره با کشور انتخاب‌شده جور نیست.", "This number does not match the selected country."));
      return;
    }
    if (code.trim().length < 3) {
      setError(t("کد اختصاصی خودت را وارد کن.", "Enter your personal code."));
      return;
    }
    setPhoneE164(checked.e164);
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
    if (!country) return;
    const profile: Intake = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      country,
      phone: phoneE164,
      code: code.trim(),
      answers: answers.map((item) => ({
        choice: item.choice === "" ? "note" : item.choice,
        note: item.note.trim(),
      })),
    };
    if (!registerAccount(profile)) {
      setPhase("form");
      setPhoneError(t("این شماره قبلاً روی همین دستگاه ثبت شده. از ورود استفاده کن.", "This number is already registered on this device. Use sign in."));
    }
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
          <Button type="button" className="h-9" onClick={() => openAuth("signup")}>
            {t("ورود / ثبت‌نام", "Sign in / Sign up")}
          </Button>
          <div className="hidden items-center rounded-full border border-border bg-background/70 p-0.5 text-[11px] font-semibold sm:flex">
            <button type="button" onClick={() => setLang("fa")} className={`rounded-full px-2 py-1 ${lang === "fa" ? "bg-primary text-primary-foreground" : ""}`}>فا</button>
            <button type="button" onClick={() => setLang("en")} className={`rounded-full px-2 py-1 ${lang === "en" ? "bg-primary text-primary-foreground" : ""}`}>EN</button>
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
              "صفحه اصلی قفل است. با ورود یا ثبت‌نام، نام و شماره خودت را می‌نویسی. اگر حسابی روی همین دستگاه داشته باشی، همان اطلاعات بارگذاری می‌شود.",
              "The desk stays closed until you sign in or sign up. A profile saved on this device loads that same account."
            )}
          </p>
          <Button type="button" className="mt-5 h-11" onClick={() => openAuth("signup")}>
            {t("ورود / ثبت‌نام", "Sign in / Sign up")}
            <NextIcon />
          </Button>
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

        <section id="auth" className="glass scroll-mt-4 p-5 sm:p-6">
          {phase === "form" ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-1 rounded-full bg-muted p-1 text-sm font-semibold">
                <button type="button" className={cn("h-10 rounded-full", mode === "login" && "bg-background shadow-sm")} onClick={() => openAuth("login")}>
                  {t("ورود", "Sign in")}
                </button>
                <button type="button" className={cn("h-10 rounded-full", mode === "signup" && "bg-background shadow-sm")} onClick={() => openAuth("signup")}>
                  {t("ثبت‌نام", "Sign up")}
                </button>
              </div>
              <p className="text-xs leading-6 text-muted-foreground">{t(LOCAL_NOTE.fa, LOCAL_NOTE.en)}</p>
              {mode === "login" ? (
                <form
                  className="space-y-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    submitLogin();
                  }}
                >
                  <h2 className="text-xl font-extrabold">{t("ورود با شماره", "Sign in with your number")}</h2>
                  <PhoneField
                    lang={lang}
                    country={loginCountry}
                    onCountry={setLoginCountry}
                    national={loginNational}
                    onNational={setLoginNational}
                    countryError={countryError}
                    phoneError={phoneError}
                  />
                  <Button type="submit" className="h-11 w-full">
                    {t("ورود به حساب", "Open my account")}
                  </Button>
                </form>
              ) : (
                <form
                  className="space-y-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    submitIdentity();
                  }}
                >
                  <h2 className="text-xl font-extrabold">{t("ساخت حساب", "Create an account")}</h2>
                  <label className="grid gap-1.5 text-sm">
                    <span className="font-medium">{t("نام", "First name")}</span>
                    <Input className="h-11" value={firstName} onChange={(event) => setFirstName(event.target.value)} autoComplete="given-name" />
                  </label>
                  <label className="grid gap-1.5 text-sm">
                    <span className="font-medium">{t("نام خانوادگی", "Last name")}</span>
                    <Input className="h-11" value={lastName} onChange={(event) => setLastName(event.target.value)} autoComplete="family-name" />
                  </label>
                  <PhoneField
                    lang={lang}
                    country={country}
                    onCountry={setCountry}
                    national={national}
                    onNational={setNational}
                    countryError={countryError}
                    phoneError={phoneError}
                  />
                  <label className="grid gap-1.5 text-sm">
                    <span className="font-medium">{t("کد اختصاصی", "Personal code")}</span>
                    <Input className="h-11" value={code} onChange={(event) => setCode(event.target.value)} autoComplete="off" />
                  </label>
                  {error ? <p className="text-sm text-destructive">{error}</p> : null}
                  <Button type="submit" className="h-11 w-full">
                    {t("ادامه به سؤال‌ها", "Continue to the questions")}
                  </Button>
                </form>
              )}
            </div>
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
                <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-300">{t(question.hint.fa, question.hint.en)}</p>
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
                    if (step === 0) setPhase("form");
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
