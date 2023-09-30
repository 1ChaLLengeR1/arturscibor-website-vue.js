<template>
  <div class="aboutme__infomration__container">
    <form enctype="multipart/form-data" class="aboutme__information__box">
      <h3>Informacje</h3>
      <v-text-field
        bg-color="white"
        label="nazwa"
        v-model="item_values.name"
      ></v-text-field>
      <v-text-field
        bg-color="white"
        label="praca"
        v-model="item_values.job"
      ></v-text-field>
      <v-textarea
        variant="filled"
        label="informacja"
        auto-grow
        bg-color="white"
        v-model="item_values.information"
      ></v-textarea>
      <v-file-input
        bg-color="white"
        show-size
        counter
        label="Załaduj zdjęcie!"
        v-model="file"
      ></v-file-input>
      <ul class="show__files">
        <li class="item">
          <span>Zdjęcie</span>
          <a :href="item_values.link_image" alt="zdjecie">Podgląd zdjęcia</a>
        </li>
      </ul>
      <v-btn @click="upload" color="blue"> Zaaktualizuj! </v-btn>
    </form>
  </div>
</template>

<script>
import { ref, computed, watch, reactive } from "vue";
import { useStore } from "vuex";
import { fetchData } from "../JS/fetch";
import { notification } from "../JS/Notification";
export default {
  setup() {
    const store = useStore();
    const item_values = reactive({
      item_id: "",
      name: "",
      job: "",
      information: "",
      link_image: "",
    });
    const file = ref([]);

    const item = computed(() => {
      return store.getters["admin/loadInformationAboutMe"];
    });

    watch(item, (newVal) => {
      item_values.item_id = newVal.id;
      item_values.name = newVal.name;
      item_values.job = newVal.job;
      item_values.information = newVal.information;
      item_values.link_image = newVal.link_image;
    });

    const upload = async () => {
      const formData = new FormData();
      formData.append("item_id", item_values.item_id);
      formData.append("name", item_values.name);
      formData.append("job", item_values.job);
      formData.append("information", item_values.information);
      if (file.value.length === 1) {
        for (const key of file.value) {
          formData.append("file", key);
        }
      } else {
        formData.append(
          "file",
          new File(["brak"], "brak.txt", {
            type: "text/plain",
          })
        );
      }

      const url = "";
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
      file.value = [];
      store.dispatch("admin/loadInformationAboutMe");
    };

    return { item, upload, item_values, file };
  },
};
</script>

<style lang="scss" scoped>
.aboutme__infomration__container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;

  .aboutme__information__box {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .show__files {
      width: 100%;
      display: flex;
      gap: 0.5rem;
      list-style: none;

      .item {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: white;
        border-radius: 4px;
        padding: 0.3rem;
        color: black;
        font-weight: bold;

        a {
          color: var(--main-color);
        }
      }
    }

    h3 {
      width: 100%;
      font-size: 2rem;
      color: white;
      text-align: center;
    }
  }
 
}
@media (min-width: 750px) {
  .aboutme__infomration__container {
    .aboutme__information__box {
      width: 70%;
      h3 {
        text-align: left;
      }
    }
  }
}
</style>
