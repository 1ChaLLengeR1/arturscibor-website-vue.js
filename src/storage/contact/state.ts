import type { ContactResponseData } from "../../api/contact/types";

export interface ContactState {
  collection: ContactResponseData[];
}

export function state(): ContactState {
  return {
    collection: [],
  };
}
