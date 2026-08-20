import type { AboutMeResponseData } from "../../api/aboutme/types";

export interface AboutMeState {
  data: AboutMeResponseData | null;
}

export function state(): AboutMeState {
  return {
    data: null,
  };
}
