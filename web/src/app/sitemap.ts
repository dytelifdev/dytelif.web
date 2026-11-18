import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getSitemapEntries } from "@/sanity/fetch";

const STATIC_ROUTES = ["", "/hakkimda", "/hizmetler", "/blog", "/galeri", "/urunler", "/iletisim", "/randevu"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getSitemapEntries();
  const url = (path: string) => `${SITE.url}${path}`;
  const dynamic = (base: string, items: { slug: string | null; _updatedAt: string }[]) =>
    items.flatMap((item) => (item.slug ? [{ url: url(`${base}/${item.slug}`), lastModified: item._updatedAt }] : []));

  return [
    ...STATIC_ROUTES.map((path) => ({ url: url(path || "/"), priority: path === "" ? 1 : 0.7 })),
    ...(entries.announcements.length > 0 ? [{ url: url("/duyurular") }] : []),
    ...dynamic("/hizmetler", entries.services),
    ...dynamic("/blog", entries.posts),
    ...dynamic("/duyurular", entries.announcements),
  ];
}
