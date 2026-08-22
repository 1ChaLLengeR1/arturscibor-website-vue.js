<template>
  <div class="add__company__container">
    <form class="add__company__box" @submit.prevent="addCompany">
      <h3>Dodaj firmę</h3>
      <v-text-field
        bg-color="white"
        label="Nazwa firmy"
        v-model="form.company_name"
      ></v-text-field>
      <v-text-field
        type="number"
        bg-color="white"
        label="Kolejność wyświetlania"
        hint="Opcjonalne"
        persistent-hint
        v-model="form.numeric"
      ></v-text-field>
      <v-btn @click="addCompany" :disabled="form.company_name.trim() === ''" color="blue">
        Dodaj firmę
      </v-btn>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
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

    return { form, addCompany };
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
