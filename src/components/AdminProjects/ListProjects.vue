<template>
  <ul class="list__projects__container">
    <li class="item" v-for="project in collection" :key="project.id">
      <img
        v-if="resolveFileUrl(project.images[0]?.url)"
        class="thumb"
        :src="resolveFileUrl(project.images[0]?.url)"
        :alt="project.name"
      />
      <div class="info">
        <p class="name">{{ project.name }}</p>
      </div>
      <div class="icons">
        <v-btn color="blue" @click="showEditProject(project.id)">{{ t("admin.projects.edit") }}</v-btn>
        <v-btn color="black" @click="deleteProject(project)">{{ t("admin.projects.delete") }}</v-btn>
      </div>
    </li>
  </ul>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { resolveFileUrl } from "../../utils/url";
import { requestConfirm } from "../../utils/confirm";

export default {
  emits: ["show-edit-project"],
  setup(_, { emit }) {
    const store = useStore();
    const { t } = useI18n();

    const collection = computed(() => store.getters["projects/collection"]);

    const showEditProject = (projectId) => {
      emit("show-edit-project", { show: true, projectId });
    };

    const deleteProject = (project) => {
      requestConfirm(store, {
        message: t("admin.projects.confirmDeleteProject", { name: project.name }),
        onConfirm: () => store.dispatch("projects/apiDeleteProject", project.id),
      });
    };

    return { t, collection, showEditProject, deleteProject, resolveFileUrl };
  },
};
</script>

<style lang="scss" scoped>
.list__projects__container {
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

    .thumb {
      width: 3rem;
      height: 3rem;
      object-fit: cover;
      border-radius: 4px;
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
  .list__projects__container {
    width: 70%;
  }
}
</style>
