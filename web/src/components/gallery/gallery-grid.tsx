"use client";

import Image, { type StaticImageData } from "next/image";
import { CdnImage } from "@/components/cdn-image";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Lightbox } from "./lightbox";

export type GalleryPhoto = {
  id: string;
  /** Sanity CDN URL (cdn: true) or a static import of the client's own photo */
  src: string | StaticImageData;
  cdn: boolean;
  width?: number;
  height?: number;
  alt: string;
  lqip?: string;
  caption?: string | null;
  category?: string | null;
};

const ALL = "Tümü";

function Photo({ cdn, ...props }: { cdn: boolean } & React.ComponentProps<typeof Image>) {
  // eslint-disable-next-line jsx-a11y/alt-text -- alt is always passed through props
  return cdn ? <CdnImage {...props} /> : <Image {...props} />;
}

/**
 * Masonry of rounded photographs with category filters. Hovering shows the
 * caption; opening one shows the full-screen viewer (swipe, arrows, keys).
 */
export function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(photos.map((p) => p.category?.trim()).filter((c): c is string => Boolean(c))))],
    [photos],
  );
  const [category, setCategory] = useState(ALL);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const visible = category === ALL ? photos : photos.filter((p) => p.category?.trim() === category);

  return (
    <>
      {categories.length > 2 ? (
        <div role="group" aria-label="Kategoriye göre süz" className="mb-12 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Button
              key={c}
              type="button"
              size="sm"
              variant={c === category ? "default" : "outline"}
              aria-pressed={c === category}
              onClick={() => setCategory(c)}
            >
              {c}
            </Button>
          ))}
        </div>
      ) : null}

      <ul className="columns-1 gap-4 min-[440px]:columns-2 sm:gap-5 lg:columns-3 lg:gap-6">
        {visible.map((photo, i) => (
          <li key={photo.id} className="mb-4 break-inside-avoid sm:mb-5 lg:mb-6">
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group relative block w-full overflow-hidden rounded-2xl bg-brand-soft text-left"
              aria-label={`Büyüt: ${photo.caption || photo.alt}`}
            >
              <Photo
                cdn={photo.cdn}
                src={photo.src}
                width={photo.width}
                height={photo.height}
                alt={photo.alt}
                sizes="(min-width: 1024px) 30vw, (min-width: 440px) 46vw, 92vw"
                placeholder={photo.lqip || !photo.cdn ? "blur" : "empty"}
                blurDataURL={photo.lqip}
                className="h-auto w-full transition-transform duration-700 ease-out-expo motion-safe:group-hover:scale-[1.03]"
              />
              {photo.caption ? (
                <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/65 to-transparent px-4 pt-10 pb-3.5 text-sm font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {photo.caption}
                </span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>

      {openIndex !== null ? (
        <Lightbox photos={visible} startIndex={openIndex} onClose={() => setOpenIndex(null)} />
      ) : null}
    </>
  );
}
