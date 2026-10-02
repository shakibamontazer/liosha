"use client";

import {
  BadgeCheck,
  ChartColumn,
  CreditCard,
  FolderKanban,
  House,
  Info,
  LogOut,
  Newspaper,
  Sparkles,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PLANS } from "@/lib/catalog";
import { formatStoredPhone } from "@/lib/phone";
import { progressOf } from "@/lib/progress";
import { useApp, useT } from "@/lib/store";
import { formatNumber, pick } from "@/lib/text";
import { cn } from "@/lib/utils";

const HOME = { href: "/", icon: House, fa: "خانه", en: "Home" };

const LINKS = [
  { href: "/me", icon: UserRound, fa: "اطلاعات من", en: "My info" },
  { href: "/about", icon: Info, fa: "درباره ما", en: "About" },
  { href: "/services", icon: Sparkles, fa: "خدمات", en: "Services" },
  { href: "/articles", icon: Newspaper, fa: "مقالات", en: "Articles" },
  { href: "/work", icon: FolderKanban, fa: "کار من", en: "My work" },
  { href: "/progress", icon: ChartColumn, fa: "وضعیت پروژه‌ها", en: "Project status" },
  { href: "/account", icon: BadgeCheck, fa: "اشتراک من", en: "My subscription" },
  { href: "/subscriptions", icon: CreditCard, fa: "خرید اشتراک", en: "Buy a plan" },
];

export function SidebarBody({ onNavigate, showHome = false }: { onNavigate?: () => void; showHome?: boolean }) {
  const pathname = usePathname();
  const { displayName, intake, plan, projects, daysLeft, lang, signOut, resetDemo } = useApp();
  const { t } = useT();
  const meta = PLANS.find((item) => item.id === plan);
  const links = showHome ? [HOME, ...LINKS] : LINKS;

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border/70 p-4">
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm font-bold text-white">
            {displayName.slice(0, 1)}
          </span>
          <div className="min-w-0">
            <p className="truncate font-bold">{displayName}</p>
            <p dir="ltr" className="truncate text-end text-xs text-muted-foreground">
              {intake?.phone ? formatStoredPhone(intake.phone) : t("حساب کاربری", "Account")}
            </p>
          </div>
        </div>
        <div className="mt-3 rounded-2xl bg-indigo-500/10 px-3 py-2 text-xs leading-5">
          <p className="font-semibold">{daysLeft > 0 && meta ? pick(meta.name, lang) : t("بدون اشتراک فعال", "No active plan")}</p>
          <p className="text-muted-foreground">
            {formatNumber(daysLeft, lang)} {t("روز مانده", "days left")}
          </p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-2 rounded-2xl px-3 py-2.5 text-sm font-medium",
                active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              )}
            >
              <Icon className="size-4" />
              {t(link.fa, link.en)}
            </Link>
          );
        })}
        <div className="mt-4 space-y-2 px-1">
          <p className="text-xs font-semibold text-muted-foreground">{t("پیشرفت پروژه‌ها", "Project progress")}</p>
          {projects.map((project) => (
            <div key={project.id}>
              <div className="mb-1 flex justify-between text-[11px]">
                <span className="truncate">{project.name}</span>
                <span className="num">{formatNumber(progressOf(project), lang)}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-gradient-to-l from-fuchsia-500 to-indigo-500" style={{ width: `${progressOf(project)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </nav>
      <div className="space-y-2 border-t border-border/70 p-3">
        <button
          type="button"
          onClick={() => {
            signOut();
            onNavigate?.();
          }}
          className="flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-sm font-medium hover:bg-muted"
        >
          <LogOut className="size-4" />
          {t("خروج", "Log out")}
        </button>
        <button type="button" onClick={resetDemo} className="w-full px-3 text-start text-[11px] text-muted-foreground underline-offset-2 hover:underline">
          {t("بازنشانی داده‌های آزمایشی", "Reset demo data")}
        </button>
      </div>
    </div>
  );
}
