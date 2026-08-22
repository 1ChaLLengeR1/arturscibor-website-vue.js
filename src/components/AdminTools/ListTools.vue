<template>
  <ul class="list__tools__container">
    <li class="item" v-for="tool in collection" :key="tool.id">
      <img
        v-if="resolveFileUrl(tool.images[0]?.url)"
        class="icon"
        :src="resolveFileUrl(tool.images[0]?.url)"
        :alt="tool.name"
      />
      <div class="info">
        <p class="name">{{ tool.name }}</p>
      </div>
      <div class="icons">
        <v-btn color="blue" @click="showEditTool(tool.id)">{{ t("admin.tools.edit") }}</v-btn>
        <v-btn color="black" @click="deleteTool(tool.id)">{{ t("admin.tools.delete") }}</v-btn>
      </div>
    </li>
  </ul>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { resolveFileUrl } from "../../utils/url";

export default {
  emits: ["show-edit-tool"],
  setup(_, { emit }) {
    const store = useStore();
    const { t } = useI18n();

    const collection = computed(() => store.getters["tools/collection"]);

    const showEditTool = (toolId) => {
      emit("show-edit-tool", { show: true, toolId });
    };

    const deleteTool = (toolId) => {
      store.dispatch("tools/apiDeleteTool", toolId);
    };

    return { t, collection, showEditTool, deleteTool, resolveFileUrl };
  },
};
</script>

<style lang="scss" scoped>
.list__tools__container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style: none;
  padding: 0.5rem;

  .item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: white;
    color: black;
    padding: 0.5rem;
    border-radius: 8px;
    box-shadow: 0px 0px 10px 2px rgb(71, 71, 71);

    .icon {
      width: 3rem;
      height: 3rem;
      object-fit: contain;
    }

    .info {
      flex: 1;

      .name {
        font-size: 1.1rem;
        font-weight: bold;
      }
    }

    .icons {
      display: flex;
      gap: 0.5rem;
    }
  }
}
@media (min-width: 750px) {
  .list__tools__container {
    width: 70%;
  }
}
</style>
