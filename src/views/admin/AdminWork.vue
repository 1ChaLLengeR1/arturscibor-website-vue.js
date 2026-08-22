<template>
  <div class="admin__work__container">
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

    <EditCompany
      v-if="edit_panel.show"
      :id="edit_panel.workId"
      :language="language"
      @close-edit-company="closeEditCompany"
    ></EditCompany>
    <AddCompany></AddCompany>
    <ListCompanies @show-edit-company="showEditCompany"></ListCompanies>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import AddCompany from "../../components/AdminWork/AddCompany.vue";
import ListCompanies from "../../components/AdminWork/ListCompanies.vue";
import EditCompany from "../../components/AdminWork/EditCompany.vue";

export default {
  components: {
    AddCompany,
    ListCompanies,
    EditCompany,
  },
  setup() {
    const store = useStore();
    const language = ref("pl");
    const edit_panel = reactive({
      show: false,
      workId: null,
    });

    const loadCollection = () => {
      store.dispatch("work/apiGetWorkCollection", language.value);
    };
    loadCollection();

    const switchLanguage = (lang) => {
      language.value = lang;
      loadCollection();
    };

    const showEditCompany = (val) => {
      edit_panel.show = val.show;
      edit_panel.workId = val.workId;
    };

    const closeEditCompany = (val) => {
      edit_panel.show = val;
    };

    return {
      language,
      edit_panel,
      switchLanguage,
      showEditCompany,
      closeEditCompany,
    };
  },
};
</script>

<style lang="scss" scoped>
.admin__work__container {
  width: 100%;
  min-height: calc(100vh - 5rem);
  background: var(--bg-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 0.5rem;

  .language__switch {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }
}
</style>
