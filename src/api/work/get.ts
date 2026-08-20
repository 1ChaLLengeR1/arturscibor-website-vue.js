import { apiGet } from "../common/fetch";
import type { WorkCollectionResult } from "./types";

export function getWorkCollection(lang?: string): Promise<WorkCollectionResult> {
  return apiGet("/api/v1/work/collection", { query: { lang } });
}
