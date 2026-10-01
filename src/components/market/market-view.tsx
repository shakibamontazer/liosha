"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Glass, PageIntro } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { BANNER_OFFERS } from "@/lib/catalog";
import { completedSteps } from "@/lib/progress";
import { useApp, useT } from "@/lib/store";
import { formatToman, pick } from "@/lib/text";
import type { BannerSize } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

const SEED_BANNERS: {
  id: string;
  size: BannerSize;
  title: string;
  titleEn: string;
  line: string;
  lineEn: string;
  tint: string;
}[] = [
  { id: "atelier-live", size: "special", title: "نورگاه", titleEn: "Norgah", line: "پرتره اعتمادساز برای برند شخصی", lineEn: "Trust portraits for personal brands", tint: "from-indigo-600 to-slate-900" },
  { id: "motion", size: "large", title: "استودیو رُز", titleEn: "Rose studio", line: "موشن کوتاه برای معرفی خدمات", lineEn: "Short motion for service intros", tint: "from-fuchsia-600 to-violet-900" },
  { id: "cafe", size: "medium", title: "کافه متن", titleEn: "Cafe Matn", line: "تقویم محتوای کافه‌های مستقل", lineEn: "Content calendars for independent cafés", tint: "from-amber-500 to-orange-800" },
  { id: "nut", size: "medium", title: "پسته کرمان", titleEn: "Kerman pistachio", line: "فروش مستقیم محصول فصل", lineEn: "Direct sale of the season’s crop", tint: "from-emerald-600 to-teal-900" },
  { id: "excel", size: "small", title: "کارگاه اکسل", titleEn: "Excel workshop", line: "گزارش فروش در یک بعدازظهر", lineEn: "A sales report in one afternoon", tint: "from-sky-600 to-slate-800" },
  { id: "diet", size: "small", title: "تغذیه هفته", titleEn: "Week nutrition", line: "برنامه غذایی قابل پیگیری", lineEn: "A meal plan you can actually follow", tint: "from-lime-600 to-emerald-900" },
];

export function MarketBoard() {
  const app = useApp();
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<BannerSize>("small");
  const [headline, setHeadline] = useState("");
  const [subline, setSubline] = useState("");
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState(false);

  const offer = BANNER_OFFERS.find((item) => item.size === size)!;
  const project = app.activeProject;
  const steps = project ? completedSteps(project).length : 0;
  const portfolio = Boolean(project?.checklist.portfolio);
  const kycOk = offer.needKyc === "basic" ? app.kyc !== "none" : app.kyc === "verified";
  const checks = [
    { ok: Boolean(project), fa: "پروژه فعال داری", en: "You have an active project" },
    { ok: steps >= offer.needSteps, fa: `حداقل ${offer.needSteps} مرحله تمام شده (${steps} الان)`, en: `At least ${offer.needSteps} steps done (${steps} now)` },
    { ok: kycOk, fa: offer.needKyc === "verified" ? "احراز هویت کامل" : "احراز هویت پایه", en: offer.needKyc === "verified" ? "Full identity check" : "Basic identity check" },
    { ok: !offer.needPortfolio || portfolio, fa: "نمونه‌کار در چک‌لیست لانچ تأیید شده", en: "Portfolio ticked in the launch checklist" },
  ];
  const ready = checks.every((item) => item.ok);

  const live = useMemo(
    () => [
      ...app.bannerRequests
        .filter((item) => item.status === "live")
        .map((item) => ({
          id: item.id,
          size: item.size,
          title: item.headline,
          line: item.subline,
          tint: "from-violet-600 to-indigo-950",
          href: `/marketplace/${item.projectId}`,
        })),
      ...SEED_BANNERS.map((item) => ({
        id: item.id,
        size: item.size,
        title: app.lang === "fa" ? item.title : item.titleEn,
        line: app.lang === "fa" ? item.line : item.lineEn,
        tint: item.tint,
        href: `/marketplace/${item.id}`,
      })),
    ],
    [app.bannerRequests, app.lang]
  );

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow={t("ویترین تبلیغاتی", "Ad board")}
        title={t("بیزنس من", "My Business")}
        description={t(
          "بنرها پراکنده‌اند. اندازه بزرگ‌تر، تعرفه بالاتر. تا تأیید کارشناس، پولی گرفته نمی‌شود.",
          "Banners sit in a mixed grid. Larger placement costs more. Nothing is charged before a reviewer approves it."
        )}
        action={<Button type="button" className="h-10" onClick={() => setOpen(true)}>{t("درخواست ثبت بنر", "Request a banner")}</Button>}
      />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {live.map((banner) => {
          const meta = BANNER_OFFERS.find((item) => item.size === banner.size)!;
          return (
            <Link key={banner.id} href={banner.href} className={cn("relative overflow-hidden rounded-3xl p-4 text-white shadow-lg", meta.span, `bg-gradient-to-br ${banner.tint}`)}>
              <span className="text-[11px] text-white/70">{pick(meta.name, app.lang)} · {formatToman(meta.price, app.lang)}</span>
              <span className="mt-3 block text-xl font-extrabold">{banner.title}</span>
              <span className="mt-1 block text-sm text-white/80">{banner.line}</span>
            </Link>
          );
        })}
      </div>
      <section className="space-y-2">
        <h2 className="font-bold">{t("درخواست‌های من", "My requests")}</h2>
        {!app.bannerRequests.length ? (
          <p className="text-sm text-muted-foreground">{t("هنوز درخواستی نیست.", "No requests yet.")}</p>
        ) : (
          app.bannerRequests.map((item) => (
            <Glass key={item.id} className="flex flex-wrap items-center justify-between gap-2 p-3 text-sm">
              <div>
                <p className="font-semibold">{item.headline}</p>
                <p className="text-xs text-muted-foreground">{item.status} · {item.fileName || t("بدون فایل", "No file")}</p>
              </div>
              <div className="flex gap-2">
                {item.status === "pending" ? (
                  <>
                    <Button type="button" className="h-8" onClick={() => app.setBannerStatus(item.id, "approved")}>{t("تأیید آزمایشی", "Simulate approval")}</Button>
                    <Button type="button" variant="outline" className="h-8" onClick={() => { app.setBannerStatus(item.id, "rejected"); toast(t("رد شد و مبلغی کم نشد.", "Rejected. Nothing was charged.")); }}>{t("رد آزمایشی", "Simulate rejection")}</Button>
                  </>
                ) : null}
                {item.status === "approved" ? (
                  <Button type="button" className="h-8" onClick={() => { app.setBannerStatus(item.id, "live"); toast.success(t("پرداخت آزمایشی ثبت شد و بنر روی بورد آمد.", "Simulated payment recorded. The banner is on the board.")); }}>
                    {t("پرداخت و انتشار", "Pay and publish")}
                  </Button>
                ) : null}
              </div>
            </Glass>
          ))
        )}
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{t("درخواست بنر", "Banner request")}</DialogTitle>
            <DialogDescription>{t("پیش‌نیاز هر اندازه جداست. پیش‌نمایش را قبل از ثبت ببین.", "Each size has its own prerequisite. Preview before you submit.")}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <div className="flex flex-wrap gap-1">
              {BANNER_OFFERS.map((item) => (
                <button key={item.size} type="button" onClick={() => setSize(item.size)} className={cn("rounded-full px-2 py-1 text-[11px]", size === item.size ? "bg-primary text-primary-foreground" : "bg-muted")}>
                  {pick(item.name, app.lang)} · {formatToman(item.price, app.lang)}
                </button>
              ))}
            </div>
            <ul className="space-y-1 text-sm">
              {checks.map((item) => (
                <li key={item.en} className={item.ok ? "text-emerald-700 dark:text-emerald-200" : "text-rose-700 dark:text-rose-200"}>
                  {item.ok ? "✓" : "×"} {t(item.fa, item.en)}
                </li>
              ))}
            </ul>
            <Input className="h-10" value={headline} onChange={(event) => setHeadline(event.target.value)} placeholder={t("تیتر بنر", "Banner title")} />
            <Input className="h-10" value={subline} onChange={(event) => setSubline(event.target.value)} placeholder={t("یک خط توضیح", "One-line description")} />
            <Input
              className="h-10"
              type="file"
              accept="image/*"
              onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
            />
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" className="h-10" onClick={() => setPreview(true)} disabled={!headline.trim()}>
                {t("پیش‌نمایش", "Preview")}
              </Button>
              <Button
                type="button"
                className="h-10"
                disabled={!ready || !headline.trim()}
                onClick={() => {
                  if (!project) return;
                  app.addBannerRequest({
                    projectId: project.id,
                    size,
                    headline: headline.trim(),
                    subline: subline.trim(),
                    fileName,
                  });
                  setOpen(false);
                  setHeadline("");
                  setSubline("");
                  setFileName("");
                  toast.success(t("درخواست ثبت شد. تا تأیید، پرداختی نیست.", "Request sent. No payment until approval."));
                }}
              >
                {t("ثبت درخواست", "Submit request")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={preview} onOpenChange={setPreview}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("پیش‌نمایش بنر", "Banner preview")}</DialogTitle>
            <DialogDescription>{pick(offer.name, app.lang)} · {formatToman(offer.price, app.lang)}</DialogDescription>
          </DialogHeader>
          <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-fuchsia-700 p-5 text-white">
            <p className="text-2xl font-extrabold">{headline}</p>
            <p className="mt-2 text-sm text-white/80">{subline}</p>
            <p className="mt-4 text-xs text-white/70">{fileName || t("فایل هنوز انتخاب نشده", "No file selected yet")}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function MarketProfile({ id }: { id: string }) {
  const { lang, projects, bannerRequests } = useApp();
  const { t } = useT();
  const request = bannerRequests.find((item) => item.projectId === id || item.id === id);
  const project = projects.find((item) => item.id === id);
  const seed = SEED_BANNERS.find((item) => item.id === id);
  const title = project?.selectedName || project?.name || (seed ? (lang === "fa" ? seed.title : seed.titleEn) : request?.headline) || t("کسب‌وکار", "Business");
  const line = project?.clearGoal || (seed ? (lang === "fa" ? seed.line : seed.lineEn) : request?.subline) || "";
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-6 text-white">
        <p className="text-xs text-white/70">{t("صفحه معرفی", "Profile")}</p>
        <h1 className="mt-2 text-3xl font-extrabold">{title}</h1>
        <p className="mt-3 max-w-xl text-sm leading-7 text-white/85">{line}</p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <Glass className="p-4">
          <p className="text-xs text-muted-foreground">{t("نمونه‌کار", "Portfolio")}</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="aspect-square rounded-xl bg-gradient-to-br from-indigo-400/40 to-fuchsia-400/30" />
            ))}
          </div>
        </Glass>
        <Glass className="p-4 md:col-span-2">
          <p className="font-bold">{t("راه‌های ارتباط", "Contact")}</p>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            {t("دایرکت پیج، کانال تلگرام و فرم بریف. پاسخ داخل خود پلتفرم می‌ماند.", "The page inbox, a Telegram channel, and the brief form. Replies stay inside the platform.")}
          </p>
          <p className="mt-3 text-sm">{t("اشتراک معرفی: هفتگی و ماهانه، هم‌تراز تعرفه همان اندازه بنر.", "Listing term: weekly or monthly, at the same rate as that banner size.")}</p>
          <Link href="/marketplace" className="mt-4 inline-flex text-sm font-semibold text-indigo-600 dark:text-indigo-300">{t("بازگشت به بورد", "Back to the board")}</Link>
        </Glass>
      </div>
    </div>
  );
}
