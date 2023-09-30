<template>
  <div class="main__container__projects">
    <edit-project
      v-if="edit_panel.show"
      @close-edit-project="closeEditProject"
      :id="edit_panel.id_project"
    ></edit-project>
    <add-project></add-project>
    <list-projects @show-edit-project="showEditProject"></list-projects>
  </div>
</template>

<script>
import { reactive } from "vue";
import EditProject from "../../components/AdminProjects/EditProject.vue";
import AddProject from "../../components/AdminProjects/AddProject.vue";
import ListProjects from "../../components/AdminProjects/ListProjects.vue";
export default {
  components: {
    "add-project": AddProject,
    "list-projects": ListProjects,
    "edit-project": EditProject,
  },
  setup() {
    //values
    const edit_panel = reactive({
      show: false,
      id_project: null,
    });

    //functions
    const closeEditProject = (val) => {
      edit_panel.show = val;
    };

    const showEditProject = (val) => {
      edit_panel.show = val.show;
      edit_panel.id_project = val.id_project;
    };

    return { edit_panel, closeEditProject, showEditProject };
  },
};
</script>

<style lang="scss" scoped>
.main__container__projects {
  width: 100%;
  min-height: calc(100vh - 5rem);
  background: var(--bg-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 0.5rem;
}
</style>
