<template>
  <div class="add__company__container">
    <CollapsiblePanel
      :model-value="expanded"
      @update:model-value="$emit('update:expanded', $event)"
      :title="t('admin.work.addCompanyTitle')"
    >
    <form class="add__company__box" @submit.prevent="addCompany">
      <v-text-field
        bg-color="white"
        :label="t('admin.work.companyName')"
        v-model="form.company_name"
      ></v-text-field>
      <v-text-field
        type="number"
        bg-color="white"
        :label="t('admin.work.displayOrder')"
        :hint="t('admin.work.optional')"
        persistent-hint
        v-model="form.numeric"
      ></v-text-field>
      <v-btn @click="addCompany" :disabled="form.company_name.trim() === ''" color="blue">
        {{ t("admin.work.addCompany") }}
      </v-btn>
    </form>
    </CollapsiblePanel>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import CollapsiblePanel from "../util/CollapsiblePanel.vue";

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
    const form = reactive({
      company_name: "",
      numeric: null,
    });

    const addCompany = () => {
      if (form.company_name.trim() === "") return;
      store.dispatch("work/apiCreateWork", {
        company_name: form.company_name.trim(),
        numeric: form.numeric === null || form.numeric === "" ? null : Number(form.numeric),
      });
      form.company_name = "";
      form.numeric = null;
    };

    return { t, expanded, form, addCompany };
  },
};
</script>

<style lang="scss" scoped>
.add__company__container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;

  :deep(.collapsible__panel) {
    width: 100%;
  }

  .add__company__box {
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
  .add__company__container {
    :deep(.collapsible__panel) {
      width: 70%;
    }
  }
}
</style>
