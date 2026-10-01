"use client";

import { Clapperboard, ImageIcon, Mic, CalendarDays, Check } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Glass, PageIntro, TokenPill, VideoLesson } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  AUDIO_ENGINES,
  IMAGE_ENGINES,
  PLATFORM_GROUPS,
  PLATFORMS,
  RATIOS,
  SOCIAL_LESSONS,
  VIDEO_ENGINES,
  WEEK_DAYS,
} from "@/lib/catalog";
import { calendarReport, imagePrompt, videoBoard, voicePlan } from "@/lib/ai";
import { useApp, useT } from "@/lib/store";
import { formatNumber, pick, uid } from "@/lib/text";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function SocialHub() {
  const params = useSearchParams();
  const { lang } = useApp();
  const { t } = useT();
  const studio = params.get("studio");
  const [tab, setTab] = useState(studio ? "tools" : "lessons");
  const [trackedStudio, setTrackedStudio] = useState(studio);
  if (studio && studio !== trackedStudio) {
    setTrackedStudio(studio);
    setTab("tools");
  }

  return (
    <div>
      <PageIntro
        eyebrow={t("نقشه سوشال", "Social map")}
        title={t("سوشال مدیا", "Social media")}
        description={t(
          "اول درس‌های ضبط‌شده، بعد پلتفرم‌ها و استودیوها. هر پلتفرم برنامه جدا دارد.",
          "Recorded lessons first, then platforms and studios. Each platform keeps its own plan."
        )}
      />
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="h-auto w-full">
          <TabsTrigger value="lessons" className="h-10 flex-1">{t("دوره‌ها", "Lessons")}</TabsTrigger>
          <TabsTrigger value="tools" className="h-10 flex-1">{t("پلتفرم و استودیو", "Platforms and studios")}</TabsTrigger>
        </TabsList>
        <TabsContent value="lessons" className="mt-4 grid gap-3">
          {SOCIAL_LESSONS.map((lesson) => (
            <Glass key={lesson.id} className="space-y-3 p-3">
              <VideoLesson lesson={lesson} />
              <Link href={`/social?studio=${lesson.studio ?? "calendar"}`} className="inline-flex text-sm font-semibold text-indigo-600 dark:text-indigo-300">
                {t("انجام پروژه این درس", "Do this lesson’s project")}
              </Link>
            </Glass>
          ))}
        </TabsContent>
        <TabsContent value="tools" className="mt-4 space-y-6">
          {PLATFORM_GROUPS.map((group) => (
            <section key={group.id}>
              <h2 className="mb-3 text-sm font-bold text-muted-foreground">{pick(group.title, lang)}</h2>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                {PLATFORMS.filter((item) => item.group === group.id).map((platform) => (
                  <Link key={platform.slug} href={`/social/${platform.slug}`} className="glass block p-3 transition hover:-translate-y-0.5">
                    <span className="mb-3 block size-3 rounded-full" style={{ background: platform.tint }} />
                    <span className="block font-bold">{pick(platform.name, lang)}</span>
                    <span className="mt-1 line-clamp-3 block text-xs leading-5 text-muted-foreground">{pick(platform.blurb, lang)}</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
          <Studios focus={studio} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function PlatformView({ slug }: { slug: string }) {
  const platform = PLATFORMS.find((item) => item.slug === slug);
  const { activeProject, updateProject, lang } = useApp();
  const { t } = useT();
  if (!platform) {
    return <PageIntro title={t("پلتفرم پیدا نشد", "Platform not found")} />;
  }
  if (!activeProject) {
    return <PageIntro title={pick(platform.name, lang)} description={t("اول یک پروژه فعال انتخاب کن.", "Choose an active project first.")} />;
  }
  const done = activeProject.doneTopics[slug] ?? [];
  return (
    <div>
      <PageIntro
        eyebrow={pick(platform.name, lang)}
        title={pick(platform.name, lang)}
        description={pick(platform.blurb, lang)}
      />
      <Accordion className="gap-2" multiple>
        {platform.topics.map((topic) => {
          const label = pick(topic, lang);
          const on = done.includes(label);
          return (
            <AccordionItem key={label} value={label} className="glass border-b-0 px-3">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold">{label}</span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-3 text-sm leading-7 text-muted-foreground">
                  {t(
                    `برای «${label}» این هفته یک خروجی بنویس: مخاطب، پیام، و دعوت به اقدام.`,
                    `For “${label}”, write this week’s output: audience, message, and invitation.`
                  )}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    updateProject(activeProject.id, (project) => {
                      const current = project.doneTopics[slug] ?? [];
                      const next = on ? current.filter((item) => item !== label) : [...current, label];
                      return { ...project, doneTopics: { ...project.doneTopics, [slug]: next } };
                    })
                  }
                  className={cn("mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs", on ? "bg-emerald-500/15" : "bg-muted")}
                >
                  {on ? <Check className="size-3" /> : null}
                  {t("در برنامه این هفته هست", "On this week’s plan")}
                </button>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
      <label className="mt-4 grid gap-2 text-sm">
        <span className="font-semibold">{t("یادداشت برنامه این پلتفرم", "Notes for this platform")}</span>
        <Textarea
          value={activeProject.platformNotes[slug] ?? ""}
          onChange={(event) =>
            updateProject(activeProject.id, (project) => ({
              ...project,
              platformNotes: { ...project.platformNotes, [slug]: event.target.value },
            }))
          }
        />
      </label>
    </div>
  );
}

function Studios({ focus }: { focus: string | null }) {
  const { t } = useT();
  return (
    <section className="space-y-3" id="studios">
      <h2 className="text-lg font-extrabold">{t("کارگاه‌های هوش مصنوعی", "AI workshops")}</h2>
      <CalendarStudio open={focus === "calendar"} />
      <VideoStudio open={focus === "video"} />
      <GraphicsStudio open={focus === "graphics"} />
      <AudioStudio open={focus === "audio"} />
    </section>
  );
}

function CalendarStudio({ open }: { open: boolean }) {
  const { activeProject, updateProject, spendTokens, lang } = useApp();
  const { t } = useT();
  const [expanded, setExpanded] = useState(open);
  if (!activeProject) return null;
  const calendar = activeProject.calendar;
  const patch = (next: typeof calendar) => updateProject(activeProject.id, (project) => ({ ...project, calendar: next }));
  return (
    <Glass className="p-4">
      <button type="button" className="flex w-full items-center gap-2 text-start font-bold" onClick={() => setExpanded((v) => !v)}>
        <CalendarDays className="size-4" />
        {t("تقویم ماهانه و هفتگی", "Monthly and weekly calendar")}
      </button>
      {expanded ? (
        <div className="mt-3 space-y-3">
          <p className="text-xs text-muted-foreground">{t("چهار ستون محتوا", "Four content pillars")}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {calendar.pillars.map((pillar, index) => (
              <Input
                key={index}
                className="h-10"
                value={pillar}
                placeholder={t(`ستون ${index + 1}`, `Pillar ${index + 1}`)}
                onChange={(event) => {
                  const pillars = [...calendar.pillars];
                  pillars[index] = event.target.value;
                  patch({ ...calendar, pillars });
                }}
              />
            ))}
          </div>
          <div className="space-y-2">
            {calendar.slots.map((slot) => (
              <div key={slot.id} className="grid gap-2 rounded-2xl border border-border p-2 sm:grid-cols-4">
                <select className="h-10 rounded-lg border border-input bg-transparent px-2 text-sm" value={slot.day} onChange={(event) => patch({ ...calendar, slots: calendar.slots.map((item) => item.id === slot.id ? { ...item, day: Number(event.target.value) } : item) })}>
                  {WEEK_DAYS.map((day, index) => (
                    <option key={index} value={index}>{pick(day, lang)}</option>
                  ))}
                </select>
                <Input className="h-10" value={slot.platform} onChange={(event) => patch({ ...calendar, slots: calendar.slots.map((item) => item.id === slot.id ? { ...item, platform: event.target.value } : item) })} />
                <Input className="h-10" value={slot.format} onChange={(event) => patch({ ...calendar, slots: calendar.slots.map((item) => item.id === slot.id ? { ...item, format: event.target.value } : item) })} />
                <Input className="h-10 num" dir="ltr" value={slot.time} onChange={(event) => patch({ ...calendar, slots: calendar.slots.map((item) => item.id === slot.id ? { ...item, time: event.target.value } : item) })} />
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" className="h-9" onClick={() => patch({ ...calendar, slots: [...calendar.slots, { id: uid(), day: 0, platform: "", format: "", time: "18:00" }] })}>
            {t("اسلات انتشار", "Add a slot")}
          </Button>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              className="h-10"
              onClick={() => {
                if (!spendTokens(1, { fa: "ارزیابی تقویم", en: "Calendar review" })) {
                  toast.error(t("توکن کافی نیست.", "Not enough tokens."));
                  return;
                }
                patch({ ...calendar, aiReport: calendarReport(calendar.pillars, calendar.slots.length, lang) });
              }}
            >
              {t("ارزیابی هوش مصنوعی", "AI review")}
            </Button>
            <TokenPill amount={1} />
          </div>
          {calendar.aiReport ? <p className="whitespace-pre-wrap rounded-2xl bg-muted p-3 text-sm leading-7">{calendar.aiReport}</p> : null}
          <label className="grid gap-1 text-sm">
            <span className="font-medium">{t("تحلیل انسانی لحن و دایرکت", "Human read of tone and inbox")}</span>
            <Textarea value={calendar.humanNote} onChange={(event) => patch({ ...calendar, humanNote: event.target.value })} />
          </label>
        </div>
      ) : null}
    </Glass>
  );
}

function VideoStudio({ open }: { open: boolean }) {
  const { spendTokens, addCreation, lang } = useApp();
  const { t } = useT();
  const [expanded, setExpanded] = useState(open);
  const [engine, setEngine] = useState(VIDEO_ENGINES[0].id);
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const meta = VIDEO_ENGINES.find((item) => item.id === engine) ?? VIDEO_ENGINES[0];
  return (
    <Glass className="p-4">
      <button type="button" className="flex w-full items-center gap-2 text-start font-bold" onClick={() => setExpanded((v) => !v)}>
        <Clapperboard className="size-4" />
        {t("استودیوی ویدیو", "Video studio")}
      </button>
      {expanded ? (
        <div className="mt-3 space-y-3">
          <div className="flex flex-wrap gap-1">
            {VIDEO_ENGINES.map((item) => (
              <button key={item.id} type="button" onClick={() => setEngine(item.id)} className={cn("rounded-full px-2.5 py-1 text-[11px]", engine === item.id ? "bg-primary text-primary-foreground" : "bg-muted")}>
                {item.name}
              </button>
            ))}
          </div>
          <Textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder={t("صحنه یا متن ویدیو", "Scene or video script")} />
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              className="h-10"
              onClick={() => {
                if (!prompt.trim()) return;
                if (!spendTokens(meta.cost, { fa: `ویدیو ${meta.name}`, en: `${meta.name} video` })) {
                  toast.error(t("توکن کافی نیست.", "Not enough tokens."));
                  return;
                }
                const detail = videoBoard(prompt, meta.name, lang);
                setResult(detail);
                addCreation({ kind: meta.kind === "avatar" ? "avatar" : "video", title: meta.name, detail, tokens: meta.cost });
              }}
            >
              {t("ساخت پیش‌نمایش", "Build preview")}
            </Button>
            <TokenPill amount={meta.cost} />
            <span className="text-[11px] text-muted-foreground">
              {meta.kind === "avatar" ? t("آواتار، هر ۳۰ ثانیه", "Avatar, per 30 seconds") : t("ویدیو، هر ۵ ثانیه", "Video, per 5 seconds")}
            </span>
          </div>
          {result ? <p className="whitespace-pre-wrap rounded-2xl bg-slate-950 p-3 text-sm leading-7 text-white">{result}</p> : null}
        </div>
      ) : null}
    </Glass>
  );
}

function GraphicsStudio({ open }: { open: boolean }) {
  const { activeProject, spendTokens, addCreation, lang } = useApp();
  const { t } = useT();
  const [expanded, setExpanded] = useState(open);
  const [engine, setEngine] = useState(IMAGE_ENGINES[0].id);
  const [ratio, setRatio] = useState(RATIOS[0].id);
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const colors = activeProject ? `${activeProject.colors.main} / ${activeProject.colors.second} / ${activeProject.colors.action}` : "#6366F1";
  return (
    <Glass className="p-4">
      <button type="button" className="flex w-full items-center gap-2 text-start font-bold" onClick={() => setExpanded((v) => !v)}>
        <ImageIcon className="size-4" />
        {t("استودیوی گرافیک و کاور", "Graphics and cover studio")}
      </button>
      {expanded ? (
        <div className="mt-3 space-y-3">
          <div className="flex flex-wrap gap-1">
            {IMAGE_ENGINES.map((item) => (
              <button key={item.id} type="button" onClick={() => setEngine(item.id)} className={cn("rounded-full px-2.5 py-1 text-[11px]", engine === item.id ? "bg-primary text-primary-foreground" : "bg-muted")}>{item.name}</button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {RATIOS.map((item) => (
              <button key={item.id} type="button" onClick={() => setRatio(item.id)} className={cn("rounded-full px-2.5 py-1 text-[11px]", ratio === item.id ? "bg-indigo-500/15 text-indigo-700 dark:text-indigo-200" : "bg-muted")}>{pick(item.label, lang)}</button>
            ))}
          </div>
          <Input className="h-10" value={topic} onChange={(event) => setTopic(event.target.value)} placeholder={t("موضوع تصویر", "Image subject")} />
          <div className="flex items-center gap-2">
            <Button
              type="button"
              className="h-10"
              onClick={() => {
                if (!topic.trim()) return;
                if (!spendTokens(10, { fa: "پرامپت تصویر", en: "Image prompt" })) {
                  toast.error(t("توکن کافی نیست.", "Not enough tokens."));
                  return;
                }
                const detail = imagePrompt(topic, ratio, colors, engine, lang);
                setResult(detail);
                addCreation({ kind: "image", title: engine, detail, tokens: 10 });
              }}
            >
              {t("ساخت پرامپت", "Build prompt")}
            </Button>
            <TokenPill amount={10} />
          </div>
          {result ? (
            <div className="grid gap-3 md:grid-cols-[1fr_160px]">
              <p className="whitespace-pre-wrap rounded-2xl bg-muted p-3 text-sm leading-7">{result}</p>
              <div className={cn("rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-amber-300", ratio === "9:16" ? "aspect-[9/16]" : ratio === "16:9" ? "aspect-video" : "aspect-[3/1]")} />
            </div>
          ) : null}
          <p className="text-xs text-muted-foreground">
            {t("متن درشت را بعد از ساخت تصویر، در فتوشاپ یا Canva روی لایه جدا بگذار.", "Set the large type afterwards, on its own layer in Photoshop or Canva.")}
          </p>
        </div>
      ) : null}
    </Glass>
  );
}

function AudioStudio({ open }: { open: boolean }) {
  const { spendTokens, addCreation, lang } = useApp();
  const { t } = useT();
  const [expanded, setExpanded] = useState(open);
  const [engine, setEngine] = useState(AUDIO_ENGINES[0].id);
  const [minutes, setMinutes] = useState(1);
  const [script, setScript] = useState("");
  const [result, setResult] = useState("");
  const cost = 15 * minutes;
  return (
    <Glass className="p-4">
      <button type="button" className="flex w-full items-center gap-2 text-start font-bold" onClick={() => setExpanded((v) => !v)}>
        <Mic className="size-4" />
        {t("استودیوی صدا و پادکست", "Audio and podcast studio")}
      </button>
      {expanded ? (
        <div className="mt-3 space-y-3">
          <div className="flex flex-wrap gap-1">
            {AUDIO_ENGINES.map((item) => (
              <button key={item.id} type="button" onClick={() => setEngine(item.id)} className={cn("rounded-full px-2.5 py-1 text-[11px]", engine === item.id ? "bg-primary text-primary-foreground" : "bg-muted")}>{item.name}</button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-sm">
            {t("دقیقه", "Minutes")}
            <Input className="h-10 w-24 num" dir="ltr" type="number" min={1} max={10} value={minutes} onChange={(event) => setMinutes(Math.max(1, Number(event.target.value) || 1))} />
          </label>
          <Textarea value={script} onChange={(event) => setScript(event.target.value)} placeholder={t("متن نریشن", "Narration script")} />
          <div className="flex items-center gap-2">
            <Button
              type="button"
              className="h-10"
              onClick={() => {
                if (!script.trim()) return;
                if (!spendTokens(cost, { fa: "طرح صدا", en: "Voice plan" })) {
                  toast.error(t("توکن کافی نیست.", "Not enough tokens."));
                  return;
                }
                const detail = voicePlan(script, engine, minutes, lang);
                setResult(detail);
                addCreation({ kind: "voice", title: engine, detail, tokens: cost });
              }}
            >
              {t("ساخت طرح صدا", "Build the voice plan")}
            </Button>
            <TokenPill amount={cost} />
          </div>
          {result ? (
            <div>
              <div className="mb-2 flex h-10 items-end gap-1">
                {Array.from({ length: 24 }).map((_, index) => (
                  <span key={index} className="w-1.5 rounded-full bg-indigo-400" style={{ height: `${20 + ((index * 37) % 80)}%` }} />
                ))}
              </div>
              <p className="whitespace-pre-wrap text-sm leading-7">{result}</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </Glass>
  );
}

export function CreationShelf() {
  const { creations, lang } = useApp();
  const { t } = useT();
  if (!creations.length) return null;
  return (
    <div className="mt-4 space-y-2">
      <p className="text-sm font-semibold">{t("آخرین خروجی‌ها", "Latest outputs")}</p>
      {creations.slice(0, 3).map((item) => (
        <p key={item.id} className="text-xs text-muted-foreground">
          {item.title} · {formatNumber(item.tokens, lang)} {t("توکن", "tokens")}
        </p>
      ))}
    </div>
  );
}
