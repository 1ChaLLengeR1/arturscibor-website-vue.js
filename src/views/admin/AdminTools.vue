<template>
  <div class="admin__tools__container">
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

    <EditTool
      v-if="edit_panel.show"
      ref="editPanelRef"
      :id="edit_panel.toolId"
      :language="language"
      @close-edit-tool="closeEditTool"
    ></EditTool>
    <AddTool></AddTool>
    <ListTools @show-edit-tool="showEditTool"></ListTools>
  </div>
</template>

<script>
import { nextTick, reactive, ref } from "vue";
import { useStore } from "vuex";
import AddTool from "../../components/AdminTools/AddTool.vue";
import ListTools from "../../components/AdminTools/ListTools.vue";
import EditTool from "../../components/AdminTools/EditTool.vue";

export default {
  components: {
    AddTool,
    ListTools,
    EditTool,
  },
  setup() {
    const store = useStore();
    const language = ref("pl");
    const editPanelRef = ref(null);
    const edit_panel = reactive({
      show: false,
      toolId: null,
    });

    const loadCollection = () => {
      store.dispatch("tools/apiGetToolsCollection", language.value);
    };
    loadCollection();

    const switchLanguage = (lang) => {
      language.value = lang;
      loadCollection();
    };

    const showEditTool = (val) => {
      edit_panel.show = val.show;
      edit_panel.toolId = val.toolId;
      nextTick(() => {
        editPanelRef.value?.$el?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };

    const closeEditTool = (val) => {
      edit_panel.show = val;
    };

    return {
      language,
      editPanelRef,
      edit_panel,
      switchLanguage,
      showEditTool,
      closeEditTool,
    };
  },
};
</script>

<style lang="scss" scoped>
.admin__tools__container {
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
  .admin__tools__container {
    .page__header {
      width: 70%;
    }
  }
}
</style>
