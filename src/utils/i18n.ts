import { createI18n } from "vue-i18n";
import pl from "./locales/pl.json";
import en from "./locales/en.json";

export type SupportedLocale = "pl" | "en";

export const SUPPORTED_LOCALES: SupportedLocale[] = ["pl", "en"];
export const FALLBACK_LOCALE: SupportedLocale = "pl";
export const LOCALE_STORAGE_KEY = "locale";

function detectLocale(): SupportedLocale {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (SUPPORTED_LOCALES.includes(stored as SupportedLocale)) {
    return stored as SupportedLocale;
  }

  const browserLanguage = navigator.language.slice(0, 2).toLowerCase();
  return SUPPORTED_LOCALES.includes(browserLanguage as SupportedLocale)
    ? (browserLanguage as SupportedLocale)
    : FALLBACK_LOCALE;
}

export const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: FALLBACK_LOCALE,
  messages: { pl, en },
});
