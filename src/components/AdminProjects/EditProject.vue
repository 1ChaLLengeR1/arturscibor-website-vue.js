<template>
  <div class="edit__project__container">
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

    <form class="edit__project__box" @submit.prevent="saveProject">
      <h3>{{ t("admin.projects.projectTitle") }}</h3>
      <v-text-field
        bg-color="white"
        :label="t('admin.projects.name')"
        v-model="form.name"
      ></v-text-field>
      <v-text-field
        bg-color="white"
        :label="t('admin.projects.shortDescription', { lang: language.toUpperCase() })"
        v-model="form.short_description"
      ></v-text-field>
      <v-textarea
        variant="filled"
        :label="t('admin.projects.description', { lang: language.toUpperCase() })"
        auto-grow
        bg-color="white"
        v-model="form.description"
      ></v-textarea>
      <v-select
        bg-color="white"
        :label="t('admin.projects.level')"
        clearable
        :items="levelOptions"
        v-model="form.level"
      ></v-select>
      <v-text-field
        bg-color="white"
        :label="t('admin.projects.technologies')"
        v-model="form.technologies"
      ></v-text-field>
      <v-text-field
        bg-color="white"
        :label="t('admin.projects.githubUrl')"
        v-model="form.github_url"
      ></v-text-field>
      <v-text-field
        bg-color="white"
        :label="t('admin.projects.liveUrl')"
        v-model="form.live_url"
      ></v-text-field>
      <v-text-field
        type="date"
        bg-color="white"
        :label="t('admin.projects.completedAt')"
        v-model="form.completed_at"
      ></v-text-field>
      <v-text-field
        type="number"
        bg-color="white"
        :label="t('admin.projects.displayOrder')"
        v-model="form.numeric"
      ></v-text-field>
      <v-btn @click="saveProject" color="blue">{{ t("admin.projects.saveChanges") }}</v-btn>

      <h3>{{ t("admin.projects.imagesTitle") }}</h3>
      <ul class="images__list" v-if="project?.images?.length">
        <li class="item" v-for="image in project.images" :key="image.file_id">
          <img :src="resolveFileUrl(image.url)" :alt="project.name" />
          <v-btn color="black" @click="removeImage(image.file_id)">
            {{ t("admin.projects.removeImage") }}
          </v-btn>
        </li>
      </ul>
      <UploadFile
        accept="image/*"
        :label="t('admin.projects.uploadImage')"
        :buttonLabel="t('admin.projects.addImage')"
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
import { requestConfirm } from "../../utils/confirm";
import { PROJECT_LEVEL_VALUES } from "../../utils/projectLevel";

const splitTechnologies = (value) =>
  value
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);

export default {
  components: {
    UploadFile,
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
  emits: ["close-edit-project"],
  setup(props, { emit }) {
    const store = useStore();
    const { t } = useI18n();

    const levelOptions = computed(() =>
      PROJECT_LEVEL_VALUES.map((value) => ({ value, title: t(`projects.level.${value}`) }))
    );

    const project = computed(() =>
      store.getters["projects/collection"].find((item) => item.id === props.id)
    );

    const form = reactive({
      name: "",
      short_description: "",
      description: "",
      level: null,
      technologies: "",
      github_url: "",
      live_url: "",
      completed_at: "",
      numeric: null,
    });

    watch(
      project,
      (newVal) => {
        if (!newVal) return;
        form.name = newVal.name ?? "";
        form.short_description = newVal.short_description ?? "";
        form.description = newVal.description ?? "";
        form.level = newVal.level;
        form.technologies = (newVal.technologies ?? []).join(", ");
        form.github_url = newVal.github_url ?? "";
        form.live_url = newVal.live_url ?? "";
        form.completed_at = newVal.completed_at ?? "";
        form.numeric = newVal.numeric;
      },
      { immediate: true }
    );

    const closePanel = () => {
      emit("close-edit-project", false);
    };

    const saveProject = () => {
      if (form.name.trim() === "") return;
      store.dispatch("projects/apiUpdateProject", {
        projectId: props.id,
        payload: {
          language_code: props.language,
          name: form.name.trim(),
          short_description: form.short_description.trim() || null,
          description: form.description.trim() || null,
          level: form.level,
          technologies:
            form.technologies.trim() === "" ? null : splitTechnologies(form.technologies),
          github_url: form.github_url.trim() === "" ? null : form.github_url.trim(),
          live_url: form.live_url.trim() === "" ? null : form.live_url.trim(),
          completed_at: form.completed_at || null,
          numeric: form.numeric === null || form.numeric === "" ? null : Number(form.numeric),
        },
      });
    };

    const uploadImage = (file) => {
      store.dispatch("projects/apiUploadProjectImage", { projectId: props.id, file });
    };

    const removeImage = (fileId) => {
      requestConfirm(store, {
        message: t("admin.projects.confirmRemoveImage"),
        onConfirm: () =>
          store.dispatch("projects/apiDetachProjectImage", { projectId: props.id, fileId }),
      });
    };

    return {
      t,
      project,
      form,
      levelOptions,
      closePanel,
      saveProject,
      uploadImage,
      removeImage,
      resolveFileUrl,
    };
  },
};
</script>

<style lang="scss" scoped>
.edit__project__container {
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
      fill: var(--text-color);
      cursor: pointer;
    }
  }

  .edit__project__box {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h3 {
      width: 100%;
      font-size: 2rem;
      color: var(--text-color);
      text-align: center;
    }

    .images__list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      list-style: none;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;

        img {
          width: 6rem;
          height: 6rem;
          object-fit: cover;
          border-radius: 8px;
        }
      }
    }
  }
}
@media (min-width: 750px) {
  .edit__project__container {
    .edit__project__box {
      width: 70%;
      h3 {
        text-align: left;
      }
    }
  }
}
</style>
