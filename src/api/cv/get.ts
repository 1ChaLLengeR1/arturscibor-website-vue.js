import type { CvDownloadResult } from "./types";

function errorResult(keyTypeError: string, message: string): CvDownloadResult {
  return {
    status: "ERROR",
    status_code: 0,
    data: {
      message,
      type_module: "cv",
      type_error: keyTypeError,
      key_type_error: keyTypeError,
    },
    additional: null,
  };
}

function fileNameFromHeaders(headers: Headers): string | null {
  const disposition = headers.get("Content-Disposition");
  const match = disposition?.match(/filename="?([^";]+)"?/i);
  return match ? match[1] : null;
}

/** GET /cv zwraca surowy plik na sukces, a JSON ApiErrorResponse na błąd — nie da się tego przepuścić przez apiGet. */
export async function getCv(): Promise<CvDownloadResult> {
  let response: Response | undefined;
  try {
    const url = new URL("/api/v1/cv", import.meta.env.VITE_API_URL).toString();
    response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      return await response.json();
    }

    return {
      status: "SUCCESS",
      blob: await response.blob(),
      fileName: fileNameFromHeaders(response.headers),
    };
  } catch {
    if (!response) {
      return errorResult("NetworkError", "Nie udało się połączyć z serwerem.");
    }
    return errorResult("UnexpectedError", "Serwer zwrócił odpowiedź w nieprawidłowym formacie.");
  }
}
