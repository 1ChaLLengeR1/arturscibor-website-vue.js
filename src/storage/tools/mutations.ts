import type { MutationTree } from "vuex";
import type { ToolResponseData } from "../../api/tools/types";
import type { ToolsState } from "./state";

const mutations: MutationTree<ToolsState> = {
  setCollection(state, payload: ToolResponseData[]) {
    state.collection = payload;
  },
  setLang(state, payload: string | null) {
    state.lang = payload;
  },
};

export default mutations;
