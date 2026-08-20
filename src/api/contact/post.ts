import { apiPost } from "../common/post";
import type { ContactCreatePayload, ContactCreateResult } from "./types";

export function createContact(payload: ContactCreatePayload): Promise<ContactCreateResult> {
  return apiPost("/api/v1/contact/create", { payload });
}
