"use client";

import { Check, Copy, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, TokenPill, VideoLesson } from "@/components/shared";
import {
  ADJECTIVES,
  CANVAS_FIELDS,
  FONT_PAIRS,
  FRICTIONS,
  HARD_SKILL_HINTS,
  LAUNCH_ITEMS,
  PALETTES,
  SOFT_SKILL_HINTS,
  TONES,
  LESSONS,
} from "@/lib/catalog";
import {
  answerConcern,
  critiqueIdea,
  generateNames,
  personaCard,
  suggestCanvas,
  templateMessage,
} from "@/lib/ai";
import { sumLines } from "@/lib/progress";
import { useApp, useT } from "@/lib/store";
import { formatNumber, formatToman, parseNumber, pick, uid } from "@/lib/text";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

function useProject() {
  const app = useApp();
  const project = app.activeProject;
  const patch = (recipe: (project: Project) => Project) => {
    if (!project) return;
    app.updateProject(project.id, recipe);
  };
  return { ...app, project, patch };
}

export function StepBody({ step }: { step: number }) {
  const lesson = LESSONS.find((item) => item.id === `b${step}`);
  return (
    <div className="space-y-4">
      {lesson ? <VideoLesson lesson={lesson} /> : null}
      {step === 0 && <StepIdea />}
      {step === 1 && <StepValidation />}
      {step === 2 && <StepNaming />}
      {step === 3 && <StepCanvas />}
      {step === 4 && <StepFinance />}
      {step === 5 && <StepStrategy />}
      {step === 6 && <StepBrand />}
      {step === 7 && <StepOps />}
      {step === 8 && <StepLaunch />}
      {step === 9 && <StepBridge />}
      {step === 10 && <StepPersona />}
    </div>
  );
}

function StepIdea() {
  const { project, patch, spendTokens, lang } = useProject();
  const { t } = useT();
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  if (!project) return null;

  const send = () => {
    const idea = text.trim();
    if (!idea) return;
    if (!spendTokens(1, { fa: "نقد ایده", en: "Idea critique" })) {
      toast.error(t("توکن کافی نیست.", "Not enough tokens."));
      return;
    }
    patch((current) => ({
      ...current,
      ideaThread: [...current.ideaThread, { id: uid(), role: "user", text: idea, at: Date.now() }],
    }));
    setText("");
    setBusy(true);
    window.setTimeout(() => {
      const result = critiqueIdea(idea, lang);
      patch((current) => ({
        ...current,
        clearGoal: result.goal,
        ideaThread: [...current.ideaThread, { id: uid(), role: "ai", text: result.reply, at: Date.now() }],
      }));
      setBusy(false);
    }, 700);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm leading-7 text-muted-foreground">
        {t(
          "ایده را هرقدر خام بنویس و بگو: این ایده من است، برای پخته‌تر شدنش کمک کن و نقطه‌های کور را بگو.",
          "Write the idea as raw as it is, and ask for the blind spots."
        )}
      </p>
      <div className="space-y-2">
        {project.ideaThread.map((message) => (
          <p key={message.id} className={cn("whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-7", message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted")}>
            {message.text}
          </p>
        ))}
        {busy ? <p className="text-xs text-muted-foreground">{t("در حال نقد ایده…", "Reviewing the idea…")}</p> : null}
      </div>
      <Textarea value={text} onChange={(event) => setText(event.target.value)} placeholder={t("ایده خام", "Raw idea")} />
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" className="h-10" onClick={send}>
          <Sparkles />
          {t("نقد و شفاف‌سازی", "Critique and clarify")}
        </Button>
        <TokenPill amount={1} />
      </div>
      <Field label={t("هدف شفاف", "Clear goal")}>
        <Textarea
          value={project.clearGoal}
          onChange={(event) => patch((current) => ({ ...current, clearGoal: event.target.value }))}
        />
      </Field>
    </div>
  );
}

function SkillBox({
  title,
  hints,
  values,
  onAdd,
  onRemove,
}: {
  title: string;
  hints: { fa: string; en: string }[];
  values: string[];
  onAdd: (value: string) => void;
  onRemove: (value: string) => void;
}) {
  const { lang } = useApp();
  const { t } = useT();
  const [value, setValue] = useState("");
  return (
    <div className="space-y-2 rounded-2xl border border-border p-3">
      <p className="text-sm font-semibold">{title}</p>
      <div className="flex flex-wrap gap-1">
        {hints.map((hint) => (
          <button key={hint.fa} type="button" className="rounded-full bg-muted px-2 py-1 text-[11px]" onClick={() => onAdd(pick(hint, lang))}>
            {pick(hint, lang)}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={value}
          className="h-10"
          placeholder={t("مهارت خودت", "Your own skill")}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              onAdd(value);
              setValue("");
            }
          }}
        />
        <Button type="button" variant="secondary" className="h-10" onClick={() => { onAdd(value); setValue(""); }}>
          {t("افزودن", "Add")}
        </Button>
      </div>
      <div className="flex flex-wrap gap-1">
        {values.map((item) => (
          <button key={item} type="button" onClick={() => onRemove(item)} className="rounded-full bg-indigo-500/10 px-2 py-1 text-xs">
            {item} ×
          </button>
        ))}
      </div>
    </div>
  );
}

function StepValidation() {
  const { project, patch, lang } = useProject();
  const { t } = useT();
  if (!project) return null;
  const niche = project.niche;
  return (
    <div className="space-y-4">
      <SkillBox
        title={t("مهارت سخت", "Hard skills")}
        hints={HARD_SKILL_HINTS}
        values={project.skillsHard}
        onAdd={(value) => {
          const next = value.trim();
          if (!next) return;
          patch((current) => current.skillsHard.includes(next) ? current : { ...current, skillsHard: [...current.skillsHard, next] });
        }}
        onRemove={(value) => patch((current) => ({ ...current, skillsHard: current.skillsHard.filter((item) => item !== value) }))}
      />
      <SkillBox
        title={t("مهارت نرم", "Soft skills")}
        hints={SOFT_SKILL_HINTS}
        values={project.skillsSoft}
        onAdd={(value) => {
          const next = value.trim();
          if (!next) return;
          patch((current) => current.skillsSoft.includes(next) ? current : { ...current, skillsSoft: [...current.skillsSoft, next] });
        }}
        onRemove={(value) => patch((current) => ({ ...current, skillsSoft: current.skillsSoft.filter((item) => item !== value) }))}
      />
      <div>
        <p className="mb-2 text-sm font-semibold">{t("اصطکاک بازار", "Market friction")}</p>
        <div className="flex flex-wrap gap-2">
          {FRICTIONS.map((item) => {
            const on = project.frictions.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  patch((current) => ({
                    ...current,
                    frictions: on ? current.frictions.filter((id) => id !== item.id) : [...current.frictions, item.id],
                  }))
                }
                className={cn("rounded-full border px-3 py-1.5 text-xs", on ? "border-indigo-400 bg-indigo-500/15" : "border-border")}
              >
                {pick(item.label, lang)}
              </button>
            );
          })}
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <Field label={t("خدمت مشخص", "Specific service")}>
          <Input className="h-10" value={niche.service} onChange={(event) => patch((current) => ({ ...current, niche: { ...current.niche, service: event.target.value } }))} />
        </Field>
        <Field label={t("قشر مشخص", "Specific audience")}>
          <Input className="h-10" value={niche.audience} onChange={(event) => patch((current) => ({ ...current, niche: { ...current.niche, audience: event.target.value } }))} />
        </Field>
        <Field label={t("نتیجه مشخص", "Specific result")}>
          <Input className="h-10" value={niche.outcome} onChange={(event) => patch((current) => ({ ...current, niche: { ...current.niche, outcome: event.target.value } }))} />
        </Field>
      </div>
      <p className="rounded-2xl bg-muted px-3 py-2 text-sm leading-7">
        {t(
          `ارائه ${niche.service || "…"} برای ${niche.audience || "…"} به منظور رسیدن به ${niche.outcome || "…"}.`,
          `Offer ${niche.service || "…"} for ${niche.audience || "…"} in order to reach ${niche.outcome || "…"}.`
        )}
      </p>
      <div className="space-y-2">
        <p className="text-sm font-semibold">{t("تست بتا با ۳ نفر", "Beta with 3 people")}</p>
        {project.beta.map((person, index) => (
          <div key={index} className="grid gap-2 rounded-2xl border border-border p-3 md:grid-cols-[1fr_1fr_auto]">
            <Input
              className="h-10"
              placeholder={t("نام", "Name")}
              value={person.name}
              onChange={(event) =>
                patch((current) => ({
                  ...current,
                  beta: current.beta.map((item, i) => (i === index ? { ...item, name: event.target.value } : item)),
                }))
              }
            />
            <Input
              className="h-10"
              placeholder={t("بازخورد", "Feedback")}
              value={person.note}
              onChange={(event) =>
                patch((current) => ({
                  ...current,
                  beta: current.beta.map((item, i) => (i === index ? { ...item, note: event.target.value } : item)),
                }))
              }
            />
            <select
              className="h-10 rounded-lg border border-input bg-transparent px-2 text-sm"
              value={person.status}
              onChange={(event) =>
                patch((current) => ({
                  ...current,
                  beta: current.beta.map((item, i) =>
                    i === index ? { ...item, status: event.target.value as Project["beta"][number]["status"] } : item
                  ),
                }))
              }
            >
              <option value="pending">{t("در انتظار", "Waiting")}</option>
              <option value="active">{t("در حال انجام", "In progress")}</option>
              <option value="done">{t("توصیه‌نامه گرفته شد", "Testimonial in")}</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepNaming() {
  const { project, patch, spendTokens, lang } = useProject();
  const { t } = useT();
  const [keywords, setKeywords] = useState(project?.selectedName || "");
  if (!project) return null;
  return (
    <div className="space-y-3">
      <p className="text-sm leading-7 text-muted-foreground">
        {t("نام حداکثر دو تا سه سیلاب، راحت شنیده و تایپ شود، و دامنه و هندلش آزاد باشد.", "Keep it to two or three syllables, easy to say and type, with a free domain and handle.")}
      </p>
      <div className="flex flex-wrap gap-2">
        <Input className="h-10 max-w-sm" value={keywords} onChange={(event) => setKeywords(event.target.value)} placeholder={t("کلیدواژه، مثلاً نور", "A keyword, for example light")} />
        <Button
          type="button"
          className="h-10"
          onClick={() => {
            if (!spendTokens(1, { fa: "پیشنهاد نام", en: "Name ideas" })) {
              toast.error(t("توکن کافی نیست.", "Not enough tokens."));
              return;
            }
            const ideas = generateNames(keywords || project.name, lang);
            patch((current) => ({ ...current, nameIdeas: ideas }));
          }}
        >
          {t("ساخت نام", "Generate names")}
        </Button>
        <TokenPill amount={1} />
      </div>
      <div className="grid gap-2">
        {project.nameIdeas.map((idea) => (
          <button
            key={idea.name}
            type="button"
            onClick={() => patch((current) => ({ ...current, selectedName: idea.name }))}
            className={cn("rounded-2xl border p-3 text-start", project.selectedName === idea.name ? "border-indigo-400 bg-indigo-500/10" : "border-border")}
          >
            <span className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-bold">{idea.name}</span>
              <span className="text-xs text-muted-foreground">
                {formatNumber(idea.syllables, lang)} {t("سیلاب", "syllables")} · {t("راحتی", "ease")} {formatNumber(idea.ease, lang)}/۵
              </span>
            </span>
            <span className="mt-2 flex flex-wrap gap-1 text-[11px]">
              <Tag ok={idea.ir} label=".ir" />
              <Tag ok={idea.com} label=".com" />
              <Tag ok={idea.ig} label={`@${idea.handle}`} />
              {idea.syllables > 3 ? <span className="rounded-full bg-amber-500/15 px-2 py-0.5">{t("بلندتر از سه سیلاب", "Longer than three syllables")}</span> : null}
            </span>
          </button>
        ))}
      </div>
      <Field label={t("نام انتخاب‌شده", "Chosen name")}>
        <Input className="h-10" value={project.selectedName} onChange={(event) => patch((current) => ({ ...current, selectedName: event.target.value }))} />
      </Field>
    </div>
  );
}

function Tag({ ok, label }: { ok: boolean; label: string }) {
  const { t } = useT();
  return (
    <span className={cn("rounded-full px-2 py-0.5", ok ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-200" : "bg-rose-500/15 text-rose-700 dark:text-rose-200")}>
      {label} · {ok ? t("آزاد", "free") : t("گرفته", "taken")}
    </span>
  );
}

function StepCanvas() {
  const { project, patch, spendTokens, lang } = useProject();
  const { t } = useT();
  if (!project) return null;
  return (
    <div className="space-y-3">
      <Button
        type="button"
        className="h-10"
        onClick={() => {
          if (!spendTokens(1, { fa: "پیشنهاد بوم", en: "Canvas suggestion" })) {
            toast.error(t("توکن کافی نیست.", "Not enough tokens."));
            return;
          }
          const suggestion = suggestCanvas(project, lang);
          patch((current) => ({
            ...current,
            canvas: {
              ...current.canvas,
              value: current.canvas.value.trim() ? current.canvas.value : suggestion.value,
              channels: current.canvas.channels.trim() ? current.canvas.channels : suggestion.channels,
              customers: current.canvas.customers.trim() ? current.canvas.customers : suggestion.customers,
            },
          }));
          toast.success(t("ارزش، مشتری و کانال پیشنهاد شد.", "Value, customers, and channels were suggested."));
        }}
      >
        <Sparkles />
        {t("پیشنهاد ارزش و کانال", "Suggest value and channels")}
      </Button>
      <div className="grid gap-3 md:grid-cols-2">
        {CANVAS_FIELDS.map((field) => (
          <Field key={field.key} label={pick(field.title, lang)} hint={pick(field.prompt, lang)}>
            <Textarea
              value={project.canvas[field.key]}
              onChange={(event) =>
                patch((current) => ({
                  ...current,
                  canvas: { ...current.canvas, [field.key]: event.target.value },
                }))
              }
            />
          </Field>
        ))}
      </div>
    </div>
  );
}

function StepFinance() {
  const { project, patch, lang } = useProject();
  const { t } = useT();
  if (!project) return null;
  const capex = sumLines(project.capex);
  const opex = sumLines(project.opex);
  const ops = project.budget * 0.5;
  const pay = project.budget * 0.3;
  const save = project.budget * 0.2;
  const updateLine = (kind: "capex" | "opex", id: string, key: "name" | "amount", value: string) => {
    patch((current) => ({
      ...current,
      [kind]: current[kind].map((line) =>
        line.id === id ? { ...line, [key]: key === "amount" ? parseNumber(value) : value } : line
      ),
    }));
  };
  return (
    <div className="space-y-4">
      <Field label={t("بودجه در دسترس، بدون قرض", "Available budget, without debt")}>
        <Input className="h-10 num" dir="ltr" value={project.budget || ""} onChange={(event) => patch((current) => ({ ...current, budget: parseNumber(event.target.value) }))} />
      </Field>
      <MoneyList
        title={t("هزینه راه‌اندازی (CapEx)", "Startup costs (CapEx)")}
        lines={project.capex}
        onChange={(id, key, value) => updateLine("capex", id, key, value)}
        onAdd={() => patch((current) => ({ ...current, capex: [...current.capex, { id: uid(), name: "", amount: 0 }] }))}
        onRemove={(id) => patch((current) => ({ ...current, capex: current.capex.filter((line) => line.id !== id) }))}
      />
      <MoneyList
        title={t("هزینه جاری ماهانه (OpEx)", "Monthly running costs (OpEx)")}
        lines={project.opex}
        onChange={(id, key, value) => updateLine("opex", id, key, value)}
        onAdd={() => patch((current) => ({ ...current, opex: [...current.opex, { id: uid(), name: "", amount: 0 }] }))}
        onRemove={(id) => patch((current) => ({ ...current, opex: current.opex.filter((line) => line.id !== id) }))}
      />
      <div className="space-y-2 rounded-2xl bg-muted p-3 text-sm">
        <p className="font-semibold">{t("قانون ۵۰ / ۳۰ / ۲۰", "The 50 / 30 / 20 rule")}</p>
        <Bar label={t("عملیات ۵۰٪", "Operations 50%")} value={ops} width={50} tone="bg-indigo-500" />
        <Bar label={t("دستمزد خودت ۳۰٪", "Your pay 30%")} value={pay} width={30} tone="bg-violet-500" />
        <Bar label={t("توسعه ۲۰٪", "Growth 20%")} value={save} width={20} tone="bg-amber-400" />
        <p className="text-xs leading-6 text-muted-foreground">
          {t(
            `جمع راه‌اندازی ${formatToman(capex, lang)} و جمع هزینه ماهانه ${formatToman(opex, lang)} است.`,
            `Startup total ${formatToman(capex, lang)}. Monthly total ${formatToman(opex, lang)}.`
          )}
        </p>
        {opex > ops && project.budget > 0 ? (
          <p className="text-xs text-amber-700 dark:text-amber-200">
            {t("هزینه جاری از سهم ۵۰ درصد عملیات بیشتر شده.", "Monthly costs are above the 50% operations share.")}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function Bar({ label, value, width, tone }: { label: string; value: number; width: number; tone: string }) {
  const { lang } = useApp();
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span>{label}</span>
        <span className="num">{formatToman(value, lang)}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-background">
        <div className={cn("h-full", tone)} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

function MoneyList({
  title,
  lines,
  onChange,
  onAdd,
  onRemove,
}: {
  title: string;
  lines: { id: string; name: string; amount: number }[];
  onChange: (id: string, key: "name" | "amount", value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
}) {
  const { t } = useT();
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">{title}</p>
        <Button type="button" variant="outline" className="h-8" onClick={onAdd}>{t("ردیف", "Row")}</Button>
      </div>
      {lines.map((line) => (
        <div key={line.id} className="flex gap-2">
          <Input className="h-10" value={line.name} placeholder={t("عنوان", "Label")} onChange={(event) => onChange(line.id, "name", event.target.value)} />
          <Input className="h-10 num" dir="ltr" value={line.amount || ""} placeholder="0" onChange={(event) => onChange(line.id, "amount", event.target.value)} />
          <Button type="button" variant="ghost" size="icon" className="size-10" onClick={() => onRemove(line.id)} aria-label={t("حذف", "Remove")}>
            <Trash2 />
          </Button>
        </div>
      ))}
    </div>
  );
}

function StepStrategy() {
  const { project, patch, lang } = useProject();
  const { t } = useT();
  if (!project) return null;
  const tiers = [
    ["base", "پایه", "Base"],
    ["popular", "محبوب", "Popular"],
    ["vip", "ویژه", "Signature"],
  ] as const;
  return (
    <div className="space-y-4">
      <div className="grid gap-3 lg:grid-cols-3">
        {project.packages.map((pack, index) => (
          <div key={pack.tier} className={cn("space-y-2 rounded-2xl border p-3", pack.tier === "popular" && "border-indigo-400")}>
            <p className="text-sm font-bold">{t(tiers[index][1], tiers[index][2])}</p>
            <Input className="h-10" value={pack.name} placeholder={t("نام پکیج", "Package name")} onChange={(event) => patch((current) => ({ ...current, packages: current.packages.map((item, i) => i === index ? { ...item, name: event.target.value } : item) }))} />
            <Input className="h-10 num" dir="ltr" value={pack.price || ""} placeholder={t("قیمت", "Price")} onChange={(event) => patch((current) => ({ ...current, packages: current.packages.map((item, i) => i === index ? { ...item, price: parseNumber(event.target.value) } : item) }))} />
            <Textarea value={pack.features} placeholder={t("خروجی‌ها", "What’s included")} onChange={(event) => patch((current) => ({ ...current, packages: current.packages.map((item, i) => i === index ? { ...item, features: event.target.value } : item) }))} />
            {pack.price ? <p className="text-xs text-muted-foreground">{formatToman(pack.price, lang)}</p> : null}
          </div>
        ))}
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold">{t("صفت ذهنی", "Positioning word")}</p>
        <div className="flex flex-wrap gap-2">
          {ADJECTIVES.map((item) => (
            <button key={item.id} type="button" onClick={() => patch((current) => ({ ...current, adjective: item.id }))} className={cn("rounded-full border px-3 py-1.5 text-sm", project.adjective === item.id ? "border-indigo-400 bg-indigo-500/15" : "border-border")}>
              {pick(item.label, lang)}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <Field label={t("جذب با آموزش", "Attract with education")}>
          <Textarea value={project.funnel.attract} onChange={(event) => patch((current) => ({ ...current, funnel: { ...current.funnel, attract: event.target.value } }))} />
        </Field>
        <Field label={t("اعتماد با نمونه‌کار", "Trust with proof")}>
          <Textarea value={project.funnel.trust} onChange={(event) => patch((current) => ({ ...current, funnel: { ...current.funnel, trust: event.target.value } }))} />
        </Field>
        <Field label={t("فروش در دایرکت یا سایت", "Sell in the inbox or site")}>
          <Textarea value={project.funnel.sell} onChange={(event) => patch((current) => ({ ...current, funnel: { ...current.funnel, sell: event.target.value } }))} />
        </Field>
      </div>
    </div>
  );
}

function StepBrand() {
  const { project, patch, lang } = useProject();
  if (!project) return null;
  const setColor = (key: "main" | "second" | "action", value: string) => {
    patch((current) => ({ ...current, paletteId: "custom", colors: { ...current.colors, [key]: value } }));
  };
  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-2">
        {PALETTES.map((palette) => (
          <button
            key={palette.id}
            type="button"
            onClick={() => patch((current) => ({ ...current, paletteId: palette.id, colors: { main: palette.main, second: palette.second, action: palette.action } }))}
            className={cn("rounded-2xl border p-3 text-start", project.paletteId === palette.id && "border-indigo-400")}
          >
            <span className="mb-2 flex h-12 overflow-hidden rounded-xl">
              <span className="h-full w-[60%]" style={{ background: palette.main }} />
              <span className="h-full w-[30%]" style={{ background: palette.second }} />
              <span className="h-full w-[10%]" style={{ background: palette.action }} />
            </span>
            <span className="text-sm font-semibold">{pick(palette.name, lang)}</span>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {(["main", "second", "action"] as const).map((key) => (
          <Field key={key} label={key === "main" ? "60%" : key === "second" ? "30%" : "10%"}>
            <Input className="h-10 num" dir="ltr" value={project.colors[key]} onChange={(event) => setColor(key, event.target.value)} />
          </Field>
        ))}
      </div>
      <div className="overflow-hidden rounded-3xl border border-border">
        <div className="p-4" style={{ background: project.colors.main, color: "#fff" }}>
          <p className="text-xs opacity-70">60%</p>
          <p className="text-lg font-bold" style={{ fontFamily: project.fontPair === "cairo" ? "var(--font-cairo)" : project.fontPair === "almarai" ? "var(--font-almarai)" : "var(--font-vazir)" }}>
            {project.selectedName || project.name}
          </p>
        </div>
        <div className="grid grid-cols-[1fr_auto]">
          <div className="p-4 text-sm" style={{ background: project.colors.second, color: "#fff" }}>30%</div>
          <div className="grid place-items-center px-4 text-xs font-bold" style={{ background: project.colors.action, color: "#111" }}>10%</div>
        </div>
      </div>
      <div className="grid gap-2">
        {FONT_PAIRS.map((pair) => (
          <button key={pair.id} type="button" onClick={() => patch((current) => ({ ...current, fontPair: pair.id }))} className={cn("rounded-2xl border p-3 text-start", project.fontPair === pair.id && "border-indigo-400 bg-indigo-500/10")}>
            <span className="block font-semibold">{pick(pair.title, lang)}</span>
            <span className="text-xs text-muted-foreground">{pick(pair.detail, lang)}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {TONES.map((tone) => (
          <button key={tone.id} type="button" onClick={() => patch((current) => ({ ...current, tone: tone.id }))} className={cn("rounded-2xl border px-3 py-2 text-start text-sm", project.tone === tone.id && "border-indigo-400 bg-indigo-500/10")}>
            <span className="block font-semibold">{pick(tone.label, lang)}</span>
            <span className="text-xs text-muted-foreground">{pick(tone.note, lang)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepOps() {
  const { project, patch, lang } = useProject();
  const { t } = useT();
  if (!project) return null;
  const copy = async (kind: "welcome" | "price") => {
    const message = templateMessage(kind, project.selectedName || project.name, lang);
    await navigator.clipboard.writeText(message);
    toast.success(t("متن کپی شد.", "Copied."));
  };
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold">{t("سؤال‌های ثابت بریف", "Fixed brief questions")}</p>
      {project.briefQuestions.map((question, index) => (
        <Input
          key={index}
          className="h-10"
          value={question}
          placeholder={t(`سؤال ${index + 1}`, `Question ${index + 1}`)}
          onChange={(event) =>
            patch((current) => ({
              ...current,
              briefQuestions: current.briefQuestions.map((item, i) => (i === index ? event.target.value : item)),
            }))
          }
        />
      ))}
      <Button type="button" variant="outline" className="h-9" onClick={() => patch((current) => ({ ...current, briefQuestions: [...current.briefQuestions, ""] }))}>
        {t("سؤال تازه", "Another question")}
      </Button>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label={t("پیش‌پرداخت (درصد)", "Deposit (percent)")} hint={t("پیش‌فرض ۵۰ درصد، بقیه قبل از تحویل.", "Default is 50%, the rest before delivery.")}>
          <Input className="h-10 num" dir="ltr" value={project.deposit} onChange={(event) => patch((current) => ({ ...current, deposit: parseNumber(event.target.value) }))} />
        </Field>
        <Field label={t("سقف اصلاح رایگان", "Free revision cap")}>
          <Input className="h-10 num" dir="ltr" value={project.revisionLimit} onChange={(event) => patch((current) => ({ ...current, revisionLimit: parseNumber(event.target.value) }))} />
        </Field>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <button type="button" onClick={() => copy("welcome")} className="rounded-2xl border border-border p-3 text-start text-sm">
          <Copy className="mb-1 size-4" />
          {t("متن خوش‌آمد", "Welcome script")}
        </button>
        <button type="button" onClick={() => copy("price")} className="rounded-2xl border border-border p-3 text-start text-sm">
          <Copy className="mb-1 size-4" />
          {t("متن استعلام قیمت", "Pricing script")}
        </button>
      </div>
    </div>
  );
}

function StepLaunch() {
  const { project, patch, lang } = useProject();
  if (!project) return null;
  const done = LAUNCH_ITEMS.filter((item) => project.checklist[item.id]).length;
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">
        {formatNumber(done, lang)} / {formatNumber(LAUNCH_ITEMS.length, lang)}
      </p>
      {LAUNCH_ITEMS.map((item) => {
        const on = Boolean(project.checklist[item.id]);
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => patch((current) => ({ ...current, checklist: { ...current.checklist, [item.id]: !on } }))}
            className={cn("flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-start text-sm", on && "border-emerald-400/50 bg-emerald-500/10")}
          >
            <span className={cn("grid size-6 place-items-center rounded-full border", on && "border-emerald-500 bg-emerald-500 text-white")}>
              {on ? <Check className="size-3.5" /> : null}
            </span>
            {pick(item.label, lang)}
          </button>
        );
      })}
    </div>
  );
}

function StepBridge() {
  const { project, patch, spendTokens, lang } = useProject();
  const { t } = useT();
  const [topic, setTopic] = useState("");
  const [context, setContext] = useState("");
  const [goal, setGoal] = useState("");
  if (!project) return null;
  return (
    <div className="space-y-3">
      <Field label={t("موضوع دغدغه", "Concern")}>
        <Input className="h-10" value={topic} onChange={(event) => setTopic(event.target.value)} placeholder={t("مثلاً مشتری روی قیمت چانه می‌زند", "For example: the client is pushing the price")} />
      </Field>
      <Field label={t("اطلاعات لازم", "Context")}>
        <Textarea value={context} onChange={(event) => setContext(event.target.value)} />
      </Field>
      <Field label={t("خروجی که می‌خواهی", "What you want back")}>
        <Input className="h-10" value={goal} onChange={(event) => setGoal(event.target.value)} placeholder={t("متن نهایی یا استراتژی", "A final script or a strategy")} />
      </Field>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          className="h-10"
          onClick={() => {
            if (!topic.trim()) return;
            if (!spendTokens(1, { fa: "پل ارتباطی", en: "Support bridge" })) {
              toast.error(t("توکن کافی نیست.", "Not enough tokens."));
              return;
            }
            const answer = answerConcern(topic, context, goal, lang);
            patch((current) => ({
              ...current,
              concerns: [{ id: uid(), topic, context, goal, answer }, ...current.concerns],
            }));
            setTopic("");
            setContext("");
            setGoal("");
          }}
        >
          {t("دریافت پاسخ", "Get the reply")}
        </Button>
        <TokenPill amount={1} />
      </div>
      {project.concerns.map((item) => (
        <article key={item.id} className="rounded-2xl bg-muted p-3 text-sm leading-7">
          <p className="font-semibold">{item.topic}</p>
          <p className="mt-1 whitespace-pre-wrap">{item.answer}</p>
        </article>
      ))}
    </div>
  );
}

function StepPersona() {
  const { project, patch, lang } = useProject();
  const { t } = useT();
  if (!project) return null;
  const fields: { key: keyof Project["persona"]; fa: string; en: string }[] = [
    { key: "name", fa: "نام", en: "Name" },
    { key: "age", fa: "سن", en: "Age" },
    { key: "city", fa: "شهر", en: "City" },
    { key: "job", fa: "شغل", en: "Work" },
    { key: "budget", fa: "بودجه", en: "Budget" },
    { key: "platform", fa: "پلتفرم", en: "Platform" },
  ];
  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="grid gap-3 sm:grid-cols-2">
        {fields.map((field) => (
          <Field key={field.key} label={t(field.fa, field.en)}>
            <Input
              className="h-10"
              value={project.persona[field.key]}
              onChange={(event) =>
                patch((current) => ({ ...current, persona: { ...current.persona, [field.key]: event.target.value } }))
              }
            />
          </Field>
        ))}
        <Field label={t("دغدغه‌ها", "Pains")}>
          <Textarea value={project.persona.pains} onChange={(event) => patch((current) => ({ ...current, persona: { ...current.persona, pains: event.target.value } }))} />
        </Field>
        <Field label={t("لحن مؤثر", "Tone that lands")}>
          <Textarea value={project.persona.tone} onChange={(event) => patch((current) => ({ ...current, persona: { ...current.persona, tone: event.target.value } }))} />
        </Field>
      </div>
      <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 p-4 text-sm leading-7 text-white">
        <p className="text-xs text-white/70">{t("کارت پرسونا", "Persona card")}</p>
        <p className="mt-2 whitespace-pre-wrap">{personaCard(project.persona, lang)}</p>
      </div>
    </div>
  );
}
