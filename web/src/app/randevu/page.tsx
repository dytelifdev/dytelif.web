import type { Metadata } from "next";
import { AppointmentForm } from "@/components/forms/appointment-form";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { Faq } from "@/components/site/faq";
import { PageHero } from "@/components/site/page-hero";
import { Container, Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
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
      <PageHero
        title="Randevu talebi"
        lead="Bu form bir talep formudur; gönderdiğinizde randevu henüz kesinleşmez. Size dönüp uygun zamanı birlikte belirlediğimizde kesinleşir."
        crumbs={[{ href: "/randevu", label: "Randevu talebi" }]}
      />
      <Section tone="page" aria-label="Randevu talep formu" className="py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-6 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]">
          <div className="rounded-2xl bg-white p-6 shadow-card sm:p-10">
            <h2 className="mb-8 text-2xl font-bold sm:text-3xl">Talep formu</h2>
            <AppointmentForm services={serviceTitles} />
          </div>
          <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl bg-white p-6 shadow-card sm:p-7">
              <h2 className="text-xl font-bold">Nasıl ilerler?</h2>
              <ol className="mt-5 grid gap-5">
                {STEPS.map((step, i) => (
                  <li key={step.term} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="tabular grid size-9 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-bold">{step.term}</h3>
                      <p className="mt-0.5 text-[0.9375rem] text-ink-soft">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div data-wa-cta className="rounded-2xl bg-cream p-6 sm:p-7">
              <h2 className="text-xl font-bold">Yazışmayı mı tercih edersiniz?</h2>
              <p className="mt-2 text-ink-soft">Form yerine WhatsApp&apos;tan da yazabilirsiniz.</p>
              <div className="mt-5 grid gap-3">
                <Button asChild>
                  <a href={whatsappHref(contact.whatsapp, WHATSAPP_GREETING)} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon /> WhatsApp&apos;tan yazın
                  </a>
                </Button>
                {contact.doktorTakvimiUrl ? (
                  <Button asChild variant="outline">
                    <a href={contact.doktorTakvimiUrl} target="_blank" rel="noopener noreferrer">
                      DoktorTakvimi üzerinden randevu
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>
          </aside>
        </Container>
      </Section>
      <Faq />
      <Toaster />
    </>
  );
}
