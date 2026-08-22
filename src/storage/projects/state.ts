import type { ProjectResponseData } from "../../api/projects/types";

export interface ProjectsState {
  collection: ProjectResponseData[];
  project: ProjectResponseData | null;
  lang: string | null;
}

export function state(): ProjectsState {
  return {
    collection: [],
    project: null,
    lang: null,
  };
}
