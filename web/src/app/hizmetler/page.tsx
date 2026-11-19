import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/site/faq";
import { PageHero } from "@/components/site/page-hero";
import { Process } from "@/components/site/process";
import { Container, Section } from "@/components/site/section";
import { ServicesGrid } from "@/components/site/services-grid";
import { Button } from "@/components/ui/button";
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
      <PageHero
        title="Hizmetler"
        lead="Ölçümle başlar, size göre kurulur, takiple kalıcı olur. Nilüfer'de yüz yüze ya da Türkiye'nin her yerinden online."
        crumbs={[{ href: "/hizmetler", label: "Hizmetler" }]}
      >
        <Button asChild size="lg" variant="white">
          <Link href="/randevu">Randevu talebi gönderin</Link>
        </Button>
      </PageHero>
      <Section tone="page" aria-label="Hizmet listesi" className="py-16 sm:py-20 lg:py-24">
        <Container>
          <ServicesGrid services={services} headingLevel="h2" eagerFirst={3} />
        </Container>
      </Section>
      <Process />
      <Faq />
    </>
  );
}
