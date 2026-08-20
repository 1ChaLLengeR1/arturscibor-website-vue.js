import type { ApiErrorResponse, ApiResult } from "../common/types";

export interface CurriculumVitaeResponseData {
  id: string;
  file_id: string | null;
  url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CvUploadPayload {
  file_id: string;
}

export type CvUploadResult = ApiResult<CurriculumVitaeResponseData>;

export interface CvDownloadSuccess {
  status: "SUCCESS";
  blob: Blob;
  fileName: string | null;
}

/** GET /cv nie zwraca koperty ApiResponse na sukces (200 = surowy plik), tylko na błąd (404/500). */
export type CvDownloadResult = CvDownloadSuccess | ApiErrorResponse;
