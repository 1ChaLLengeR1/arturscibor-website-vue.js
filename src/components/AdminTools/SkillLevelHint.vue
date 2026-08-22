<template>
  <div class="skill__level__hint">
    <p class="current" v-if="currentBand">
      {{ t("admin.tools.currentLevel") }} <strong>{{ t(currentBand.labelKey) }}</strong>
    </p>
    <details class="scale">
      <summary>{{ t("admin.tools.scaleTitle") }}</summary>
      <ul>
        <li
          v-for="band in SKILL_LEVEL_BANDS"
          :key="band.labelKey"
          :class="{ active: currentBand === band }"
        >
          <span class="range">{{ band.min }}–{{ band.max }}%</span>
          <span class="label">{{ t(band.labelKey) }}</span>
        </li>
      </ul>
    </details>
  </div>
</template>

<script>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { SKILL_LEVEL_BANDS, getSkillLevelBand } from "../../utils/skillLevel";

export default {
  props: {
    progress: {
      type: Number,
      default: null,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const currentBand = computed(() => getSkillLevelBand(props.progress));

    return { t, SKILL_LEVEL_BANDS, currentBand };
  },
};
</script>

<style lang="scss" scoped>
.skill__level__hint {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  .current {
    color: white;
    font-size: 0.9rem;

    strong {
      color: var(--main-color);
    }
  }

  .scale {
    width: 100%;
    color: white;
    font-size: 0.85rem;

    summary {
      cursor: pointer;
      color: var(--main-color);
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      list-style: none;
      margin-top: 0.5rem;
      padding: 0.5rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;

      li {
        display: flex;
        justify-content: space-between;
        gap: 0.5rem;
        padding: 0.15rem 0.35rem;
        border-radius: 4px;

        .range {
          opacity: 0.7;
        }
      }

      li.active {
        border: 1px solid var(--main-color);

        .range,
        .label {
          color: var(--main-color);
          opacity: 1;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
