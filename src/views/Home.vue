<template>
  <div class="main__container__home">
    <section class="context_container">
      <h3>Cześć, to Ja</h3>
      <h1>Artur Ścibor</h1>
      <div class="text__typing">
        <div>
          <span>Jestem</span>
        </div>
        <div class="text">
          <span>{{ developer }}</span>
        </div>
      </div>
      <markdown-renderer class="body-markdown" :source="informationMe"></markdown-renderer>
      <social-media></social-media>
      <v-btn
        class="button__cv"
        rounded
        width="15rem"
        height="3rem"
        size="x-large"
        @click="downoloadCV"
      >
        Pobierz CV
      </v-btn>
    </section>
    <section class="image__container">
      <img :src="image" alt="My Image" />
    </section>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import SocialMedia from "../components/Home/SocialMedia.vue";
import MarkdownRenderer from "../components/util/MarkdownRenderer.vue";
import { resolveFileUrl } from "../utils/url";
export default {
  components: {
    "social-media": SocialMedia,
    "markdown-renderer": MarkdownRenderer,
  },
  setup() {
    const store = useStore();
    let image = ref("../../src/images/portfolio.png");

    // Animacja "Jestem {{developer}}" nie ma dziś odpowiednika w API (docs/1.home-section.md) — na razie statyczna wartość.
    const developer = ref("Frontend Developer");

    store.dispatch("aboutme/apiGetAboutMe");
    const aboutMe = computed(() => store.getters["aboutme/data"]);
    const informationMe = computed(() => aboutMe.value?.body_markdown ?? "");
    const imagesMe = computed(() =>
      (aboutMe.value?.images ?? []).map((item) => resolveFileUrl(item.url))
    );

    const downoloadCV = async () => {
      const url = "";
      const method = "GET";
      const headers = {};

      store.commit("util/loadingSpinner", true);

      fetch(url, {
        method: method,
        headers: headers,
      })
        .then((res) => res.blob())
        .then((data) => {
          var a = document.createElement("a");
          a.href = window.URL.createObjectURL(data);
          a.download = "arturscibor_cv";
          a.click();
        });

      store.commit("util/loadingSpinner", false);
    };

    let index = 0;
    const iterationImages = () => {
      if (imagesMe.value.length === 0) {
        return;
      }
      image.value = imagesMe.value[index];
      if (index === imagesMe.value.length - 1) {
        index = 0;
      } else {
        index++;
      }
    };
    setInterval(iterationImages, 4000);

    return {
      developer,
      informationMe,
      downoloadCV,
      imagesMe,
      image,
      iterationImages,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./scss/home.scss";
</style>
