export type Lang = "fa" | "en";

export type Bi = Record<Lang, string>;

export const bi = (fa: string, en: string): Bi => ({ fa, en });

export const pick = (value: Bi | string, lang: Lang) =>
  typeof value === "string" ? value : value[lang];

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export function digits(value: string | number, lang: Lang) {
  const raw = String(value);
  if (lang !== "fa") return raw;
  return raw.replace(/\d/g, (d) => FA_DIGITS[Number(d)] ?? d);
}

export function formatNumber(value: number, lang: Lang) {
  const safe = Number.isFinite(value) ? Math.round(value) : 0;
  return digits(new Intl.NumberFormat("en-US").format(safe), lang);
}

export function formatPlanPrice(amount: string, lang: Lang) {
  const shown = digits(amount, lang);
  return lang === "fa" ? `${shown} تومان` : `${shown} Toman`;
}

export function formatToman(value: number, lang: Lang) {
  const amount = formatNumber(value, lang);
  return lang === "fa" ? `${amount} تومان` : `${amount} Toman`;
}

export function parseNumber(value: string) {
  const normalized = value
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[^\d.-]/g, "");
  const n = Number(normalized);
  return Number.isFinite(n) ? n : 0;
}

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function timeAgo(ts: number, lang: Lang) {
  const mins = Math.max(1, Math.round((Date.now() - ts) / 60000));
  if (mins < 60) {
    return lang === "fa" ? `${digits(mins, lang)} دقیقه پیش` : `${mins}m ago`;
  }
  const hours = Math.round(mins / 60);
  if (hours < 24) {
    return lang === "fa" ? `${digits(hours, lang)} ساعت پیش` : `${hours}h ago`;
  }
  const days = Math.round(hours / 24);
  return lang === "fa" ? `${digits(days, lang)} روز پیش` : `${days}d ago`;
}

export function hashString(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
