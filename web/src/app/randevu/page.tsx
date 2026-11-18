import type { Metadata } from "next";
import { AppointmentForm } from "@/components/forms/appointment-form";
import { Container, Folio, Railed } from "@/components/herbarium/folio";
import { PageIntro } from "@/components/herbarium/page-intro";
import { SpecimenSheet } from "@/components/herbarium/specimen";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
import { getContact } from "@/lib/contact";
import { WHATSAPP_GREETING, whatsappHref } from "@/lib/site";
import { getServices } from "@/sanity/fetch";

export const metadata: Metadata = {
  title: "Randevu talebi",
  description:
    "Yüz yüze (Nilüfer, Bursa) ya da online beslenme danışmanlığı için randevu talebi gönderin; size dönüş yapılarak uygun zaman birlikte belirlenir.",
  alternates: { canonical: "/randevu" },
};

const STEPS = [
  { term: "Talep", detail: "Formu gönderirsiniz; bilgileriniz e-postayla bana ulaşır." },
  { term: "Dönüş", detail: "Seçtiğiniz kanaldan size dönüş yaparım." },
  { term: "Zaman", detail: "Görüşme gününü ve saatini birlikte belirleriz." },
  { term: "Görüşme", detail: "Ön görüşme, ölçüm ve değerlendirmeyle başlarız." },
];

export default async function AppointmentPage() {
  const [services, contact] = await Promise.all([getServices(), getContact()]);
  const serviceTitles = services.flatMap((s) => (s.title ? [s.title] : []));

  return (
    <>
      <PageIntro
        title="Randevu talebi"
        lead="Bu form bir talep formudur: gönderdiğinizde randevu henüz kesinleşmez. Size dönüş yapıp uygun zamanı birlikte belirlediğimizde kesinleşir."
      />
      <Folio surface="paper">
        <Container className="py-16 lg:py-24">
          <Railed
            aside={
              <div className="mb-14 flex flex-col gap-8 lg:mb-0">
                <dl className="border-t-2 border-ink">
                  {STEPS.map((step) => (
                    <div key={step.term} className="border-b border-rule py-4">
                      <dt className="font-display text-xl">{step.term}</dt>
                      <dd className="mt-1 text-ink-soft">{step.detail}</dd>
                    </div>
                  ))}
                </dl>
                <div data-wa-cta className="flex flex-col items-start gap-3">
                  <p className="text-ink-soft">Form yerine yazışmayı tercih ederseniz:</p>
                  <Button asChild variant="outline">
                    <a
                      href={whatsappHref(contact.whatsapp, WHATSAPP_GREETING)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsAppIcon /> WhatsApp&apos;tan yazın
                    </a>
                  </Button>
                  {contact.doktorTakvimiUrl ? (
                    <Button asChild variant="link">
                      <a href={contact.doktorTakvimiUrl} target="_blank" rel="noopener noreferrer">
                        DoktorTakvimi üzerinden randevu
                      </a>
                    </Button>
                  ) : null}
                </div>
              </div>
            }
          >
            <SpecimenSheet className="p-5 sm:p-8 lg:p-10">
              <h2 className="mb-8 font-display text-3xl sm:text-4xl">Talep formu</h2>
              <AppointmentForm services={serviceTitles} />
            </SpecimenSheet>
          </Railed>
        </Container>
      </Folio>
    </>
  );
}
