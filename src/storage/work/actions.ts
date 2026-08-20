import type { ActionTree } from "vuex";
import {
  attachWorkLogo,
  createWork,
  createWorkItem,
  deleteWork,
  deleteWorkItem,
  removeWorkLogo,
  updateWork,
  updateWorkItem,
} from "../../api/admin/work/post";
import { getWorkCollection } from "../../api/work/get";
import type {
  WorkCreatePayload,
  WorkItemCreatePayload,
  WorkItemUpdatePayload,
  WorkLogoAttachPayload,
  WorkUpdatePayload,
} from "../../api/work/types";
import { notifyError, notifySuccess } from "../common/notify";
import type { RootState } from "../common/types";
import type { WorkState } from "./state";

const actions: ActionTree<WorkState, RootState> = {
  async apiGetWorkCollection({ commit }, lang?: string) {
    const result = await getWorkCollection(lang);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    commit("setCollection", result.data ?? []);
  },

  async apiCreateWork({ commit, dispatch }, payload: WorkCreatePayload) {
    const result = await createWork(payload);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Dodano firmę.");
    await dispatch("apiGetWorkCollection");
  },

  async apiUpdateWork(
    { commit, dispatch },
    { workId, payload }: { workId: string; payload: WorkUpdatePayload }
  ) {
    const result = await updateWork(workId, payload);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Zapisano zmiany.");
    await dispatch("apiGetWorkCollection");
  },

  async apiDeleteWork({ commit, dispatch }, workId: string) {
    const result = await deleteWork(workId);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Usunięto firmę.");
    await dispatch("apiGetWorkCollection");
  },

  async apiAttachWorkLogo(
    { commit, dispatch },
    { workId, payload }: { workId: string; payload: WorkLogoAttachPayload }
  ) {
    const result = await attachWorkLogo(workId, payload);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Zaktualizowano logo.");
    await dispatch("apiGetWorkCollection");
  },

  async apiRemoveWorkLogo({ commit, dispatch }, workId: string) {
    const result = await removeWorkLogo(workId);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Usunięto logo.");
    await dispatch("apiGetWorkCollection");
  },

  async apiCreateWorkItem(
    { commit, dispatch },
    { workId, payload }: { workId: string; payload: WorkItemCreatePayload }
  ) {
    const result = await createWorkItem(workId, payload);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Dodano stanowisko.");
    await dispatch("apiGetWorkCollection");
  },

  async apiUpdateWorkItem(
    { commit, dispatch },
    {
      workId,
      itemId,
      payload,
    }: { workId: string; itemId: string; payload: WorkItemUpdatePayload }
  ) {
    const result = await updateWorkItem(workId, itemId, payload);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Zapisano zmiany.");
    await dispatch("apiGetWorkCollection");
  },

  async apiDeleteWorkItem(
    { commit, dispatch },
    { workId, itemId }: { workId: string; itemId: string }
  ) {
    const result = await deleteWorkItem(workId, itemId);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Usunięto stanowisko.");
    await dispatch("apiGetWorkCollection");
  },
};

export default actions;
