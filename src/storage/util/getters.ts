import type { GetterTree } from "vuex";
import type { RootState } from "../common/types";
import type { ConfirmDialogState, InformationObject, NotificationBox, UtilState } from "./state";

const getters: GetterTree<UtilState, RootState> = {
  confirmDialog(state): ConfirmDialogState | null {
    return state.confirmDialog;
  },
  loadingSpinner(state): boolean {
    return state.loadingSpinner;
  },
  loadNavigationAdmin(state): boolean {
    return state.navigationAdmin;
  },
  informationObject(state): InformationObject | null {
    return state.informationObject;
  },
  notificationBox(state): NotificationBox {
    return state.notificationBox;
  },
};

export default getters;
