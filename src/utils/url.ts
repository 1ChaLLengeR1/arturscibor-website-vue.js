import { url_backend } from "@/app";

/** Backend zwraca URL-e plików jako ścieżki względne (np. "/static/aboutme/..."), bez hosta. */
export function resolveFileUrl(path: string | null | undefined): string | null {
  if (!path) {
    return null;
  }
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  return new URL(path, url_backend).toString();
}
