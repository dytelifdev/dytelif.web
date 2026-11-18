import { describe, expect, it } from "vitest";
import { safeHref } from "./safe-href";

describe("safeHref", () => {
  it.each([
    "https://www.instagram.com/bursadiyetisyenelifsudeozkan/",
    "http://example.com",
    "mailto:info.elifsudeozkan@gmail.com",
    "tel:+905330167278",
    "/blog/bir-yazi",
    "/",
  ])("keeps %s", (href) => {
    expect(safeHref(href)).toBe(href);
  });

  it.each([
    "javascript:alert(1)",
    "JavaScript:alert(1)",
    "data:text/html,<script>alert(1)</script>",
    "vbscript:msgbox(1)",
    "//evil.example",
    "/\\evil.example",
    " https://example.com",
    "ftp://example.com",
    "",
  ])("drops %s", (href) => {
    expect(safeHref(href)).toBeNull();
  });

  it("drops non-string values", () => {
    expect(safeHref(undefined)).toBeNull();
    expect(safeHref(42)).toBeNull();
    expect(safeHref({ href: "https://example.com" })).toBeNull();
  });
});
