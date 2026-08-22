<template>
  <section class="company__section">
    <header class="company__header">
      <v-avatar size="56" :image="logoUrl" color="primary">
        <span v-if="!logoUrl" class="initials">{{ initials }}</span>
      </v-avatar>
      <div class="company__info">
        <h3>{{ company.company_name }}</h3>
        <p v-if="totalDuration" class="duration">{{ totalDuration }}</p>
        <p v-if="commonLocation" class="location">{{ commonLocation }}</p>
      </div>
    </header>

    <v-timeline align="start" side="end" density="compact" class="company__timeline">
      <v-timeline-item v-for="item in sortedItems" :key="item.id" size="x-small" dot-color="primary">
        <div class="work__item">
          <h4>{{ item.title }}</h4>
          <p v-if="item.employment_type" class="employment__type">
            {{ t(`work.employmentType.${item.employment_type}`) }}
          </p>
          <p v-if="item.date_from" class="dates">
            {{ formatDateRange(item.date_from, item.date_to, locale, t("work.present")) }}
            · {{ formatDuration(monthsBetween(item.date_from, item.date_to), locale) }}
          </p>
          <p v-if="item.location" class="location">{{ item.location }}</p>

          <div v-if="item.body_markdown" class="description" :class="{ clamped: !isExpanded(item.id) && isLong(item.body_markdown) }">
            <MarkdownRenderer :source="item.body_markdown"></MarkdownRenderer>
          </div>
          <button v-if="isLong(item.body_markdown)" type="button" class="toggle" @click="toggleExpanded(item.id)">
            {{ isExpanded(item.id) ? t("work.showLess") : t("work.showMore") }}
          </button>

          <div v-if="item.skills?.length" class="skills">
            <v-chip
              v-for="skill in isSkillsExpanded(item.id) ? item.skills : item.skills.slice(0, 2)"
              :key="skill"
              size="small"
              class="skill__chip"
            >
              {{ skill }}
            </v-chip>
            <v-chip
              v-if="item.skills.length > 2"
              size="small"
              variant="outlined"
              class="skill__chip"
              @click="toggleSkills(item.id)"
            >
              {{
                isSkillsExpanded(item.id)
                  ? t("work.showLess")
                  : t("work.skillsMore", { count: item.skills.length - 2 })
              }}
            </v-chip>
          </div>
        </div>
      </v-timeline-item>
    </v-timeline>
  </section>
</template>

<script>
import { computed, reactive } from "vue";
import { useI18n } from "vue-i18n";
import MarkdownRenderer from "../util/MarkdownRenderer.vue";
import { resolveFileUrl } from "../../utils/url";
import { formatDateRange, formatDuration, monthsBetween } from "../../utils/workDuration";

const DESCRIPTION_CLAMP_THRESHOLD = 220;

export default {
  components: {
    MarkdownRenderer,
  },
  props: {
    company: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { t, locale } = useI18n();
    const expandedItems = reactive(new Set());
    const expandedSkills = reactive(new Set());

    const logoUrl = computed(() => resolveFileUrl(props.company.logo_url));
    const initials = computed(() => props.company.company_name.trim().charAt(0).toUpperCase());

    const sortedItems = computed(() =>
      [...props.company.items].sort((a, b) => {
        if (!a.date_from) return 1;
        if (!b.date_from) return -1;
        return b.date_from.localeCompare(a.date_from);
      })
    );

    const totalDuration = computed(() => {
      const froms = props.company.items.map((item) => item.date_from).filter(Boolean);
      if (froms.length === 0) return null;

      const earliest = froms.reduce((a, b) => (a < b ? a : b));
      const ongoing = props.company.items.some((item) => !item.date_to);
      const tos = props.company.items.map((item) => item.date_to).filter(Boolean);
      const latest = tos.length ? tos.reduce((a, b) => (a > b ? a : b)) : null;

      return formatDuration(monthsBetween(earliest, ongoing ? null : latest), locale.value);
    });

    const commonLocation = computed(() => {
      const locations = new Set(props.company.items.map((item) => item.location).filter(Boolean));
      return locations.size === 1 ? [...locations][0] : null;
    });

    const toggleInSet = (set, key) => {
      if (set.has(key)) {
        set.delete(key);
      } else {
        set.add(key);
      }
    };

    const isLong = (markdown) => (markdown?.length ?? 0) > DESCRIPTION_CLAMP_THRESHOLD;
    const isExpanded = (itemId) => expandedItems.has(itemId);
    const toggleExpanded = (itemId) => toggleInSet(expandedItems, itemId);
    const isSkillsExpanded = (itemId) => expandedSkills.has(itemId);
    const toggleSkills = (itemId) => toggleInSet(expandedSkills, itemId);

    return {
      t,
      locale,
      logoUrl,
      initials,
      sortedItems,
      totalDuration,
      commonLocation,
      isLong,
      isExpanded,
      toggleExpanded,
      isSkillsExpanded,
      toggleSkills,
      formatDateRange,
      formatDuration,
      monthsBetween,
    };
  },
};
</script>

<style lang="scss" scoped>
.company__section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  .company__header {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;

    :deep(img) {
      object-fit: contain;
      background: white;
    }

    .initials {
      font-weight: bold;
      font-size: 1.2rem;
    }

    .company__info {
      h3 {
        font-size: 1.3rem;
        color: var(--main-color);
      }

      .duration,
      .location {
        font-size: 0.85rem;
        opacity: 0.75;
      }
    }
  }

  .company__timeline {
    margin-top: 0.5rem;
  }

  .work__item {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    text-align: left;

    h4 {
      font-size: 1.05rem;
      color: var(--text-color);
    }

    .employment__type,
    .dates,
    .location {
      font-size: 0.85rem;
      opacity: 0.75;
    }

    .description {
      margin-top: 0.5rem;
      position: relative;

      &.clamped {
        max-height: 4.5em;
        overflow: hidden;

        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1.5em;
          background: linear-gradient(to bottom, transparent, var(--bg-color));
        }
      }
    }

    .toggle {
      align-self: flex-start;
      background: none;
      border: none;
      color: var(--main-color);
      cursor: pointer;
      font-size: 0.85rem;
      padding: 0;
    }

    .skills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
      margin-top: 0.5rem;
    }
  }
}
</style>
