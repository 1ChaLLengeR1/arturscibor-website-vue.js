<template>
  <div class="container__main__projects">
    <ul class="projects__items">
      <ProjectCard v-for="project in sortedProjects" :key="project.id" :project="project"></ProjectCard>
    </ul>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import ProjectCard from "../components/Projects/ProjectCard.vue";

export default {
  components: {
    ProjectCard,
  },
  setup() {
    const store = useStore();
    const { locale } = useI18n();

    store.dispatch("projects/apiGetProjectsCollection", locale.value);
    const collection = computed(() => store.getters["projects/collection"]);
    const sortedProjects = computed(() =>
      [...collection.value].sort((a, b) => (a.numeric ?? Infinity) - (b.numeric ?? Infinity))
    );

    return { sortedProjects };
  },
};
</script>

<style lang="scss" scoped>
.container__main__projects {
  width: 100%;
  min-height: calc(100vh - 5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--bg-color);

  .projects__items {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 1rem;
  }
}
@media (min-width: 750px) {
  .container__main__projects {
    .projects__items {
      width: 80%;
    }
  }
}
</style>
