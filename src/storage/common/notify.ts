import type { Commit } from "vuex";

export function notifyError(commit: Commit, message: string): void {
  commit(
    "util/notificationBox",
    { information: message, class: false, offNotification: true },
    { root: true }
  );
}

export function notifySuccess(commit: Commit, message: string): void {
  commit(
    "util/notificationBox",
    { information: message, class: true, offNotification: true },
    { root: true }
  );
}
