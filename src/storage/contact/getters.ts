import type { GetterTree } from "vuex";
import type { ContactResponseData } from "../../api/contact/types";
import type { RootState } from "../common/types";
import type { ContactState } from "./state";

const getters: GetterTree<ContactState, RootState> = {
  collection(state): ContactResponseData[] {
    return state.collection;
  },
};

export default getters;
