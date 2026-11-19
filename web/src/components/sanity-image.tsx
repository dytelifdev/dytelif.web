import { CdnImage } from "@/components/cdn-image";
import { hasImage, imageSource, type SanityImageValue } from "@/sanity/image";

type Props = {
  image: SanityImageValue | null | undefined;
  /** width / height; omit to keep the photo's own ratio */
  aspect?: number;
  sizes: string;
  /** Above-the-fold LCP image only */
  eager?: boolean;
  /** Overrides the stored alt text, e.g. "" when adjacent text already names the image. */
  alt?: string;
  /** Show the asset's blurred preview while loading. */
  blur?: boolean;
  className?: string;
};

/**
 * Sanity photo. The URL is built on the server. Frames carry a flat background colour while
 * loading; the blur placeholder (an SVG filter, costly to paint) is opt-in for large solo images.
 * Renders nothing without an asset.
 */
export function SanityImage({ image, aspect, sizes, eager, alt, blur, className }: Props) {
  if (!hasImage(image)) return null;
  const { src, width, height } = imageSource(image, aspect);
  const lqip = image.asset.metadata?.lqip ?? undefined;
  return (
    <CdnImage
      src={src}
      width={width}
      height={height}
      alt={alt ?? image.alt ?? ""}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      placeholder={blur && lqip ? "blur" : "empty"}
      blurDataURL={blur ? lqip : undefined}
      className={className}
    />
  );
}
