import { apiDelete, apiPatch, apiPost, apiPut } from "../post";
import type {
  FileConfirmResult,
  FileDeleteResult,
  FileInitPayload,
  FileInitResult,
} from "./types";

export function initFile(payload: FileInitPayload): Promise<FileInitResult> {
  return apiPost("/api/v1/admin/file/init", { payload, jwt: true });
}

export function uploadFileBytes(fileId: string, bytes: Blob): Promise<FileConfirmResult> {
  return apiPut(`/api/v1/admin/file/${fileId}/upload`, {
    payload: bytes,
    bodyMode: "binary",
    jwt: true,
  });
}

export function confirmFile(fileId: string): Promise<FileConfirmResult> {
  return apiPatch(`/api/v1/admin/file/${fileId}/confirm`, { jwt: true });
}

export function deleteFile(fileId: string): Promise<FileDeleteResult> {
  return apiDelete(`/api/v1/admin/file/${fileId}/delete`, { jwt: true });
}
