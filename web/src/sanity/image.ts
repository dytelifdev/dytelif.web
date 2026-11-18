import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

/** Shape every image projection in queries.ts returns. */
export type SanityImageValue = {
  alt?: string | null;
  crop?: { top?: number; bottom?: number; left?: number; right?: number } | null;
  hotspot?: { x?: number; y?: number; height?: number; width?: number } | null;
  asset?: {
    _id: string;
    metadata?: { lqip?: string | null; dimensions?: { width?: number | null; height?: number | null } | null } | null;
  } | null;
};

export function hasImage(
  image: SanityImageValue | null | undefined,
): image is SanityImageValue & { asset: { _id: string } } {
  return Boolean(image?.asset?._id);
}

/**
 * Builds a CDN URL. With `aspect` (width / height) the crop and hotspot chosen
 * in the Studio decide the framing; without it the original ratio is kept.
 */
export function imageSource(image: SanityImageValue & { asset: { _id: string } }, aspect?: number) {
  const dims = image.asset.metadata?.dimensions;
  const naturalW = dims?.width ?? 1600;
  const naturalH = dims?.height ?? 1200;
  const width = Math.min(naturalW, 2400);
  // The builder accepts the projected image object (asset id + crop + hotspot).
  const source = builder.image(image as Parameters<typeof builder.image>[0]);
  if (aspect) {
    const height = Math.round(width / aspect);
    return { src: source.width(width).height(height).fit("crop").url(), width, height };
  }
  const height = Math.round((naturalH / naturalW) * width);
  return { src: source.width(width).url(), width, height };
}

export function ogImageUrl(image: SanityImageValue | null | undefined) {
  if (!hasImage(image)) return undefined;
  return builder
    .image(image as Parameters<typeof builder.image>[0])
    .width(1200)
    .height(630)
    .fit("crop")
    .auto("format")
    .url();
}
