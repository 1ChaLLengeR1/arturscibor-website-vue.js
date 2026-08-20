export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type BodyMode = "json" | "formData" | "binary";

/** Mirrors `ApiResponse[DATA, ADDITIONALS]` from api/response.py. */
export interface ApiResponse<DATA, ADDITIONALS = null> {
  status: "SUCCESS";
  status_code: number;
  data: DATA | null;
  additional: ADDITIONALS | null;
}

/** Mirrors `ApiErrorData` from api/response.py. */
export interface ApiErrorData {
  message: string;
  type_module: string;
  type_error: string;
  key_type_error: string;
}

/** Mirrors `ApiErrorResponse[ADDITIONALS]` from api/response.py. */
export interface ApiErrorResponse<ADDITIONALS = null> {
  status: "ERROR";
  status_code: number;
  data: ApiErrorData;
  additional: ADDITIONALS | null;
}

export type ApiResult<DATA, ADDITIONALS = null, ERR_ADDITIONALS = null> =
  | ApiResponse<DATA, ADDITIONALS>
  | ApiErrorResponse<ERR_ADDITIONALS>;

export type QueryParams = Record<string, string | number | boolean | undefined | null>;

/** `pl`/`en` zawsze wymagane, dodatkowe języki dozwolone (docs/7-i18n-section.md pkt. 4). */
export interface MultiLangText {
  pl: string;
  en: string;
  [languageCode: string]: string;
}

export interface BaseRequestOptions {
  jwt?: boolean;
  headers?: HeadersInit;
}

export interface GetRequestOptions extends BaseRequestOptions {
  query?: QueryParams;
}

export interface WriteRequestOptions extends BaseRequestOptions {
  payload?: unknown;
  bodyMode?: BodyMode;
}
