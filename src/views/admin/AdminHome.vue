<template>
  <div class="admin__home__container">
    <AboutMeForm></AboutMeForm>
  </div>
</template>

<script>
import AboutMeForm from "../../components/Home_Admin/AboutMeForm.vue";
export default {
  components: {
    AboutMeForm,
  },
};
</script>

<style lang="scss" scoped>
.admin__home__container {
  width: 100%;
  min-height: calc(100% - 5rem);
  background: var(--bg-color);
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
