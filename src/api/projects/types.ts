import type { ApiResult, MultiLangText } from "../common/types";

export type ProjectLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface ProjectImageData {
  file_id: string;
  url: string | null;
  sort_order: number;
}

export interface ProjectResponseData {
  id: string;
  name: string;
  short_description: string | null;
  description: string | null;
  level: ProjectLevel | null;
  technologies: string[];
  github_url: string | null;
  live_url: string | null;
  completed_at: string | null;
  started_at: string | null;
  is_support: boolean | null;
  numeric: number | null;
  images: ProjectImageData[];
  created_at: string;
  updated_at: string;
}

export interface ProjectCreatePayload {
  name: string;
  short_description?: MultiLangText | null;
  description?: MultiLangText | null;
  level?: ProjectLevel | null;
  technologies?: string[] | null;
  github_url?: string | null;
  live_url?: string | null;
  completed_at?: string | null;
  started_at?: string | null;
  is_support?: boolean | null;
  numeric?: number | null;
}

export interface ProjectUpdatePayload {
  language_code?: string;
  name?: string | null;
  short_description?: string | null;
  description?: string | null;
  level?: ProjectLevel | null;
  technologies?: string[] | null;
  github_url?: string | null;
  live_url?: string | null;
  completed_at?: string | null;
  started_at?: string | null;
  is_support?: boolean | null;
  numeric?: number | null;
}

export interface ProjectImageAttachPayload {
  file_id: string;
}

export type ProjectCollectionResult = ApiResult<ProjectResponseData[]>;
export type ProjectResult = ApiResult<ProjectResponseData>;
export type ProjectCreateResult = ApiResult<ProjectResponseData>;
export type ProjectDeleteResult = ApiResult<null>;
