<template>
  <div class="add__project__container">
    <CollapsiblePanel
      :model-value="expanded"
      @update:model-value="$emit('update:expanded', $event)"
      :title="t('admin.projects.addProjectTitle')"
    >
    <form class="add__project__box" @submit.prevent="addProject">
      <v-text-field
        bg-color="white"
        :label="t('admin.projects.name')"
        v-model="form.name"
      ></v-text-field>
      <v-text-field
        bg-color="white"
        :label="t('admin.projects.shortDescriptionPl')"
        v-model="form.short_description_pl"
      ></v-text-field>
      <v-text-field
        bg-color="white"
        :label="t('admin.projects.shortDescriptionEn')"
        v-model="form.short_description_en"
      ></v-text-field>
      <v-textarea
        variant="filled"
        :label="t('admin.projects.descriptionPl')"
        auto-grow
        bg-color="white"
        v-model="form.description_pl"
      ></v-textarea>
      <v-textarea
        variant="filled"
        :label="t('admin.projects.descriptionEn')"
        auto-grow
        bg-color="white"
        v-model="form.description_en"
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
        type="date"
        bg-color="white"
        :label="t('admin.projects.startedAt')"
        v-model="form.started_at"
      ></v-text-field>
      <v-checkbox
        :label="t('admin.projects.isSupport')"
        v-model="form.is_support"
      ></v-checkbox>
      <v-text-field
        type="number"
        bg-color="white"
        :label="t('admin.projects.displayOrder')"
        :hint="t('admin.projects.optional')"
        persistent-hint
        v-model="form.numeric"
      ></v-text-field>
      <v-btn @click="addProject" :disabled="!canAdd" color="blue">
        {{ t("admin.projects.addProject") }}
      </v-btn>
    </form>
    </CollapsiblePanel>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import CollapsiblePanel from "../util/CollapsiblePanel.vue";
import { PROJECT_LEVEL_VALUES } from "../../utils/projectLevel";

const toMultiLang = (pl, en) => {
  const plVal = (pl ?? "").trim();
  const enVal = (en ?? "").trim();
  if (!plVal && !enVal) return null;
  return { pl: plVal || enVal, en: enVal || plVal };
};

const splitTechnologies = (value) =>
  value
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);

export default {
  components: {
    CollapsiblePanel,
  },
  props: {
    expanded: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:expanded"],
  setup(props) {
    const { expanded } = toRefs(props);
    const store = useStore();
    const { t } = useI18n();

    const levelOptions = computed(() =>
      PROJECT_LEVEL_VALUES.map((value) => ({ value, title: t(`projects.level.${value}`) }))
    );

    const form = reactive({
      name: "",
      short_description_pl: "",
      short_description_en: "",
      description_pl: "",
      description_en: "",
      level: null,
      technologies: "",
      github_url: "",
      live_url: "",
      completed_at: "",
      started_at: "",
      is_support: false,
      numeric: null,
    });

    const canAdd = computed(() => form.name.trim() !== "");

    const addProject = () => {
      if (!canAdd.value) return;
      store.dispatch("projects/apiCreateProject", {
        name: form.name.trim(),
        short_description: toMultiLang(form.short_description_pl, form.short_description_en),
        description: toMultiLang(form.description_pl, form.description_en),
        level: form.level,
        technologies: form.technologies.trim() === "" ? null : splitTechnologies(form.technologies),
        github_url: form.github_url.trim() === "" ? null : form.github_url.trim(),
        live_url: form.live_url.trim() === "" ? null : form.live_url.trim(),
        completed_at: form.completed_at || null,
        started_at: form.started_at || null,
        is_support: form.is_support,
        numeric: form.numeric === null || form.numeric === "" ? null : Number(form.numeric),
      });

      form.name = "";
      form.short_description_pl = "";
      form.short_description_en = "";
      form.description_pl = "";
      form.description_en = "";
      form.level = null;
      form.technologies = "";
      form.github_url = "";
      form.live_url = "";
      form.completed_at = "";
      form.started_at = "";
      form.is_support = false;
      form.numeric = null;
    };

    return { t, expanded, form, levelOptions, canAdd, addProject };
  },
};
</script>

<style lang="scss" scoped>
.add__project__container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;

  :deep(.collapsible__panel) {
    width: 100%;
  }

  .add__project__box {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    button {
      width: 100%;
    }
  }
}
@media (min-width: 750px) {
  .add__project__container {
    :deep(.collapsible__panel) {
      width: 70%;
    }
  }
}
</style>
