export type SupportedLocale = "pl" | "en";

/** Parsuje "YYYY-MM-DD" na lokalną datę (bez przesunięcia strefy czasowej jak przy `new Date(string)`). */
function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function pluralPl(n: number, forms: [string, string, string]): string {
  if (n === 1) return forms[0];
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return forms[1];
  return forms[2];
}

/** Liczba miesięcy (min. 1) pomiędzy `dateFrom` a `dateTo` (albo dziś, gdy `dateTo` to null — trwające stanowisko). */
export function monthsBetween(dateFrom: string, dateTo: string | null): number {
  const from = parseDate(dateFrom);
  const to = dateTo ? parseDate(dateTo) : new Date();
  return Math.max(1, (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth()) + 1);
}

export function formatDuration(totalMonths: number, locale: SupportedLocale): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];

  if (locale === "pl") {
    if (years > 0) parts.push(`${years} ${pluralPl(years, ["rok", "lata", "lat"])}`);
    if (months > 0 || years === 0) parts.push(`${months} mies.`);
  } else {
    if (years > 0) parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
    if (months > 0 || years === 0) parts.push(`${months} ${months === 1 ? "mo" : "mos"}`);
  }

  return parts.join(" ");
}

export function formatMonthYear(dateStr: string, locale: SupportedLocale): string {
  return new Intl.DateTimeFormat(locale, { month: "short", year: "numeric" }).format(parseDate(dateStr));
}

export function formatDateRange(
  dateFrom: string | null,
  dateTo: string | null,
  locale: SupportedLocale,
  presentLabel: string
): string {
  if (!dateFrom) return "";
  const from = formatMonthYear(dateFrom, locale);
  const to = dateTo ? formatMonthYear(dateTo, locale) : presentLabel;
  return `${from} – ${to}`;
}
