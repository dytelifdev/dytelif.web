import { ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { PageHero } from "@/components/site/page-hero";
import { Container, Section } from "@/components/site/section";
import { ServicesGrid } from "@/components/site/services-grid";
import { Button } from "@/components/ui/button";
import { getContact } from "@/lib/contact";
import { SERVICE_GUIDE } from "@/lib/service-extras";
import { whatsappHref } from "@/lib/site";
import { getServices } from "@/sanity/fetch";

export const metadata: Metadata = {
  title: "Hizmetler",
  description:
    "Yetişkin, anne–çocuk ve ileri yaş dönemi için kişiye özgü beslenme danışmanlığı; Nilüfer, Bursa'da yüz yüze ve online.",
  alternates: { canonical: "/hizmetler" },
};

export default async function ServicesPage() {
  const [services, contact] = await Promise.all([getServices(), getContact()]);
  // Only needs whose service is published, in the guide's own order.
  const guide = SERVICE_GUIDE.flatMap((row) => {
    const service = services.find((s) => s.slug === row.slug);
    return service?.title ? [{ ...row, title: service.title }] : [];
  });

  return (
    <>
      <PageHero
        title="Hizmetler"
        lead="Ölçümle başlar, size göre kurulur, takiple kalıcı olur. Nilüfer'de yüz yüze ya da Türkiye'nin her yerinden online."
        crumbs={[{ href: "/hizmetler", label: "Hizmetler" }]}
      >
        <Button asChild size="lg" variant="white">
          <Link href="/randevu">Randevu talebi gönderin</Link>
        </Button>
      </PageHero>
      <Section tone="sand" aria-label="Hizmet listesi" className="py-16 sm:py-20 lg:py-24">
        <Container>
          <ServicesGrid services={services} headingLevel="h2" eagerFirst={3} />
        </Container>
      </Section>

      {guide.length > 0 ? (
        <Section tone="ivory" aria-labelledby="nereden-baslamali" className="py-16 sm:py-20 lg:py-24">
          <Container className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 id="nereden-baslamali" className="text-headline font-bold">
                Nereden başlamalı?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                Size en yakın cümleyi seçin. Emin değilseniz ön görüşmede birlikte karar veririz.
              </p>
              <div data-wa-cta className="mt-8">
                <Button asChild variant="outline">
                  <a
                    href={whatsappHref(
                      contact.whatsapp,
                      "Merhaba, web sitenizden ulaşıyorum. Hangi hizmetin bana uygun olduğunu öğrenmek istiyorum.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon /> Birlikte karar verelim
                  </a>
                </Button>
              </div>
            </div>
            <ul className="border-t border-brass/60">
              {guide.map((row) => (
                <li key={row.slug} className="border-b border-line">
                  <Link
                    href={`/hizmetler/${row.slug}`}
                    prefetch
                    className="group -mx-3 flex items-center gap-5 rounded-lg px-3 py-5 transition-colors hover:bg-paper sm:py-6"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-lg leading-snug font-semibold text-ink sm:text-xl">{row.need}</span>
                      <span className="mt-1 block text-[0.9375rem] font-semibold text-brand">{row.title}</span>
                    </span>
                    <ArrowRightIcon
                      aria-hidden="true"
                      className="size-5 shrink-0 text-brand transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
