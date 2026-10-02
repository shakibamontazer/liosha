"use client";

import { STORIES } from "@/lib/catalog";
import { useApp } from "@/lib/store";
import { pick } from "@/lib/text";
import { cn } from "@/lib/utils";

export function StoryBar() {
  const { lang, seenStories, openStory } = useApp();
  return (
    <div className="border-b border-border/60 bg-background/40">
      <div className="flex gap-3 overflow-x-auto px-4 py-3 [scrollbar-width:none] max-sm:grid max-sm:grid-cols-4 max-sm:gap-x-2 max-sm:overflow-visible lg:flex lg:gap-3 lg:overflow-x-auto lg:px-6 [&::-webkit-scrollbar]:hidden">
        {STORIES.map((story) => {
          const seen = seenStories.includes(story.id);
          return (
            <button
              key={story.id}
              type="button"
              onClick={() => openStory(story.id)}
              className="w-24 shrink-0 text-center max-sm:w-auto"
            >
              <span
                className={cn(
                  "mx-auto grid size-14 place-items-center rounded-full p-[2px]",
                  story.kind === "official" ? "story-ring-edu" : "story-ring-win",
                  seen && "opacity-55"
                )}
              >
                <span className="grid size-full place-items-center rounded-full bg-background text-xs font-bold">
                  {pick(story.author, lang).slice(0, 1)}
                </span>
              </span>
              <span className="mt-1 block text-balance text-xs font-semibold leading-4 text-foreground max-sm:break-words">
                {pick(story.title, lang)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function StoryViewer() {
  const { ui, openStory, seeStory, lang } = useApp();
  const index = STORIES.findIndex((story) => story.id === ui.storyId);
  const story = STORIES[index];

  if (!story) return null;

  const go = (next: number) => {
    seeStory(story.id);
    const item = STORIES[next];
    if (!item) {
      openStory(null);
      return;
    }
    openStory(item.id);
  };

  return (
    <div className="fixed inset-0 z-[70] bg-slate-950 text-white">
      <div className="mx-auto flex h-full max-w-lg flex-col px-4 py-4">
        <div className="mb-4 flex gap-1">
          {STORIES.map((item, i) => (
            <span key={item.id} className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
              <span className={cn("block h-full bg-white", i <= index ? "w-full" : "w-0")} />
            </span>
          ))}
        </div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-white/60">
              {story.kind === "official"
                ? lang === "fa"
                  ? "آموزش رسمی"
                  : "Official lesson"
                : lang === "fa"
                  ? "نتیجه کاربران"
                  : "User result"}
            </p>
            <p className="font-semibold">{pick(story.author, lang)}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              seeStory(story.id);
              openStory(null);
            }}
            className="rounded-full bg-white/10 px-3 py-1.5 text-sm"
          >
            {lang === "fa" ? "بستن" : "Close"}
          </button>
        </div>
        <div className="flex flex-1 flex-col justify-end rounded-[2rem] bg-[radial-gradient(circle_at_top,#6366f1,transparent_45%),linear-gradient(180deg,#1e1b4b,#020617)] p-6">
          {story.stat ? (
            <p className="mb-3 w-fit rounded-full bg-white/15 px-3 py-1 text-xs">{pick(story.stat, lang)}</p>
          ) : null}
          <h2 className="text-2xl font-extrabold leading-10">{pick(story.title, lang)}</h2>
          <p className="mt-3 text-sm leading-7 text-white/80">{pick(story.body, lang)}</p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button type="button" className="h-11 rounded-2xl bg-white/10" onClick={() => go(index - 1)}>
            {lang === "fa" ? "قبلی" : "Previous"}
          </button>
          <button type="button" className="h-11 rounded-2xl bg-white text-slate-950" onClick={() => go(index + 1)}>
            {lang === "fa" ? "بعدی" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
