import { apiGet } from "../common/fetch";
import type { AboutMeResult } from "./types";

export function getAboutMe(lang?: string): Promise<AboutMeResult> {
  return apiGet("/api/v1/aboutme", { query: { lang } });
}
