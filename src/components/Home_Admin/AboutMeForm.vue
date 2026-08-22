<template>
  <div class="aboutme__infomration__container">
    <form class="aboutme__information__box" @submit.prevent="save">
      <h3>{{ t("admin.aboutme.infoTitle") }}</h3>
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
        :label="t('admin.aboutme.fullName')"
        :hint="t('admin.aboutme.fullNameHint')"
        persistent-hint
        v-model="form.name"
      ></v-text-field>
      <v-text-field
        bg-color="white"
        :label="t('admin.aboutme.jobTitle', { lang: language.toUpperCase() })"
        v-model="form.job_title"
      ></v-text-field>
      <v-textarea
        variant="filled"
        :label="t('admin.aboutme.description', { lang: language.toUpperCase() })"
        auto-grow
        bg-color="white"
        v-model="form.body_markdown"
      ></v-textarea>
      <v-btn @click="save" color="blue">{{ t("admin.aboutme.save") }}</v-btn>

      <h3>{{ t("admin.aboutme.photosTitle") }}</h3>
      <ul class="show__files">
        <li class="item" v-for="img in aboutMe?.images ?? []" :key="img.file_id">
          <a :href="resolveFileUrl(img.url)" target="_blank">{{ t("admin.aboutme.photoPreview") }}</a>
          <v-btn color="black" @click="detachImage(img.file_id)">{{ t("admin.aboutme.delete") }}</v-btn>
        </li>
      </ul>
      <UploadFile
        accept="image/*"
        :label="t('admin.aboutme.uploadPhoto')"
        :buttonLabel="t('admin.aboutme.addPhoto')"
        @upload="uploadImage"
      ></UploadFile>

      <h3>{{ t("admin.aboutme.cvTitle") }}</h3>
      <ul class="show__files" v-if="cv?.url">
        <li class="item">
          <a :href="resolveFileUrl(cv.url)" target="_blank">{{ t("admin.aboutme.cvPreview") }}</a>
        </li>
      </ul>
      <UploadFile
        accept="application/pdf"
        :label="t('admin.aboutme.uploadCv')"
        :buttonLabel="t('admin.aboutme.updateCv')"
        @upload="uploadCvFile"
      ></UploadFile>
    </form>
  </div>
</template>

<script>
import { ref, computed, watch, reactive } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { resolveFileUrl } from "../../utils/url";
import UploadFile from "../util/UploadFile.vue";
export default {
  components: {
    UploadFile,
  },
  setup() {
    const store = useStore();
    const { t } = useI18n();
    const language = ref("pl");
    const form = reactive({
      name: "",
      job_title: "",
      body_markdown: "",
    });

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

    const uploadImage = (file) => {
      store.dispatch("aboutme/apiUploadAboutMeImage", file);
    };

    const detachImage = (fileId) => {
      store.dispatch("aboutme/apiDetachAboutMeImage", fileId);
    };

    const uploadCvFile = (file) => {
      store.dispatch("cv/apiUploadCv", file);
    };

    return {
      t,
      language,
      form,
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
