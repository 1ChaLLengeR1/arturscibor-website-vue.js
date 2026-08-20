<template>
  <div class="upload__cv__container">
    <form class="upload__cv__box" @submit.prevent="upload">
      <h3>Zmień CV</h3>
      <v-file-input
        bg-color="white"
        show-size
        counter
        accept="application/pdf"
        v-model="file"
        label="Załaduj plik!"
      ></v-file-input>
      <v-btn @click="upload" :disabled="file.length !== 1" color="blue">
        Zaktualizuj Plik!
      </v-btn>
    </form>
    <ul class="show__files" v-if="cv?.url">
      <li class="item">
        <span>Aktualne CV</span>
        <a :href="resolveFileUrl(cv.url)" target="_blank" alt="link do CV">Podgląd pliku!</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { resolveFileUrl } from "../../../utils/url";
export default {
  setup() {
    const store = useStore();
    const file = ref([]);

    const cv = computed(() => store.getters["cv/current"]);

    const upload = () => {
      if (file.value.length !== 1) return;
      store.dispatch("cv/apiUploadCv", file.value[0]);
      file.value = [];
    };

    return { file, cv, upload, resolveFileUrl };
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
      .item {
        font-size: 1.2rem;
      }
    }
  }
}
</style>
