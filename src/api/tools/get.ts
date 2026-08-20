import { apiGet } from "../common/fetch";
import type { ToolCollectionResult } from "./types";

export function getToolsCollection(lang?: string): Promise<ToolCollectionResult> {
  return apiGet("/api/v1/tools/collection", { query: { lang } });
}
