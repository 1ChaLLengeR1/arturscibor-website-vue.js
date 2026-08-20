import type { ActionTree } from "vuex";
import { uploadCv } from "../../api/admin/cv/post";
import { confirmFile, initFile, uploadFileBytes } from "../../api/common/file/post";
import { getCv } from "../../api/cv/get";
import { notifyError, notifySuccess } from "../common/notify";
import type { RootState } from "../common/types";
import type { CvState } from "./state";

const actions: ActionTree<CvState, RootState> = {
  async apiDownloadCv({ commit }) {
    const result = await getCv();
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }

    const anchor = document.createElement("a");
    anchor.href = window.URL.createObjectURL(result.blob);
    anchor.download = result.fileName ?? "cv.pdf";
    anchor.click();
    window.URL.revokeObjectURL(anchor.href);
  },

  /** Pełny handshake: init pliku -> wgranie bajtów -> potwierdzenie -> podmiana CV. */
  async apiUploadCv({ commit }, file: File) {
    const initResult = await initFile({
      original_name: file.name,
      size: file.size,
      directory: "cv",
      file_type: "document",
      mime_type: file.type || null,
    });
    if (initResult.status === "ERROR" || !initResult.data) {
      notifyError(
        commit,
        initResult.status === "ERROR" ? initResult.data.message : "Nie udało się zainicjować uploadu."
      );
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

    const cvResult = await uploadCv({ file_id: fileId });
    if (cvResult.status === "ERROR") {
      notifyError(commit, cvResult.data.message);
      return;
    }

    notifySuccess(commit, "Zaktualizowano CV.");
    commit("setCv", cvResult.data);
  },
};

export default actions;
