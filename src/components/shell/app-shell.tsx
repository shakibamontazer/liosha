"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { LoginScreen } from "@/components/shell/login-screen";
import { Header } from "@/components/shell/header";
import { SidebarBody } from "@/components/shell/sidebar";
import { BottomNav } from "@/components/shell/bottom-nav";
import { StoryBar, StoryViewer } from "@/components/shell/story-bar";
import { SupportDock } from "@/components/shell/support-dock";
import { useApp, useT } from "@/lib/store";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { authed, lang } = useApp();
  const { t } = useT();
  const [menu, setMenu] = useState(false);

  if (!authed) return <LoginScreen />;

  return (
    <div className="relative min-h-dvh">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 start-[-4rem] size-80 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute top-1/3 end-[-5rem] size-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute bottom-0 start-1/3 size-72 rounded-full bg-violet-500/10 blur-3xl" />
      </div>
      <aside className="fixed inset-y-0 start-0 z-30 hidden w-72 border-e border-border/70 bg-sidebar/90 backdrop-blur-xl lg:block">
        <SidebarBody />
      </aside>
      <div className="lg:ps-72">
        <Header onMenu={() => setMenu(true)} />
        <StoryBar />
        <main id="main" className="mx-auto w-full max-w-6xl px-4 py-5 pb-28 lg:px-6 lg:pb-16">
          {children}
        </main>
      </div>
      <BottomNav />
      <SupportDock />
      <StoryViewer />
      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetContent side={lang === "fa" ? "right" : "left"} className="w-[min(22rem,92vw)] p-0 sm:max-w-none">
          <SheetTitle className="sr-only">{t("منو", "Menu")}</SheetTitle>
          <SidebarBody onNavigate={() => setMenu(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
