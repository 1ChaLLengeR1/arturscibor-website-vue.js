import { ref } from "vue";

export type ThemePreference = "light" | "dark" | "auto";
export type EffectiveTheme = "light" | "dark";

export const SUPPORTED_THEMES: ThemePreference[] = ["light", "dark", "auto"];
export const DEFAULT_THEME: ThemePreference = "auto";
/** Keep in sync with the inline theme script in index.html. */
export const THEME_STORAGE_KEY = "theme";

const DARK_MEDIA_QUERY = "(prefers-color-scheme: dark)";

function getStoredThemePreference(): ThemePreference {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return SUPPORTED_THEMES.includes(stored as ThemePreference) ? (stored as ThemePreference) : DEFAULT_THEME;
}

function resolveEffectiveTheme(preference: ThemePreference): EffectiveTheme {
  if (preference === "light" || preference === "dark") {
    return preference;
  }
  return window.matchMedia(DARK_MEDIA_QUERY).matches ? "dark" : "light";
}

export const themePreference = ref<ThemePreference>(getStoredThemePreference());

function applyTheme(preference: ThemePreference): void {
  document.documentElement.setAttribute("data-theme", resolveEffectiveTheme(preference));
}

export function setThemePreference(preference: ThemePreference): void {
  if (!SUPPORTED_THEMES.includes(preference)) return;
  themePreference.value = preference;
  localStorage.setItem(THEME_STORAGE_KEY, preference);
  applyTheme(preference);
}

export function initTheme(): void {
  applyTheme(themePreference.value);
  window.matchMedia(DARK_MEDIA_QUERY).addEventListener("change", () => {
    applyTheme(themePreference.value);
  });
}
