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
import { uploadFileHandshake } from "../common/fileUpload";
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
    commit("setLang", lang ?? null);
    commit("setCollection", result.data ?? []);
  },

  async apiGetProject({ commit }, { projectId, lang }: { projectId: string; lang?: string }) {
    const result = await getProject(projectId, lang);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    commit("setProject", result.data);
  },

  async apiCreateProject({ commit, dispatch, state }, payload: ProjectCreatePayload) {
    const result = await createProject(payload);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Dodano projekt.");
    await dispatch("apiGetProjectsCollection", state.lang ?? undefined);
  },

  async apiUpdateProject(
    { commit, dispatch, state },
    { projectId, payload }: { projectId: string; payload: ProjectUpdatePayload }
  ) {
    const result = await updateProject(projectId, payload);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Zapisano zmiany.");
    await dispatch("apiGetProjectsCollection", state.lang ?? undefined);
  },

  async apiDeleteProject({ commit, dispatch, state }, projectId: string) {
    const result = await deleteProject(projectId);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Usunięto projekt.");
    await dispatch("apiGetProjectsCollection", state.lang ?? undefined);
  },

  async apiAttachProjectImage(
    { commit, dispatch, state },
    { projectId, payload }: { projectId: string; payload: ProjectImageAttachPayload }
  ) {
    const result = await attachProjectImage(projectId, payload);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Dodano zdjęcie.");
    await dispatch("apiGetProjectsCollection", state.lang ?? undefined);
  },

  /** Handshake uploadu (init -> upload -> confirm) + dopięcie zdjęcia do galerii projektu. */
  async apiUploadProjectImage(
    { commit, dispatch, state },
    { projectId, file }: { projectId: string; file: File }
  ) {
    const fileId = await uploadFileHandshake(commit, file, {
      directory: "projects",
      file_type: "photo",
    });
    if (!fileId) return;

    const result = await attachProjectImage(projectId, { file_id: fileId });
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Dodano zdjęcie.");
    await dispatch("apiGetProjectsCollection", state.lang ?? undefined);
  },

  async apiDetachProjectImage(
    { commit, dispatch, state },
    { projectId, fileId }: { projectId: string; fileId: string }
  ) {
    const result = await detachProjectImage(projectId, fileId);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Usunięto zdjęcie.");
    await dispatch("apiGetProjectsCollection", state.lang ?? undefined);
  },
};

export default actions;
