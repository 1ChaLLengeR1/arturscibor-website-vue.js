<template>
  <div class="main__container__home">
    <section class="context_container">
      <Greeting />
      <MarkdownRenderer class="body-markdown" :source="informationMe"></MarkdownRenderer>
      <SocialMedia></SocialMedia>
      <v-btn
        class="button__cv"
        rounded
        width="15rem"
        height="3rem"
        size="x-large"
        @click="downloadCv"
      >
        {{ t("home.downloadCv") }}
      </v-btn>
    </section>
    <section class="image__container">
      <Carousel :images="imagesMe"></Carousel>
    </section>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import SocialMedia from "../components/Home/SocialMedia.vue";
import Greeting from "../components/Home/Greeting.vue";
import Carousel from "../components/Home/Carousel.vue";
import MarkdownRenderer from "../components/util/MarkdownRenderer.vue";
import { resolveFileUrl } from "../utils/url";
export default {
  components: {
    SocialMedia,
    Greeting,
    Carousel,
    MarkdownRenderer,
  },
  setup() {
    const store = useStore();
    const { t, locale } = useI18n();

    store.dispatch("aboutme/apiGetAboutMe", locale.value);
    const aboutMe = computed(() => store.getters["aboutme/data"]);
    const informationMe = computed(() => aboutMe.value?.body_markdown ?? "");
    const imagesMe = computed(() =>
      (aboutMe.value?.images ?? []).map((item) => resolveFileUrl(item.url))
    );

    const downloadCv = () => {
      store.dispatch("cv/apiDownloadCv");
    };

    return {
      t,
      informationMe,
      downloadCv,
      imagesMe,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./scss/home.scss";
</style>
