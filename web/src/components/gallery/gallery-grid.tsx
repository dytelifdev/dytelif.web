"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { CdnImage } from "@/components/cdn-image";
import { useMemo, useState } from "react";
import { Tape } from "@/components/herbarium/specimen";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

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
const tilt = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

/**
 * Masonry of mounted photographs. Hovering or focusing one dims the rest a
 * step; opening one brings it forward in a dialog with keyboard paging.
 */
export function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(photos.map((p) => p.category?.trim()).filter((c): c is string => Boolean(c))))],
    [photos],
  );
  const [category, setCategory] = useState(ALL);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const visible = category === ALL ? photos : photos.filter((p) => p.category?.trim() === category);
  const current = openIndex === null ? null : visible[openIndex];

  function step(delta: number) {
    setOpenIndex((i) => (i === null ? i : (i + delta + visible.length) % visible.length));
  }

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

      <ul className="gallery columns-1 gap-6 min-[440px]:columns-2 lg:columns-3 lg:gap-10">
        {visible.map((photo, i) => (
          <li key={photo.id} className="mb-10 break-inside-avoid lg:mb-14">
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className={cn(
                "group relative block w-full bg-sheet p-3 text-left transition-opacity duration-300 sm:p-4",
                "[.gallery:has(button:focus-visible)_&:not(:focus-visible)]:opacity-60 [.gallery:has(button:hover)_&:not(:hover)]:opacity-60",
              )}
              aria-label={`Büyüt: ${photo.caption || photo.alt}`}
            >
              <Tape position="top" className={tilt[i % tilt.length]} />
              <Photo
                cdn={photo.cdn}
                src={photo.src}
                width={photo.width}
                height={photo.height}
                alt={photo.alt}
                sizes="(min-width: 1024px) 30vw, (min-width: 440px) 46vw, 92vw"
                placeholder={photo.lqip || !photo.cdn ? "blur" : "empty"}
                blurDataURL={photo.lqip}
                className="h-auto w-full"
              />
              {photo.caption ? <span className="mt-3 block text-sm text-ink-soft">{photo.caption}</span> : null}
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={current !== null} onOpenChange={(open) => !open && setOpenIndex(null)}>
        <DialogContent
          data-surface="folder"
          className="max-w-[min(64rem,calc(100vw-2rem))] gap-4 rounded-none border-0 bg-folder p-3 text-paper shadow-none ring-0 sm:max-w-[min(64rem,calc(100vw-2rem))] sm:p-5"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") step(1);
            if (e.key === "ArrowLeft") step(-1);
          }}
        >
          {current ? (
            <>
              <DialogTitle className="sr-only">{current.caption || current.alt}</DialogTitle>
              <DialogDescription className="sr-only">
                Fotoğraf {(openIndex ?? 0) + 1} / {visible.length}. Ok tuşlarıyla gezinebilirsiniz.
              </DialogDescription>
              <div className="bg-sheet p-2 sm:p-3">
                <Photo
                  key={current.id}
                  cdn={current.cdn}
                  src={current.src}
                  width={current.width}
                  height={current.height}
                  alt={current.alt}
                  sizes="(min-width: 1024px) 64rem, 100vw"
                  placeholder={current.lqip || !current.cdn ? "blur" : "empty"}
                  blurDataURL={current.lqip}
                  className="mx-auto h-auto max-h-[72dvh] w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-sage">{current.caption}</p>
                {visible.length > 1 ? (
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => step(-1)}
                      aria-label="Önceki fotoğraf"
                    >
                      <ChevronLeftIcon />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => step(1)}
                      aria-label="Sonraki fotoğraf"
                    >
                      <ChevronRightIcon />
                    </Button>
                  </div>
                ) : null}
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
