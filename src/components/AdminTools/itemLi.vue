<template>
  <li>
    <h2>{{ name }}</h2>
    <v-text-field
      bg-color="white"
      label="Nazwa"
      v-model="item_value.name"
    ></v-text-field>
    <v-textarea
      variant="filled"
      label="Informacja"
      auto-grow
      bg-color="white"
      v-model="item_value.information"
    ></v-textarea>
    <v-text-field
      bg-color="white"
      label="Progres"
      v-model="item_value.progress"
    ></v-text-field>
    <v-text-field
      type="number"
      bg-color="white"
      label="Numeracja"
      v-model="item_value.numeric"
    ></v-text-field>
    <v-text-field
      bg-color="white"
      label="Link"
      v-model="item_value.link"
    ></v-text-field>
    <v-file-input
      bg-color="white"
      show-size
      counter
      label="Załaduj zdjęcie!"
      v-model="item_value.file"
    ></v-file-input>
    <div class="show__file">
      <span>Plik podłączony!</span>
      <a :href="item_value.link_image" alt="link do zdjęcia">Podgląd pliku!</a>
    </div>
    <div class="buttons__box">
      <v-btn color="blue" @click.prevent="upload"> Zaaktualizuj </v-btn>
      <v-btn color="black" @click.prevent="deleteItem">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="30"
          height="30"
          viewBox="0 0 30 30"
        >
          <path
            d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"
          ></path>
        </svg>
      </v-btn>
    </div>
  </li>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { fetchData } from "../JS/fetch";
import { notification } from "../JS/Notification";
export default {
  props: [
    "id",
    "name",
    "information",
    "progress",
    "numeric",
    "link",
    "link_image",
  ],
  setup(props) {
    // values
    const store = useStore();
    const { id, name, information, progress, numeric, link, link_image } =
      toRefs(props);
    const item_value = reactive({
      id: "",
      name: "",
      information: "",
      progress: "",
      numeric: null,
      link: "",
      link_image: "",
      file: [],
    });
    const items_props = reactive({
      id: id,
      name: name,
      information: information,
      progress: progress,
      numeric: numeric,
      link: link,
      link_image: link_image,
    });

    // functions
    setTimeout(() => {
      item_value.id = items_props.id;
      item_value.name = items_props.name;
      item_value.information = items_props.information;
      item_value.progress = items_props.progress;
      item_value.numeric = items_props.numeric;
      item_value.link = items_props.link;
      item_value.link_image = items_props.link_image;
    }, 100);

    const deleteItem = async () => {
      const url = "";
      const method = "DELETE";
      const headers = {
        Authorization: `Bearer ${store.getters["auth/optionsTokens"].access_token}`,
        "Content-Type": "application/json",
      };
      const body = { id: item_value.id };
      const response = await fetchData(url, method, headers, body, "body");
      notification(response);
      store.dispatch("admin/loadTools");
    };

    const upload = async () => {
      const formData = new FormData();
      formData.append("id", item_value.id);
      formData.append("name", item_value.name);
      formData.append("information", item_value.information);
      formData.append("progress", item_value.progress);
      formData.append("numeric", item_value.numeric);
      formData.append("link", item_value.link);
      if (item_value.file.length !== 0) {
        formData.append("file", item_value.file[0]);
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
      store.dispatch("admin/loadTools");
      item_value.file = [];
    };

    return { item_value, items_props, deleteItem, upload };
  },
};
</script>

<style lang="scss" scoped>
li {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;

  h2 {
    color: white;
  }

  .show__file {
    width: 100%;
    display: flex;
    justify-content: space-around;
    color: black;
    font-size: 0.8rem;
    font-weight: bold;
    background-color: white;
    border-radius: 8px;

    span {
      color: black;
    }

    a {
      color: var(--main-color);
    }
  }
  .buttons__box {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;

    svg {
      fill: red;
    }
  }
}
@media (min-width: 750px) {
  li {
    .show__file {
      font-size: 1.2rem;
    }
  }
}
</style>
