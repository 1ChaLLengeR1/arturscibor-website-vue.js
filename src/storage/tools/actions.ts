import type { ActionTree } from "vuex";
import {
  attachToolImage,
  createTool,
  deleteTool,
  detachToolImage,
  updateTool,
} from "../../api/admin/tools/post";
import { getToolsCollection } from "../../api/tools/get";
import type {
  ToolCreatePayload,
  ToolImageAttachPayload,
  ToolUpdatePayload,
} from "../../api/tools/types";
import { uploadFileHandshake } from "../common/fileUpload";
import { notifyError, notifySuccess } from "../common/notify";
import type { RootState } from "../common/types";
import type { ToolsState } from "./state";

const actions: ActionTree<ToolsState, RootState> = {
  async apiGetToolsCollection({ commit }, lang?: string) {
    const result = await getToolsCollection(lang);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    commit("setLang", lang ?? null);
    commit("setCollection", result.data ?? []);
  },

  async apiCreateTool({ commit, dispatch, state }, payload: ToolCreatePayload) {
    const result = await createTool(payload);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Dodano narzędzie.");
    await dispatch("apiGetToolsCollection", state.lang ?? undefined);
  },

  async apiUpdateTool(
    { commit, dispatch, state },
    { toolId, payload }: { toolId: string; payload: ToolUpdatePayload }
  ) {
    const result = await updateTool(toolId, payload);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Zapisano zmiany.");
    await dispatch("apiGetToolsCollection", state.lang ?? undefined);
  },

  async apiDeleteTool({ commit, dispatch, state }, toolId: string) {
    const result = await deleteTool(toolId);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Usunięto narzędzie.");
    await dispatch("apiGetToolsCollection", state.lang ?? undefined);
  },

  async apiAttachToolImage(
    { commit, dispatch, state },
    { toolId, payload }: { toolId: string; payload: ToolImageAttachPayload }
  ) {
    const result = await attachToolImage(toolId, payload);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Dodano zdjęcie.");
    await dispatch("apiGetToolsCollection", state.lang ?? undefined);
  },

  /** Handshake uploadu (init -> upload -> confirm) + dopięcie obrazka do narzędzia. */
  async apiUploadToolImage(
    { commit, dispatch, state },
    { toolId, file }: { toolId: string; file: File }
  ) {
    const fileId = await uploadFileHandshake(commit, file, {
      directory: "tools",
      file_type: "photo",
    });
    if (!fileId) return;

    const result = await attachToolImage(toolId, { file_id: fileId });
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Dodano zdjęcie.");
    await dispatch("apiGetToolsCollection", state.lang ?? undefined);
  },

  async apiDetachToolImage(
    { commit, dispatch, state },
    { toolId, fileId }: { toolId: string; fileId: string }
  ) {
    const result = await detachToolImage(toolId, fileId);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Usunięto zdjęcie.");
    await dispatch("apiGetToolsCollection", state.lang ?? undefined);
  },
};

export default actions;
