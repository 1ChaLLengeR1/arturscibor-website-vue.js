<template>
  <div class="main__edit-project__container">
    <div class="close__container">
      <svg
        @click="closePanel"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
        <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
        />
      </svg>
    </div>
    <form class="box__edit-project" enctype="multipart/form-data">
      <div class="box__information">
        <v-text-field
          bg-color="white"
          label="Nazwa Projektu"
          v-model="values_project.name_project"
        ></v-text-field>
        <div class="descriptions">
          <v-textarea
            bg-color="white"
            label="Krótki opis"
            v-model="values_project.short_description"
          ></v-textarea>
          <v-textarea
            bg-color="white"
            label="Opis"
            v-model="values_project.description"
          ></v-textarea>
        </div>
        <v-file-input
          bg-color="white"
          label="Zdjęcie projektu"
          v-model="file_image_project"
        ></v-file-input>
        <div class="project__image">
          <p>Zdjęcie</p>
          <a :href="values_project.file_image.link" alt="photo_project"
            >Zdjęcie projektu</a
          >
        </div>
        <div class="information__box">
          <v-text-field
            type="date"
            bg-color="white"
            label="Data dodania projektu!"
            class="input__info"
            v-model="values_project.completion_data"
          ></v-text-field>
          <v-text-field
            type="number"
            bg-color="white"
            label="Numer projektu"
            class="input__info"
            v-model="values_project.project_number"
          ></v-text-field>
          <v-text-field
            bg-color="white"
            label="Poziom zaawansowania"
            class="input__info"
            v-model="values_project.level_advanced"
          ></v-text-field>
          <v-text-field
            bg-color="white"
            label="Link do strony"
            class="input__info"
            v-model="values_project.link_page"
          ></v-text-field>
        </div>
        <v-btn color="blue" @click.prevent="update_project">
          Zaktualizuj projekt
        </v-btn>
      </div>

      <div class="add__technology">
        <div class="buttons__technologies">
          <v-text-field
            bg-color="white"
            label="Dodaj technologie"
            class="input__technologies"
            v-model="technology"
          ></v-text-field>
          <v-btn
            class="input__technologies"
            color="green"
            @click.prevent="add_technology"
            :disabled="checkInputTechnology"
          >
            Dodaj technologie
          </v-btn>
        </div>
        <ul class="technologies">
          <li v-for="(item, index) in values_project.technologies" :key="index">
            <p @click.prevent="deleteTechnology(item.id)">{{ item.name }}</p>
          </li>
        </ul>
      </div>
      <div class="upload__images">
        <v-file-input
          multiple
          bg-color="white"
          label="Zdjęcia do projektu"
          class="inputs__images"
          v-model="images_project.images"
        ></v-file-input>
        <v-select
          label="Select"
          bg-color="white"
          class="inputs__images"
          :items="['Frontend', 'Backend']"
          v-model="images_project.type"
        ></v-select>
        <v-btn
          color="green"
          class="inputs__images"
          @click.prevent="addImages"
          :disabled="checkInputsImage"
        >
          Dodaj zdjęcie
        </v-btn>
      </div>
      <ul class="load_images">
        <h3>Zdjęcia Frontend</h3>
        <li v-for="item in values_project.images_frontend" :key="item.id">
          <span>{{ item.name }}</span>
          <a :href="item.link" alt="link do zdjęcia">Podgląd pliku!</a>
          <v-btn
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              @click.prevent="deleteImage(item.id)"
            >
              <path
                d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"
              ></path></svg
          ></v-btn>
        </li>
        <h3>Zdjęcia Backend</h3>
        <li v-for="item in values_project.images_backend" :key="item.id">
          <span>{{ item.name }}</span>
          <a :href="item.link" alt="link do zdjęcia">Podgląd pliku!</a>
          <v-btn
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              @click.prevent="deleteImage(item.id)"
            >
              <path
                d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"
              ></path></svg
          ></v-btn>
        </li>
      </ul>
      <div class="file_download__box">
        <v-file-input
          bg-color="white"
          label="Plik"
          class="inputs__images"
          v-model="file_download"
        ></v-file-input>
        <v-btn
          color="blue"
          class="inputs__images"
          @click.prevent="uploadFileDownload"
          :disabled="checkInputFileDownload"
        >
          Zaktualizuj plik projektu
        </v-btn>
        <p>{{ values_project.file_download.name }}</p>
      </div>
    </form>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, reactive, computed } from "vue";
import { fetchData } from "../JS/fetch";
import { notification } from "../JS/Notification";
export default {
  emits: ["close-edit-project"],
  props: ["id"],
  setup(props, context) {
    //values
    const store = useStore();
    const id_project = ref(props);
    const file_image_project = ref([]);
    const technology = ref("");
    const images_project = reactive({
      type: null,
      images: [],
    });
    const file_download = ref([]);

    const values_project = reactive({
      id: "",
      name_project: "",
      description: "",
      short_description: "",
      file_image: {
        path: "",
        link: "",
      },
      completion_data: "",
      project_number: "",
      level_advanced: "",
      link_page: "",
      technologies: [],
      images_frontend: [],
      images_backend: [],
      file_download: {
        id: "",
        name: "",
        path: "",
        link: "",
      },
    });

    //computed
    const object_projekt = computed(() => {
      return store.getters["admin/loadProject"];
    });

    const checkInputTechnology = computed(() => {
      if (technology.value === "") {
        return true;
      }
      return false;
    });

    const checkInputsImage = computed(() => {
      if (images_project.images.length === 0 || images_project.type === null) {
        return true;
      }
      return false;
    });

    const checkInputFileDownload = computed(() => {
      if (file_download.value.length === 0) {
        return true;
      }
      return false;
    });

    //functions
    store.dispatch("admin/loadProject", id_project.value.id);

    const loadProject = () => {
      setTimeout(() => {
        values_project.id = object_projekt.value.id;
        values_project.name_project = object_projekt.value.name_project;
        values_project.short_description =
          object_projekt.value.short_description;
        values_project.file_image.path = object_projekt.value.file_image.path;
        values_project.file_image.link = object_projekt.value.file_image.link;
        values_project.description = object_projekt.value.description;
        values_project.completion_data = object_projekt.value.completion_data;
        values_project.project_number = object_projekt.value.project_number;
        values_project.level_advanced = object_projekt.value.level_advanced;
        values_project.link_page = object_projekt.value.link_page;
        values_project.technologies = object_projekt.value.technologies;
        values_project.images_frontend = object_projekt.value.images_frontend;
        values_project.images_backend = object_projekt.value.images_backend;
        values_project.file_download.path =
          object_projekt.value.file_download.path;
        values_project.file_download.link =
          object_projekt.value.file_download.link;
        values_project.file_download.name =
          object_projekt.value.file_download.name;
        values_project.file_download.id = object_projekt.value.file_download.id;
      }, 100);
    };
    loadProject();

    const update_project = async () => {
      const formData = new FormData();
      formData.append("id", values_project.id);
      formData.append("name_project", values_project.name_project);
      formData.append("short_description", values_project.short_description);
      formData.append("description", values_project.description);
      formData.append("completion_data", values_project.completion_data);
      formData.append("project_number", values_project.project_number);
      formData.append("level_advanced", values_project.level_advanced);
      formData.append("link_page", values_project.link_page);
      if (file_image_project.value.length !== 0) {
        formData.append("file", file_image_project.value[0]);
      } else {
        formData.append("file", new File(["brak"], "brak.txt"));
      }

      const url =
        "";
      const method = "PUT";
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
      store.dispatch("admin/loadProject", id_project.value.id);
      store.dispatch("admin/loadProjects");
      file_image_project.value = [];
    };

    const add_technology = async () => {
      const url =
        "";
      const method = "POST";
      const headers = {
        Authorization: `Bearer ${store.getters["auth/optionsTokens"].access_token}`,
        "Content-Type": "application/json",
      };
      const body = {
        id_project: values_project.id,
        name: technology.value,
      };
      const response = await fetchData(url, method, headers, body, "body");
      notification(response);
      store.dispatch("admin/loadProject", values_project.id);
      loadProject();
      technology.value = "";
    };

    const deleteTechnology = async (id) => {
      const url =
        "";
      const method = "DELETE";
      const headers = {
        Authorization: `Bearer ${store.getters["auth/optionsTokens"].access_token}`,
        "Content-Type": "application/json",
      };
      const body = { id: id };
      const response = await fetchData(url, method, headers, body, "body");
      notification(response);
      store.dispatch("admin/loadProject", values_project.id);
      loadProject();
    };

    const addImages = async () => {
      const formData = new FormData();
      formData.append("id_project", values_project.id);
      formData.append("type", images_project.type);
      if (images_project.images.length !== 0) {
        for (const image of images_project.images) {
          formData.append("images", image);
        }
      } else {
        formData.append("images", new File(["brak"], "brak.txt"));
      }
      const url = "";
      const method = "post";
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
      store.dispatch("admin/loadProject", values_project.id);
      loadProject();
      images_project.images = [];
      images_project.type = null;
    };

    const deleteImage = async (id) => {
      const url = "";
      const method = "DELETE";
      const headers = {
        Authorization: `Bearer ${store.getters["auth/optionsTokens"].access_token}`,
        "Content-Type": "application/json",
      };
      const body = { id: id };
      const response = await fetchData(url, method, headers, body, "body");
      notification(response);
      store.dispatch("admin/loadProject", values_project.id);
      loadProject();
    };

    const uploadFileDownload = async () => {
      const formData = new FormData();
      formData.append("id", values_project.file_download.id);
      formData.append("id_project", values_project.id);
      formData.append("file", file_download.value[0]);

      const url =
        "";
      const method = "PUT";
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
      file_download.value = [];
      notification(response);
      store.dispatch("admin/loadProject", values_project.id);
      loadProject();
    };

    const closePanel = () => {
      context.emit("close-edit-project", false);
    };

    return {
      closePanel,
      id_project,
      values_project,
      object_projekt,
      update_project,
      file_image_project,
      add_technology,
      technology,
      loadProject,
      deleteTechnology,
      images_project,
      addImages,
      deleteImage,
      checkInputTechnology,
      checkInputsImage,
      uploadFileDownload,
      file_download,
      checkInputFileDownload,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./scss//EditProject.scss";
</style>
