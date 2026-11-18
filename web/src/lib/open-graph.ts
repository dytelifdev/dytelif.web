import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { getSettings } from "@/sanity/fetch";
import { ogImageUrl, type SanityImageValue } from "@/sanity/image";

type OpenGraph = NonNullable<Metadata["openGraph"]>;

const SIZE = { width: 1200, height: 630 };
const DEFAULT_IMAGE = { url: "/og.png", ...SIZE, alt: `${SITE.name}, diyetisyen, Nilüfer Bursa` };

/**
 * Next replaces a parent's openGraph object instead of merging it, so every page
 * that sets one builds it here. The image is the first available of: the page's own
 * images, the site-wide share image from Sanity, then the default card at /og.png.
 * Title and description are left out so Next fills them from the page's metadata.
 */
export async function openGraph(
  og: OpenGraph,
  ...pageImages: (SanityImageValue | null | undefined)[]
): Promise<OpenGraph> {
  const settings = await getSettings();
  const url = [...pageImages, settings?.ogImage].map((image) => ogImageUrl(image)).find(Boolean);
  return {
    locale: "tr_TR",
    siteName: SITE.name,
    ...og,
    images: [url ? { url, ...SIZE } : DEFAULT_IMAGE],
  };
}
