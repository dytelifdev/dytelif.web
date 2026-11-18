import { CdnImage } from "@/components/cdn-image";
import { hasImage, imageSource, type SanityImageValue } from "@/sanity/image";

type Props = {
  image: SanityImageValue | null | undefined;
  /** width / height; omit to keep the photo's own ratio */
  aspect?: number;
  sizes: string;
  /** Above-the-fold LCP image only */
  eager?: boolean;
  className?: string;
};

/** Sanity photo with the asset's blur placeholder. The URL is built on the server. Renders nothing without an asset. */
export function SanityImage({ image, aspect, sizes, eager, className }: Props) {
  if (!hasImage(image)) return null;
  const { src, width, height } = imageSource(image, aspect);
  const lqip = image.asset.metadata?.lqip ?? undefined;
  return (
    <CdnImage
      src={src}
      width={width}
      height={height}
      alt={image.alt ?? ""}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      placeholder={lqip ? "blur" : "empty"}
      blurDataURL={lqip}
      className={className}
    />
  );
}
