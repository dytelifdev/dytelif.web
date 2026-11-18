// "//host" is protocol-relative (external), so a site path must be "/" not followed by another "/" or "\".
const SAFE_HREF = /^(https?:\/\/|mailto:|tel:|\/(?![/\\]))/i;

/** Returns the link target only when it is a web, mail, phone or same-site address; otherwise null. */
export function safeHref(value: unknown): string | null {
  return typeof value === "string" && SAFE_HREF.test(value) ? value : null;
}
