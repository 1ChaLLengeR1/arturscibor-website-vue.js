/** Backend zwraca URL-e plików jako ścieżki względne (np. "/static/aboutme/..."), bez hosta. */
export function resolveFileUrl(path: string | null | undefined): string | null {
  if (!path) {
    return null;
  }
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  return new URL(path, import.meta.env.VITE_API_URL).toString();
}
