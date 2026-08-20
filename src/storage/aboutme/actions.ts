import type { ActionTree } from "vuex";
import { attachAboutMeImage, detachAboutMeImage, updateAboutMe } from "../../api/admin/aboutme/post";
import { getAboutMe } from "../../api/aboutme/get";
import type {
  AboutMeImageAttachPayload,
  AboutMeUpdatePayload,
} from "../../api/aboutme/types";
import { confirmFile, initFile, uploadFileBytes } from "../../api/common/file/post";
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

  /** Pełny handshake: init pliku -> wgranie bajtów -> potwierdzenie -> dopięcie do AboutMe. */
  async apiUploadAboutMeImage({ commit }, file: File) {
    const initResult = await initFile({
      original_name: file.name,
      size: file.size,
      directory: "aboutme",
      file_type: "photo",
      mime_type: file.type || null,
    });
    if (initResult.status === "ERROR" || !initResult.data) {
      notifyError(commit, initResult.status === "ERROR" ? initResult.data.message : "Nie udało się zainicjować uploadu.");
      return;
    }

    const fileId = initResult.data.file_id;
    const uploadResult = await uploadFileBytes(fileId, file);
    if (uploadResult.status === "ERROR") {
      notifyError(commit, uploadResult.data.message);
      return;
    }

    const confirmResult = await confirmFile(fileId);
    if (confirmResult.status === "ERROR") {
      notifyError(commit, confirmResult.data.message);
      return;
    }

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
