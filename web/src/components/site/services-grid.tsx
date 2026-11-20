import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { SERVICE_AREAS } from "@/lib/profile";
import { cn } from "@/lib/utils";
import { serviceVisual } from "@/lib/visuals";
import type { SanityImageValue } from "@/sanity/image";
import { Photo } from "./photo";

export type ServiceItem = {
  _id: string;
  slug: string | null;
  title: string | null;
  summary: string | null;
  image?: SanityImageValue | null;
};

/** Spans on the 6-column desktop grid so a row never ends with a lone card. */
function spans(count: number) {
  const wide = count % 3 === 2 ? 2 : count % 3 === 1 ? (count === 1 ? 1 : 4) : 0;
  return (index: number) => (index < wide ? (count === 1 ? "lg:col-span-6" : "lg:col-span-3") : "lg:col-span-2");
}

function ServiceCard({
  item,
  wide,
  linked,
  eager,
  headingLevel: Heading,
}: {
  item: ServiceItem;
  wide: boolean;
  linked: boolean;
  eager: boolean;
  headingLevel: "h2" | "h3";
}) {
  const body = (
    <>
      <Photo
        image={item.image}
        fallback={serviceVisual(item.slug)}
        aspect={wide ? 16 / 9 : 4 / 3}
        sizes={
          wide
            ? "(min-width: 1024px) 38rem, (min-width: 768px) 46vw, 92vw"
            : "(min-width: 1024px) 25rem, (min-width: 768px) 46vw, 92vw"
        }
        alt=""
        zoom
        eager={eager}
        className="rounded-none"
      />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <Heading className="text-xl leading-snug font-bold text-ink sm:text-[1.375rem]">{item.title}</Heading>
        {item.summary ? <p className="mt-2.5 line-clamp-3 text-ink-soft">{item.summary}</p> : null}
        {linked ? (
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-semibold text-brand">
            Ayrıntılar
            <ArrowRightIcon
              aria-hidden="true"
              className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
            />
          </span>
        ) : null}
      </div>
    </>
  );
  const card =
    "group flex h-full flex-col overflow-hidden rounded-2xl bg-paper shadow-card transition-[translate,box-shadow] duration-300 ease-out-expo";
  return linked && item.slug ? (
    <Link href={`/hizmetler/${item.slug}`} prefetch className={cn(card, "hover:-translate-y-0.5 hover:shadow-lift")}>
      {body}
    </Link>
  ) : (
    <div className={card}>{body}</div>
  );
}

/**
 * Services as photo cards. Sanity services link to their pages; until the editor
 * publishes any, the CV's practice areas show as unlinked cards.
 */
export function ServicesGrid({
  services,
  headingLevel = "h3",
  eagerFirst = 0,
  mobileLimit,
}: {
  services: ServiceItem[];
  headingLevel?: "h2" | "h3";
  /** How many leading photos load at once, for a grid that opens a page. */
  eagerFirst?: number;
  /** Below the md breakpoint, show only this many cards. */
  mobileLimit?: number;
}) {
  const items: ServiceItem[] =
    services.length > 0
      ? services
      : SERVICE_AREAS.map((area) => ({ _id: area.slug, slug: area.slug, title: area.title, summary: area.summary }));
  const span = spans(items.length);
  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-6 lg:gap-6">
      {items.map((item, i) => (
        <li key={item._id} className={cn(span(i), mobileLimit !== undefined && i >= mobileLimit && "max-md:hidden")}>
          <ServiceCard
            item={item}
            linked={services.length > 0}
            eager={i < eagerFirst}
            wide={span(i) === "lg:col-span-3"}
            headingLevel={headingLevel}
          />
        </li>
      ))}
    </ul>
  );
}
