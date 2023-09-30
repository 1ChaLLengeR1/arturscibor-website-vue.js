<template>
  <div class="add__items">
    <form enctype="multipart/form-data">
      <h3>Dodaj Narzędzie</h3>
      <v-text-field
        bg-color="white"
        label="Nazwa"
        v-model="items.name"
      ></v-text-field>
      <v-textarea
        variant="filled"
        label="Informacja"
        auto-grow
        bg-color="white"
        v-model="items.information"
      ></v-textarea>
      <v-text-field
        bg-color="white"
        label="Progres"
        v-model="items.progress"
      ></v-text-field>
      <v-text-field
        type="number"
        bg-color="white"
        label="Numeracja"
        v-model="items.numeric"
      ></v-text-field>
      <v-text-field
        bg-color="white"
        label="Link"
        v-model="items.link"
      ></v-text-field>
      <v-file-input
        bg-color="white"
        show-size
        counter
        label="Załaduj zdjęcie!"
        v-model="items.file"
      ></v-file-input>
      <v-btn @click="addItem" color="green" :disabled="checkInputs">
        Dodaj Narzędzie
      </v-btn>
    </form>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { notification } from "../JS/Notification";
import { fetchData } from "../JS/fetch";
import { reactive, computed } from "vue";
export default {
  setup() {
    // values
    const store = useStore();
    const items = reactive({
      name: "",
      information: "",
      progress: "",
      numeric: null,
      link: "",
      file: [],
    });

    // functions
    const addItem = async () => {
      const formData = new FormData();
      formData.append("name", items.name);
      formData.append("information", items.information);
      formData.append("progress", items.progress);
      formData.append("numeric", items.numeric);
      formData.append("link", items.link);
      formData.append("file", items.file[0]);

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
      store.dispatch("admin/loadTools");

      items.name = "";
      items.information = "";
      items.progress = "";
      items.numeric = null;
      items.link = "";
      items.file = [];
    };
    // computed
    const checkInputs = computed(() => {
      if (
        items.name === "" ||
        items.information === "" ||
        items.progress === "" ||
        items.numeric === null ||
        items.link === "" ||
        items.file.length === 0
      ) {
        return true;
      }
      return false;
    });

    return { items, checkInputs, addItem };
  },
};
</script>

<style lang="scss" scoped>
.add__items {
  width: 100%;
  form {
    width: 100%;
    display: flex;
    flex-direction: column;

    h3 {
      width: 100%;
      font-size: 2rem;
      color: white;
      text-align: center;
    }
  }
}
@media (min-width: 750px) {
  .add__items {
    width: 70%;

    form {
      h3 {
        text-align: left;
      }
    }
  }
}
</style>
