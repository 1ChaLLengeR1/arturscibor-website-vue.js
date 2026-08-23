<template>
  <li class="item">
    <img
      v-if="resolveFileUrl(project.images[0]?.url)"
      :src="resolveFileUrl(project.images[0]?.url)"
      :alt="project.name"
    />
    <h3>{{ project.name }}</h3>
    <p v-if="project.level" class="level">{{ t(`projects.level.${project.level}`) }}</p>
    <p v-if="project.short_description" class="short__description">{{ project.short_description }}</p>
    <div v-if="project.technologies?.length" class="technologies">
      <v-chip v-for="tech in project.technologies.slice(0, 4)" :key="tech" size="small">
        {{ tech }}
      </v-chip>
      <v-chip v-if="project.technologies.length > 4" size="small" variant="outlined">
        +{{ project.technologies.length - 4 }}
      </v-chip>
    </div>
    <router-link class="read__more" :to="{ name: 'singleproject', params: { id: project.id } }">
      {{ t("projects.readMore") }}
    </router-link>
  </li>
</template>

<script>
import { useI18n } from "vue-i18n";
import { resolveFileUrl } from "../../utils/url";

export default {
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { t } = useI18n();
    return { t, resolveFileUrl };
  },
};
</script>

<style lang="scss" scoped>
.item {
  width: 20rem;
  height: 28rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background-color: var(--secend-bg-color);
  border-radius: 8px;
  box-shadow: 0px 0px 8px -2px rgba(0, 0, 0, 1);
  list-style: none;

  img {
    width: 100%;
    height: 9rem;
    object-fit: cover;
    border-radius: 8px;
    flex-shrink: 0;
  }
  h3 {
    width: 100%;
    font-size: 1.6rem;
    text-align: center;
    color: var(--main-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .level {
    font-size: 0.85rem;
    color: var(--text-color);
    opacity: 0.7;
  }
  .short__description {
    flex: 1;
    font-size: 0.95rem;
    color: var(--text-color);
    text-align: center;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
  .technologies {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.35rem;
    flex-shrink: 0;
  }
  .read__more {
    width: 100%;
    flex-shrink: 0;
    display: block;
    padding: 0.6rem;
    text-align: center;
    color: var(--card-text-color);
    background: var(--main-color);
    border-radius: 8px;
    letter-spacing: 0.05rem;
    font-size: 13px;
    font-weight: 600;
    transition: 0.3s ease;
  }
  .read__more:hover {
    box-shadow: none;
  }
}
</style>
