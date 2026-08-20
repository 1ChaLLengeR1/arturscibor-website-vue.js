import type { GetterTree } from "vuex";
import type { ToolResponseData } from "../../api/tools/types";
import type { RootState } from "../common/types";
import type { ToolsState } from "./state";

const getters: GetterTree<ToolsState, RootState> = {
  collection(state): ToolResponseData[] {
    return state.collection;
  },
};

export default getters;
