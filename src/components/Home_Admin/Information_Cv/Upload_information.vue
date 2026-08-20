<template>
  <div class="upload__information_container">
    <div class="upload__container">
      <h3>Zmień swoj krótki opis</h3>
      <v-textarea
        label="Krótki opis siebie"
        v-model="text.body_markdown"
        bg-color="white"
      ></v-textarea>
      <v-btn @click="uploadInformation">Zapisz</v-btn>
    </div>
  </div>
</template>

<script>
import { reactive, computed, watch } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const text = reactive({
      body_markdown: "",
    });

    store.dispatch("aboutme/apiGetAboutMe");
    const aboutMe = computed(() => store.getters["aboutme/data"]);

    watch(
      aboutMe,
      (newVal) => {
        if (!newVal) return;
        text.body_markdown = newVal.body_markdown ?? "";
      },
      { immediate: true }
    );

    const uploadInformation = () => {
      store.dispatch("aboutme/apiUpdateAboutMe", { body_markdown: text.body_markdown });
    };

    return { text, uploadInformation, aboutMe };
  },
};
</script>

<style lang="scss" scoped>
.upload__information_container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  .upload__container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;

    h3 {
      font-size: 2rem;
      color: white;
      text-align: center;
    }
  }
}

@media (min-width: 750px) {
  .upload__information_container {
    .upload__container {
      width: 70%;
      h3 {
        text-align: left;
      }
    }
  }
}
</style>
