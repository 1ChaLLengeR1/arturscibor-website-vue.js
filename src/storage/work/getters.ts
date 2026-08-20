import type { GetterTree } from "vuex";
import type { WorkResponseData } from "../../api/work/types";
import type { RootState } from "../common/types";
import type { WorkState } from "./state";

const getters: GetterTree<WorkState, RootState> = {
  collection(state): WorkResponseData[] {
    return state.collection;
  },
};

export default getters;
