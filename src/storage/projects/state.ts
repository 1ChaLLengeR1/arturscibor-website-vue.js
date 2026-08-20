import type { ProjectResponseData } from "../../api/projects/types";

export interface ProjectsState {
  collection: ProjectResponseData[];
  project: ProjectResponseData | null;
}

export function state(): ProjectsState {
  return {
    collection: [],
    project: null,
  };
}
