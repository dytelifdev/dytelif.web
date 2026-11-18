import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { sanity } from "./client";
import {
  ANNOUNCEMENT_QUERY,
  ANNOUNCEMENTS_QUERY,
  GALLERY_QUERY,
  POST_QUERY,
  POSTS_QUERY,
  PRODUCTS_QUERY,
  SERVICE_QUERY,
  SERVICES_QUERY,
  SETTINGS_QUERY,
  SITEMAP_QUERY,
} from "./queries";

/**
 * Every read is cached and tagged by document type. The signed Sanity webhook
 * (/api/revalidate) expires the tag on publish, update or delete; the hourly
 * lifetime is only a safety net until that webhook is configured.
 */
export const CONTENT_TAGS = ["siteSettings", "service", "post", "galleryItem", "announcement", "product"] as const;
export type ContentTag = (typeof CONTENT_TAGS)[number];

function cached(...tags: ContentTag[]) {
  cacheLife("hours");
  cacheTag(...tags);
}

export async function getSettings() {
  "use cache";
  cached("siteSettings");
  return sanity.fetch(SETTINGS_QUERY);
}

export async function getServices() {
  "use cache";
  cached("service");
  return sanity.fetch(SERVICES_QUERY);
}

export async function getService(slug: string) {
  "use cache";
  cached("service");
  return sanity.fetch(SERVICE_QUERY, { slug });
}

export async function getPosts() {
  "use cache";
  cached("post");
  return sanity.fetch(POSTS_QUERY);
}

export async function getPost(slug: string) {
  "use cache";
  cached("post");
  return sanity.fetch(POST_QUERY, { slug });
}

export async function getGallery() {
  "use cache";
  cached("galleryItem");
  return sanity.fetch(GALLERY_QUERY);
}

export async function getAnnouncements() {
  "use cache";
  cached("announcement");
  return sanity.fetch(ANNOUNCEMENTS_QUERY);
}

export async function getAnnouncement(slug: string) {
  "use cache";
  cached("announcement");
  return sanity.fetch(ANNOUNCEMENT_QUERY, { slug });
}

export async function getProducts() {
  "use cache";
  cached("product");
  return sanity.fetch(PRODUCTS_QUERY);
}

export async function getSitemapEntries() {
  "use cache";
  cached("service", "post", "announcement");
  return sanity.fetch(SITEMAP_QUERY);
}

/**
 * Cache Components needs at least one param per dynamic route at build time.
 * When the CMS has no documents yet, a placeholder renders as 404.
 */
export const PLACEHOLDER_SLUG = "__bos__";
export function staticSlugs(items: { slug: string | null }[] | null | undefined) {
  const slugs = (items ?? []).flatMap((item) => (item.slug ? [{ slug: item.slug }] : []));
  return slugs.length > 0 ? slugs : [{ slug: PLACEHOLDER_SLUG }];
}
