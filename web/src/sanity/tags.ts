/**
 * One cache tag per Sanity document type. Shared by the cached readers
 * (sanity/fetch.ts) and the webhook (/api/revalidate), and kept free of imports
 * so the webhook route does not pull in the Sanity client.
 */
export const CONTENT_TAGS = [
  "siteSettings",
  "service",
  "post",
  "galleryItem",
  "announcement",
  "partner",
  "product",
] as const;
export type ContentTag = (typeof CONTENT_TAGS)[number];
