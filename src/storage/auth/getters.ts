import type { GetterTree } from "vuex";
import type { RootState } from "../common/types";
import type { AuthState, AuthTokens } from "./state";

const getters: GetterTree<AuthState, RootState> = {
  optionsTokens(state): AuthTokens {
    return state.optionsTokens;
  },
};

export default getters;
