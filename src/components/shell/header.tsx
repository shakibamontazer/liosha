"use client";

import { Coins, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useApp, useT } from "@/lib/store";
import { formatNumber } from "@/lib/text";

export function Header({ onMenu }: { onMenu: () => void }) {
  const { tokens, daysLeft, lang, setLang } = useApp();
  const { t } = useT();
  const { setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/75 backdrop-blur-xl">
      <div className="flex items-center gap-2 px-3 py-2.5 lg:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/30">
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
              <path d="M5 16 12 4l7 12H5Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="14" r="1.3" fill="#FBBF24" />
            </svg>
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-extrabold sm:text-base">
              {t("کسب‌وکارساز هوشمند", "AI Business OS")}
            </span>
            <span className="hidden text-[11px] text-muted-foreground sm:block">
              {t("سیستم‌عامل ساخت کسب‌وکار", "The operating system for a new business")}
            </span>
          </span>
        </Link>
        <div className="ms-auto flex items-center gap-1.5">
          <div className="hidden items-center rounded-full border border-border bg-background/70 p-0.5 text-[11px] font-semibold sm:flex">
            <button
              type="button"
              onClick={() => setLang("fa")}
              className={`rounded-full px-2 py-1 ${lang === "fa" ? "bg-primary text-primary-foreground" : ""}`}
            >
              فا
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`rounded-full px-2 py-1 ${lang === "en" ? "bg-primary text-primary-foreground" : ""}`}
            >
              EN
            </button>
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-9"
            onClick={() => {
              const dark = document.documentElement.classList.contains("dark");
              setTheme(dark ? "light" : "dark");
            }}
            aria-label={t("تغییر روشن و تیره", "Toggle color theme")}
          >
            <Sun className="hidden dark:block" />
            <Moon className="dark:hidden" />
          </Button>
          <Link
            href="/account"
            className="inline-flex h-9 items-center gap-1 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2.5 text-xs font-semibold text-indigo-800 dark:text-indigo-100"
          >
            <Coins className="size-3.5" />
            <span className="num">{formatNumber(tokens, lang)}</span>
            <span className="hidden md:inline">{t("توکن", "tokens")}</span>
            <span className="hidden text-muted-foreground lg:inline">
              · {formatNumber(daysLeft, lang)} {t("روز", "days")}
            </span>
          </Link>
          <Button type="button" variant="outline" size="icon" className="size-9 lg:hidden" onClick={onMenu} aria-label={t("باز کردن منو", "Open menu")}>
            <Menu />
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2 px-3 pb-2 sm:hidden">
        <div className="flex items-center rounded-full border border-border p-0.5 text-[11px] font-semibold">
          <button type="button" onClick={() => setLang("fa")} className={`rounded-full px-2 py-1 ${lang === "fa" ? "bg-primary text-primary-foreground" : ""}`}>فا</button>
          <button type="button" onClick={() => setLang("en")} className={`rounded-full px-2 py-1 ${lang === "en" ? "bg-primary text-primary-foreground" : ""}`}>EN</button>
        </div>
        <span className="text-[11px] text-muted-foreground">
          {formatNumber(daysLeft, lang)} {t("روز از اشتراک مانده", "days left on the plan")}
        </span>
      </div>
    </header>
  );
}
