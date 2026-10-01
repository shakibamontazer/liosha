"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Glass, PageIntro, VideoLesson } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WEBSITE_LESSON } from "@/lib/catalog";
import { useT } from "@/lib/store";

const POINTS = [
  {
    fa: "درگاه پرداخت",
    en: "Payment gateway",
    bodyFa: "اتصال فروش پکیج و دریافت پیش‌پرداخت، همان سیاست ۵۰/۵۰ که در بیزنس‌ساز ثبت کردی.",
    bodyEn: "Sell a package and take the deposit, using the same 50/50 rule you saved in the business builder.",
  },
  {
    fa: "قالب PWA",
    en: "PWA templates",
    bodyFa: "سایت سبک و قابل نصب، هم‌راستا با همین اپ، نه یک ویترین جدا.",
    bodyEn: "A light, installable site aligned with this app, not a separate brochure.",
  },
  {
    fa: "وردپرس",
    en: "WordPress",
    bodyFa: "هماهنگی با REST API برای کسانی که سایت فعلی دارند و نمی‌خواهند از صفر مهاجرت کنند.",
    bodyEn: "A REST API bridge for people who already have a site and do not want to migrate from zero.",
  },
];

export function WebsiteView() {
  const { t } = useT();
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow={t("فاز بعدی", "Next phase")}
        title={t("طراحی سایت", "Website builder")}
        description={t(
          "این ماژول هنوز باز نشده. مسیرش مشخص است: درگاه، قالب نصب‌شونده و اتصال به وردپرس.",
          "This module is not open yet. The path is set: payments, an installable template, and a WordPress connection."
        )}
      />
      <span className="inline-flex rounded-full bg-amber-400/20 px-3 py-1 text-xs font-semibold text-amber-800 dark:text-amber-100">
        {t("به‌زودی / فاز بعدی", "Coming next")}
      </span>
      <VideoLesson lesson={WEBSITE_LESSON} />
      <div className="grid gap-3 md:grid-cols-3">
        {POINTS.map((point) => (
          <Glass key={point.en} className="p-4">
            <h2 className="font-bold">{t(point.fa, point.en)}</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{t(point.bodyFa, point.bodyEn)}</p>
          </Glass>
        ))}
      </div>
      <Glass className="p-4">
        <h2 className="font-bold">{t("خبر باز شدن را بگیر", "Get the opening note")}</h2>
        {joined ? (
          <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-200">
            {t("ثبت شد. این فقط روی همین دستگاه ذخیره آزمایشی است.", "Saved. This prototype keeps it on this device only.")}
          </p>
        ) : (
          <form
            className="mt-3 flex flex-wrap gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              if (!email.includes("@")) {
                toast.error(t("ایمیل را کامل بنویس.", "Enter a full email."));
                return;
              }
              setJoined(true);
            }}
          >
            <Input className="h-11 max-w-sm" dir="ltr" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@email.com" />
            <Button type="submit" className="h-11">{t("خبرم کن", "Notify me")}</Button>
          </form>
        )}
      </Glass>
    </div>
  );
}
