import { createI18n } from "vue-i18n";
import pl from "./locales/pl.json";
import en from "./locales/en.json";

export type SupportedLocale = "pl" | "en";

const SUPPORTED_LOCALES: SupportedLocale[] = ["pl", "en"];
const FALLBACK_LOCALE: SupportedLocale = "pl";

function detectLocale(): SupportedLocale {
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
