import type { GetterTree } from "vuex";
import type { AboutMeResponseData } from "../../api/aboutme/types";
import type { RootState } from "../common/types";
import type { AboutMeState } from "./state";

const getters: GetterTree<AboutMeState, RootState> = {
  data(state): AboutMeResponseData | null {
    return state.data;
  },
};

export default getters;
