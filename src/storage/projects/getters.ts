import type { GetterTree } from "vuex";
import type { ProjectResponseData } from "../../api/projects/types";
import type { RootState } from "../common/types";
import type { ProjectsState } from "./state";

const getters: GetterTree<ProjectsState, RootState> = {
  collection(state): ProjectResponseData[] {
    return state.collection;
  },
  project(state): ProjectResponseData | null {
    return state.project;
  },
};

export default getters;
