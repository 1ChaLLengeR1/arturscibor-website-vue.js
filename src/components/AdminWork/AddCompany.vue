<template>
  <div class="add__company__container">
    <form class="add__company__box" @submit.prevent="addCompany">
      <h3>{{ t("admin.work.addCompanyTitle") }}</h3>
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
  </div>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

export default {
  setup() {
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

    return { t, form, addCompany };
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

  .add__company__box {
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

    button {
      width: 100%;
    }
  }
}
@media (min-width: 750px) {
  .add__company__container {
    .add__company__box {
      width: 70%;
      h3 {
        text-align: left;
      }
    }
  }
}
</style>
