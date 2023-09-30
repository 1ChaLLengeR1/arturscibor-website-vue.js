import store from '../../storage/index.js'
export function notification(response) {
    if (response.error || response.detail) {
      store.commit("util/notificationBox", {
        information: response.error || response.detail,
        class: false,
        offNotification: true,
      });
      return;
    }
    store.commit("util/notificationBox", {
      information: response.success,
      class: true,
      offNotification: true,
    });
}

