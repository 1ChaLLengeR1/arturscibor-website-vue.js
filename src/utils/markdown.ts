import DOMPurify from "dompurify";
import { marked } from "marked";

marked.setOptions({ breaks: true, gfm: true });

/** Backend świadomie nie parsuje markdownu (docs/3.4-aboutme-home-section-done.md) — renderowanie + sanityzacja pod XSS to zadanie frontendu. */
export function renderMarkdown(source: string | null | undefined): string {
  if (!source) {
    return "";
  }
  const html = marked.parse(source, { async: false }) as string;
  return DOMPurify.sanitize(html);
}
