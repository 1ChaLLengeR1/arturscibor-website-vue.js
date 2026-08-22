<template>
  <div class="edit__tool__container">
    <div class="close__container">
      <svg
        @click="closePanel"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
        <path
          d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
        />
      </svg>
    </div>

    <form class="edit__tool__box" @submit.prevent="saveTool">
      <h3>{{ t("admin.tools.toolTitle") }}</h3>
      <v-text-field
        bg-color="white"
        :label="t('admin.tools.name', { lang: language.toUpperCase() })"
        v-model="form.name"
      ></v-text-field>
      <v-textarea
        variant="filled"
        :label="t('admin.tools.information', { lang: language.toUpperCase() })"
        auto-grow
        bg-color="white"
        v-model="form.information"
      ></v-textarea>
      <v-text-field
        type="number"
        bg-color="white"
        :label="t('admin.tools.progress')"
        min="0"
        max="100"
        v-model="form.progress"
      ></v-text-field>
      <SkillLevelHint :progress="progressNumber"></SkillLevelHint>
      <v-text-field
        type="number"
        bg-color="white"
        :label="t('admin.tools.displayOrder')"
        v-model="form.numeric"
      ></v-text-field>
      <v-text-field
        bg-color="white"
        :label="t('admin.tools.link')"
        v-model="form.link"
      ></v-text-field>
      <v-btn @click="saveTool" color="blue">{{ t("admin.tools.saveChanges") }}</v-btn>

      <h3>{{ t("admin.tools.imageTitle") }}</h3>
      <div class="image__preview" v-if="resolveFileUrl(currentImage?.url)">
        <img :src="resolveFileUrl(currentImage.url)" :alt="tool.name" />
        <v-btn color="black" @click="removeImage">{{ t("admin.tools.removeImage") }}</v-btn>
      </div>
      <UploadFile
        accept="image/*"
        :label="t('admin.tools.uploadImage')"
        :buttonLabel="t('admin.tools.updateImage')"
        @upload="uploadImage"
      ></UploadFile>
    </form>
  </div>
</template>

<script>
import { computed, reactive, watch } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { resolveFileUrl } from "../../utils/url";
import UploadFile from "../util/UploadFile.vue";
import SkillLevelHint from "./SkillLevelHint.vue";

export default {
  components: {
    UploadFile,
    SkillLevelHint,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
  },
  emits: ["close-edit-tool"],
  setup(props, { emit }) {
    const store = useStore();
    const { t } = useI18n();

    const tool = computed(() =>
      store.getters["tools/collection"].find((item) => item.id === props.id)
    );
    const currentImage = computed(() => tool.value?.images[0] ?? null);

    const form = reactive({
      name: "",
      information: "",
      progress: null,
      numeric: null,
      link: "",
    });
    const progressNumber = computed(() =>
      form.progress === null || form.progress === "" ? null : Number(form.progress)
    );

    watch(
      tool,
      (newVal) => {
        if (!newVal) return;
        form.name = newVal.name ?? "";
        form.information = newVal.information ?? "";
        form.progress = newVal.progress;
        form.numeric = newVal.numeric;
        form.link = newVal.link ?? "";
      },
      { immediate: true }
    );

    const closePanel = () => {
      emit("close-edit-tool", false);
    };

    const saveTool = () => {
      if (form.name.trim() === "") return;
      store.dispatch("tools/apiUpdateTool", {
        toolId: props.id,
        payload: {
          language_code: props.language,
          name: form.name.trim(),
          information: form.information.trim() || null,
          progress: form.progress === null || form.progress === "" ? null : Number(form.progress),
          numeric: form.numeric === null || form.numeric === "" ? null : Number(form.numeric),
          link: form.link.trim() === "" ? null : form.link.trim(),
        },
      });
    };

    const uploadImage = (file) => {
      store.dispatch("tools/apiUploadToolImage", { toolId: props.id, file });
    };

    const removeImage = () => {
      if (!currentImage.value) return;
      store.dispatch("tools/apiDetachToolImage", {
        toolId: props.id,
        fileId: currentImage.value.file_id,
      });
    };

    return {
      t,
      tool,
      currentImage,
      form,
      progressNumber,
      closePanel,
      saveTool,
      uploadImage,
      removeImage,
      resolveFileUrl,
    };
  },
};
</script>

<style lang="scss" scoped>
.edit__tool__container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  gap: 0.5rem;

  .close__container {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    svg {
      width: 2rem;
      height: 2rem;
      fill: white;
      cursor: pointer;
    }
  }

  .edit__tool__box {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h3 {
      width: 100%;
      font-size: 2rem;
      color: white;
      text-align: center;
    }

    .image__preview {
      display: flex;
      align-items: center;
      gap: 1rem;

      img {
        width: 4rem;
        height: 4rem;
        object-fit: contain;
        background: white;
        border-radius: 4px;
      }
    }
  }
}
@media (min-width: 750px) {
  .edit__tool__container {
    .edit__tool__box {
      width: 70%;
      h3 {
        text-align: left;
      }
    }
  }
}
</style>
