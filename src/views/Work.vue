<template>
  <div class="container__main__work">
    <h2>{{ t("work.title") }}</h2>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
export default {
  setup() {
    const { t } = useI18n();
    return { t };
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
}
</style>
