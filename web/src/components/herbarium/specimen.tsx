import type { ComponentProps, ReactNode } from "react";
import Image from "next/image";
import { Monogram } from "@/components/brand/logo";
import { SanityImage } from "@/components/sanity-image";
import type { LocalPhoto } from "@/lib/photos";
import { cn } from "@/lib/utils";
import { hasImage, type SanityImageValue } from "@/sanity/image";

type TapePosition = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top";

const tapePlacement: Record<TapePosition, string> = {
  "top-left": "-top-3 -left-3 -rotate-[32deg] sm:-left-5",
  "top-right": "-top-3 -right-3 rotate-[32deg] sm:-right-5",
  "bottom-left": "-bottom-3 -left-3 rotate-[28deg] sm:-left-5",
  "bottom-right": "-bottom-3 -right-3 -rotate-[28deg] sm:-right-5",
  top: "-top-3.5 left-1/2 -translate-x-1/2 -rotate-2",
};

/** Linen archival tape. Depth comes from overlap only: no shadow. */
export function Tape({ position, className }: { position: TapePosition; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("tape absolute z-10 h-6 w-20 sm:w-24", tapePlacement[position], className)}
    />
  );
}

/** The cream herbarium sheet every photo and fact is mounted on. */
export function SpecimenSheet({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("relative bg-sheet text-ink", className)} {...props}>
      {children}
    </div>
  );
}

/** Printed determination label: a heavy top rule, hairlines between rows. */
export function SpecimenLabel({
  title,
  rows,
  className,
}: {
  title: ReactNode;
  rows: { term: string; value: ReactNode }[];
  className?: string;
}) {
  return (
    <div className={cn("border-t-2 border-ink bg-sheet text-ink", className)}>
      <p className="border-b border-ink/15 py-2.5 font-display text-xl leading-tight">{title}</p>
      <dl className="tabular text-sm">
        {rows.map((row) => (
          <div key={row.term} className="grid grid-cols-[6.5rem_1fr] gap-3 border-b border-ink/15 py-2 last:border-b-0">
            <dt className="text-ink-soft">{row.term}</dt>
            <dd className="font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * A photograph taped onto a sheet. Priority: the Sanity upload, then the
 * client's own local photo, then a finished empty plate carrying the bronze
 * herbarium stamp (never placeholder text, never someone else's photo).
 */
export function MountedPhoto({
  image,
  fallback,
  aspect,
  sizes,
  eager,
  tapes = ["top-left", "top-right"],
  className,
  frameClassName,
}: {
  image: SanityImageValue | null | undefined;
  fallback?: LocalPhoto;
  aspect: number;
  sizes: string;
  eager?: boolean;
  tapes?: TapePosition[];
  className?: string;
  frameClassName?: string;
}) {
  return (
    <SpecimenSheet className={cn("p-3 sm:p-4", className)}>
      {tapes.map((position) => (
        <Tape key={position} position={position} />
      ))}
      <div className={cn("relative overflow-hidden bg-paper", frameClassName)} style={{ aspectRatio: aspect }}>
        {hasImage(image) ? (
          <SanityImage image={image} aspect={aspect} sizes={sizes} eager={eager} className="size-full object-cover" />
        ) : fallback ? (
          <Image
            src={fallback.src}
            alt={fallback.alt}
            sizes={sizes}
            placeholder="blur"
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : undefined}
            className="size-full object-cover"
            style={{ objectPosition: fallback.focus }}
          />
        ) : (
          <div className="pressed grid size-full place-items-center">
            <div className="stamp grid aspect-square w-1/2 max-w-56 place-items-center rounded-full border-2">
              <Monogram label="" className="h-auto w-3/5" />
            </div>
          </div>
        )}
      </div>
    </SpecimenSheet>
  );
}
