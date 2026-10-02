import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";

export type CountryOption = {
  iso: CountryCode;
  dial: string;
  fa: string;
  en: string;
};

const faNames = new Intl.DisplayNames(["fa"], { type: "region" });
const enNames = new Intl.DisplayNames(["en"], { type: "region" });

export const COUNTRIES: CountryOption[] = getCountries()
  .map((iso) => {
    const fa = faNames.of(iso);
    const en = enNames.of(iso);
    if (!fa || !en) return null;
    return { iso, dial: getCountryCallingCode(iso), fa, en };
  })
  .filter((item): item is CountryOption => Boolean(item))
  .sort((a, b) => a.fa.localeCompare(b.fa, "fa"));

export function countryFlag(iso: string) {
  return iso
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

export function validatePhone(iso: CountryCode, national: string) {
  const trimmed = national.trim();
  if (!trimmed) return { ok: false as const };
  const parsed = parsePhoneNumberFromString(trimmed, iso);
  if (!parsed || parsed.country !== iso || !parsed.isValid()) return { ok: false as const };
  return {
    ok: true as const,
    e164: parsed.number,
    international: parsed.formatInternational(),
  };
}

export function formatStoredPhone(e164: string) {
  const parsed = parsePhoneNumberFromString(e164);
  return parsed?.formatInternational() ?? e164;
}
