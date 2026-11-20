import Image from "next/image";
import type { ReactNode } from "react";
import { PortableText } from "@/components/portable-text";
import { Toaster } from "@/components/ui/sonner";
import { formatDate } from "@/lib/format";
import { PHOTOS } from "@/lib/photos";
import { PROFILE } from "@/lib/profile";
import type { SanityImageValue } from "@/sanity/image";
import { Photo } from "./photo";
import { Container, Section } from "./section";
import { ShareButton } from "./share-button";

/** Reading layout shared by blog posts and announcements: byline, cover, prose, share. */
export function Article({
  title,
  path,
  publishedAt,
  cover,
  body,
  fallback,
}: {
  title: string;
  path: string;
  publishedAt?: string | null;
  cover?: SanityImageValue | null;
  body?: Parameters<typeof PortableText>[0]["value"];
  fallback?: ReactNode;
}) {
  return (
    <Section tone="ivory" className="py-12 sm:py-16 lg:py-20">
      <Container className="max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
          <div className="flex items-center gap-3">
            <Image
              src={PHOTOS.heroPortrait.src}
              alt=""
              sizes="3rem"
              className="size-12 rounded-full object-cover object-[50%_18%]"
            />
            <p className="text-sm leading-snug">
              <span className="block font-bold text-ink">Dyt. {PROFILE.name}</span>
              {publishedAt ? (
                <time dateTime={publishedAt} className="text-ink-soft">
                  {formatDate(publishedAt)}
                </time>
              ) : null}
            </p>
          </div>
          <ShareButton title={title} path={path} />
        </div>
        {cover?.asset ? (
          <Photo image={cover} aspect={16 / 9} eager sizes="(min-width: 1024px) 56rem, 100vw" className="mt-10" />
        ) : null}
        <div className="prose-site mx-auto mt-10">
          {Array.isArray(body) && body.length > 0 ? <PortableText value={body} /> : fallback}
        </div>
      </Container>
      <Toaster />
    </Section>
  );
}
