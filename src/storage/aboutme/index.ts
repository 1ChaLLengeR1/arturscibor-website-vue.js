import type { Module } from "vuex";
import type { RootState } from "../common/types";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import { state, type AboutMeState } from "./state";

const aboutme: Module<AboutMeState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default aboutme;
