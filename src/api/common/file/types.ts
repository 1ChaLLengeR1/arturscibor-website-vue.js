import type { ApiResult } from "../types";

/** `docs/rest_api_docs.json` jest tu przestarzały — backend ma też "document" (PDF, CV). */
export type FileType = "photo" | "video" | "document";

export type FileDirectory = "aboutme" | "cv" | "projects" | "tools" | "work";

export type FileStatus = "pending" | "completed" | "failed" | "confirmed";

export interface FileItemData {
  id: string;
  original_name: string;
  name: string;
  size: number;
  mime_type: string | null;
  url: string | null;
  directory: string;
  file_type: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface PaginationData {
  total: number;
  has_more: boolean;
  limit: number;
  offset: number;
}

export interface FileCollectionResponseData {
  items: FileItemData[];
  pagination: PaginationData;
}

export interface FileCollectionQuery {
  directory?: FileDirectory;
  file_type?: FileType;
  status?: FileStatus;
  original_name?: string;
  limit?: number;
  offset?: number;
  [key: string]: string | number | boolean | undefined | null;
}

export interface FileInitPayload {
  original_name: string;
  size: number;
  directory: FileDirectory;
  file_type: FileType;
  mime_type?: string | null;
}

export interface FileInitResponseData {
  file_id: string;
  upload_url: string;
  public_url: string;
}

export interface DeleteFileResponseData {
  deleted: boolean;
  id: string;
}

export type FileInitResult = ApiResult<FileInitResponseData>;
export type FileConfirmResult = ApiResult<FileItemData>;
export type FileCollectionResult = ApiResult<FileCollectionResponseData>;
export type FileDeleteResult = ApiResult<DeleteFileResponseData>;
