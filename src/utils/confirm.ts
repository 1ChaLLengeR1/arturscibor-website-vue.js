import type { Store } from "vuex";

export interface ConfirmOptions {
  message: string;
  onConfirm: () => void;
  confirmLabel?: string;
}

/** Otwiera globalny ConfirmDialog (mount w App.vue) - onConfirm woła się po kliknięciu potwierdzenia. */
export function requestConfirm(store: Store<unknown>, options: ConfirmOptions): void {
  store.commit("util/confirmDialog", {
    message: options.message,
    confirmLabel: options.confirmLabel ?? null,
    onConfirm: options.onConfirm,
  });
}
