"use client";

/**
 * next/image loader: Sanity's image CDN resizes and re-encodes (AVIF/WebP via
 * auto=format), so Next.js does not run its own optimizer. A crop requested by
 * the builder (w + h) keeps its aspect ratio at every srcset width.
 */
export default function sanityImageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (!src.startsWith("https://cdn.sanity.io/")) return `${src}?w=${width}`;
  const url = new URL(src);
  const baseW = Number(url.searchParams.get("w"));
  const baseH = Number(url.searchParams.get("h"));
  url.searchParams.set("w", String(width));
  if (baseW && baseH) url.searchParams.set("h", String(Math.round((baseH * width) / baseW)));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("auto", "format");
  if (!url.searchParams.has("fit")) url.searchParams.set("fit", "max");
  return url.toString();
}
