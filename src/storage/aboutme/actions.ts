import type { ActionTree } from "vuex";
import { attachAboutMeImage, detachAboutMeImage, updateAboutMe } from "../../api/admin/aboutme/post";
import { getAboutMe } from "../../api/aboutme/get";
import type {
  AboutMeImageAttachPayload,
  AboutMeUpdatePayload,
} from "../../api/aboutme/types";
import { notifyError, notifySuccess } from "../common/notify";
import type { RootState } from "../common/types";
import type { AboutMeState } from "./state";

const actions: ActionTree<AboutMeState, RootState> = {
  async apiGetAboutMe({ commit }, lang?: string) {
    const result = await getAboutMe(lang);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    commit("setAboutMe", result.data);
  },

  async apiUpdateAboutMe({ commit, dispatch }, payload: AboutMeUpdatePayload) {
    const result = await updateAboutMe(payload);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Zapisano zmiany.");
    await dispatch("apiGetAboutMe");
  },

  async apiAttachAboutMeImage({ commit, dispatch }, payload: AboutMeImageAttachPayload) {
    const result = await attachAboutMeImage(payload);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Dodano zdjęcie.");
    await dispatch("apiGetAboutMe");
  },

  async apiDetachAboutMeImage({ commit, dispatch }, fileId: string) {
    const result = await detachAboutMeImage(fileId);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Usunięto zdjęcie.");
    await dispatch("apiGetAboutMe");
  },
};

export default actions;
