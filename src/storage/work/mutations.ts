import type { MutationTree } from "vuex";
import type { WorkResponseData } from "../../api/work/types";
import type { WorkState } from "./state";

const mutations: MutationTree<WorkState> = {
  setCollection(state, payload: WorkResponseData[]) {
    state.collection = payload;
  },
};

export default mutations;
