"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { COUNTRIES, countryFlag, type CountryOption } from "@/lib/phone";
import type { Lang } from "@/lib/text";
import type { CountryCode } from "libphonenumber-js";
import { cn } from "@/lib/utils";

export function PhoneField({
  lang,
  country,
  onCountry,
  national,
  onNational,
  phoneError,
  countryError,
}: {
  lang: Lang;
  country: CountryCode | "";
  onCountry: (iso: CountryCode) => void;
  national: string;
  onNational: (value: string) => void;
  phoneError?: string;
  countryError?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const selected = COUNTRIES.find((item) => item.iso === country);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter((item) => {
      const name = lang === "fa" ? item.fa : item.en;
      return (
        name.toLowerCase().includes(q) ||
        item.en.toLowerCase().includes(q) ||
        item.fa.includes(query.trim()) ||
        item.iso.toLowerCase().includes(q) ||
        item.dial.includes(q.replace("+", ""))
      );
    });
  }, [lang, query]);

  const label = (item: CountryOption) => (lang === "fa" ? item.fa : item.en);

  return (
    <div className="grid gap-3">
      <div className="grid gap-1.5 text-sm">
        <span className="font-medium" id="country-label">
          {lang === "fa" ? "کشور" : "Country"}
        </span>
        <div className="relative">
          <button
            type="button"
            className="flex h-11 w-full items-center justify-between rounded-lg border border-input bg-transparent px-3 text-start dark:bg-input/30"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-labelledby="country-label"
            onClick={() => setOpen((value) => !value)}
          >
            <span className={selected ? "" : "text-muted-foreground"}>
              {selected
                ? `${countryFlag(selected.iso)} ${label(selected)}`
                : lang === "fa"
                  ? "کشور را انتخاب کن"
                  : "Choose a country"}
            </span>
            <span className="num text-xs text-muted-foreground">{selected ? `+${selected.dial}` : ""}</span>
          </button>
          {open ? (
            <div className="absolute z-30 mt-1 w-full rounded-2xl border border-border bg-popover p-2 text-popover-foreground shadow-xl">
              <Input
                className="h-10"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label={lang === "fa" ? "جستجوی کشور" : "Search countries"}
                placeholder={lang === "fa" ? "نام کشور یا کد" : "Name or code"}
              />
              <ul role="listbox" aria-labelledby="country-label" className="mt-2 max-h-52 overflow-y-auto">
                {filtered.length ? (
                  filtered.map((item) => (
                    <li key={item.iso}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={item.iso === country}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl px-2 py-2 text-start text-sm hover:bg-muted",
                          item.iso === country && "bg-indigo-500/10"
                        )}
                        onClick={() => {
                          onCountry(item.iso);
                          setOpen(false);
                          setQuery("");
                        }}
                      >
                        <span>
                          {countryFlag(item.iso)} {label(item)}
                        </span>
                        <span className="num text-xs text-muted-foreground">+{item.dial}</span>
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="px-2 py-3 text-sm text-muted-foreground">
                    {lang === "fa" ? "کشوری پیدا نشد." : "No country found."}
                  </li>
                )}
              </ul>
            </div>
          ) : null}
        </div>
        {countryError ? <p className="text-sm text-destructive">{countryError}</p> : null}
      </div>
      <label className="grid gap-1.5 text-sm">
        <span className="font-medium">{lang === "fa" ? "شماره تلفن" : "Phone number"}</span>
        <div className="flex gap-2">
          <span className="num grid h-11 min-w-16 place-items-center rounded-lg border border-input px-2 text-sm">
            {selected ? `+${selected.dial}` : "+"}
          </span>
          <Input
            className="h-11"
            dir="ltr"
            inputMode="tel"
            autoComplete="tel-national"
            aria-invalid={Boolean(phoneError)}
            value={national}
            onChange={(event) => onNational(event.target.value)}
            placeholder={lang === "fa" ? "شماره بدون کد کشور" : "Number without the country code"}
          />
        </div>
        {phoneError ? <p className="text-sm text-destructive">{phoneError}</p> : null}
      </label>
    </div>
  );
}
