import type { Metadata } from "next";
import { Container, Folio } from "@/components/herbarium/folio";
import { Ledger, LedgerEntry } from "@/components/herbarium/ledger";
import { PageIntro } from "@/components/herbarium/page-intro";
import { formatDate } from "@/lib/format";
import { getAnnouncements } from "@/sanity/fetch";

export const metadata: Metadata = {
  title: "Duyurular",
  description: "Dyt. Elif Sude Özkan'dan güncel duyurular.",
  alternates: { canonical: "/duyurular" },
};

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <>
      <PageIntro title="Duyurular" lead="Çalışma düzeni, etkinlikler ve yenilikler." />
      <Folio surface="paper">
        <Container className="py-16 lg:py-24">
          {announcements.length > 0 ? (
            <Ledger className="mx-auto max-w-5xl">
              {announcements.map((item) => (
                <LedgerEntry
                  key={item._id}
                  href={`/duyurular/${item.slug}`}
                  title={item.title ?? ""}
                  summary={item.summary}
                  headingLevel="h2"
                  meta={<time dateTime={item.publishedAt ?? undefined}>{formatDate(item.publishedAt)}</time>}
                />
              ))}
            </Ledger>
          ) : (
            <p className="mx-auto max-w-5xl border-t-2 border-ink pt-8 text-lg">Şu anda yayında bir duyuru yok.</p>
          )}
        </Container>
      </Folio>
    </>
  );
}
