<template>
  <div class="add__tool__container">
    <CollapsiblePanel
      :model-value="expanded"
      @update:model-value="$emit('update:expanded', $event)"
      :title="t('admin.tools.addToolTitle')"
    >
    <form class="add__tool__box" @submit.prevent="addTool">
      <v-text-field
        bg-color="white"
        :label="t('admin.tools.namePl')"
        v-model="form.name_pl"
      ></v-text-field>
      <v-text-field
        bg-color="white"
        :label="t('admin.tools.nameEn')"
        v-model="form.name_en"
      ></v-text-field>
      <v-textarea
        variant="filled"
        :label="t('admin.tools.informationPl')"
        auto-grow
        bg-color="white"
        v-model="form.information_pl"
      ></v-textarea>
      <v-textarea
        variant="filled"
        :label="t('admin.tools.informationEn')"
        auto-grow
        bg-color="white"
        v-model="form.information_en"
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
        :hint="t('admin.tools.optional')"
        persistent-hint
        v-model="form.numeric"
      ></v-text-field>
      <v-text-field
        bg-color="white"
        :label="t('admin.tools.link')"
        v-model="form.link"
      ></v-text-field>
      <v-btn @click="addTool" :disabled="!canAdd" color="blue">
        {{ t("admin.tools.addTool") }}
      </v-btn>
    </form>
    </CollapsiblePanel>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import SkillLevelHint from "./SkillLevelHint.vue";
import CollapsiblePanel from "../util/CollapsiblePanel.vue";

const toMultiLang = (pl, en) => {
  const plVal = (pl ?? "").trim();
  const enVal = (en ?? "").trim();
  if (!plVal && !enVal) return null;
  return { pl: plVal || enVal, en: enVal || plVal };
};

export default {
  components: {
    SkillLevelHint,
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
    const form = reactive({
      name_pl: "",
      name_en: "",
      information_pl: "",
      information_en: "",
      progress: null,
      numeric: null,
      link: "",
    });

    const canAdd = computed(() => form.name_pl.trim() !== "" && form.name_en.trim() !== "");
    const progressNumber = computed(() =>
      form.progress === null || form.progress === "" ? null : Number(form.progress)
    );

    const addTool = () => {
      if (!canAdd.value) return;
      store.dispatch("tools/apiCreateTool", {
        name: { pl: form.name_pl.trim(), en: form.name_en.trim() },
        information: toMultiLang(form.information_pl, form.information_en),
        progress: form.progress === null || form.progress === "" ? null : Number(form.progress),
        numeric: form.numeric === null || form.numeric === "" ? null : Number(form.numeric),
        link: form.link.trim() === "" ? null : form.link.trim(),
      });

      form.name_pl = "";
      form.name_en = "";
      form.information_pl = "";
      form.information_en = "";
      form.progress = null;
      form.numeric = null;
      form.link = "";
    };

    return { t, expanded, form, canAdd, progressNumber, addTool };
  },
};
</script>

<style lang="scss" scoped>
.add__tool__container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;

  :deep(.collapsible__panel) {
    width: 100%;
  }

  .add__tool__box {
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
  .add__tool__container {
    :deep(.collapsible__panel) {
      width: 70%;
    }
  }
}
</style>
