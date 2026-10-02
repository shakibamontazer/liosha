"use client";

import { Check, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Glass, PageIntro } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PLAN_SERVICES, PLANS, TOKEN_RATES } from "@/lib/catalog";
import { useApp, useT } from "@/lib/store";
import { formatNumber, formatPlanPrice, pick, timeAgo } from "@/lib/text";
import type { PlanId } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PlansView() {
  const app = useApp();
  const { t } = useT();
  const [picked, setPicked] = useState<PlanId | null>(null);
  const plan = PLANS.find((item) => item.id === picked);

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow={t("مدل استارباکسی", "Three-level plans")}
        title={t("خرید اشتراک", "Buy a plan")}
        description={t(
          "سه پلن یک‌ماهه. قیمت با همان واحد تومان بقیهٔ لیوشا نشان داده می‌شود. فعال‌سازی اینجا هنوز به درگاه وصل نیست.",
          "Three monthly plans. The price uses the same toman unit as the rest of Liosha. Activation here is not connected to a payment gateway."
        )}
      />
      <div className="grid gap-3 lg:grid-cols-3">
        {PLANS.map((item) => (
          <Glass key={item.id} className="flex flex-col p-4">
            {app.plan === item.id && app.daysLeft > 0 ? <span className="mb-2 w-fit rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px]">{t("پلن فعلی", "Current plan")}</span> : null}
            <h2 className="text-xl font-extrabold">{pick(item.name, app.lang)}</h2>
            <p className="text-xs text-muted-foreground">{pick(item.tagline, app.lang)}</p>
            <p className="mt-3 text-xs font-semibold text-indigo-700 dark:text-indigo-200">{t("قیمت یک ماه", "One-month price")}</p>
            <p className="num text-2xl font-extrabold">{formatPlanPrice(item.monthly, app.lang)}</p>
            <ul className="mt-3 space-y-2 text-sm leading-6">
              {PLAN_SERVICES.map((service) => {
                const included = item.includes.includes(service.id);
                return (
                  <li key={service.id} className={cn("flex items-start gap-2", included ? "text-foreground" : "text-muted-foreground/70")}>
                    {included ? <Check className="mt-1 size-4 text-emerald-600" aria-hidden /> : <X className="mt-1 size-4" aria-hidden />}
                    <span>
                      {pick(service.label, app.lang)}
                      <span className="sr-only">{included ? t("، شامل این پلن", ", included") : t("، شامل این پلن نیست", ", not included")}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
            <Button type="button" className="mt-4 h-10" onClick={() => setPicked(item.id)}>
              {app.plan === item.id && app.daysLeft > 0 ? t("تمدید آزمایشی", "Renew in the prototype") : t("انتخاب", "Choose")}
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
              {plan ? `${t("قیمت یک ماه", "One-month price")}: ${formatPlanPrice(plan.monthly, app.lang)}` : ""}
            </DialogDescription>
          </DialogHeader>
          <Button
            type="button"
            className="h-11"
            onClick={() => {
              if (!plan) return;
              app.setPlan(plan.id, 1);
              setPicked(null);
              toast.success(t("پلن به‌صورت آزمایشی برای یک ماه فعال شد. پرداخت واقعی انجام نشده.", "The plan was activated for one month in this prototype. No real payment was taken."));
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
        description={t("روزهای استفاده‌نشده ذخیره نمی‌شود. پرداخت واقعی به این صفحه وصل نیست.", "Unused days are not banked. Real payment is not connected to this page.")}
      />
      <div className="grid gap-3 sm:grid-cols-3">
        <Glass className="p-4">
          <p className="text-xs text-muted-foreground">{t("پلن", "Plan")}</p>
          <p className="text-2xl font-extrabold">{app.daysLeft > 0 ? pick(plan.name, app.lang) : t("بدون اشتراک فعال", "No active plan")}</p>
        </Glass>
        <Glass className="p-4">
          <p className="text-xs text-muted-foreground">{t("روز مانده", "Days left")}</p>
          <p className="text-2xl font-extrabold num">{formatNumber(app.daysLeft, app.lang)}</p>
          <p className="text-xs text-muted-foreground">{app.daysLeft > 0 ? t("یک ماهه", "One month") : t("هنوز پلنی فعال نشده.", "No plan is active yet.")}</p>
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
