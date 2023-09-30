<template>
  <div class="add__project__container">
    <form enctype="multipart/form-data">
      <h3>Dodaj Projekt</h3>
      <v-text-field
        bg-color="white"
        label="Nazwa Projektu"
        v-model="item_add_project.name_project"
      ></v-text-field>
      <div class="descriptions">
        <v-textarea
          bg-color="white"
          label="Krótki opis"
          v-model="item_add_project.short_description"
        ></v-textarea>
        <v-textarea
          bg-color="white"
          label="Opis"
          v-model="item_add_project.description"
        ></v-textarea>
      </div>
      <v-file-input
        bg-color="white"
        label="Zdjęcie projektu"
        v-model="item_add_project.project_image"
      ></v-file-input>
      <div class="information__box">
        <v-text-field
          type="date"
          bg-color="white"
          label="Data dodania projektu!"
          class="input__info"
          v-model="item_add_project.completion_data"
        ></v-text-field>
        <v-text-field
          type="number"
          bg-color="white"
          label="Numer projektu"
          class="input__info"
          v-model="item_add_project.project_number"
        ></v-text-field>
        <v-text-field
          bg-color="white"
          label="Poziom zaawansowania"
          class="input__info"
          v-model="item_add_project.level_advanced"
        ></v-text-field>
        <v-text-field
          bg-color="white"
          label="Link do strony"
          class="input__info"
          v-model="item_add_project.link_page"
        ></v-text-field>
      </div>
      <div class="add__technology">
        <div class="buttons__technologies">
          <v-text-field
            bg-color="white"
            label="Dodaj technologie"
            class="input__technologies"
            v-model="new_technology"
          ></v-text-field>
          <v-btn
            class="input__technologies"
            color="green"
            @click="addTechnology"
          >
            Dodaj technologie
          </v-btn>
        </div>
        <ul class="technologies">
          <li v-for="(item, index) in technologies" :key="index">
            <p @click="removeTechnologies(item)">{{ item }}</p>
          </li>
        </ul>
      </div>
      <div class="upload__images">
        <v-file-input
          multiple
          bg-color="white"
          label="Zdjęcia Frontend"
          v-model="item_add_project.images_frontend"
          style="width: 100%"
        ></v-file-input>
        <v-file-input
          multiple
          bg-color="white"
          label="Zdjęcia Backend"
          v-model="item_add_project.images_backend"
          style="width: 100%"
        ></v-file-input>
        <v-file-input
          bg-color="white"
          label="Plik projektu"
          v-model="item_add_project.file_project_download"
          style="width: 100%"
        ></v-file-input>
      </div>
      <v-btn
        class="input__technologies"
        color="green"
        @click.prevent="addProject"
        :disabled="checkInputs"
      >
        Dodaj projekt
      </v-btn>
    </form>
  </div>
</template>

<script>
import { ref, computed, reactive } from "vue";
import { notification } from "../JS/Notification";
import { fetchData } from "../JS/fetch";
import { useStore } from "vuex";
export default {
  setup() {
    //values
    const store = useStore();
    const new_technology = ref("");
    const technologies = ref([]);
    const item_add_project = reactive({
      name_project: "",
      short_description: "",
      description: "",
      project_image: null,
      completion_data: "",
      project_number: null,
      level_advanced: "",
      link_page: "",
      technologies: technologies.value,
      images_frontend: [],
      images_backend: [],
      file_project_download: null,
    });
    //computed
    const checkInputs = computed(() => {
      if (
        item_add_project.name_project == "" ||
        item_add_project.short_description == "" ||
        item_add_project.description == "" ||
        item_add_project.project_image == null ||
        item_add_project.completion_data == "" ||
        item_add_project.name_project == null ||
        item_add_project.level_advanced == "" ||
        item_add_project.link_page == "" ||
        item_add_project.technologies.length == 0
      ) {
        return true;
      }
      return false;
    });

    //functions
    const removeTechnologies = (value) => {
      const index = technologies.value.indexOf(value);
      technologies.value.splice(index, 1);
    };
    const addTechnology = () => {
      if (new_technology.value === "") {
        new_technology.value = "brak nazwy";
      }

      technologies.value.push(new_technology.value);
      new_technology.value = "";
    };

    const addProject = async () => {
      const formData = new FormData();
      formData.append("name_project", item_add_project.name_project);
      formData.append("short_description", item_add_project.short_description);
      formData.append("description", item_add_project.description);
      formData.append("file_project_image", item_add_project.project_image[0]);
      formData.append("completion_data", item_add_project.completion_data);
      formData.append("project_number", item_add_project.project_number);
      formData.append("level_advanced", item_add_project.level_advanced);
      formData.append("project_number", item_add_project.project_number);
      formData.append("link_page", item_add_project.link_page);
      for (const technology of item_add_project.technologies) {
        formData.append("technologies", technology);
      }
      if (item_add_project.images_frontend.length !== 0) {
        for (const image of item_add_project.images_frontend) {
          formData.append("images_frontend", image);
        }
      } else {
        formData.append("images_frontend", new File(["brak"], "brak.txt"));
      }
      if (item_add_project.images_backend.length !== 0) {
        for (const image of item_add_project.images_backend) {
          formData.append("images_backend", image);
        }
      } else {
        formData.append("images_backend", new File(["brak"], "brak.txt"));
      }
      if (item_add_project.file_project_download !== null) {
        formData.append(
          "file_project_download",
          item_add_project.file_project_download[0]
        );
      } else {
        formData.append(
          "file_project_download",
          new File(["brak"], "brak.txt")
        );
      }

      const url = "";
      const method = "POST";
      const headers = {
        Authorization: `Bearer ${store.getters["auth/optionsTokens"].access_token}`,
      };

      const response = await fetchData(
        url,
        method,
        headers,
        formData,
        "formData"
      );
      notification(response);
      store.dispatch("admin/loadProjects");

      technologies.value = [];

      item_add_project.name_project = "";
      item_add_project.short_description = "";
      item_add_project.description = "";
      item_add_project.project_image = null;
      item_add_project.completion_data = "";
      item_add_project.project_number = null;
      item_add_project.level_advanced = "";
      item_add_project.link_page = "";
      item_add_project.technologies = technologies.value;
      item_add_project.images_frontend = [];
      item_add_project.images_backend = [];
      item_add_project.file_project_download = null;
    };

    return {
      technologies,
      new_technology,
      removeTechnologies,
      addTechnology,
      item_add_project,
      addProject,
      checkInputs,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../AdminProjects/scss/AdminProjects.scss";
</style>
