import type { Metadata } from "next";
import { InstagramBand } from "@/components/site/instagram-band";
import { PageHero } from "@/components/site/page-hero";
import { PostCard } from "@/components/site/post-card";
import { Container, Section } from "@/components/site/section";
import { getAnnouncements } from "@/sanity/fetch";

export const metadata: Metadata = {
  title: "Duyurular",
  description: "Dyt. Elif Sude Özkan'dan güncel duyurular: çalışma düzeni, etkinlikler ve yenilikler.",
  alternates: { canonical: "/duyurular" },
};

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <>
      <PageHero
        title="Duyurular"
        lead="Görüşme düzeni, iş birlikleri ve yeniliklerden ilk siz haberdar olun."
        crumbs={[{ href: "/duyurular", label: "Duyurular" }]}
      />
      <Section tone="page" aria-label="Duyuru listesi" className="py-16 sm:py-20 lg:py-24">
        <Container>
          {announcements.length > 0 ? (
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {announcements.map((item) => (
                <li key={item._id}>
                  <PostCard
                    headingLevel="h2"
                    item={{
                      _id: item._id,
                      href: `/duyurular/${item.slug}`,
                      title: item.title,
                      summary: item.summary,
                      publishedAt: item.publishedAt,
                      image: item.image,
                      kind: "Duyuru",
                    }}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center text-lg shadow-card">
              Şu anda yayında bir duyuru yok.
            </p>
          )}
        </Container>
      </Section>
      <InstagramBand />
    </>
  );
}
