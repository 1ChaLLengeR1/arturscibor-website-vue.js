import type { GetterTree } from "vuex";
import type { RootState } from "../common/types";
import type { InformationObject, NotificationBox, UtilState } from "./state";

const getters: GetterTree<UtilState, RootState> = {
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
