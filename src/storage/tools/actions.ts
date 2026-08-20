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
    commit("setCollection", result.data ?? []);
  },

  async apiCreateTool({ commit, dispatch }, payload: ToolCreatePayload) {
    const result = await createTool(payload);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Dodano narzędzie.");
    await dispatch("apiGetToolsCollection");
  },

  async apiUpdateTool(
    { commit, dispatch },
    { toolId, payload }: { toolId: string; payload: ToolUpdatePayload }
  ) {
    const result = await updateTool(toolId, payload);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Zapisano zmiany.");
    await dispatch("apiGetToolsCollection");
  },

  async apiDeleteTool({ commit, dispatch }, toolId: string) {
    const result = await deleteTool(toolId);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Usunięto narzędzie.");
    await dispatch("apiGetToolsCollection");
  },

  async apiAttachToolImage(
    { commit, dispatch },
    { toolId, payload }: { toolId: string; payload: ToolImageAttachPayload }
  ) {
    const result = await attachToolImage(toolId, payload);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Dodano zdjęcie.");
    await dispatch("apiGetToolsCollection");
  },

  async apiDetachToolImage(
    { commit, dispatch },
    { toolId, fileId }: { toolId: string; fileId: string }
  ) {
    const result = await detachToolImage(toolId, fileId);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Usunięto zdjęcie.");
    await dispatch("apiGetToolsCollection");
  },
};

export default actions;
