<template>
  <select
    class="language__switcher"
    :value="locale"
    aria-label="language"
    @change="setLocale($event.target.value)"
  >
    <option v-for="lang in languages" :key="lang.code" :value="lang.code">
      {{ lang.flag }} {{ lang.code.toUpperCase() }}
    </option>
  </select>
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
  .language__switcher {
    font-size: 0.75rem;
    padding: 0.3rem 0.35rem;
  }
}
</style>
