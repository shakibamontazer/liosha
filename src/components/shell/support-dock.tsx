"use client";

import { Bot, Headset, Phone, Send, Timer, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { mentorReply, supportReply } from "@/lib/ai";
import { MENTOR, PLANS } from "@/lib/catalog";
import { useApp, useT } from "@/lib/store";
import { digits, formatNumber, pick, uid } from "@/lib/text";
import { cn } from "@/lib/utils";

const DAYS = [
  { fa: "شنبه", en: "Sat" },
  { fa: "یکشنبه", en: "Sun" },
  { fa: "دوشنبه", en: "Mon" },
  { fa: "سه‌شنبه", en: "Tue" },
  { fa: "چهارشنبه", en: "Wed" },
];

export function SupportDock() {
  const app = useApp();
  const { t, lang } = useT();
  const [aiText, setAiText] = useState("");
  const [agent, setAgent] = useState<"guide" | "summary" | "debug">("guide");
  const [humanText, setHumanText] = useState("");
  const [subject, setSubject] = useState("");
  const [ticketBody, setTicketBody] = useState("");
  const [day, setDay] = useState(DAYS[0].fa);
  const [time, setTime] = useState("17:00");
  const [note, setNote] = useState("");
  const [now, setNow] = useState(0);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!app.ui.supportOpen) return;
    const tick = window.setTimeout(() => setNow(Date.now()), 0);
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => {
      window.clearTimeout(tick);
      window.clearInterval(id);
    };
  }, [app.ui.supportOpen]);

  const openTicket = app.tickets.find((ticket) => ticket.status === "open");
  const sla = useMemo(() => {
    if (!openTicket || now === 0) return null;
    const remain = openTicket.at + 2 * 60 * 60 * 1000 - now;
    const safe = Math.max(0, remain);
    const h = Math.floor(safe / 3600000);
    const m = Math.floor((safe % 3600000) / 60000);
    const s = Math.floor((safe % 60000) / 1000);
    return `${digits(String(h).padStart(2, "0"), lang)}:${digits(String(m).padStart(2, "0"), lang)}:${digits(String(s).padStart(2, "0"), lang)}`;
  }, [openTicket, now, lang]);

  const plan = PLANS.find((item) => item.id === app.plan);

  const sendAi = () => {
    const text = aiText.trim();
    if (!text) return;
    if (!app.spendTokens(1, { fa: "پشتیبانی هوش مصنوعی", en: "AI support" })) {
      toast.error(t("توکن کافی نیست.", "Not enough tokens."));
      return;
    }
    app.pushAi({ id: uid(), role: "user", text, at: Date.now() });
    setAiText("");
    setBusy(true);
    window.setTimeout(() => {
      app.pushAi({ id: uid(), role: "ai", text: supportReply(agent, text, lang), at: Date.now() });
      setBusy(false);
    }, 700);
  };

  const sendHuman = () => {
    const text = humanText.trim();
    if (!text) return;
    if (!app.consumeMentorChat(5)) {
      toast.error(t("سهم چت امروز این پلن تمام شده.", "Today’s mentor chat time is used up."));
      return;
    }
    app.pushMentor({ id: uid(), role: "user", text, at: Date.now() });
    setHumanText("");
    window.setTimeout(() => {
      app.pushMentor({ id: uid(), role: "mentor", text: mentorReply(text, lang), at: Date.now() });
    }, 900);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => app.openSupport(app.ui.supportMode)}
        className="fixed bottom-24 end-4 z-40 inline-flex size-12 items-center justify-center gap-2 rounded-full bg-gradient-to-l from-indigo-600 to-fuchsia-600 text-sm font-semibold text-white shadow-xl shadow-indigo-900/30 max-sm:hidden sm:w-auto sm:px-4 lg:bottom-6"
        aria-label={t("پشتیبانی", "Support")}
      >
        <Headset className="size-4" />
        <span className="hidden sm:inline">{t("پشتیبانی", "Support")}</span>
      </button>
      {app.ui.supportOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-0 sm:items-end sm:justify-end sm:p-4 lg:bottom-0">
          <div className="flex h-[min(100dvh,44rem)] w-full flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-popover shadow-2xl sm:h-[40rem] sm:max-w-md sm:rounded-3xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div>
                <p className="font-bold">{t("پشتیبانی دوگانه", "Dual support")}</p>
                <p className="text-xs text-muted-foreground">{plan ? pick(plan.support, lang) : ""}</p>
              </div>
              <Button type="button" size="icon" variant="ghost" onClick={app.closeSupport} aria-label={t("بستن", "Close")}>
                <X />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2 p-3">
              <button type="button" onClick={() => app.openSupport("ai")} className={cn("rounded-2xl border px-3 py-2 text-sm", app.ui.supportMode === "ai" ? "border-indigo-400 bg-indigo-500/15" : "border-border")}>
                <Bot className="mb-1 size-4" />
                {t("هوش مصنوعی ۲۴/۷", "AI, 24/7")}
              </button>
              <button type="button" onClick={() => app.openSupport("human")} className={cn("rounded-2xl border px-3 py-2 text-sm", app.ui.supportMode === "human" ? "border-amber-400 bg-amber-500/15" : "border-border")}>
                <Headset className="mb-1 size-4" />
                {t("منتور انسانی", "Human mentor")}
              </button>
            </div>
            {app.ui.supportMode === "ai" ? (
              <div className="flex min-h-0 flex-1 flex-col">
                <div className="flex gap-1 px-3">
                  {(
                    [
                      ["guide", "راهنما", "Guide"],
                      ["summary", "خلاصه‌ساز", "Summary"],
                      ["debug", "رفع گیر", "Unblock"],
                    ] as const
                  ).map(([id, fa, en]) => (
                    <button key={id} type="button" onClick={() => setAgent(id)} className={cn("rounded-full px-2.5 py-1 text-[11px]", agent === id ? "bg-primary text-primary-foreground" : "bg-muted")}>
                      {t(fa, en)}
                    </button>
                  ))}
                </div>
                <div className="mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto px-3">
                  {app.aiChat.map((message) => (
                    <p key={message.id} className={cn("max-w-[90%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-6", message.role === "user" ? "ms-auto bg-primary text-primary-foreground" : "bg-muted")}>
                      {message.text}
                    </p>
                  ))}
                  {busy ? <p className="text-xs text-muted-foreground">{t("در حال نوشتن…", "Writing…")}</p> : null}
                </div>
                <form
                  className="flex gap-2 border-t border-border p-3"
                  onSubmit={(event) => {
                    event.preventDefault();
                    sendAi();
                  }}
                >
                  <Input value={aiText} onChange={(event) => setAiText(event.target.value)} placeholder={t("سؤال یا باگ را بنویس", "Describe the question or bug")} className="h-11" />
                  <Button type="submit" className="h-11" size="icon" aria-label={t("ارسال", "Send")}>
                    <Send />
                  </Button>
                </form>
              </div>
            ) : (
              <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 pb-4">
                <div className="rounded-2xl border border-amber-400/40 bg-amber-500/10 p-3 text-sm">
                  <p className="font-semibold">{pick(MENTOR.name, lang)}</p>
                  <p className="text-xs text-muted-foreground">{pick(MENTOR.role, lang)}</p>
                  <p className="mt-2 flex items-center gap-1 text-xs">
                    <Timer className="size-3.5" />
                    {sla
                      ? t(`زمان باقی تعهد پاسخ: ${sla}`, `Response promise left: ${sla}`)
                      : t("تعهد پاسخ: کمتر از ۲ ساعت", "Response promise: under 2 hours")}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t("مانده تماس هفتگی", "Weekly call left")}: {formatNumber(app.mentorCallLeft, lang)} {t("دقیقه", "min")}
                    {" · "}
                    {t("مانده چت امروز", "Chat left today")}: {formatNumber(app.mentorChatLeft, lang)} {t("دقیقه", "min")}
                  </p>
                </div>
                <div className="space-y-2">
                  {app.mentorChat.map((message) => (
                    <p key={message.id} className={cn("whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-6", message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted")}>
                      {message.text}
                    </p>
                  ))}
                </div>
                <form
                  className="flex gap-2"
                  onSubmit={(event) => {
                    event.preventDefault();
                    sendHuman();
                  }}
                >
                  <Input value={humanText} onChange={(event) => setHumanText(event.target.value)} className="h-11" placeholder={t("پیام به منتور", "Message the mentor")} />
                  <Button type="submit" className="h-11">{t("ارسال", "Send")}</Button>
                </form>
                <form
                  className="space-y-2 rounded-2xl border border-border p-3"
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (!subject.trim() || !ticketBody.trim()) return;
                    app.addTicket(subject.trim(), ticketBody.trim());
                    setSubject("");
                    setTicketBody("");
                    toast.success(t("تیکت ثبت شد. تایمر دو ساعت شروع شد.", "Ticket opened. The two-hour timer has started."));
                  }}
                >
                  <p className="text-sm font-semibold">{t("ثبت تیکت", "Open a ticket")}</p>
                  <Input value={subject} onChange={(event) => setSubject(event.target.value)} placeholder={t("موضوع", "Subject")} className="h-10" />
                  <Textarea value={ticketBody} onChange={(event) => setTicketBody(event.target.value)} placeholder={t("شرح مسئله", "Describe the issue")} />
                  <Button type="submit" variant="secondary" className="h-10">{t("ثبت تیکت", "Submit ticket")}</Button>
                </form>
                {app.tickets.map((ticket) => (
                  <div key={ticket.id} className="rounded-2xl bg-muted/70 p-3 text-sm">
                    <p className="font-semibold">{ticket.subject}</p>
                    <p className="text-xs text-muted-foreground">{ticket.status === "open" ? t("باز", "Open") : t("پاسخ‌داده‌شده", "Answered")}</p>
                    {ticket.status === "open" ? (
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-2 h-8"
                        onClick={() =>
                          app.answerTicket(
                            ticket.id,
                            lang === "fa"
                              ? "پاسخ آزمایشی منتور: دامنه کار را کوچک کن و همان خروجی را با یک موعد مشخص دوباره پیشنهاد بده."
                              : "Prototype mentor reply: shrink the scope and send the same outcome with a clear date."
                          )
                        }
                      >
                        {t("شبیه‌سازی پاسخ منتور", "Simulate the mentor reply")}
                      </Button>
                    ) : (
                      <p className="mt-1 leading-6">{ticket.reply}</p>
                    )}
                  </div>
                ))}
                <form
                  className="space-y-2 rounded-2xl border border-border p-3"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const ok = app.bookCall(lang === "fa" ? day : DAYS.find((item) => item.fa === day)?.en || day, time, note);
                    if (!ok) {
                      toast.error(t("سهم تماس این هفته برای رزرو ۳۰ دقیقه‌ای کافی نیست.", "Not enough weekly call time for a 30-minute booking."));
                      return;
                    }
                    setNote("");
                    toast.success(t("تماس ۳۰ دقیقه‌ای رزرو شد.", "30-minute call booked."));
                  }}
                >
                  <p className="flex items-center gap-1 text-sm font-semibold">
                    <Phone className="size-4" />
                    {t("رزرو تماس هفتگی", "Book the weekly call")}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {DAYS.map((item) => (
                      <button key={item.fa} type="button" onClick={() => setDay(item.fa)} className={cn("rounded-full px-2 py-1 text-[11px]", day === item.fa ? "bg-primary text-primary-foreground" : "bg-muted")}>
                        {t(item.fa, item.en)}
                      </button>
                    ))}
                  </div>
                  <Input value={time} onChange={(event) => setTime(event.target.value)} className="h-10 num" dir="ltr" />
                  <Input value={note} onChange={(event) => setNote(event.target.value)} placeholder={t("موضوع تماس", "Call topic")} className="h-10" />
                  <Button type="submit" className="h-10">{t("رزرو ۳۰ دقیقه", "Book 30 minutes")}</Button>
                  {app.calls.length ? (
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {app.calls.map((call) => (
                        <li key={call.id}>{call.day} · <span className="num">{call.time}</span> · {call.note || t("بدون توضیح", "No note")}</li>
                      ))}
                    </ul>
                  ) : null}
                </form>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
