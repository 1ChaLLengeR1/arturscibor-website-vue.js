import type { ActionTree } from "vuex";
import { uploadCv } from "../../api/admin/cv/post";
import { getCv } from "../../api/cv/get";
import { uploadFileHandshake } from "../common/fileUpload";
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

  /** Handshake uploadu (init -> upload -> confirm) + podmiana CV. */
  async apiUploadCv({ commit }, file: File) {
    const fileId = await uploadFileHandshake(commit, file, {
      directory: "cv",
      file_type: "document",
    });
    if (!fileId) return;

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
