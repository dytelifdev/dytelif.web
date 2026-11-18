import type { Metadata } from "next";
import { Container, Folio } from "@/components/herbarium/folio";
import { Ledger, LedgerEntry } from "@/components/herbarium/ledger";
import { PageIntro } from "@/components/herbarium/page-intro";
import { SanityImage } from "@/components/sanity-image";
import { ClosingCta } from "@/components/site/closing-cta";
import { getServices } from "@/sanity/fetch";

export const metadata: Metadata = {
  title: "Hizmetler",
  description:
    "Yetişkin, anne–çocuk ve ileri yaş dönemi için kişiye özgü beslenme danışmanlığı; Nilüfer, Bursa'da yüz yüze ve online.",
  alternates: { canonical: "/hizmetler" },
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageIntro
        title="Hizmetler"
        lead="Her görüşme ön değerlendirme ve ölçümle başlar; program yaşamınıza ve sağlık durumunuza göre kurulur. Yüz yüze ya da online."
      />
      <Folio surface="paper">
        <Container className="py-16 lg:py-24">
          {services.length > 0 ? (
            <Ledger className="mx-auto max-w-5xl">
              {services.map((service) => (
                <LedgerEntry
                  key={service._id}
                  href={`/hizmetler/${service.slug}`}
                  title={service.title ?? ""}
                  summary={service.summary}
                  headingLevel="h2"
                  media={
                    service.image?.asset ? (
                      <SanityImage
                        image={service.image}
                        aspect={1}
                        sizes="7rem"
                        className="aspect-square w-full object-cover"
                      />
                    ) : undefined
                  }
                />
              ))}
            </Ledger>
          ) : (
            <p className="mx-auto max-w-5xl border-t-2 border-ink pt-8 text-lg">
              Hizmet ayrıntıları hazırlanıyor. Size uygun görüşmeyi konuşmak için aşağıdan yazabilirsiniz.
            </p>
          )}
        </Container>
      </Folio>
      <ClosingCta />
    </>
  );
}
