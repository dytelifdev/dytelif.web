"use client";

import Image, { type ImageProps } from "next/image";
import sanityImageLoader from "@/sanity/image-loader";

/**
 * next/image for Sanity assets: Sanity's CDN resizes and re-encodes, so the
 * Next.js optimizer is skipped for these. Local photos use the default loader.
 */
export function CdnImage(props: Omit<ImageProps, "loader">) {
  // eslint-disable-next-line jsx-a11y/alt-text -- alt is always passed through props
  return <Image loader={sanityImageLoader} {...props} />;
}
