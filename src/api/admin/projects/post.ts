import { apiDelete, apiPost, apiPut } from "../../common/post";
import type {
  ProjectCreatePayload,
  ProjectCreateResult,
  ProjectDeleteResult,
  ProjectImageAttachPayload,
  ProjectResult,
  ProjectUpdatePayload,
} from "../../projects/types";

export function createProject(payload: ProjectCreatePayload): Promise<ProjectCreateResult> {
  return apiPost("/api/v1/admin/projects/create", { payload, jwt: true });
}

export function updateProject(
  projectId: string,
  payload: ProjectUpdatePayload
): Promise<ProjectResult> {
  return apiPut(`/api/v1/admin/projects/${projectId}/update`, { payload, jwt: true });
}

export function deleteProject(projectId: string): Promise<ProjectDeleteResult> {
  return apiDelete(`/api/v1/admin/projects/${projectId}/delete`, { jwt: true });
}

export function attachProjectImage(
  projectId: string,
  payload: ProjectImageAttachPayload
): Promise<ProjectResult> {
  return apiPost(`/api/v1/admin/projects/${projectId}/images`, { payload, jwt: true });
}

export function detachProjectImage(projectId: string, fileId: string): Promise<ProjectResult> {
  return apiDelete(`/api/v1/admin/projects/${projectId}/images/${fileId}`, { jwt: true });
}
