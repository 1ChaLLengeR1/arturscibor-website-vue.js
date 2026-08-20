import type { ToolResponseData } from "../../api/tools/types";

export interface ToolsState {
  collection: ToolResponseData[];
}

export function state(): ToolsState {
  return {
    collection: [],
  };
}
