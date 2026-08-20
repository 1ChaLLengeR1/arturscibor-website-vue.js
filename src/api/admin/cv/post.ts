import { apiPut } from "../../common/post";
import type { CvUploadPayload, CvUploadResult } from "../../cv/types";

export function uploadCv(payload: CvUploadPayload): Promise<CvUploadResult> {
  return apiPut("/api/v1/admin/cv/upload", { payload, jwt: true });
}
