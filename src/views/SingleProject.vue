<template>
  <div class="single-page__container">
    <title-header :name_project="item_project.name_project"></title-header>
    <basic-information
      :date="item_project.completion_data"
      :numeric="item_project.project_number"
      :level="item_project.level_advanced"
    ></basic-information>
    <the-description :description="item_project.description"></the-description>
    <the-technologies
      :technologies="item_project.technologies"
    ></the-technologies>
    <the-images
      :images="item_project.images_frontend"
      title="Zdjęcia Frontend"
    ></the-images>
    <the-images
      :images="item_project.images_backend"
      title="Zdjęcia Backend"
    ></the-images>
    <the-links
      :link_page="item_project.link_page"
      :path="item_project.download_project_path"
    ></the-links>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, reactive } from "vue";
import TitleHeader from "../components/SingleProject/TitleHeader.vue";
import BasicInformation from "../components/SingleProject/BasicInformation.vue";
import Description from "../components/SingleProject/Description.vue";
import Technologies from "../components/SingleProject/Technologies.vue";
import Images from "../components/SingleProject/Images.vue";
import Links from "../components/SingleProject/Links.vue";
export default {
  components: {
    "basic-information": BasicInformation,
    "title-header": TitleHeader,
    "the-description": Description,
    "the-technologies": Technologies,
    "the-images": Images,
    "the-links": Links,
  },
  setup() {
    //values
    const store = useStore();
    const router = useRoute();
    const item_project = reactive({
      name_project: "",
      description: "",
      completion_data: "",
      project_number: "",
      level_advanced: "",
      technologies: [],
      images_frontend: [],
      images_backend: [],
      link_page: "",
      download_project_path: "",
    });

    //functions
    store.dispatch("admin/loadProject", router.params.id);

    const loadProject = () => {
      setTimeout(() => {
        item_project.name_project = loadSingleProject.value.name_project;
        item_project.description = loadSingleProject.value.description;
        item_project.completion_data = loadSingleProject.value.completion_data;
        item_project.project_number = loadSingleProject.value.project_number;
        item_project.level_advanced = loadSingleProject.value.level_advanced;
        item_project.technologies = loadSingleProject.value.technologies;
        item_project.images_frontend = loadSingleProject.value.images_frontend;
        item_project.images_backend = loadSingleProject.value.images_backend;
        item_project.link_page = loadSingleProject.value.link_page;
        item_project.download_project_path =
          loadSingleProject.value.file_download.path;
      }, 100);
    };
    loadProject();

    //computed
    const loadSingleProject = computed(() => {
      return store.getters["admin/loadProject"];
    });

    return { loadSingleProject, item_project, loadProject };
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
  gap: 2rem;
  padding: 0.5rem;
}
</style>
