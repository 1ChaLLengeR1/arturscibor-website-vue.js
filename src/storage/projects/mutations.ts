import type { MutationTree } from "vuex";
import type { ProjectResponseData } from "../../api/projects/types";
import type { ProjectsState } from "./state";

const mutations: MutationTree<ProjectsState> = {
  setCollection(state, payload: ProjectResponseData[]) {
    state.collection = payload;
  },
  setProject(state, payload: ProjectResponseData | null) {
    state.project = payload;
  },
};

export default mutations;
