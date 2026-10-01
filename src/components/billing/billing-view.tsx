"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Glass, PageIntro } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PLANS, TOKEN_RATES } from "@/lib/catalog";
import { useApp, useT } from "@/lib/store";
import { formatNumber, formatToman, pick, timeAgo } from "@/lib/text";
import type { BillingMonths, PlanId } from "@/lib/types";
import { cn } from "@/lib/utils";

const MONTHS: BillingMonths[] = [1, 3, 12];

export function PlansView() {
  const app = useApp();
  const { t } = useT();
  const [months, setMonths] = useState<BillingMonths>(1);
  const [picked, setPicked] = useState<PlanId | null>(null);
  const plan = PLANS.find((item) => item.id === picked);

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow={t("مدل استارباکسی", "Three-level plans")}
        title={t("خرید اشتراک", "Buy a plan")}
        description={t(
          "پایه، محبوب و پیشرفته. فعال‌سازی اینجا آزمایشی است و توکن پلن را به موجودی اضافه می‌کند.",
          "Base, Pro, and VIP. Activation here is a prototype and adds that plan’s tokens to the balance."
        )}
      />
      <div className="flex gap-2">
        {MONTHS.map((item) => (
          <button key={item} type="button" onClick={() => setMonths(item)} className={cn("rounded-full px-3 py-1.5 text-xs font-semibold", months === item ? "bg-primary text-primary-foreground" : "bg-muted")}>
            {item === 1 ? t("۱ ماهه", "1 month") : item === 3 ? t("۳ ماهه", "3 months") : t("۱ ساله", "1 year")}
          </button>
        ))}
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        {PLANS.map((item) => (
          <Glass key={item.id} className={cn("flex flex-col p-4", item.popular && "ring-2 ring-indigo-400")}>
            {item.popular ? <span className="mb-2 w-fit rounded-full bg-indigo-500/15 px-2 py-0.5 text-[11px] font-semibold">{t("محبوب", "Popular")}</span> : null}
            {app.plan === item.id ? <span className="mb-2 w-fit rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px]">{t("پلن فعلی", "Current plan")}</span> : null}
            <h2 className="text-xl font-extrabold">{pick(item.name, app.lang)}</h2>
            <p className="text-xs text-muted-foreground">{pick(item.tagline, app.lang)}</p>
            <p className="mt-3 text-lg font-bold">{formatToman(item.prices[months], app.lang)}</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
              <li>{pick(item.ai, app.lang)}</li>
              <li>{formatNumber(item.tokens, app.lang)} {t("توکن در ماه", "tokens / month")}</li>
              <li>{pick(item.mentor, app.lang)}</li>
              <li>{pick(item.support, app.lang)}</li>
            </ul>
            <Button type="button" className="mt-4 h-10" onClick={() => setPicked(item.id)}>
              {app.plan === item.id ? t("تمدید آزمایشی", "Renew in the prototype") : t("انتخاب", "Choose")}
            </Button>
          </Glass>
        ))}
      </div>
      <Glass className="overflow-x-auto p-4">
        <h2 className="mb-3 font-bold">{t("اقتصاد توکن", "Token rates")}</h2>
        <table className="w-full min-w-[28rem] text-sm">
          <tbody>
            {TOKEN_RATES.map((rate) => (
              <tr key={rate.id} className="border-t border-border/70">
                <td className="py-2">{pick(rate.label, app.lang)}</td>
                <td className="py-2 text-end text-muted-foreground">{pick(rate.cost, app.lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-xs leading-6 text-muted-foreground">
          {t("دوره پیشرفته، در مدل واقعی، ۲۰٪ تخفیف اشتراک بعدی دارد. در این پروتوتایپ گواهی صادر نمی‌شود.", "In the real model, finishing the advanced course gives 20% off the next plan. This prototype issues no certificate.")}
        </p>
      </Glass>
      <Dialog open={Boolean(plan)} onOpenChange={(value) => !value && setPicked(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{plan ? pick(plan.name, app.lang) : ""}</DialogTitle>
            <DialogDescription>
              {plan ? formatToman(plan.prices[months], app.lang) : ""} · {formatNumber(plan?.tokens ?? 0, app.lang)} {t("توکن", "tokens")}
            </DialogDescription>
          </DialogHeader>
          <Button
            type="button"
            className="h-11"
            onClick={() => {
              if (!plan) return;
              app.setPlan(plan.id, months);
              setPicked(null);
              toast.success(t("پلن آزمایشی فعال شد و توکن اضافه شد.", "Prototype plan activated and tokens were added."));
            }}
          >
            {t("فعال‌سازی آزمایشی", "Activate in the prototype")}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function AccountView() {
  const app = useApp();
  const { t } = useT();
  const plan = PLANS.find((item) => item.id === app.plan)!;
  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow={t("وضعیت حساب", "Account")}
        title={t("اشتراک من", "My subscription")}
        description={pick(plan.mentor, app.lang)}
      />
      <div className="grid gap-3 sm:grid-cols-3">
        <Glass className="p-4">
          <p className="text-xs text-muted-foreground">{t("پلن", "Plan")}</p>
          <p className="text-2xl font-extrabold">{pick(plan.name, app.lang)}</p>
        </Glass>
        <Glass className="p-4">
          <p className="text-xs text-muted-foreground">{t("روز مانده", "Days left")}</p>
          <p className="text-2xl font-extrabold num">{formatNumber(app.daysLeft, app.lang)}</p>
          <p className="text-xs text-muted-foreground">{t("روز استفاده‌نشده ذخیره نمی‌شود.", "Unused days are not banked.")}</p>
        </Glass>
        <Glass className="p-4">
          <p className="text-xs text-muted-foreground">{t("توکن", "Tokens")}</p>
          <p className="text-2xl font-extrabold num">{formatNumber(app.tokens, app.lang)}</p>
        </Glass>
      </div>
      <Glass className="space-y-2 p-4">
        <h2 className="font-bold">{t("احراز هویت", "Identity")}</h2>
        <p className="text-sm text-muted-foreground">
          {app.kyc === "verified" ? t("کامل", "Verified") : app.kyc === "basic" ? t("پایه", "Basic") : t("ندارد", "None")}
        </p>
        {app.kyc !== "verified" ? (
          <Button type="button" variant="outline" className="h-10" onClick={() => app.setKyc("verified")}>
            {t("تکمیل آزمایشی احراز هویت", "Simulate full identity check")}
          </Button>
        ) : null}
      </Glass>
      <Glass className="p-4">
        <h2 className="mb-2 font-bold">{t("گردش توکن", "Token ledger")}</h2>
        <ul className="space-y-2 text-sm">
          {app.ledger.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3">
              <span>{pick(item.label, app.lang)} <span className="text-xs text-muted-foreground">{timeAgo(item.at, app.lang)}</span></span>
              <span className={cn("num", item.amount < 0 ? "text-rose-600" : "text-emerald-600")}>{formatNumber(item.amount, app.lang)}</span>
            </li>
          ))}
        </ul>
      </Glass>
    </div>
  );
}
