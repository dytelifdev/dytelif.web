import Image, { type StaticImageData } from "next/image";
import { Monogram } from "@/components/brand/logo";
import { SanityImage } from "@/components/sanity-image";
import { cn } from "@/lib/utils";
import { hasImage, type SanityImageValue } from "@/sanity/image";

export type LocalImage = { src: StaticImageData; alt: string; focus?: string };

/**
 * A clean, rounded photograph. Priority: the Sanity upload, then a local photo,
 * then a quiet branded panel. `zoom` scales the photo inside its frame when a
 * parent `.group` is hovered.
 */
export function Photo({
  image,
  fallback,
  aspect,
  sizes,
  eager,
  zoom,
  alt,
  className,
}: {
  image?: SanityImageValue | null;
  fallback?: LocalImage;
  /** width / height; omit to keep the photo's own proportions */
  aspect?: number;
  sizes: string;
  eager?: boolean;
  zoom?: boolean;
  /** Overrides the alt text, e.g. "" when a caption or heading already names the photo. */
  alt?: string;
  className?: string;
}) {
  const imgClass = cn(
    "size-full object-cover",
    !aspect && "h-auto",
    zoom && "transition-transform duration-700 ease-out-expo motion-safe:group-hover:scale-[1.04]",
  );
  return (
    <div
      className={cn("relative overflow-hidden rounded-2xl bg-brand-soft", className)}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      {hasImage(image) ? (
        <SanityImage
          image={image}
          aspect={aspect}
          sizes={sizes}
          eager={eager}
          blur={eager}
          alt={alt}
          className={imgClass}
        />
      ) : fallback ? (
        <Image
          src={fallback.src}
          alt={alt ?? fallback.alt}
          sizes={sizes}
          // The first-screen photo shows its blurred preview at once; the rest wait on a flat colour.
          placeholder={eager ? "blur" : "empty"}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          className={imgClass}
          style={{ objectPosition: fallback.focus }}
        />
      ) : (
        <div className="grid size-full min-h-48 place-items-center bg-cream">
          <Monogram label="" className="h-auto w-1/4 max-w-28 text-brand/30 [--logo-accent:var(--color-gilt-muted)]" />
        </div>
      )}
    </div>
  );
}
