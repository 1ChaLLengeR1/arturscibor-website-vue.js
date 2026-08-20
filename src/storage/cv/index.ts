import type { Module } from "vuex";
import type { RootState } from "../common/types";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import { state, type CvState } from "./state";

const cv: Module<CvState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default cv;
