import { apiGet } from "../../common/fetch";
import type { ContactCollectionQuery, ContactCollectionResult } from "../../contact/types";

export function getContactCollection(
  query: ContactCollectionQuery = {}
): Promise<ContactCollectionResult> {
  return apiGet("/api/v1/admin/contact/collection", { query, jwt: true });
}
