import type { MutationTree } from "vuex";
import type { ContactResponseData } from "../../api/contact/types";
import type { ContactState } from "./state";

const mutations: MutationTree<ContactState> = {
  setCollection(state, payload: ContactResponseData[]) {
    state.collection = payload;
  },
};

export default mutations;
