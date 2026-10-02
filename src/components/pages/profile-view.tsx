"use client";

import Link from "next/link";
import { Glass, PageIntro } from "@/components/shared";
import { COUNTRIES, formatStoredPhone } from "@/lib/phone";
import { nextStep, progressOf } from "@/lib/progress";
import { STEPS } from "@/lib/catalog";
import { useApp, useT } from "@/lib/store";
import { formatNumber, pick } from "@/lib/text";

export function ProfileView() {
  const { intake, projects, displayName, lang } = useApp();
  const { t } = useT();
  const country = COUNTRIES.find((item) => item.iso === intake?.country);
  const countryName = country ? (lang === "fa" ? country.fa : country.en) : t("ثبت نشده", "Not set");

  return (
    <div className="space-y-4">
      <PageIntro
        eyebrow={t("حساب همین دستگاه", "This device")}
        title={t("اطلاعات من", "My info")}
        description={t(
          "این اطلاعات فقط برای حسابی است که روی همین مرورگر وارد شده. سرور جداگانه‌ای برای کاربران وجود ندارد.",
          "This is the account signed in on this browser. There is no separate user server."
        )}
      />
      <Glass className="grid gap-3 p-4 sm:grid-cols-2">
        <div>
          <p className="text-xs text-muted-foreground">{t("نام", "Name")}</p>
          <p className="text-lg font-extrabold">{displayName}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{t("کشور", "Country")}</p>
          <p className="text-lg font-bold">{countryName}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{t("شماره تلفن", "Phone")}</p>
          <p className="num text-lg font-bold">{intake ? formatStoredPhone(intake.phone) : t("ثبت نشده", "Not set")}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{t("کد اختصاصی", "Personal code")}</p>
          <p className="text-lg font-bold">{intake?.code || t("ثبت نشده", "Not set")}</p>
        </div>
      </Glass>
      <section className="space-y-3">
        <h2 className="font-extrabold">{t("پروژه‌های من", "My projects")}</h2>
        {!projects.length ? (
          <Glass className="p-4 text-sm">
            <p>{t("هنوز پروژه‌ای برای این حساب ثبت نشده.", "This account has no projects yet.")}</p>
            <Link href="/work" className="mt-2 inline-flex text-sm font-semibold text-indigo-600 dark:text-indigo-300">
              {t("ساخت پروژه", "Create a project")}
            </Link>
          </Glass>
        ) : (
          projects.map((project) => {
            const step = nextStep(project);
            return (
              <Glass key={project.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{pick(STEPS[step].title, lang)}</p>
                  </div>
                  <span className="num text-sm font-semibold">{formatNumber(progressOf(project), lang)}%</span>
                </div>
                <Link href={`/business?step=${step}`} className="mt-3 inline-flex text-sm font-semibold text-indigo-600 dark:text-indigo-300">
                  {t("ادامه پروژه", "Continue")}
                </Link>
              </Glass>
            );
          })
        )}
      </section>
    </div>
  );
}
