import { apiDelete } from "../../common/post";
import type { ContactDeleteResult } from "../../contact/types";

export function deleteContact(contactId: string): Promise<ContactDeleteResult> {
  return apiDelete(`/api/v1/admin/contact/${contactId}/delete`, { jwt: true });
}
