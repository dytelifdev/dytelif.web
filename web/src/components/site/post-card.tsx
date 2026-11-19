import { ArrowRightIcon, BookOpenIcon, MegaphoneIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { hasImage, type SanityImageValue } from "@/sanity/image";
import { Photo } from "./photo";

export type PostCardItem = {
  _id: string;
  href: string;
  title: string | null;
  summary?: string | null;
  publishedAt?: string | null;
  image?: SanityImageValue | null;
  kind?: string;
};

const FULL = new Intl.DateTimeFormat("tr-TR", { dateStyle: "long", timeZone: "Europe/Istanbul" });

/**
 * Blog post or announcement. With a cover it leads with the photo; without one
 * it stays a compact text card with a kind icon, so a list never shows empty frames.
 */
export function PostCard({
  item,
  featured,
  headingLevel: Heading = "h3",
}: {
  item: PostCardItem;
  featured?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const date = item.publishedAt ? new Date(item.publishedAt) : null;
  return (
    <Link
      href={item.href}
      prefetch
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-[translate,box-shadow] duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-lift",
        featured && hasImage(item.image) && "lg:grid lg:grid-cols-2",
      )}
    >
      {hasImage(item.image) ? (
        <Photo
          image={item.image}
          aspect={featured ? 4 / 3 : 16 / 10}
          sizes={
            featured ? "(min-width: 1024px) 40rem, 92vw" : "(min-width: 1024px) 25rem, (min-width: 768px) 46vw, 92vw"
          }
          alt=""
          zoom
          className="rounded-none"
        />
      ) : null}
      <div className={cn("flex flex-1 flex-col p-6 sm:p-7", featured && "lg:justify-center lg:p-10")}>
        {hasImage(item.image) ? null : (
          <span
            aria-hidden="true"
            className="mb-5 grid size-12 place-items-center rounded-full bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white"
          >
            {item.kind === "Duyuru" ? <MegaphoneIcon className="size-5" /> : <BookOpenIcon className="size-5" />}
          </span>
        )}
        <p className="flex flex-wrap items-center gap-x-2 text-sm text-ink-soft">
          {item.kind ? (
            <span className="rounded-full bg-brand-soft px-2.5 py-0.5 font-semibold text-brand">{item.kind}</span>
          ) : null}
          {date ? <time dateTime={item.publishedAt ?? undefined}>{FULL.format(date)}</time> : null}
        </p>
        <Heading className={cn("mt-3 leading-snug font-bold text-ink", featured ? "text-2xl sm:text-3xl" : "text-xl")}>
          {item.title}
        </Heading>
        {item.summary ? <p className="mt-2.5 line-clamp-3 text-ink-soft">{item.summary}</p> : null}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-semibold text-brand">
          Devamını okuyun
          <ArrowRightIcon
            aria-hidden="true"
            className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
