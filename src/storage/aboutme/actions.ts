import type { ActionTree } from "vuex";
import { attachAboutMeImage, detachAboutMeImage, updateAboutMe } from "../../api/admin/aboutme/post";
import { getAboutMe } from "../../api/aboutme/get";
import type {
  AboutMeImageAttachPayload,
  AboutMeUpdatePayload,
} from "../../api/aboutme/types";
import { uploadFileHandshake } from "../common/fileUpload";
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

  async apiUpdateAboutMe({ commit }, payload: AboutMeUpdatePayload) {
    const result = await updateAboutMe(payload);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Zapisano zmiany.");
    commit("setAboutMe", result.data);
  },

  async apiAttachAboutMeImage({ commit }, payload: AboutMeImageAttachPayload) {
    const result = await attachAboutMeImage(payload);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Dodano zdjęcie.");
    commit("setAboutMe", result.data);
  },

  async apiDetachAboutMeImage({ commit }, fileId: string) {
    const result = await detachAboutMeImage(fileId);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Usunięto zdjęcie.");
    commit("setAboutMe", result.data);
  },

  /** Handshake uploadu (init -> upload -> confirm) + dopięcie do AboutMe. */
  async apiUploadAboutMeImage({ commit }, file: File) {
    const fileId = await uploadFileHandshake(commit, file, {
      directory: "aboutme",
      file_type: "photo",
    });
    if (!fileId) return;

    const attachResult = await attachAboutMeImage({ file_id: fileId });
    if (attachResult.status === "ERROR") {
      notifyError(commit, attachResult.data.message);
      return;
    }

    notifySuccess(commit, "Dodano zdjęcie.");
    commit("setAboutMe", attachResult.data);
  },
};

export default actions;
