"use client";

import { CreditCard, FolderKanban, House, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useT } from "@/lib/store";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/", icon: House, fa: "خانه", en: "Home" },
  { href: "/account", icon: Wallet, fa: "کیف پول", en: "Wallet" },
  { href: "/subscriptions", icon: CreditCard, fa: "خرید اشتراک", en: "Buy a plan" },
  { href: "/work", icon: FolderKanban, fa: "کار من", en: "My work" },
];

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useT();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/90 px-2 pb-[max(0.4rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:start-72">
      <ul className="mx-auto grid max-w-lg grid-cols-4">
        {ITEMS.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-0.5 py-2 text-center text-[10px] font-medium leading-tight sm:text-[11px]",
                  active ? "text-indigo-600 dark:text-indigo-300" : "text-muted-foreground"
                )}
              >
                <Icon className={cn("size-5", active && "fill-indigo-500/15")} />
                {t(item.fa, item.en)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
