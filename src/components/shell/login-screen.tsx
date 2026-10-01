"use client";

import { Button } from "@/components/ui/button";
import { useApp, useT } from "@/lib/store";

export function LoginScreen() {
  const { setAuthed, displayName } = useApp();
  const { t } = useT();
  return (
    <div className="grid min-h-dvh place-items-center px-4">
      <div className="glass w-full max-w-md p-6 text-center">
        <span className="mx-auto mb-4 grid size-16 place-items-center rounded-3xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white">
          <svg viewBox="0 0 24 24" className="size-7" aria-hidden>
            <path d="M5 16 12 4l7 12H5Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </span>
        <h1 className="text-2xl font-extrabold">{t("کسب‌وکارساز هوشمند", "AI Business OS")}</h1>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          {t(
            "این ورود آزمایشی است. با بازگشت، همان پروژه، توکن و گفتگوها سر جایشان می‌مانند.",
            "This sign-in is a prototype. Coming back keeps the same projects, tokens, and chats."
          )}
        </p>
        <Button type="button" className="mt-5 h-11 w-full" onClick={() => setAuthed(true)}>
          {t(`ورود به فضای ${displayName}`, `Enter ${displayName}'s workspace`)}
        </Button>
      </div>
    </div>
  );
}
