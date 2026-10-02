"use client";

import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider, useApp } from "@/lib/store";

function ToasterBridge() {
  const { lang } = useApp();
  return (
    <Toaster
      position="top-center"
      dir={lang === "fa" ? "rtl" : "ltr"}
      richColors
      closeButton
    />
  );
}

function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (process.env.NEXT_PUBLIC_BASE_PATH) return;
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <TooltipProvider>
        <AppProvider>
          <ServiceWorker />
          {children}
          <ToasterBridge />
        </AppProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
