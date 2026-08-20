import type { ApiResult, MultiLangText } from "../common/types";

export type EmploymentType =
  | "full_time"
  | "part_time"
  | "contract"
  | "b2b"
  | "internship"
  | "volunteer";

export interface WorkItemResponseData {
  id: string;
  title: string | null;
  employment_type: EmploymentType | null;
  location: string | null;
  date_from: string | null;
  date_to: string | null;
  body_markdown: string | null;
  skills: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface WorkResponseData {
  id: string;
  company_name: string;
  logo_file_id: string | null;
  logo_url: string | null;
  numeric: number | null;
  items: WorkItemResponseData[];
  created_at: string;
  updated_at: string;
}

export interface WorkCreatePayload {
  company_name: string;
  numeric?: number | null;
}

export interface WorkUpdatePayload {
  company_name?: string | null;
  numeric?: number | null;
}

export interface WorkLogoAttachPayload {
  file_id: string;
}

export interface WorkItemCreatePayload {
  title: MultiLangText;
  employment_type?: EmploymentType | null;
  location?: MultiLangText | null;
  date_from?: string | null;
  date_to?: string | null;
  body_markdown?: MultiLangText | null;
  skills?: string[] | null;
}

export interface WorkItemUpdatePayload {
  language_code?: string;
  title?: string | null;
  employment_type?: EmploymentType | null;
  location?: string | null;
  date_from?: string | null;
  date_to?: string | null;
  body_markdown?: string | null;
  skills?: string[] | null;
}

export type WorkCollectionResult = ApiResult<WorkResponseData[]>;
export type WorkResult = ApiResult<WorkResponseData>;
export type WorkItemResult = ApiResult<WorkItemResponseData>;
export type WorkDeleteResult = ApiResult<null>;
export type WorkCreateResult = ApiResult<WorkResponseData>;
export type WorkItemCreateResult = ApiResult<WorkItemResponseData>;
