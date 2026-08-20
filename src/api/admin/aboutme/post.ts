import { apiDelete, apiPost, apiPut } from "../../common/post";
import type {
  AboutMeImageAttachPayload,
  AboutMeResult,
  AboutMeUpdatePayload,
} from "../../aboutme/types";

export function updateAboutMe(payload: AboutMeUpdatePayload): Promise<AboutMeResult> {
  return apiPut("/api/v1/admin/aboutme/update", { payload, jwt: true });
}

export function attachAboutMeImage(payload: AboutMeImageAttachPayload): Promise<AboutMeResult> {
  return apiPost("/api/v1/admin/aboutme/images", { payload, jwt: true });
}

export function detachAboutMeImage(fileId: string): Promise<AboutMeResult> {
  return apiDelete(`/api/v1/admin/aboutme/images/${fileId}`, { jwt: true });
}
