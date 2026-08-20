import type { ApiResult, MultiLangText } from "../common/types";

export interface ToolImageData {
  file_id: string;
  url: string | null;
  sort_order: number;
}

export interface ToolResponseData {
  id: string;
  name: string | null;
  information: string | null;
  progress: number | null;
  numeric: number | null;
  link: string | null;
  images: ToolImageData[];
  created_at: string;
  updated_at: string;
}

export interface ToolCreatePayload {
  name: MultiLangText;
  information?: MultiLangText | null;
  progress?: number | null;
  numeric?: number | null;
  link?: string | null;
}

export interface ToolUpdatePayload {
  language_code?: string;
  name?: string | null;
  information?: string | null;
  progress?: number | null;
  numeric?: number | null;
  link?: string | null;
}

export interface ToolImageAttachPayload {
  file_id: string;
}

export type ToolCollectionResult = ApiResult<ToolResponseData[]>;
export type ToolResult = ApiResult<ToolResponseData>;
export type ToolCreateResult = ApiResult<ToolResponseData>;
export type ToolDeleteResult = ApiResult<null>;
