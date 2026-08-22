import type { ToolResponseData } from "../../api/tools/types";

export interface ToolsState {
  collection: ToolResponseData[];
  lang: string | null;
}

export function state(): ToolsState {
  return {
    collection: [],
    lang: null,
  };
}
