import type { Module } from "vuex";
import type { RootState } from "../common/types";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import { state, type ToolsState } from "./state";

const tools: Module<ToolsState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default tools;
