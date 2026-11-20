import { ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { Container, Section } from "@/components/site/section";
import { cn } from "@/lib/utils";
import { getAnnouncements } from "@/sanity/fetch";

export const metadata: Metadata = {
  title: "Duyurular",
  description: "Dyt. Elif Sude Özkan'dan güncel duyurular: çalışma düzeni, etkinlikler ve yenilikler.",
  alternates: { canonical: "/duyurular" },
};

const zone = { timeZone: "Europe/Istanbul" } as const;
const DAY = new Intl.DateTimeFormat("tr-TR", { day: "numeric", ...zone });
const MONTH_YEAR = new Intl.DateTimeFormat("tr-TR", { month: "short", year: "numeric", ...zone });

/** A bulletin rather than a card grid: each announcement is one ruled line, newest first and largest. */
export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <>
      <PageHero
        title="Duyurular"
        lead="Görüşme düzeni, iş birlikleri ve yeniliklerden ilk siz haberdar olun."
        crumbs={[{ href: "/duyurular", label: "Duyurular" }]}
      />
      <Section tone="ivory" aria-label="Duyuru listesi" className="py-16 sm:py-20 lg:py-24">
        <Container>
          {announcements.length > 0 ? (
            <ol className="border-t border-brass/60">
              {announcements.map((item, i) => {
                const date = item.publishedAt ? new Date(item.publishedAt) : null;
                return (
                  <li key={item._id} className="border-b border-line">
                    <Link
                      href={`/duyurular/${item.slug}`}
                      prefetch
                      className="group grid gap-x-10 gap-y-3 py-8 sm:grid-cols-[6.5rem_minmax(0,1fr)_auto] sm:items-center sm:py-10"
                    >
                      {date ? (
                        <time dateTime={item.publishedAt ?? undefined} className="flex items-baseline gap-2 sm:block">
                          <span className="tabular block text-4xl leading-none font-bold text-brass-ink sm:text-5xl">
                            {DAY.format(date)}
                          </span>
                          <span className="block text-sm font-semibold text-ink-soft sm:mt-2">
                            {MONTH_YEAR.format(date)}
                          </span>
                        </time>
                      ) : (
                        <span aria-hidden="true" />
                      )}
                      <div className="min-w-0">
                        <h2
                          className={cn(
                            "leading-snug font-bold text-ink transition-colors group-hover:text-brand",
                            i === 0 ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
                          )}
                        >
                          {item.title}
                        </h2>
                        {item.summary ? (
                          <p className="mt-2 line-clamp-2 max-w-2xl text-ink-soft">{item.summary}</p>
                        ) : null}
                      </div>
                      <span className="inline-flex items-center gap-1.5 font-semibold text-brand">
                        Okuyun
                        <ArrowRightIcon
                          aria-hidden="true"
                          className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                        />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          ) : (
            <p className="mx-auto max-w-xl rounded-2xl bg-paper p-8 text-center text-lg shadow-card">
              Şu anda yayında bir duyuru yok.
            </p>
          )}
        </Container>
      </Section>
    </>
  );
}
