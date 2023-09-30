<template>
  <div class="upload__cv__container">
    <form enctype="multipart/form-data" class="upload__cv__box">
      <h3>{{ nazwa }}</h3>
      <v-file-input
        bg-color="white"
        show-size
        counter
        v-model="file"
        :multiple="multiple"
        label="Załaduj zdjęcie!"
      ></v-file-input>
      <v-btn @click="upload" :disabled="checkFile" color="blue"> Zaktualizuj Plik! </v-btn>
    </form>
    <ul class="show__files">
      <li
        class="item"
        :class="{ item__active: classItemDelete }"
        v-for="item in loadFileCv"
        :key="item"
      >
        <span>{{ item.name }}</span>
        <a :href="item.link" alt="link do zdjęcia">Podgląd pliku!</a>
        <v-btn v-if="classItemDelete" @click="deleteImage(item.id)"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 30 30"
          >
            <path
              d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"
            ></path></svg
        ></v-btn>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed, toRefs } from "vue";
import { useStore } from "vuex";
import { fetchGet } from "../JS/fetchGetActions";
import { fetchData } from "../JS/fetch";
import { notification } from "../JS/Notification";
export default {
  props: ["template", "setup"],
  setup(props) {
    const store = useStore();
    const file = ref([]);
    const cvFile = ref([]);

    const { nazwa, multiple, classItemDelete } = toRefs(props.template);
    const { formdata, urlPost, methodFetch, loadUrl } = toRefs(props.setup);

    const upload = async () => {
      const formData = new FormData();
      if (file.value.length === 1) {
        for (const key of file.value) {
          formData.append(`${formdata.value.item}`, key);
        }
        formData.append(`${formdata.value.id}`, cvFile.value[0].id);
      } else {
        for (const key of file.value) {
          formData.append(`${formdata.value.item}`, key);
        }
      }

      const url = urlPost.value;
      const method = methodFetch.value;
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
      file.value = [];
      notification(response);
      loadFiles();
    };

    const loadFiles = async () => {
      const url = loadUrl.value;
      const response = await fetchGet(url);
      cvFile.value = response;
    };
    loadFiles();

    const deleteImage = async (id_item) => {
      const url = "";
      const method = "DELETE";
      const headers = {
        authorization: `Bearer ${store.getters["auth/optionsTokens"].access_token}`,
        "Content-type": "application/json",
      };
      const body = { id: id_item };
      const response = await fetchData(url, method, headers, body, "body");
      notification(response);
      loadFiles();
    };

    const loadFileCv = computed(() => {
      return cvFile.value;
    });

    const checkFile = computed(() => {
      if (file.value.length === 0) {
        return true;
      }
      return false;
    });

    return {
      upload,
      file,
      loadFiles,
      cvFile,
      loadFileCv,
      checkFile,
      nazwa,
      multiple,
      classItemDelete,
      deleteImage,
    };
  },
};
</script>

<style lang="scss" scoped>
.upload__cv__container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  gap: 0.5rem;
  .upload__cv__box {
    width: 100%;
    display: flex;
    flex-direction: column;

    h3 {
      font-size: 2rem;
      color: white;
      text-align: center;
    }

    button {
      width: 100%;
    }
  }
  .show__files {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    padding: 0;

    .item {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: 0.5rem;
      list-style: none;
      background-color: white;
      border-radius: 4px;
      padding: 0.3rem;
      color: black;
      font-size: 0.8rem;
      font-weight: bold;

      span {
        color: black;
      }

      a {
        color: var(--main-color);
      }

      svg {
        fill: red;
      }

      button {
        background: black;
      }
    }

    .item__active {
      justify-content: space-between;
    }
  }
}
@media (min-width: 750px) {
  .upload__cv__container {
    .upload__cv__box {
      width: 70%;
      h3 {
        text-align: left;
      }
    }
    .show__files {
      width: 70%;
      .item{
        font-size: 1.2rem;
      }
    }
  }
}
</style>
