<template>
  <select
    class="theme__switcher"
    :value="themePreference"
    aria-label="theme"
    @change="setThemePreference($event.target.value)"
  >
    <option v-for="opt in THEME_OPTIONS" :key="opt.value" :value="opt.value">
      {{ opt.icon }} {{ t(opt.labelKey) }}
    </option>
  </select>
</template>

<script>
import { useI18n } from "vue-i18n";
import { themePreference, setThemePreference } from "../../utils/theme";

const THEME_OPTIONS = [
  { value: "light", icon: "☀️", labelKey: "nav.themeLight" },
  { value: "dark", icon: "🌙", labelKey: "nav.themeDark" },
  { value: "auto", icon: "🖥️", labelKey: "nav.themeAuto" },
];

export default {
  setup() {
    const { t } = useI18n();
    return { t, themePreference, THEME_OPTIONS, setThemePreference };
  },
};
</script>

<style lang="scss" scoped>
.theme__switcher {
  background: var(--secend-bg-color);
  color: var(--text-color);
  font-size: 0.9rem;
  line-height: 1;
  padding: 0.4rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;

  option {
    background: var(--secend-bg-color);
    color: var(--text-color);
  }
}

@media (max-width: 400px) {
  .theme__switcher {
    font-size: 0.75rem;
    padding: 0.3rem 0.35rem;
  }
}
</style>
