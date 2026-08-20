import type { MutationTree } from "vuex";
import type { CurriculumVitaeResponseData } from "../../api/cv/types";
import type { CvState } from "./state";

const mutations: MutationTree<CvState> = {
  setCv(state, payload: CurriculumVitaeResponseData | null) {
    state.current = payload;
  },
};

export default mutations;
