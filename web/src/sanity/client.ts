import "server-only";
import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "./env";

/**
 * Read-only client for the public production dataset. No token: only published
 * documents are visible. The CDN is bypassed because Next.js caches every query
 * itself and the revalidation webhook must never re-cache a stale CDN copy.
 */
export const sanity = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
});
