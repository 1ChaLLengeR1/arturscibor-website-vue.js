import type { ApiResult } from "../common/types";

export interface ContactResponseData {
  id: string;
  name: string | null;
  email: string | null;
  subject: string | null;
  phone: string | null;
  description: string | null;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactCreatePayload {
  name: string;
  email: string;
  subject?: string | null;
  phone?: string | null;
  description: string;
}

export interface ContactCollectionQuery {
  limit?: number;
  is_read?: boolean;
  created_from?: string;
  created_to?: string;
  [key: string]: string | number | boolean | undefined | null;
}

export type ContactCreateResult = ApiResult<ContactResponseData>;
export type ContactCollectionResult = ApiResult<ContactResponseData[]>;
export type ContactDeleteResult = ApiResult<null>;
