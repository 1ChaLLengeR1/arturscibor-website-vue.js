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
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { LOCALE_STORAGE_KEY } from "../../utils/i18n";

const LANGUAGES = [
  { code: "pl", flag: "🇵🇱" },
  { code: "en", flag: "🇬🇧" },
];

/** Akcje Vuex zależne od języka (przyjmują `lang`), do odświeżenia po zmianie języka na danej stronie. */
const LANG_REFRESH_ACTIONS = {
  pass: ["aboutme/apiGetAboutMe"],
  home: ["aboutme/apiGetAboutMe"],
  work: ["work/apiGetWorkCollection"],
  tools: ["tools/apiGetToolsCollection"],
  projects: ["projects/apiGetProjectsCollection"],
};

export default {
  setup() {
    const { locale } = useI18n();
    const route = useRoute();
    const store = useStore();

    const setLocale = (code) => {
      locale.value = code;
      localStorage.setItem(LOCALE_STORAGE_KEY, code);

      const actions = LANG_REFRESH_ACTIONS[route.name] ?? [];
      actions.forEach((action) => store.dispatch(action, code));
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
  }
}
</style>
