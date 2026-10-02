"use client";

import Link from "next/link";
import { useState } from "react";
import { Glass, PageIntro } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ARTICLES, ROADMAP, SERVICES, STEPS } from "@/lib/catalog";
import { nextStep, progressOf, stepDone } from "@/lib/progress";
import { useApp, useT } from "@/lib/store";
import { formatNumber, pick } from "@/lib/text";

export function AboutView() {
  const { lang } = useApp();
  const { t } = useT();
  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow={t("پلتفرم", "Platform")}
        title={t("درباره لیوشا", "About Liosha")}
        description={t(
          "یک میز کار برای کسی که می‌خواهد کسب‌وکار آنلاین را از ایده تا اولین فروش، بدون پراکنده کردن ابزار و مشاور، جلو ببرد.",
          "A desk for someone who wants to take an online business from idea to first sale without scattering tools and consultants."
        )}
      />
      <div className="grid gap-3 md:grid-cols-3">
        {[
          [t("پراکندگی ابزار", "Scattered tools"), t("متن، تصویر، استراتژی و قیمت نباید هر کدام اشتراک جدا بخواهند.", "Text, image, strategy, and price should not each demand their own subscription.")],
          [t("آموزش بدون اجرا", "Lessons without execution"), t("درس کوتاه است و همان‌جا پروژه با ابزار پلتفرم بسته می‌شود.", "The lesson is short, and the project is finished with the platform’s own tool.")],
          [t("دیده نشدن نوپا", "New businesses stay unseen"), t("بیزنس من ویترین کسانی است که مرحله و هویت‌شان تأیید شده.", "My Business is a board for people whose steps and identity are approved.")],
        ].map(([title, body]) => (
          <Glass key={title} className="p-4">
            <h2 className="font-bold">{title}</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{body}</p>
          </Glass>
        ))}
      </div>
      <Glass className="p-4">
        <h2 className="mb-3 font-bold">{t("نقشه دوازده‌ماهه", "Twelve-month map")}</h2>
        <ol className="space-y-3">
          {ROADMAP.map((item) => (
            <li key={item.when.en}>
              <p className="text-sm font-semibold">{pick(item.when, lang)}</p>
              <p className="text-sm leading-7 text-muted-foreground">{pick(item.body, lang)}</p>
            </li>
          ))}
        </ol>
      </Glass>
    </div>
  );
}

export function ServicesView() {
  const { lang } = useApp();
  const { t } = useT();
  return (
    <div>
      <PageIntro title={t("خدمات", "Services")} description={t("هر خدمت یک ورودی روی میز کار است، نه یک PDF جدا.", "Each service is an entry on the desk, not a separate PDF.")} />
      <div className="grid gap-3 md:grid-cols-2">
        {SERVICES.map((service) => (
          <Glass key={service.title.en} className="p-4">
            <h2 className="font-bold">{pick(service.title, lang)}</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{pick(service.body, lang)}</p>
          </Glass>
        ))}
      </div>
    </div>
  );
}

export function ArticlesView() {
  const { lang } = useApp();
  const { t } = useT();
  return (
    <div>
      <PageIntro title={t("مقالات", "Articles")} description={t("یادداشت‌های کوتاه برای تصمیم، نه حجم دوره.", "Short notes for decisions, not course volume.")} />
      <div className="grid gap-3">
        {ARTICLES.map((article) => (
          <Link key={article.slug} href={`/articles/${article.slug}`} className="glass block p-4">
            <p className="text-xs text-muted-foreground">{pick(article.tag, lang)} · {formatNumber(article.minutes, lang)} {t("دقیقه", "min")}</p>
            <h2 className="mt-1 text-lg font-bold">{pick(article.title, lang)}</h2>
            <p className="mt-1 text-sm leading-7 text-muted-foreground">{pick(article.excerpt, lang)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function ArticleView({ slug }: { slug: string }) {
  const { lang } = useApp();
  const { t } = useT();
  const article = ARTICLES.find((item) => item.slug === slug);
  if (!article) return <PageIntro title={t("مقاله پیدا نشد", "Article not found")} />;
  return (
    <article className="mx-auto max-w-2xl">
      <PageIntro eyebrow={pick(article.tag, lang)} title={pick(article.title, lang)} description={pick(article.excerpt, lang)} />
      <div className="space-y-4 text-sm leading-8">
        {article.body.map((paragraph) => (
          <p key={paragraph.en}>{pick(paragraph, lang)}</p>
        ))}
      </div>
    </article>
  );
}

export function WorkView() {
  const app = useApp();
  const { t } = useT();
  const [name, setName] = useState("");
  return (
    <div className="space-y-4">
      <PageIntro
        title={t("کار من", "My work")}
        description={t("پروژه‌های باز اینجاست. یکی را فعال کن و از خانه یا بیزنس‌ساز ادامه‌اش بده.", "Open projects live here. Activate one and continue from Home or the business builder.")}
      />
      <form
        className="flex flex-wrap gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          if (!name.trim()) return;
          app.addProject(name.trim());
          setName("");
        }}
      >
        <Input className="h-11 max-w-xs" value={name} onChange={(event) => setName(event.target.value)} placeholder={t("نام کسب‌وکار تازه", "New business name")} />
        <Button type="submit" className="h-11">{t("ساخت پروژه", "Create project")}</Button>
      </form>
      {!app.projects.length ? (
        <Glass className="p-4 text-sm">{t("هنوز پروژه‌ای نیست.", "No projects yet.")}</Glass>
      ) : null}
      <div className="grid gap-3">
        {app.projects.map((project) => {
          const step = nextStep(project);
          return (
            <Glass key={project.id} className="p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold">{project.name}</h2>
                  <p className="text-sm text-muted-foreground">{pick(STEPS[step].title, app.lang)} · {formatNumber(progressOf(project), app.lang)}%</p>
                </div>
                <div className="flex gap-2">
                  <Button type="button" variant={project.id === app.activeProjectId ? "default" : "outline"} className="h-9" onClick={() => app.setActiveProject(project.id)}>
                    {project.id === app.activeProjectId ? t("فعال", "Active") : t("فعال کن", "Make active")}
                  </Button>
                  <Button type="button" variant="ghost" className="h-9" onClick={() => app.removeProject(project.id)}>{t("حذف", "Remove")}</Button>
                </div>
              </div>
              {project.imports.length ? (
                <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                  {project.imports.slice(0, 3).map((item) => (
                    <li key={item.id}>{t("خروجی درس:", "Lesson output:")} {item.title}</li>
                  ))}
                </ul>
              ) : null}
              <Link href={`/business?step=${step}`} className="mt-3 inline-flex text-sm font-semibold text-indigo-600 dark:text-indigo-300">
                {t("ادامه در بیزنس‌ساز", "Continue in the builder")}
              </Link>
            </Glass>
          );
        })}
      </div>
    </div>
  );
}

export function ProgressView() {
  const { projects, lang, activeProjectId } = useApp();
  const { t } = useT();
  return (
    <div className="space-y-4">
      <PageIntro title={t("وضعیت پروژه‌ها", "Project status")} description={t("درصد هر کسب‌وکار از یازده مرحله بیزنس‌ساز حساب می‌شود.", "Each business is scored from the eleven builder steps.")} />
      {projects.map((project) => (
        <Glass key={project.id} className="p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="font-bold">{project.name}</h2>
            <span className="text-sm font-semibold">{formatNumber(progressOf(project), lang)}%</span>
          </div>
          <div className="mb-3 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-gradient-to-l from-fuchsia-500 to-indigo-500" style={{ width: `${progressOf(project)}%` }} />
          </div>
          <ol className="grid gap-2 sm:grid-cols-2">
            {STEPS.map((step) => {
              const done = stepDone(project, step.id);
              return (
                <li key={step.id} className="flex items-center justify-between rounded-xl bg-muted/60 px-3 py-2 text-xs">
                  <span>{pick(step.title, lang)}</span>
                  <span>{done ? t("تمام", "Done") : t("باز", "Open")}</span>
                </li>
              );
            })}
          </ol>
          {project.id === activeProjectId ? <p className="mt-2 text-[11px] text-indigo-600 dark:text-indigo-300">{t("پروژه فعال", "Active project")}</p> : null}
        </Glass>
      ))}
    </div>
  );
}
