<template>
  <div class="admin__work__container">
    <div class="page__header">
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
    </div>

    <EditCompany
      v-if="edit_panel.show"
      ref="editPanelRef"
      :id="edit_panel.workId"
      :language="language"
      @close-edit-company="closeEditCompany"
    ></EditCompany>
    <AddCompany v-model:expanded="addExpanded"></AddCompany>
    <ListCompanies @show-edit-company="showEditCompany"></ListCompanies>
  </div>
</template>

<script>
import { nextTick, reactive, ref } from "vue";
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
    const editPanelRef = ref(null);
    const addExpanded = ref(false);
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
      addExpanded.value = false;
      nextTick(() => {
        editPanelRef.value?.$el?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };

    const closeEditCompany = (val) => {
      edit_panel.show = val;
    };

    return {
      language,
      editPanelRef,
      addExpanded,
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

  .page__header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    .language__switch {
      width: 100%;
      display: flex;
      gap: 0.5rem;
    }
  }
}
@media (min-width: 750px) {
  .admin__work__container {
    .page__header {
      width: 70%;
    }
  }
}
</style>
