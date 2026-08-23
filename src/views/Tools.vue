<template>
  <div class="container__main__tools">
    <ul class="tools__items">
      <li class="item" v-for="item in sortedTools" :key="item.id">
        <img
          v-if="resolveFileUrl(item.images[0]?.url)"
          :src="resolveFileUrl(item.images[0]?.url)"
          :alt="item.name"
        />
        <h3>{{ item.name }}</h3>
        <MarkdownRenderer
          v-if="item.information"
          class="description__clamped"
          :source="item.information"
        ></MarkdownRenderer>
        <div class="box__progress" v-if="item.progress !== null">
          <p>{{ t("tools.progressLabel") }}</p>
          <v-progress-linear
            :model-value="item.progress"
            color="var(--main-color)"
            height="20"
            rounded
          >
            <strong>{{ item.progress }}%</strong>
          </v-progress-linear>
          <p v-if="getSkillLevelBand(item.progress)" class="level__label">
            {{ t(getSkillLevelBand(item.progress).labelKey) }}
          </p>
        </div>
        <v-btn class="show__more" variant="outlined" @click="openTool(item)">
          {{ t("tools.showMore") }}
        </v-btn>
      </li>
    </ul>

    <v-dialog v-model="dialogOpen" max-width="600">
      <v-card v-if="activeTool" class="tool__dialog">
        <img
          v-if="resolveFileUrl(activeTool.images[0]?.url)"
          :src="resolveFileUrl(activeTool.images[0]?.url)"
          :alt="activeTool.name"
        />
        <h3>{{ activeTool.name }}</h3>
        <MarkdownRenderer v-if="activeTool.information" :source="activeTool.information"></MarkdownRenderer>
        <div class="box__progress" v-if="activeTool.progress !== null">
          <p>{{ t("tools.progressLabel") }}</p>
          <v-progress-linear
            :model-value="activeTool.progress"
            color="var(--main-color)"
            height="20"
            rounded
          >
            <strong>{{ activeTool.progress }}%</strong>
          </v-progress-linear>
          <p v-if="getSkillLevelBand(activeTool.progress)" class="level__label">
            {{ t(getSkillLevelBand(activeTool.progress).labelKey) }}
          </p>
        </div>
        <a v-if="activeTool.link" :href="activeTool.link" target="_blank" rel="noopener">
          {{ t("tools.moreLink") }}
        </a>
        <v-btn class="close__dialog" variant="text" @click="dialogOpen = false">
          {{ t("tools.close") }}
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import MarkdownRenderer from "../components/util/MarkdownRenderer.vue";
import { resolveFileUrl } from "../utils/url";
import { getSkillLevelBand } from "../utils/skillLevel";

export default {
  components: {
    MarkdownRenderer,
  },
  setup() {
    const store = useStore();
    const { t, locale } = useI18n();

    store.dispatch("tools/apiGetToolsCollection", locale.value);
    const collection = computed(() => store.getters["tools/collection"]);
    const sortedTools = computed(() =>
      [...collection.value].sort((a, b) => (a.numeric ?? Infinity) - (b.numeric ?? Infinity))
    );

    const activeTool = ref(null);
    const dialogOpen = computed({
      get: () => activeTool.value !== null,
      set: (value) => {
        if (!value) activeTool.value = null;
      },
    });

    const openTool = (item) => {
      activeTool.value = item;
    };

    return { t, sortedTools, activeTool, dialogOpen, openTool, resolveFileUrl, getSkillLevelBand };
  },
};
</script>

<style lang="scss" scoped>
.container__main__tools {
  width: 100%;
  min-height: calc(100vh - 5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background: var(--bg-color);

  .tools__items {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 3rem;
    padding: 1rem;
    animation: slideTools 1s ease forwards;
    @keyframes slideTools {
      0% {
        transform: translateY(100px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
    .item {
      width: 20rem;
      height: 26rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 0.5rem;
      background-color: var(--secend-bg-color);
      border-radius: 8px;
      box-shadow: 0px 0px 8px -2px rgba(0, 0, 0, 1);
      list-style: none;
      img {
        width: 5rem;
        height: 5rem;
        object-fit: contain;
        flex-shrink: 0;
      }
      h3 {
        width: 100%;
        font-size: 35px;
        text-align: center;
        color: var(--main-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .description__clamped {
        flex: 1;
        overflow: hidden;

        :deep(.markdown-renderer) {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }
      :deep(.markdown-renderer) {
        font-size: 17px;
        color: var(--text-color);
        text-align: center;
      }
      .box__progress {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid var(--main-color);
        border-radius: 8px;
        padding: 0.5rem;
        gap: 0.5rem;
        flex-shrink: 0;

        p {
          font-size: 15px;
          font-weight: bold;
          color: var(--text-color);
        }

        .level__label {
          color: var(--main-color);
          font-size: 14px;
        }

        .v-progress-linear {
          width: 100%;
        }
      }
      .show__more {
        width: 100%;
        flex-shrink: 0;
        color: var(--main-color);
        border-color: var(--main-color);
        border-radius: 8px;
      }
    }
  }
}

.tool__dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--secend-bg-color);

  img {
    width: 6rem;
    height: 6rem;
    object-fit: contain;
  }
  h3 {
    font-size: 32px;
    text-align: center;
    color: var(--main-color);
  }
  :deep(.markdown-renderer) {
    font-size: 17px;
    color: var(--text-color);
    text-align: left;
  }
  .box__progress {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--main-color);
    border-radius: 8px;
    padding: 0.5rem;
    gap: 0.5rem;

    p {
      font-size: 15px;
      font-weight: bold;
      color: var(--text-color);
    }
    .level__label {
      color: var(--main-color);
      font-size: 14px;
    }
    .v-progress-linear {
      width: 100%;
    }
  }
  a {
    width: 100%;
    display: block;
    padding: 0.8rem;
    color: var(--card-text-color);
    box-shadow: 0 0 0.5rem var(--main-color);
    background: var(--main-color);
    border-radius: 8px;
    letter-spacing: 0.1rem;
    font-size: 13px;
    font-weight: 600;
    text-align: center;
    transition: 0.3s ease;
  }
  a:hover {
    box-shadow: none;
  }
  .close__dialog {
    color: var(--text-color);
  }
}

@media (min-width: 750px) {
  .container__main__tools {
    .tools__items {
      width: 80%;
      .item {
        padding: 1rem;
        img {
          width: 6rem;
          height: 6rem;
        }
        h3 {
          font-size: 40px;
        }
        :deep(.markdown-renderer) {
          font-size: 20px;
        }
        .box__progress {
          width: 90%;
          p {
            font-size: 17px;
          }
        }
        .show__more {
          width: 90%;
        }
      }
    }
  }
}
</style>
