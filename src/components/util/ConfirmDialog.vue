<template>
  <v-dialog :model-value="dialog !== null" max-width="480" @update:model-value="onCancel">
    <v-card v-if="dialog" class="confirm__dialog">
      <p class="message">{{ dialog.message }}</p>
      <div class="actions">
        <v-btn variant="text" @click="onCancel">{{ t("common.cancel") }}</v-btn>
        <v-btn color="red" @click="onConfirmClick">
          {{ dialog.confirmLabel ?? t("common.confirmDeleteButton") }}
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const store = useStore();
    const { t } = useI18n();

    const dialog = computed(() => store.getters["util/confirmDialog"]);

    const close = () => store.commit("util/confirmDialog", null);

    const onCancel = () => close();
    const onConfirmClick = () => {
      const onConfirm = dialog.value?.onConfirm;
      close();
      onConfirm?.();
    };

    return { t, dialog, onCancel, onConfirmClick };
  },
};
</script>

<style lang="scss" scoped>
.confirm__dialog {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  background: var(--secend-bg-color);

  .message {
    color: white;
    font-size: 1.1rem;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
}
</style>
