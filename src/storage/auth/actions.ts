import type { ActionTree } from "vuex";
import { refresh } from "../../api/auth/post";
import router from "../../router/index";
import type { RootState } from "../common/types";
import type { AuthState } from "./state";

interface StoredUser {
  id_user: string;
  access_token: string;
  refresh_token: string;
  type: string;
}

function readStoredUser(): StoredUser | null {
  const raw = localStorage.getItem("user");
  if (!raw) {
    return null;
  }
  const parsed = JSON.parse(raw);
  if (!parsed?.id_user || !parsed?.access_token || !parsed?.refresh_token || !parsed?.type) {
    return null;
  }
  return parsed;
}

const actions: ActionTree<AuthState, RootState> = {
  async apiRefreshTokens({ commit }) {
    const storedUser = readStoredUser();
    if (!storedUser) {
      commit("util/navigationAdmin", true, { root: true });
      return;
    }

    const result = await refresh({
      id_user: storedUser.id_user,
      refresh_token: storedUser.refresh_token,
    });

    if (result.status === "ERROR") {
      commit("util/navigationAdmin", true, { root: true });
      commit("logout");
      router.push({ name: "signin" });
      return;
    }

    commit("loadTokens", result.data);
    commit("util/navigationAdmin", false, { root: true });
    router.push({ name: "adminhome" });
  },
};

export default actions;
