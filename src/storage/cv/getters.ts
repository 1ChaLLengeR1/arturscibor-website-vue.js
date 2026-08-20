import type { GetterTree } from "vuex";
import type { CurriculumVitaeResponseData } from "../../api/cv/types";
import type { RootState } from "../common/types";
import type { CvState } from "./state";

const getters: GetterTree<CvState, RootState> = {
  current(state): CurriculumVitaeResponseData | null {
    return state.current;
  },
};

export default getters;
