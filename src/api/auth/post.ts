import { apiPost } from "../common/post";
import type { AuthResult, LoginPayload, RefreshPayload } from "./types";

export function login(payload: LoginPayload): Promise<AuthResult> {
  return apiPost("/api/v1/auth/login", { payload });
}

export function refresh(payload: RefreshPayload): Promise<AuthResult> {
  return apiPost("/api/v1/auth/refresh", { payload });
}
