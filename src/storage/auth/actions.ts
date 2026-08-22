import type { ActionTree } from "vuex";
import { refresh } from "../../api/auth/post";
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
  /**
   * Przywraca sesję z localStorage (odświeża token) bez żadnej nawigacji - bezpieczne
   * do wywołania raz przy starcie aplikacji, niezależnie od tego, na jakiej stronie
   * (publicznej czy admina) użytkownik akurat jest po odświeżeniu przeglądarki.
   * Zwraca true, jeśli sesja została przywrócona.
   */
  async apiRestoreSession({ commit }): Promise<boolean> {
    const storedUser = readStoredUser();
    if (!storedUser) {
      commit("util/navigationAdmin", true, { root: true });
      return false;
    }

    const result = await refresh({
      id_user: storedUser.id_user,
      refresh_token: storedUser.refresh_token,
    });

    if (result.status === "ERROR") {
      commit("util/navigationAdmin", true, { root: true });
      commit("logout");
      return false;
    }

    commit("loadTokens", result.data);
    commit("util/navigationAdmin", false, { root: true });
    return true;
  },

  /** Czyści sesję i przełącza nagłówek z powrotem na publiczny - jedyne poprawne miejsce do wylogowania. */
  apiLogout({ commit }) {
    commit("logout");
    commit("util/navigationAdmin", true, { root: true });
  },
};

export default actions;
