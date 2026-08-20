import type { ApiResult } from "../common/types";

export interface AuthTokensData {
  id_user: string;
  type: string;
  access_token: string;
  refresh_token: string;
}

export interface LoginPayload {
  login: string;
  password: string;
}

export interface RefreshPayload {
  id_user: string;
  refresh_token: string;
}

export type AuthResult = ApiResult<AuthTokensData>;
