<template>
  <div class="admin__projects__container">
    <div class="page__header">
      <div class="language__switch">
        <v-btn
          :color="language === 'pl' ? 'blue' : undefined"
          @click="switchLanguage('pl')"
        >
          PL
        </v-btn>
        <v-btn
          :color="language === 'en' ? 'blue' : undefined"
          @click="switchLanguage('en')"
        >
          EN
        </v-btn>
      </div>
    </div>

    <EditProject
      v-if="edit_panel.show"
      ref="editPanelRef"
      :id="edit_panel.projectId"
      :language="language"
      @close-edit-project="closeEditProject"
    ></EditProject>
    <AddProject v-model:expanded="addExpanded"></AddProject>
    <ListProjects @show-edit-project="showEditProject"></ListProjects>
  </div>
</template>

<script>
import { nextTick, reactive, ref } from "vue";
import { useStore } from "vuex";
import AddProject from "../../components/AdminProjects/AddProject.vue";
import ListProjects from "../../components/AdminProjects/ListProjects.vue";
import EditProject from "../../components/AdminProjects/EditProject.vue";

export default {
  components: {
    AddProject,
    ListProjects,
    EditProject,
  },
  setup() {
    const store = useStore();
    const language = ref("pl");
    const editPanelRef = ref(null);
    const addExpanded = ref(false);
    const edit_panel = reactive({
      show: false,
      projectId: null,
    });

    const loadCollection = () => {
      store.dispatch("projects/apiGetProjectsCollection", language.value);
    };
    loadCollection();

    const switchLanguage = (lang) => {
      language.value = lang;
      loadCollection();
    };

    const showEditProject = (val) => {
      edit_panel.show = val.show;
      edit_panel.projectId = val.projectId;
      addExpanded.value = false;
      nextTick(() => {
        editPanelRef.value?.$el?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };

    const closeEditProject = (val) => {
      edit_panel.show = val;
    };

    return {
      language,
      editPanelRef,
      addExpanded,
      edit_panel,
      switchLanguage,
      showEditProject,
      closeEditProject,
    };
  },
};
</script>

<style lang="scss" scoped>
.admin__projects__container {
  width: 100%;
  min-height: calc(100vh - 5rem);
  background: var(--bg-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 0.5rem;

  .page__header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    .language__switch {
      width: 100%;
      display: flex;
      gap: 0.5rem;
    }
  }
}
@media (min-width: 750px) {
  .admin__projects__container {
    .page__header {
      width: 70%;
    }
  }
}
</style>
