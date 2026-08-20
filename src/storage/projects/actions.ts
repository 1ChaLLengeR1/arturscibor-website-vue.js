import type { ActionTree } from "vuex";
import {
  attachProjectImage,
  createProject,
  deleteProject,
  detachProjectImage,
  updateProject,
} from "../../api/admin/projects/post";
import { getProject, getProjectsCollection } from "../../api/projects/get";
import type {
  ProjectCreatePayload,
  ProjectImageAttachPayload,
  ProjectUpdatePayload,
} from "../../api/projects/types";
import { notifyError, notifySuccess } from "../common/notify";
import type { RootState } from "../common/types";
import type { ProjectsState } from "./state";

const actions: ActionTree<ProjectsState, RootState> = {
  async apiGetProjectsCollection({ commit }, lang?: string) {
    const result = await getProjectsCollection(lang);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    commit("setCollection", result.data ?? []);
  },

  async apiGetProject({ commit }, projectId: string) {
    const result = await getProject(projectId);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    commit("setProject", result.data);
  },

  async apiCreateProject({ commit, dispatch }, payload: ProjectCreatePayload) {
    const result = await createProject(payload);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Dodano projekt.");
    await dispatch("apiGetProjectsCollection");
  },

  async apiUpdateProject(
    { commit, dispatch },
    { projectId, payload }: { projectId: string; payload: ProjectUpdatePayload }
  ) {
    const result = await updateProject(projectId, payload);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Zapisano zmiany.");
    await dispatch("apiGetProject", projectId);
  },

  async apiDeleteProject({ commit, dispatch }, projectId: string) {
    const result = await deleteProject(projectId);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Usunięto projekt.");
    await dispatch("apiGetProjectsCollection");
  },

  async apiAttachProjectImage(
    { commit, dispatch },
    { projectId, payload }: { projectId: string; payload: ProjectImageAttachPayload }
  ) {
    const result = await attachProjectImage(projectId, payload);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Dodano zdjęcie.");
    await dispatch("apiGetProject", projectId);
  },

  async apiDetachProjectImage(
    { commit, dispatch },
    { projectId, fileId }: { projectId: string; fileId: string }
  ) {
    const result = await detachProjectImage(projectId, fileId);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Usunięto zdjęcie.");
    await dispatch("apiGetProject", projectId);
  },
};

export default actions;
