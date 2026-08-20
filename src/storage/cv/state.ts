import type { CurriculumVitaeResponseData } from "../../api/cv/types";

export interface CvState {
  current: CurriculumVitaeResponseData | null;
}

export function state(): CvState {
  return {
    current: null,
  };
}
