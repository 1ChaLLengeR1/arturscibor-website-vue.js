<template>
  <div class="main__container__aboutme">
    <Transition name="bounce">
      <read-more
        v-if="readMoreBackground"
        :arrayItems="loadReadMore"
        @close-readmore="closeReadMore"
      ></read-more>
    </Transition>
    <div class="image__container">
      <img :src="resolveFileUrl(aboutMe?.images?.[0]?.url)" />
    </div>
    <div class="context__container">
      <h2 class="about">
        <span>{{ aboutMe?.name }}</span>
      </h2>
      <h3>{{ aboutMe?.job_title }}</h3>
      <markdown-renderer class="body-markdown" :source="aboutMe?.body_markdown"></markdown-renderer>
      <v-btn
        class="button__read"
        rounded
        width="20rem"
        height="3rem"
        size="large"
        @click="readMore"
      >
        Przeczytaj Więcej!
      </v-btn>
    </div>
  </div>
</template>

<script>
import ReadMore from "../components/AboutMe/ReadMoreAboutMe.vue";
import MarkdownRenderer from "../components/util/MarkdownRenderer.vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { resolveFileUrl } from "../utils/url";
export default {
  components: {
    "read-more": ReadMore,
    "markdown-renderer": MarkdownRenderer,
  },
  setup() {
    const store = useStore();
    const readMoreBackground = ref(false);

    store.dispatch("aboutme/apiGetAboutMe");
    const aboutMe = computed(() => store.getters["aboutme/data"]);

    // "Przeczytaj więcej" nie ma dziś odpowiednika w API (docs/1.home-section.md) — pusta lista, żeby modal się nie wywalał.
    const loadReadMore = computed(() => []);

    const readMore = () => {
      readMoreBackground.value = true;
    };

    const closeReadMore = (val) => {
      readMoreBackground.value = val;
    };

    return {
      readMoreBackground,
      readMore,
      closeReadMore,
      aboutMe,
      loadReadMore,
      resolveFileUrl,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./scss/aboutme.scss";
</style>
