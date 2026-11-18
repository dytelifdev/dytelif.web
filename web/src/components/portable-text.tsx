import {
  PortableText as PortableTextRenderer,
  type PortableTextComponents,
  type PortableTextProps,
} from "@portabletext/react";
import Link from "next/link";
import { SanityImage } from "@/components/sanity-image";
import type { SanityImageValue } from "@/sanity/image";

const SAFE_HREF = /^(https?:\/\/|mailto:|tel:|\/)/i;

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mt-14 mb-4 font-display text-3xl leading-tight text-balance">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-10 mb-3 font-display text-2xl leading-snug text-balance">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-y border-ink/20 py-6 font-display text-2xl leading-snug text-pretty">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="my-5 text-pretty">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="my-5 list-disc space-y-2 pl-6 marker:text-bronze-ink">{children}</ul>,
    number: ({ children }) => <ol className="my-5 list-decimal space-y-2 pl-6 marker:text-bronze-ink">{children}</ol>,
  },
  marks: {
    link: ({ value, children }) => {
      const href = typeof value?.href === "string" && SAFE_HREF.test(value.href) ? value.href : null;
      if (!href) return <>{children}</>;
      if (href.startsWith("/")) return <Link href={href}>{children}</Link>;
      return (
        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: SanityImageValue & { caption?: string } }) => (
      <figure className="my-10">
        <SanityImage image={value} sizes="(min-width: 768px) 680px, 100vw" className="h-auto w-full" />
        {value.caption ? <figcaption className="mt-3 text-sm text-ink-soft">{value.caption}</figcaption> : null}
      </figure>
    ),
  },
};

/** Rich text from Sanity: only known block types render; unknown marks and URLs are dropped. */
export function PortableText({ value }: { value: PortableTextProps["value"] | null | undefined }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  return <PortableTextRenderer value={value} components={components} onMissingComponent={false} />;
}
