import { apiGet } from "../fetch";
import type { FileCollectionQuery, FileCollectionResult } from "./types";

export function getFileCollection(query: FileCollectionQuery = {}): Promise<FileCollectionResult> {
  return apiGet("/api/v1/admin/file/collection", { query, jwt: true });
}
