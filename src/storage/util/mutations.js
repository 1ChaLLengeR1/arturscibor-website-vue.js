export default {
  loadingSpinner(state, payload) {
    state.loadingSpinner = payload;
  },
  navigationAdmin(state, payload) {
    state.navigationAdmin = payload;
  },
  informationObject(state, payload) {
    state.informationObject = payload;
  },
  notificationBox(state, payload) {
    state.notificationBox = {
      information: payload.information,
      class: payload.class,
      offNotification: payload.offNotification,
    };
  },
};
