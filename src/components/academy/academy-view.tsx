"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Glass, PageIntro, TokenPill, VideoLesson } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { COURSES } from "@/lib/catalog";
import { lessonOutput } from "@/lib/ai";
import { useApp, useT } from "@/lib/store";
import { pick, uid } from "@/lib/text";

export function AcademyHome() {
  const { lang, watched } = useApp();
  const { t } = useT();
  return (
    <div>
      <PageIntro
        eyebrow={t("بعد از فیلم، پروژه", "After the film, the project")}
        title={t("آموزش، فروش و بازاریابی", "Academy, sales, and marketing")}
        description={t(
          "دیجیتال مارکتینگ، برندینگ، تکنیک فروش و بستن معامله. خروجی هر درس با هوش مصنوعی ساخته می‌شود و به پروژه فعال می‌چسبد.",
          "Digital marketing, branding, sales technique, and closing. Each lesson’s output is built with AI and attached to the active project."
        )}
      />
      <div className="grid gap-3 md:grid-cols-2">
        {COURSES.map((course) => {
          const seen = course.lessons.filter((lesson) => watched.includes(lesson.id)).length;
          return (
            <Link key={course.slug} href={`/academy/${course.slug}`} className="glass block p-5 transition hover:-translate-y-0.5">
              <p className="text-xs text-muted-foreground">
                {seen}/{course.lessons.length} {t("درس دیده‌شده", "lessons watched")}
              </p>
              <h2 className="mt-2 text-xl font-extrabold">{pick(course.title, lang)}</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{pick(course.blurb, lang)}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function CourseView({ slug }: { slug: string }) {
  const course = COURSES.find((item) => item.slug === slug);
  const app = useApp();
  const { t } = useT();
  const [prompt, setPrompt] = useState("");
  const [activeLesson, setActiveLesson] = useState(course?.lessons[0]?.id ?? "");
  if (!course) return <PageIntro title={t("دوره پیدا نشد", "Course not found")} />;
  const lesson = course.lessons.find((item) => item.id === activeLesson) ?? course.lessons[0];

  const run = () => {
    if (!prompt.trim()) return;
    if (!app.spendTokens(1, { fa: `پروژه ${pick(lesson.title, "fa")}`, en: `Project ${pick(lesson.title, "en")}` })) {
      toast.error(t("توکن کافی نیست.", "Not enough tokens."));
      return;
    }
    const output = lessonOutput(pick(lesson.title, app.lang), prompt, app.lang);
    app.saveLessonOutput(lesson.id, output);
  };

  const attach = () => {
    const output = app.lessonOutputs[lesson.id];
    if (!output || !app.activeProject) return;
    app.updateProject(app.activeProject.id, (project) => ({
      ...project,
      imports: [{ id: uid(), title: pick(lesson.title, app.lang), text: output, at: Date.now() }, ...project.imports],
    }));
    toast.success(t("به پروژه فعال اضافه شد.", "Added to the active project."));
  };

  return (
    <div className="space-y-4">
      <PageIntro eyebrow={t("دوره", "Course")} title={pick(course.title, app.lang)} description={pick(course.blurb, app.lang)} />
      <div className="flex flex-wrap gap-2">
        {course.lessons.map((item, index) => (
          <button key={item.id} type="button" onClick={() => setActiveLesson(item.id)} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${item.id === lesson.id ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
            {index + 1}. {pick(item.title, app.lang)}
          </button>
        ))}
      </div>
      <VideoLesson lesson={lesson} />
      <Glass className="space-y-3 p-4" id="project">
        <h2 className="font-bold">{t("پروژه همین درس", "This lesson’s project")}</h2>
        <p className="text-sm leading-7 text-muted-foreground">
          {t("وضعیت واقعی کارت را بنویس. خروجی باید قابل ارسال باشد، نه خلاصه درس.", "Write the real situation. The output should be something you can send, not a summary of the lesson.")}
        </p>
        <Textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder={pick(lesson.summary, app.lang)} />
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" className="h-10" onClick={run}>{t("ساخت خروجی", "Build the output")}</Button>
          <TokenPill amount={1} />
          <Button type="button" variant="outline" className="h-10" onClick={attach} disabled={!app.lessonOutputs[lesson.id] || !app.activeProject}>
            {t("چسباندن به پروژه فعال", "Attach to the active project")}
          </Button>
        </div>
        {app.lessonOutputs[lesson.id] ? (
          <p className="whitespace-pre-wrap rounded-2xl bg-muted p-3 text-sm leading-7">{app.lessonOutputs[lesson.id]}</p>
        ) : null}
      </Glass>
      <Link href="/work" className="inline-flex text-sm font-semibold text-indigo-600 dark:text-indigo-300">
        {t("دیدن پروژه‌ها", "See projects")}
      </Link>
    </div>
  );
}
