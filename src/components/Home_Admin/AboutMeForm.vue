<template>
  <div class="aboutme__infomration__container">
    <form class="aboutme__information__box" @submit.prevent="save">
      <h3>Informacje</h3>
      <div class="language__switch">
        <v-btn
          :color="language === 'pl' ? 'blue' : undefined"
          @click="switchLanguage('pl')"
        >
          PL
        </v-btn>
        <v-btn
          :color="language === 'en' ? 'blue' : undefined"
          @click="switchLanguage('en')"
        >
          EN
        </v-btn>
      </div>
      <v-text-field
        bg-color="white"
        label="Imię i nazwisko"
        hint="Pole nie jest tłumaczone — wspólne dla obu języków"
        persistent-hint
        v-model="form.name"
      ></v-text-field>
      <v-text-field
        bg-color="white"
        :label="`Stanowisko (${language.toUpperCase()})`"
        v-model="form.job_title"
      ></v-text-field>
      <v-textarea
        variant="filled"
        :label="`Opis (${language.toUpperCase()})`"
        auto-grow
        bg-color="white"
        v-model="form.body_markdown"
      ></v-textarea>
      <v-btn @click="save" color="blue"> Zaaktualizuj! </v-btn>

      <h3>Zdjęcia</h3>
      <ul class="show__files">
        <li class="item" v-for="img in aboutMe?.images ?? []" :key="img.file_id">
          <a :href="resolveFileUrl(img.url)" target="_blank" alt="zdjecie">Podgląd zdjęcia</a>
          <v-btn color="black" @click="detachImage(img.file_id)">Usuń</v-btn>
        </li>
      </ul>
      <v-file-input
        bg-color="white"
        show-size
        counter
        accept="image/*"
        label="Załaduj zdjęcie!"
        v-model="file"
      ></v-file-input>
      <v-btn @click="uploadImage" :disabled="file.length !== 1" color="blue">
        Dodaj zdjęcie
      </v-btn>

      <h3>CV</h3>
      <ul class="show__files" v-if="cv?.url">
        <li class="item">
          <a :href="resolveFileUrl(cv.url)" target="_blank" alt="cv">Podgląd aktualnego CV</a>
        </li>
      </ul>
      <v-file-input
        bg-color="white"
        show-size
        counter
        accept="application/pdf"
        label="Załaduj CV!"
        v-model="cvFile"
      ></v-file-input>
      <v-btn @click="uploadCvFile" :disabled="cvFile.length !== 1" color="blue">
        Zaktualizuj CV!
      </v-btn>
    </form>
  </div>
</template>

<script>
import { ref, computed, watch, reactive } from "vue";
import { useStore } from "vuex";
import { resolveFileUrl } from "../../utils/url";
export default {
  setup() {
    const store = useStore();
    const language = ref("pl");
    const form = reactive({
      name: "",
      job_title: "",
      body_markdown: "",
    });
    const file = ref([]);
    const cvFile = ref([]);

    const loadAboutMe = () => {
      store.dispatch("aboutme/apiGetAboutMe", language.value);
    };
    loadAboutMe();

    const aboutMe = computed(() => store.getters["aboutme/data"]);
    const cv = computed(() => store.getters["cv/current"]);

    watch(
      aboutMe,
      (newVal) => {
        if (!newVal) return;
        form.name = newVal.name ?? "";
        form.job_title = newVal.job_title ?? "";
        form.body_markdown = newVal.body_markdown ?? "";
      },
      { immediate: true }
    );

    const switchLanguage = (lang) => {
      language.value = lang;
      loadAboutMe();
    };

    const save = () => {
      store.dispatch("aboutme/apiUpdateAboutMe", { ...form, language_code: language.value });
    };

    const uploadImage = () => {
      if (file.value.length !== 1) return;
      store.dispatch("aboutme/apiUploadAboutMeImage", file.value[0]);
      file.value = [];
    };

    const detachImage = (fileId) => {
      store.dispatch("aboutme/apiDetachAboutMeImage", fileId);
    };

    const uploadCvFile = () => {
      if (cvFile.value.length !== 1) return;
      store.dispatch("cv/apiUploadCv", cvFile.value[0]);
      cvFile.value = [];
    };

    return {
      language,
      form,
      file,
      cvFile,
      aboutMe,
      cv,
      switchLanguage,
      save,
      uploadImage,
      detachImage,
      uploadCvFile,
      resolveFileUrl,
    };
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

    .language__switch {
      width: 100%;
      display: flex;
      gap: 0.5rem;
    }

    .show__files {
      width: 100%;
      display: flex;
      flex-direction: column;
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
