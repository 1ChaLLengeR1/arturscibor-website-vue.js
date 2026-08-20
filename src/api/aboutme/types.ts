import type { ApiResult } from "../common/types";

export interface AboutMeImageData {
  file_id: string;
  url: string | null;
  sort_order: number;
}

export interface AboutMeResponseData {
  id: string;
  name: string | null;
  job_title: string | null;
  body_markdown: string | null;
  images: AboutMeImageData[];
  created_at: string;
  updated_at: string;
}

export interface AboutMeUpdatePayload {
  language_code?: string;
  name?: string | null;
  job_title?: string | null;
  body_markdown?: string | null;
}

export interface AboutMeImageAttachPayload {
  file_id: string;
}

export type AboutMeResult = ApiResult<AboutMeResponseData>;
