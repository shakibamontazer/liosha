"use client";

import { CreditCard, House, MessagesSquare, Store } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useT } from "@/lib/store";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/", icon: House, fa: "خانه", en: "Home" },
  { href: "/subscriptions", icon: CreditCard, fa: "اشتراک‌ها", en: "Plans" },
  { href: "/qa", icon: MessagesSquare, fa: "پرس‌وجو", en: "Q&A" },
  { href: "/marketplace", icon: Store, fa: "بیزنس من", en: "My Business" },
];

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useT();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/90 px-2 pb-[max(0.4rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden">
      <ul className="mx-auto grid max-w-lg grid-cols-4">
        {ITEMS.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 text-[11px] font-medium",
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
