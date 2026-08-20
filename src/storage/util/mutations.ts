import type { MutationTree } from "vuex";
import type { InformationObject, NotificationBox, UtilState } from "./state";

const mutations: MutationTree<UtilState> = {
  loadingSpinner(state, payload: boolean) {
    state.loadingSpinner = payload;
  },
  navigationAdmin(state, payload: boolean) {
    state.navigationAdmin = payload;
  },
  informationObject(state, payload: InformationObject | null) {
    state.informationObject = payload;
  },
  notificationBox(state, payload: NotificationBox) {
    state.notificationBox = {
      information: payload.information,
      class: payload.class,
      offNotification: payload.offNotification,
    };
  },
};

export default mutations;
