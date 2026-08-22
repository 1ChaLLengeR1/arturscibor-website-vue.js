<template>
  <div class="single-page__container">
    <router-link class="back__link" :to="{ name: 'projects' }">{{ t("projects.backLink") }}</router-link>

    <template v-if="project">
      <v-carousel v-if="project.images.length" show-arrows="hover" hide-controls class="gallery">
        <v-carousel-item
          v-for="image in project.images"
          :key="image.file_id"
          :src="resolveFileUrl(image.url)"
        ></v-carousel-item>
      </v-carousel>

      <h1>{{ project.name }}</h1>
      <p v-if="project.level" class="level">{{ t(`projects.level.${project.level}`) }}</p>
      <p v-if="project.completed_at" class="completed">
        {{ t("projects.completedAt") }}: {{ formatDate(project.completed_at) }}
      </p>

      <div v-if="project.technologies?.length" class="technologies">
        <v-chip v-for="tech in project.technologies" :key="tech" size="small">{{ tech }}</v-chip>
      </div>

      <MarkdownRenderer v-if="project.description" :source="project.description"></MarkdownRenderer>

      <div class="links">
        <a v-if="project.github_url" :href="project.github_url" target="_blank" rel="noopener">
          {{ t("projects.github") }}
        </a>
        <a v-if="project.live_url" :href="project.live_url" target="_blank" rel="noopener">
          {{ t("projects.live") }}
        </a>
      </div>
    </template>
  </div>
</template>

<script>
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import MarkdownRenderer from "../components/util/MarkdownRenderer.vue";
import { resolveFileUrl } from "../utils/url";

export default {
  components: {
    MarkdownRenderer,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const { t, locale } = useI18n();

    const loadProject = () => {
      store.dispatch("projects/apiGetProject", { projectId: route.params.id, lang: locale.value });
    };
    loadProject();

    watch(locale, loadProject);
    watch(() => route.params.id, loadProject);

    const project = computed(() => store.getters["projects/project"]);

    const formatDate = (dateStr) =>
      new Intl.DateTimeFormat(locale.value, { dateStyle: "long" }).format(new Date(dateStr));

    return { t, project, formatDate, resolveFileUrl };
  },
};
</script>

<style lang="scss" scoped>
.single-page__container {
  width: 100%;
  min-height: calc(100vh - 5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-color);
  color: var(--text-color);

  .back__link {
    align-self: flex-start;
    color: var(--main-color);
  }

  .gallery {
    width: 100%;
    max-width: 40rem;
    border-radius: 8px;
  }

  h1 {
    color: var(--main-color);
    text-align: center;
  }

  .level,
  .completed {
    opacity: 0.7;
  }

  .technologies {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.35rem;
  }

  .links {
    width: 100%;
    max-width: 30rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    a {
      display: block;
      padding: 0.6rem;
      text-align: center;
      color: var(--secend-bg-color);
      background: var(--main-color);
      border-radius: 8px;
      font-weight: 600;
      transition: 0.3s ease;
    }
    a:hover {
      box-shadow: none;
    }
  }
}
@media (min-width: 750px) {
  .single-page__container {
    :deep(.markdown-renderer) {
      width: 60%;
    }
  }
}
</style>
