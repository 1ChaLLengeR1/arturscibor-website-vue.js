import { apiGet } from "../common/fetch";
import type { ProjectCollectionResult, ProjectResult } from "./types";

export function getProjectsCollection(lang?: string): Promise<ProjectCollectionResult> {
  return apiGet("/api/v1/projects/collection", { query: { lang } });
}

export function getProject(projectId: string, lang?: string): Promise<ProjectResult> {
  return apiGet(`/api/v1/projects/${projectId}`, { query: { lang } });
}
