"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { CdnImage } from "@/components/cdn-image";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { GalleryPhoto } from "./gallery-grid";

function Slide({ photo, near }: { photo: GalleryPhoto; near: boolean }) {
  const common = {
    fill: true,
    sizes: "100vw",
    // The open photo and its neighbours load at once, so paging never waits on the network.
    loading: near ? ("eager" as const) : ("lazy" as const),
    className: "object-contain",
  };
  if (photo.cdn) {
    return (
      <CdnImage
        {...common}
        alt={photo.alt}
        src={photo.src as string}
        placeholder={photo.lqip ? "blur" : "empty"}
        blurDataURL={photo.lqip}
      />
    );
  }
  return <Image {...common} alt={photo.alt} src={photo.src} placeholder="blur" />;
}

/**
 * Full-screen viewer on Embla: a fixed stage (no size jump while a photo loads),
 * native swipe on touch screens, arrow keys and buttons on desktop.
 */
export function Lightbox({
  photos,
  startIndex,
  onClose,
}: {
  photos: GalleryPhoto[];
  startIndex: number;
  onClose: () => void;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ startIndex, loop: photos.length > 1, duration: 24 });
  const [selected, setSelected] = useState(startIndex);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const current = photos[selected];
  const count = photos.length;
  const isNear = (i: number) => {
    const d = Math.abs(i - selected);
    return Math.min(d, count - d) <= 1;
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="flex h-dvh w-screen max-w-none flex-col gap-0 rounded-none bg-black p-0 text-white ring-0 sm:max-w-none"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") next();
          if (e.key === "ArrowLeft") prev();
        }}
      >
        <DialogTitle className="sr-only">{current?.caption || current?.alt}</DialogTitle>
        <DialogDescription className="sr-only">
          Fotoğraf {selected + 1} / {count}. Ok tuşlarıyla ya da kaydırarak gezinebilirsiniz.
        </DialogDescription>

        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <p className="tabular text-sm text-white/70" aria-live="polite">
            {selected + 1} / {count}
          </p>
          <DialogClose
            aria-label="Kapat"
            className="grid size-11 place-items-center rounded-full text-white/85 transition-colors hover:bg-white/15 hover:text-white"
          >
            <XIcon className="size-6" />
          </DialogClose>
        </div>

        <div ref={emblaRef} className="relative min-h-0 flex-1 overflow-hidden">
          <div className="flex h-full touch-pan-y">
            {photos.map((photo, i) => (
              <div key={photo.id} className="relative h-full min-w-0 flex-[0_0_100%] px-2 sm:px-20">
                <div className="relative size-full">
                  <Slide photo={photo} near={isNear(i)} />
                </div>
              </div>
            ))}
          </div>
          {count > 1 ? (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Önceki fotoğraf"
                className="absolute top-1/2 left-3 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:grid"
              >
                <ChevronLeftIcon className="size-6" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Sonraki fotoğraf"
                className="absolute top-1/2 right-3 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:grid"
              >
                <ChevronRightIcon className="size-6" />
              </button>
            </>
          ) : null}
        </div>

        <p className="min-h-14 px-4 py-4 text-center text-sm text-white/80 sm:px-6">{current?.caption}</p>
      </DialogContent>
    </Dialog>
  );
}
