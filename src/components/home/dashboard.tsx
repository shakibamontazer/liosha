"use client";

import { ArrowUpLeft, Bot, Globe, GraduationCap, Headset, Share2, Sparkles } from "lucide-react";
import Link from "next/link";
import { STEPS } from "@/lib/catalog";
import { nextStep, progressOf } from "@/lib/progress";
import { useApp, useT } from "@/lib/store";
import { formatNumber, pick } from "@/lib/text";
import { Glass } from "@/components/shared";

const MODULES = [
  {
    href: "/business",
    icon: Sparkles,
    fa: "بیزنس‌ساز هوشمند",
    en: "Smart business builder",
    descFa: "یازده مرحله از ایده خام تا پرسونای مشتری، با درس و ابزار هر قدم.",
    descEn: "Eleven steps from a raw idea to a customer persona, with a lesson and a tool each time.",
    tint: "from-indigo-500/30 to-violet-500/10",
  },
  {
    href: "/social",
    icon: Share2,
    fa: "سوشال مدیا",
    en: "Social media",
    descFa: "دوازده پلتفرم، تقویم محتوا و استودیوی ویدیو، تصویر و صدا.",
    descEn: "Twelve platforms, a content calendar, and studios for video, image, and audio.",
    tint: "from-fuchsia-500/25 to-indigo-500/10",
  },
  {
    href: "/academy",
    icon: GraduationCap,
    fa: "آموزش، فروش و بازاریابی",
    en: "Academy, sales, and marketing",
    descFa: "درس‌های برند، مارکتینگ و بستن معامله؛ بعدش خروجی را با هوش مصنوعی می‌سازی.",
    descEn: "Brand, marketing, and closing lessons, then an output you build with AI.",
    tint: "from-amber-400/25 to-violet-500/10",
  },
  {
    href: "/website",
    icon: Globe,
    fa: "طراحی سایت",
    en: "Website builder",
    descFa: "فاز بعد: درگاه، قالب PWA و اتصال به وردپرس. فعلاً مسیر و پیش‌نیازش اینجاست.",
    descEn: "Next phase: payments, PWA templates, and WordPress. The path and prerequisites are here.",
    tint: "from-slate-400/20 to-indigo-500/10",
    soon: true,
  },
];

export function Dashboard() {
  const { displayName, activeProject, projects, lang, openSupport, daysLeft, tokens } = useApp();
  const { t } = useT();
  const project = activeProject;
  const step = project ? nextStep(project) : 0;
  const percent = project ? progressOf(project) : 0;

  return (
    <div className="space-y-5">
      <section className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">{t("سلام", "Hello")}</p>
          <h1 className="text-2xl font-extrabold sm:text-3xl">{displayName}</h1>
          <p className="mt-1 max-w-xl text-sm leading-7 text-muted-foreground">
            {project
              ? t(
                  `پروژه «${project.name}» روی ${formatNumber(percent, lang)} درصد است. قدم بعدی: ${pick(STEPS[step].title, lang)}.`,
                  `“${project.name}” is ${formatNumber(percent, lang)}% along. Next: ${pick(STEPS[step].title, lang)}.`
                )
              : t("هنوز پروژه‌ای باز نیست. از کار من یکی بساز.", "No open project yet. Create one from My work.")}
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="rounded-full bg-indigo-500/10 px-3 py-1.5 font-semibold">
            {formatNumber(tokens, lang)} {t("توکن", "tokens")}
          </span>
          <span className="rounded-full bg-amber-500/10 px-3 py-1.5 font-semibold">
            {formatNumber(daysLeft, lang)} {t("روز اشتراک", "plan days")}
          </span>
        </div>
      </section>

      {project ? (
        <Link href={`/business?step=${step}`} className="block">
          <Glass className="flex flex-wrap items-center justify-between gap-4 p-4 transition hover:-translate-y-0.5">
            <div>
              <p className="text-xs text-indigo-600 dark:text-indigo-300">{t("ادامه کار", "Continue")}</p>
              <p className="text-lg font-bold">{project.name}</p>
              <p className="text-sm text-muted-foreground">{pick(STEPS[step].title, lang)}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative grid size-16 place-items-center">
                <svg viewBox="0 0 36 36" className="size-16 -rotate-90">
                  <circle cx="18" cy="18" r="15" className="fill-none stroke-muted" strokeWidth="3" />
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    className="fill-none stroke-indigo-500"
                    strokeWidth="3"
                    strokeDasharray={`${percent} 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-xs font-bold num">{formatNumber(percent, lang)}%</span>
              </div>
              <ArrowUpLeft className="size-5 text-muted-foreground rtl:-scale-x-100" />
            </div>
          </Glass>
        </Link>
      ) : null}

      <section className="grid gap-3 md:grid-cols-2">
        {MODULES.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="group block">
              <Glass className={`relative h-full overflow-hidden p-5 transition duration-300 group-hover:-translate-y-1 bg-gradient-to-br ${item.tint}`}>
                {item.soon ? (
                  <span className="absolute end-4 top-4 rounded-full bg-amber-400/20 px-2 py-1 text-[11px] font-semibold text-amber-700 dark:text-amber-200">
                    {t("به‌زودی / فاز بعدی", "Coming next")}
                  </span>
                ) : null}
                <span className="grid size-12 place-items-center rounded-2xl bg-background/70 text-indigo-600 shadow-sm dark:text-indigo-200">
                  <Icon className="size-5" />
                </span>
                <h2 className="mt-4 text-xl font-extrabold">{t(item.fa, item.en)}</h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{t(item.descFa, item.descEn)}</p>
                <p className="mt-4 text-sm font-semibold text-indigo-700 dark:text-indigo-200">
                  {t("اول درس‌ها، بعد ابزار", "Lessons first, then the tools")}
                </p>
              </Glass>
            </Link>
          );
        })}
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        <button type="button" onClick={() => openSupport("ai")} className="text-start">
          <Glass className="h-full p-4">
            <Bot className="size-5 text-indigo-500" />
            <h2 className="mt-2 font-bold">{t("پشتیبانی هوش مصنوعی", "AI support")}</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {t("راهنما، خلاصه مسئله و رفع گیر، شبانه‌روزی.", "A guide, a summary, and an unblocker, around the clock.")}
            </p>
          </Glass>
        </button>
        <button type="button" onClick={() => openSupport("human")} className="text-start">
          <Glass className="h-full p-4">
            <Headset className="size-5 text-amber-500" />
            <h2 className="mt-2 font-bold">{t("منتور انسانی", "Human mentor")}</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {t("پیام، تیکت یا تماس هفتگی. پاسخ زیر دو ساعت.", "A message, a ticket, or the weekly call. Reply under two hours.")}
            </p>
          </Glass>
        </button>
      </section>

      <p className="text-xs text-muted-foreground">
        {t(`${formatNumber(projects.length, lang)} پروژه باز روی این میز کار است.`, `${formatNumber(projects.length, lang)} open projects on this desk.`)}
      </p>
    </div>
  );
}
