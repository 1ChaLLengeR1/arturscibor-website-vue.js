import type { WorkResponseData } from "../../api/work/types";

export interface WorkState {
  collection: WorkResponseData[];
}

export function state(): WorkState {
  return {
    collection: [],
  };
}
