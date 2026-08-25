<template>
  <div class="single-page__container">
    <router-link class="back__link" :to="{ name: 'projects' }">{{ t("projects.backLink") }}</router-link>

    <template v-if="project">
      <div class="hero">
        <div v-if="project.images.length" class="hero__media">
          <v-carousel
            v-model="activeSlide"
            show-arrows="hover"
            color="var(--main-color)"
            height="100%"
            class="gallery"
          >
            <v-carousel-item
              v-for="image in project.images"
              :key="image.file_id"
              :src="resolveFileUrl(image.url)"
              cover
              @click="fullscreenOpen = true"
            ></v-carousel-item>
          </v-carousel>
        </div>

        <div class="hero__info" :class="{ 'hero__info--overlay': project.images.length }">
          <h1>{{ project.name }}</h1>
          <div class="hero__meta">
            <p v-if="project.level" class="level">{{ t(`projects.level.${project.level}`) }}</p>
            <p v-if="project.started_at" class="started">
              {{ t("projects.startedAt") }}: {{ formatDate(project.started_at) }}
            </p>
            <p v-if="project.completed_at" class="completed">
              {{ t("projects.completedAt") }}: {{ formatDate(project.completed_at) }}
            </p>
            <p v-if="durationDays !== null" class="duration">
              {{
                t(project.completed_at ? "projects.duration" : "projects.durationOngoing", {
                  duration: durationLabel,
                })
              }}
            </p>
            <v-chip v-if="project.is_support" color="green" size="small" class="support-badge">
              {{ t("projects.supportBadge") }}
            </v-chip>
          </div>
        </div>
      </div>

      <v-dialog v-model="fullscreenOpen" fullscreen transition="fade-transition">
        <div class="gallery__fullscreen">
          <button type="button" class="gallery__fullscreen__close" @click="fullscreenOpen = false">✕</button>
          <v-carousel v-model="activeSlide" show-arrows color="var(--main-color)" height="100%">
            <v-carousel-item
              v-for="image in project.images"
              :key="image.file_id"
              :src="resolveFileUrl(image.url)"
              contain
            ></v-carousel-item>
          </v-carousel>
        </div>
      </v-dialog>

      <div v-if="project.technologies?.length" class="technologies">
        <v-chip v-for="tech in project.technologies" :key="tech">{{ tech }}</v-chip>
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
import { computed, ref, watch } from "vue";
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

    const activeSlide = ref(0);
    const fullscreenOpen = ref(false);

    const formatDate = (dateStr) =>
      new Intl.DateTimeFormat(locale.value, { dateStyle: "long" }).format(new Date(dateStr));

    const durationDays = computed(() => {
      if (!project.value?.started_at) return null;
      const start = new Date(project.value.started_at);
      const end = project.value.completed_at ? new Date(project.value.completed_at) : new Date();
      return Math.max(0, Math.round((end - start) / 86400000));
    });

    const durationLabel = computed(() => {
      if (durationDays.value === null) return "";
      const isPl = locale.value === "pl";
      const unit = isPl
        ? durationDays.value === 1
          ? "dzień"
          : "dni"
        : durationDays.value === 1
          ? "day"
          : "days";
      return `${durationDays.value} ${unit}`;
    });

    return {
      t,
      project,
      activeSlide,
      fullscreenOpen,
      formatDate,
      resolveFileUrl,
      durationDays,
      durationLabel,
    };
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

  .hero {
    position: relative;
    width: calc(100% + 2rem);
    margin-left: -1rem;
    margin-right: -1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .hero__media {
      position: relative;
      width: 100%;
      height: min(85vh, 46rem);
      min-height: 24rem;
      overflow: hidden;

      .gallery {
        width: 100%;
        height: 100%;

        :deep(.v-window__container),
        :deep(.v-carousel-item),
        :deep(.v-responsive__content) {
          width: 100%;
          height: 100%;
        }

        :deep(.v-carousel-item) {
          cursor: zoom-in;
        }

        :deep(.v-img__img),
        :deep(.v-responsive__content img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        :deep(.v-window__left),
        :deep(.v-window__right) {
          background: rgba(0, 0, 0, 0.55) !important;

          .v-icon {
            color: var(--main-color) !important;
          }
        }
      }

    }

    .hero__info {
      width: 100%;
      background: var(--secend-bg-color);
      color: var(--text-color);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.4rem;
      padding: 1.5rem 1rem 1.75rem;
      text-align: center;

      &.hero__info--overlay {
        position: absolute;
        left: 50%;
        bottom: 3.5rem;
        transform: translateX(-50%);
        z-index: 2;
        margin-top: 0;
        width: min(90%, 25rem);
        border: 2px solid var(--main-color);
        border-radius: 12px;
        box-shadow: 0 12px 34px rgba(0, 0, 0, 0.55);
        padding: 1.1rem 1.4rem;
        gap: 0.25rem;

        h1 {
          font-size: 1.5rem;
          margin-bottom: 0.2rem;
        }

        .hero__meta {
          gap: 0.25rem;
          font-size: 0.9rem;
        }
      }
    }
  }

  h1 {
    color: var(--main-color);
    text-align: center;
  }

  .hero__meta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
  }

  .level,
  .started,
  .completed {
    opacity: 0.7;
  }

  .duration {
    font-weight: 600;
    color: var(--main-color);
  }

  .support-badge {
    font-weight: 600;
  }

  .technologies {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;

    :deep(.v-chip) {
      font-size: 1rem;
      height: 2.25rem;
      padding: 0 1rem;
    }
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
      color: var(--card-text-color);
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

@media (min-width: 1000px) {
  .single-page__container {
    .back__link {
      margin-left: 3.5rem;
    }
  }
}

.gallery__fullscreen {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  position: relative;

  .gallery__fullscreen__close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 10;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.6);
    color: var(--main-color);
    font-size: 1.2rem;
    cursor: pointer;
  }

  :deep(.v-window__left),
  :deep(.v-window__right) {
    background: rgba(0, 0, 0, 0.6) !important;

    .v-icon {
      color: var(--main-color) !important;
    }
  }
}
</style>
