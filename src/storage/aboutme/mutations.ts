import type { MutationTree } from "vuex";
import type { AboutMeResponseData } from "../../api/aboutme/types";
import type { AboutMeState } from "./state";

const mutations: MutationTree<AboutMeState> = {
  setAboutMe(state, payload: AboutMeResponseData | null) {
    state.data = payload;
  },
};

export default mutations;
