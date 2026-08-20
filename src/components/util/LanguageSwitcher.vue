<template>
  <div class="language__switcher">
    <button
      v-for="lang in languages"
      :key="lang.code"
      type="button"
      class="language__button"
      :class="{ active: locale === lang.code }"
      :aria-label="lang.code"
      @click="setLocale(lang.code)"
    >
      {{ lang.flag }}
    </button>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import { LOCALE_STORAGE_KEY } from "../../utils/i18n";

const LANGUAGES = [
  { code: "pl", flag: "🇵🇱" },
  { code: "en", flag: "🇬🇧" },
];

export default {
  setup() {
    const { locale } = useI18n();

    const setLocale = (code) => {
      locale.value = code;
      localStorage.setItem(LOCALE_STORAGE_KEY, code);
    };

    return { locale, languages: LANGUAGES, setLocale };
  },
};
</script>

<style lang="scss" scoped>
.language__switcher {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .language__button {
    background: transparent;
    border: 2px solid transparent;
    border-radius: 50%;
    font-size: 1.5rem;
    line-height: 1;
    padding: 0.25rem;
    cursor: pointer;
    opacity: 0.5;
    transition: 0.3s ease;
  }

  .language__button:hover {
    opacity: 0.8;
  }

  .language__button.active {
    opacity: 1;
    border-color: var(--main-color);
  }
}
</style>
