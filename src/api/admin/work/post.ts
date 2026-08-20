import { apiDelete, apiPost, apiPut } from "../../common/post";
import type {
  WorkCreatePayload,
  WorkCreateResult,
  WorkDeleteResult,
  WorkItemCreatePayload,
  WorkItemCreateResult,
  WorkItemResult,
  WorkItemUpdatePayload,
  WorkLogoAttachPayload,
  WorkResult,
  WorkUpdatePayload,
} from "../../work/types";

export function createWork(payload: WorkCreatePayload): Promise<WorkCreateResult> {
  return apiPost("/api/v1/admin/work/create", { payload, jwt: true });
}

export function updateWork(workId: string, payload: WorkUpdatePayload): Promise<WorkResult> {
  return apiPut(`/api/v1/admin/work/${workId}/update`, { payload, jwt: true });
}

export function deleteWork(workId: string): Promise<WorkDeleteResult> {
  return apiDelete(`/api/v1/admin/work/${workId}/delete`, { jwt: true });
}

export function attachWorkLogo(
  workId: string,
  payload: WorkLogoAttachPayload
): Promise<WorkResult> {
  return apiPut(`/api/v1/admin/work/${workId}/logo`, { payload, jwt: true });
}

export function removeWorkLogo(workId: string): Promise<WorkResult> {
  return apiDelete(`/api/v1/admin/work/${workId}/logo`, { jwt: true });
}

export function createWorkItem(
  workId: string,
  payload: WorkItemCreatePayload
): Promise<WorkItemCreateResult> {
  return apiPost(`/api/v1/admin/work/${workId}/items`, { payload, jwt: true });
}

export function updateWorkItem(
  workId: string,
  itemId: string,
  payload: WorkItemUpdatePayload
): Promise<WorkItemResult> {
  return apiPut(`/api/v1/admin/work/${workId}/items/${itemId}/update`, {
    payload,
    jwt: true,
  });
}

export function deleteWorkItem(workId: string, itemId: string): Promise<WorkDeleteResult> {
  return apiDelete(`/api/v1/admin/work/${workId}/items/${itemId}/delete`, { jwt: true });
}
