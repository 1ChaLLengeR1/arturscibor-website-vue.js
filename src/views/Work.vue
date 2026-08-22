<template>
  <div class="container__main__work">
    <h2>{{ t("work.title") }}</h2>
    <div class="companies">
      <CompanySection v-for="company in sortedCompanies" :key="company.id" :company="company"></CompanySection>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import CompanySection from "../components/Work/CompanySection.vue";

function mostRecentStart(company) {
  const froms = company.items.map((item) => item.date_from).filter(Boolean);
  return froms.length ? froms.reduce((a, b) => (a > b ? a : b)) : "";
}

export default {
  components: {
    CompanySection,
  },
  setup() {
    const store = useStore();
    const { t, locale } = useI18n();

    store.dispatch("work/apiGetWorkCollection", locale.value);
    const collection = computed(() => store.getters["work/collection"]);
    const sortedCompanies = computed(() =>
      [...collection.value].sort((a, b) => mostRecentStart(b).localeCompare(mostRecentStart(a)))
    );

    return { t, sortedCompanies };
  },
};
</script>

<style lang="scss" scoped>
.container__main__work {
  width: 100%;
  min-height: calc(100vh - 5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: var(--bg-color);
  color: var(--text-color);

  h2 {
    color: var(--main-color);
  }

  .companies {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
}
@media (min-width: 750px) {
  .container__main__work {
    .companies {
      width: 70%;
    }
  }
}
</style>
