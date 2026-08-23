<template>
  <footer class="footer__container">
    <p>{{ t("footer.copyright", { year }) }}</p>
  </footer>
</template>

<script>
import { useI18n } from "vue-i18n";
export default {
  setup() {
    const { t } = useI18n();
    const year = new Date().getFullYear();

    return { t, year };
  },
};
</script>

<style lang="scss" scoped>
.footer__container {
  width: 100%;
  min-height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  background-color: var(--bg-color);
  color: var(--text-color);
  text-align: center;
  border-top: 2px solid var(--text-color);
}
</style>
