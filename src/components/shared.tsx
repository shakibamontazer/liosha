"use client";

import { Check, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { digits, type Bi, pick } from "@/lib/text";
import { useApp, useT } from "@/lib/store";
import type { Lesson } from "@/lib/catalog";

export function Glass({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("glass", className)} {...props} />;
}

export function PageIntro({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="mb-1 text-xs font-medium tracking-wide text-indigo-600 dark:text-indigo-300">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h1>
        {description ? (
          <p className="mt-2 text-sm leading-7 text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="font-medium">{label}</span>
      {children}
      {hint ? <span className="text-xs leading-5 text-muted-foreground">{hint}</span> : null}
    </label>
  );
}

export function TokenPill({ amount }: { amount: number }) {
  const { lang } = useApp();
  const { t } = useT();
  return (
    <span className="num rounded-full bg-indigo-500/10 px-2 py-0.5 text-[11px] font-semibold text-indigo-700 dark:text-indigo-200">
      {digits(amount, lang)} {t("توکن", "tokens")}
    </span>
  );
}

export function VideoLesson({
  lesson,
  compact = false,
}: {
  lesson: Lesson;
  compact?: boolean;
}) {
  const { watched, markWatched, lang } = useApp();
  const { t } = useT();
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(watched.includes(lesson.id) ? 100 : 0);
  const marked = useRef(watched.includes(lesson.id));

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setProgress((current) => {
        const next = Math.min(100, current + 8);
        if (next >= 100) {
          window.clearInterval(id);
          setPlaying(false);
          if (!marked.current) {
            marked.current = true;
            markWatched(lesson.id);
          }
        }
        return next;
      });
    }, 160);
    return () => window.clearInterval(id);
  }, [playing, lesson.id, markWatched]);

  const seen = watched.includes(lesson.id) || progress >= 100;

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border/70 bg-slate-950 text-white", compact && "max-w-xl")}>
      <button
        type="button"
        onClick={() => setPlaying((value) => !value)}
        className="relative flex h-36 w-full items-center justify-center bg-[radial-gradient(circle_at_20%_20%,#818cf8,transparent_40%),radial-gradient(circle_at_80%_0%,#c084fc,transparent_35%),linear-gradient(160deg,#1e1b4b,#0f172a)] sm:h-44"
      >
        <span className="absolute start-3 top-3 rounded-full bg-white/15 px-2 py-1 text-[11px] backdrop-blur">
          {digits(lesson.minutes, lang)}
        </span>
        {seen ? (
          <span className="absolute end-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-400/20 px-2 py-1 text-[11px] text-emerald-100">
            <Check className="size-3" />
            {t("دیده شد", "Watched")}
          </span>
        ) : null}
        <span className="grid size-14 place-items-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur">
          <Play className="size-6 fill-white" />
        </span>
        <span className="absolute inset-x-0 bottom-0 h-1 bg-white/15">
          <span className="block h-full bg-gradient-to-l from-amber-300 to-indigo-400" style={{ width: `${progress}%` }} />
        </span>
      </button>
      <div className="space-y-1 px-4 py-3">
        <p className="text-sm font-semibold">{pick(lesson.title, lang)}</p>
        <p className="text-xs leading-5 text-white/70">{pick(lesson.summary, lang)}</p>
        <p className="text-[11px] text-white/50">
          {playing
            ? t("در حال پخش نسخه آموزشی…", "Playing the lesson cut…")
            : t("پخش را بزن تا درس تمام شود و پروژه همین مرحله باز بماند.", "Press play to finish the lesson. The project stays open underneath.")}
        </p>
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <Glass className="grid justify-items-start gap-2 p-6">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="max-w-md text-sm leading-7 text-muted-foreground">{body}</p>
      {action}
    </Glass>
  );
}

export function linkButton(className?: string) {
  return cn(buttonVariants({ variant: "default" }), "h-10 px-4", className);
}

export function textOf(value: Bi, lang: "fa" | "en") {
  return pick(value, lang);
}
