import store from "../../storage";
import { url_backend } from "@/app";
import type { ApiResult, HttpMethod, WriteRequestOptions } from "./types";

function buildUrl(path: string): string {
  return new URL(path, url_backend).toString();
}

function buildRequest(options: WriteRequestOptions): { headers: Headers; body?: BodyInit } {
  const headers = new Headers(options.headers);
  const bodyMode = options.bodyMode ?? "json";

  if (options.jwt) {
    const accessToken = store.getters["auth/optionsTokens"].access_token;
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  if (options.payload === undefined) {
    return { headers };
  }

  if (bodyMode === "formData") {
    return { headers, body: options.payload as FormData };
  }

  if (bodyMode === "binary") {
    headers.set("Content-Type", "application/octet-stream");
    return { headers, body: options.payload as BodyInit };
  }

  headers.set("Content-Type", "application/json");
  return { headers, body: JSON.stringify(options.payload) };
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
      type_module: "post",
      type_error: keyTypeError,
      key_type_error: keyTypeError,
    },
    additional: null,
  };
}

async function sendRequest<DATA, ADDITIONALS = null, ERR_ADDITIONALS = null>(
  method: HttpMethod,
  path: string,
  options: WriteRequestOptions
): Promise<ApiResult<DATA, ADDITIONALS, ERR_ADDITIONALS>> {
  let response: Response | undefined;
  try {
    const url = buildUrl(path);
    const { headers, body } = buildRequest(options);
    response = await fetch(url, { method, headers, body });
    return await response.json();
  } catch {
    if (!response) {
      return errorResult("NetworkError", "Nie udało się połączyć z serwerem.");
    }
    return errorResult("UnexpectedError", "Serwer zwrócił odpowiedź w nieprawidłowym formacie.");
  }
}

export function apiPost<DATA, ADDITIONALS = null, ERR_ADDITIONALS = null>(
  path: string,
  options: WriteRequestOptions = {}
): Promise<ApiResult<DATA, ADDITIONALS, ERR_ADDITIONALS>> {
  return sendRequest("POST", path, options);
}

export function apiPut<DATA, ADDITIONALS = null, ERR_ADDITIONALS = null>(
  path: string,
  options: WriteRequestOptions = {}
): Promise<ApiResult<DATA, ADDITIONALS, ERR_ADDITIONALS>> {
  return sendRequest("PUT", path, options);
}

export function apiPatch<DATA, ADDITIONALS = null, ERR_ADDITIONALS = null>(
  path: string,
  options: WriteRequestOptions = {}
): Promise<ApiResult<DATA, ADDITIONALS, ERR_ADDITIONALS>> {
  return sendRequest("PATCH", path, options);
}

export function apiDelete<DATA, ADDITIONALS = null, ERR_ADDITIONALS = null>(
  path: string,
  options: WriteRequestOptions = {}
): Promise<ApiResult<DATA, ADDITIONALS, ERR_ADDITIONALS>> {
  return sendRequest("DELETE", path, options);
}
