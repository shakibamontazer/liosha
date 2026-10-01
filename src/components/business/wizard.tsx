"use client";

import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { StepBody } from "@/components/business/steps";
import { EmptyState, PageIntro } from "@/components/shared";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { STEPS } from "@/lib/catalog";
import { progressOf, stepDone } from "@/lib/progress";
import { useApp, useT } from "@/lib/store";
import { digits, formatNumber, pick } from "@/lib/text";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Wizard() {
  const params = useSearchParams();
  const { activeProject, lang, projects, setActiveProject } = useApp();
  const { t } = useT();
  const requested = params.get("step") ?? "0";
  const [open, setOpen] = useState<string[]>([requested]);
  const [tracked, setTracked] = useState(requested);
  if (tracked !== requested) {
    setTracked(requested);
    setOpen([requested]);
  }

  if (!activeProject) {
    return (
      <EmptyState
        title={t("پروژه‌ای انتخاب نشده", "No project selected")}
        body={t("از کار من یک کسب‌وکار بساز تا مراحل همین‌جا باز شود.", "Create a business in My work and the steps will open here.")}
        action={<Link href="/work" className="text-sm font-semibold text-indigo-600">{t("رفتن به کار من", "Go to My work")}</Link>}
      />
    );
  }

  const percent = progressOf(activeProject);

  return (
    <div>
      <PageIntro
        eyebrow={t("نقشه راه صفر تا اجرا", "Roadmap from zero to launch")}
        title={t("بیزنس‌ساز هوشمند", "Smart business builder")}
        description={t(
          "هر سرفصل را باز کن. اول درس همان مرحله پخش می‌شود، بعد ابزارش.",
          "Open a chapter. Its lesson plays first, then the tool."
        )}
      />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => setActiveProject(project.id)}
            className={cn("rounded-full px-3 py-1.5 text-xs font-semibold", project.id === activeProject.id ? "bg-primary text-primary-foreground" : "bg-muted")}
          >
            {project.name}
          </button>
        ))}
        <span className="text-xs text-muted-foreground">
          {formatNumber(percent, lang)}%
        </span>
      </div>
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {STEPS.map((step) => {
          const done = stepDone(activeProject, step.id);
          const active = open.includes(String(step.id));
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setOpen([String(step.id)])}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs",
                active ? "border-indigo-400 bg-indigo-500/10" : "border-border",
                done && "text-emerald-700 dark:text-emerald-200"
              )}
            >
              <span className="grid size-5 place-items-center rounded-full bg-background text-[10px]">
                {done ? <Check className="size-3" /> : digits(step.id, lang)}
              </span>
              {pick(step.title, lang)}
            </button>
          );
        })}
      </div>
      <Accordion value={open} onValueChange={setOpen} className="gap-2">
        {STEPS.map((step) => {
          const done = stepDone(activeProject, step.id);
          return (
            <AccordionItem key={step.id} value={String(step.id)} className="glass border-b-0 px-3">
              <AccordionTrigger className="hover:no-underline">
                <span className="flex items-center gap-3 text-start">
                  <span className={cn("grid size-8 place-items-center rounded-full text-xs font-bold", done ? "bg-emerald-500 text-white" : "bg-indigo-500/15 text-indigo-700 dark:text-indigo-200")}>
                    {done ? <Check className="size-4" /> : digits(step.id, lang)}
                  </span>
                  <span>
                    <span className="block font-bold">{pick(step.title, lang)}</span>
                    <span className="block text-xs font-normal text-muted-foreground">{pick(step.hint, lang)}</span>
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <StepBody step={step.id} />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
