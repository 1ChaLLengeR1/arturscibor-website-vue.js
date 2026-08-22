import type { WorkResponseData } from "../../api/work/types";

export interface WorkState {
  collection: WorkResponseData[];
  lang: string | null;
}

export function state(): WorkState {
  return {
    collection: [],
    lang: null,
  };
}
