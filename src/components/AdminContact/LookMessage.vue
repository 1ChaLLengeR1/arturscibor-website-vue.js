<template>
  <div class="look__message__container">
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
    <div class="message__container">
      <div class="name__email">
        <p>
          Nazwa użytkownika -&nbsp<span>{{ item_mesage.name }}</span>
        </p>
        <p>
          E-mail -&nbsp<span>{{ item_mesage.email }}</span>
        </p>
      </div>
      <div class="description__container">
        <p>
          {{ item_mesage.description }}
        </p>
      </div>
      <div class="box__images">
        <h3>Zdjęcia zawartę w wiadomości</h3>
        <img src="../../images/brak.png" v-if="item_mesage.images.length === 0" alt="lack photo" />
        <v-carousel show-arrows="hover" hide-controls v-else>
            <v-carousel-item
              v-for="(item, i) in item_mesage.images"
              :key="i"
              :src="item.link"
              max-width="100%"
              max-height="100%"
            ></v-carousel-item>
          </v-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchData } from "../JS/fetch";
import { useStore } from "vuex";
import { reactive } from "vue";
export default {
  props: ["id"],
  emits: ["close-message"],
  setup(props, context) {
    //values
    const store = useStore();
    const item_mesage = reactive({
      name: "",
      email: "",
      description: "",
      images: [],
    });

    //functions

    const loadMessage = async () => {
      const url = "";
      const method = "POST";
      const headers = {
        Authorization: `Bearer ${store.getters["auth/optionsTokens"].access_token}`,
        "Content-Type": "application/json",
      };
      const body = {
        id: props.id,
      };

      const response = await fetchData(url, method, headers, body, "body");
      if (response.error || response.detail) {
        item_mesage.name = "Błąd uwierzytelniania";
        item_mesage.email = "Błąd uwierzytelniania";
        item_mesage.description = "Błąd uwierzytelniania";
        item_mesage.images = [];
        return;
      }
      item_mesage.name = response.name;
      item_mesage.email = response.email;
      item_mesage.description = response.description;
      item_mesage.images = response.images_message;
    };

    loadMessage();

    const closePanel = () => {
      context.emit("close-message", false);
    };
    return { closePanel, loadMessage, item_mesage };
  },
};
</script>

<style lang="scss" scoped>
@import '../AdminContact/scss/LookMessage.scss'
</style>
