import { apiDelete, apiPost, apiPut } from "../../common/post";
import type {
  ToolCreatePayload,
  ToolCreateResult,
  ToolDeleteResult,
  ToolImageAttachPayload,
  ToolResult,
  ToolUpdatePayload,
} from "../../tools/types";

export function createTool(payload: ToolCreatePayload): Promise<ToolCreateResult> {
  return apiPost("/api/v1/admin/tools/create", { payload, jwt: true });
}

export function updateTool(toolId: string, payload: ToolUpdatePayload): Promise<ToolResult> {
  return apiPut(`/api/v1/admin/tools/${toolId}/update`, { payload, jwt: true });
}

export function deleteTool(toolId: string): Promise<ToolDeleteResult> {
  return apiDelete(`/api/v1/admin/tools/${toolId}/delete`, { jwt: true });
}

export function attachToolImage(
  toolId: string,
  payload: ToolImageAttachPayload
): Promise<ToolResult> {
  return apiPost(`/api/v1/admin/tools/${toolId}/images`, { payload, jwt: true });
}

export function detachToolImage(toolId: string, fileId: string): Promise<ToolResult> {
  return apiDelete(`/api/v1/admin/tools/${toolId}/images/${fileId}`, { jwt: true });
}
