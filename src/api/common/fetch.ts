import store from "../../storage/index.js";
import type { ApiResult, GetRequestOptions } from "./types";

function buildUrl(path: string, query?: GetRequestOptions["query"]): string {
  const url = new URL(path, import.meta.env.VITE_API_URL);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

function buildHeaders(options: GetRequestOptions): HeadersInit {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (options.jwt) {
    const accessToken = store.getters["auth/optionsTokens"].access_token;
    headers.set("Authorization", `Bearer ${accessToken}`);
  }
  return headers;
}

function errorResult<DATA, ADDITIONALS, ERR_ADDITIONALS>(
  keyTypeError: string,
  message: string
): ApiResult<DATA, ADDITIONALS, ERR_ADDITIONALS> {
  return {
    status: "ERROR",
    status_code: 0,
    data: {
      message,
      type_module: "fetch",
      type_error: keyTypeError,
      key_type_error: keyTypeError,
    },
    additional: null,
  };
}

export async function apiGet<DATA, ADDITIONALS = null, ERR_ADDITIONALS = null>(
  path: string,
  options: GetRequestOptions = {}
): Promise<ApiResult<DATA, ADDITIONALS, ERR_ADDITIONALS>> {
  let response: Response | undefined;
  try {
    const url = buildUrl(path, options.query);
    const headers = buildHeaders(options);
    response = await fetch(url, { method: "GET", headers });
    return await response.json();
  } catch {
    if (!response) {
      return errorResult("NetworkError", "Nie udało się połączyć z serwerem.");
    }
    return errorResult("UnexpectedError", "Serwer zwrócił odpowiedź w nieprawidłowym formacie.");
  }
}
