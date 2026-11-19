import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Container } from "./section";

export type Crumb = { href: string; label: string };

/** Same band and proportions as PageHero, shown for the instant before a URL-specific page fills in. */
export function PageHeroSkeleton({ media }: { media?: boolean }) {
  return (
    <section data-tone="dark" aria-busy="true" aria-label="Yükleniyor" className="bg-brand">
      <Container
        className={cn(
          "py-12 sm:py-14 lg:py-20",
          media && "grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16",
        )}
      >
        <div className="motion-safe:animate-pulse">
          <div className="h-4 w-48 rounded-full bg-white/15" />
          <div className="mt-6 h-11 w-4/5 max-w-xl rounded-lg bg-white/15 sm:h-14" />
          <div className="mt-6 h-5 w-full max-w-2xl rounded-full bg-white/10" />
          <div className="mt-3 h-5 w-2/3 max-w-lg rounded-full bg-white/10" />
          <div className="mt-8 h-14 w-60 rounded-lg bg-white/15" />
        </div>
        {media ? <div className="aspect-4/3 w-full rounded-2xl bg-white/10 motion-safe:animate-pulse" /> : null}
      </Container>
    </section>
  );
}

/**
 * Opening band of every inner page: breadcrumb, title, lead, optional actions
 * and an optional photo on the right. Emits BreadcrumbList structured data.
 */
export function PageHero({
  title,
  lead,
  crumbs = [],
  children,
  media,
}: {
  title: ReactNode;
  lead?: ReactNode;
  /** Trail after "Ana sayfa"; the last entry is the current page. */
  crumbs?: Crumb[];
  children?: ReactNode;
  media?: ReactNode;
}) {
  const trail = [{ href: "/", label: "Ana sayfa" }, ...crumbs];
  return (
    <section data-tone="dark" className="bg-brand">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: trail.map((crumb, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: crumb.label,
            item: `${SITE.url}${crumb.href === "/" ? "" : crumb.href}`,
          })),
        }}
      />
      <Container
        className={cn(
          "py-12 sm:py-14 lg:py-20",
          media && "grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16",
        )}
      >
        <div>
          <nav aria-label="Konumunuz">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-white/75">
              {trail.map((crumb, i) => {
                const last = i === trail.length - 1;
                return (
                  <li key={crumb.href} className="flex items-center gap-1">
                    {last ? (
                      <span aria-current="page" className="font-semibold text-white">
                        {crumb.label}
                      </span>
                    ) : (
                      <>
                        <Link href={crumb.href} className="rounded-md py-1 transition-colors hover:text-white">
                          {crumb.label}
                        </Link>
                        <ChevronRightIcon aria-hidden="true" className="size-3.5" />
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
          <h1 className="mt-5 max-w-3xl text-title font-extrabold">{title}</h1>
          {lead ? <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">{lead}</p> : null}
          {children ? <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{children}</div> : null}
        </div>
        {media ? <div className="mx-auto w-full max-w-md lg:max-w-none">{media}</div> : null}
      </Container>
    </section>
  );
}
