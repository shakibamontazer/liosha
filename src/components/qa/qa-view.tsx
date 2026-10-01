"use client";

import { BadgeCheck, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Glass, PageIntro } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { QA_TAGS, QA_THREADS } from "@/lib/catalog";
import { useApp, useT } from "@/lib/store";
import { formatNumber, pick, timeAgo } from "@/lib/text";
import type { QaTag } from "@/lib/types";
import { cn } from "@/lib/utils";

export function QaView() {
  const app = useApp();
  const { t } = useT();
  const [tag, setTag] = useState<"all" | QaTag>("all");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [mineTag, setMineTag] = useState<QaTag>("edu");

  const threads = [
    ...app.questions.map((question) => ({
      id: question.id,
      tag: question.tag,
      author: app.displayName,
      title: question.title,
      body: question.body,
      votes: question.votes + (app.votes[question.id] ?? 0),
      at: timeAgo(question.at, app.lang),
      answers: question.answers.map((answer) => ({
        author: answer.author,
        body: answer.body,
        accepted: answer.accepted,
        mentor: false,
      })),
    })),
    ...QA_THREADS.map((thread) => ({
      id: thread.id,
      tag: thread.tag,
      author: thread.author,
      title: pick(thread.title, app.lang),
      body: pick(thread.body, app.lang),
      votes: thread.votes + (app.votes[thread.id] ?? 0),
      at: app.lang === "fa" ? "این هفته" : "This week",
      answers: thread.answers.map((answer) => ({
        author: answer.author,
        body: pick(answer.body, app.lang),
        accepted: Boolean(answer.accepted),
        mentor: Boolean(answer.mentor),
      })),
    })),
  ].filter((thread) => tag === "all" || thread.tag === tag);

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow={t("تالار", "Board")}
        title={t("پرس‌وجو", "Q&A")}
        description={t(
          "سؤال آموزشی، فنی یا درباره ابزارها. پاسخ برگزیده برای بقیه می‌ماند.",
          "Ask about learning, the product, or the tools. Accepted answers stay visible."
        )}
      />
      <div className="flex flex-wrap gap-2">
        {QA_TAGS.map((item) => (
          <button key={item.id} type="button" onClick={() => setTag(item.id)} className={cn("rounded-full px-3 py-1.5 text-xs font-semibold", tag === item.id ? "bg-primary text-primary-foreground" : "bg-muted")}>
            {pick(item.label, app.lang)}
          </button>
        ))}
      </div>
      <Glass className="space-y-2 p-4">
        <h2 className="font-bold">{t("سؤال تازه", "New question")}</h2>
        <Input className="h-10" value={title} onChange={(event) => setTitle(event.target.value)} placeholder={t("عنوان", "Title")} />
        <Textarea value={body} onChange={(event) => setBody(event.target.value)} placeholder={t("شرح کوتاه", "A short description")} />
        <div className="flex flex-wrap gap-1">
          {QA_TAGS.filter((item) => item.id !== "all").map((item) => (
            <button key={item.id} type="button" onClick={() => setMineTag(item.id as QaTag)} className={cn("rounded-full px-2 py-1 text-[11px]", mineTag === item.id ? "bg-indigo-500/15" : "bg-muted")}>
              {pick(item.label, app.lang)}
            </button>
          ))}
        </div>
        <Button
          type="button"
          className="h-10"
          onClick={() => {
            if (!title.trim() || !body.trim()) return;
            app.addQuestion({ title: title.trim(), body: body.trim(), tag: mineTag });
            setTitle("");
            setBody("");
          }}
        >
          {t("انتشار سؤال", "Publish")}
        </Button>
      </Glass>
      <div className="space-y-3">
        {threads.map((thread) => (
          <article key={thread.id} className="glass p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-muted-foreground">{thread.author} · {thread.at}</p>
                <h2 className="mt-1 text-lg font-bold">{thread.title}</h2>
                <p className="mt-1 text-sm leading-7 text-muted-foreground">{thread.body}</p>
              </div>
              <button type="button" onClick={() => app.vote(thread.id, app.votes[thread.id] ? -1 : 1)} className="grid justify-items-center rounded-2xl bg-muted px-3 py-2 text-xs">
                <ThumbsUp className={cn("size-4", app.votes[thread.id] && "fill-indigo-500 text-indigo-500")} />
                <span className="num">{formatNumber(thread.votes, app.lang)}</span>
              </button>
            </div>
            <div className="mt-3 space-y-2">
              {thread.answers.map((answer, index) => (
                <div key={index} className={cn("rounded-2xl p-3 text-sm leading-7", answer.accepted ? "bg-emerald-500/10 ring-1 ring-emerald-400/40" : "bg-muted/70")}>
                  <p className="mb-1 flex items-center gap-1 text-xs font-semibold">
                    {answer.accepted ? <BadgeCheck className="size-3.5 text-emerald-600" /> : null}
                    {answer.author}
                    {answer.accepted ? <span>{t("پاسخ برگزیده", "Accepted")}</span> : null}
                    {answer.mentor ? <span className="text-amber-700 dark:text-amber-200">{t("منتور", "Mentor")}</span> : null}
                  </p>
                  {answer.body}
                </div>
              ))}
              {!thread.answers.length ? (
                <p className="text-xs text-muted-foreground">{t("هنوز پاسخی نیست.", "No answer yet.")}</p>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
