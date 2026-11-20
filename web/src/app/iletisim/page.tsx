import { ArrowUpRightIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/forms/contact-form";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { Faq } from "@/components/site/faq";
import { MapEmbed } from "@/components/site/map-embed";
import { PageHero } from "@/components/site/page-hero";
import { Container, Section } from "@/components/site/section";
import { SocialLinks } from "@/components/site/social-links";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { getContact, telHref } from "@/lib/contact";
import { addressLines, instagramHandle, mapQuery, WHATSAPP_GREETING, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Dyt. Elif Sude Özkan ile iletişim: WhatsApp, telefon, e-posta ve iletişim formu. Nilüfer, Bursa'da yüz yüze, Türkiye'nin her yerinden online görüşme.",
  alternates: { canonical: "/iletisim" },
};

function ContactCard({
  icon,
  label,
  children,
  action,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  action: ReactNode;
}) {
  return (
    <li className="flex flex-col rounded-2xl bg-paper p-6 shadow-card sm:p-7">
      <span className="grid size-12 place-items-center rounded-full bg-brand-soft text-brand">{icon}</span>
      <h2 className="mt-5 text-sm font-semibold text-ink-soft">{label}</h2>
      <div className="mt-1 flex-1 font-semibold text-ink">{children}</div>
      <div className="mt-5">{action}</div>
    </li>
  );
}

export default async function ContactPage() {
  const contact = await getContact();
  const wa = whatsappHref(contact.whatsapp, WHATSAPP_GREETING);

  return (
    <>
      <PageHero
        title="İletişim"
        lead="WhatsApp'tan yazabilir, arayabilir ya da formu doldurabilirsiniz. Yüz yüze görüşmeler Nilüfer'de; online görüşmeler Türkiye'nin her yerinden."
        crumbs={[{ href: "/iletisim", label: "İletişim" }]}
      />

      <Section tone="sand" aria-label="İletişim kanalları" className="py-16 sm:py-20 lg:py-24">
        <Container>
          <ul data-wa-cta className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <ContactCard
              icon={<WhatsAppIcon className="size-5" />}
              label="WhatsApp"
              action={
                <Button asChild size="sm" className="w-full">
                  <a href={wa} target="_blank" rel="noopener noreferrer">
                    Mesaj yazın
                  </a>
                </Button>
              }
            >
              Hızlıca yazışmak için
            </ContactCard>
            <ContactCard
              icon={<PhoneIcon aria-hidden="true" className="size-5" />}
              label="Telefon"
              action={
                <Button asChild size="sm" variant="outline" className="w-full">
                  <a href={telHref(contact.phoneDisplay)}>Arayın</a>
                </Button>
              }
            >
              <span className="tabular">{contact.phoneDisplay}</span>
            </ContactCard>
            <ContactCard
              icon={<MailIcon aria-hidden="true" className="size-5" />}
              label="E-posta"
              action={
                <Button asChild size="sm" variant="outline" className="w-full">
                  <a href={`mailto:${contact.email}`}>E-posta gönderin</a>
                </Button>
              }
            >
              <span className="wrap-anywhere">{contact.email}</span>
            </ContactCard>
            <ContactCard
              icon={<MapPinIcon aria-hidden="true" className="size-5" />}
              label="Adres"
              action={
                <Button asChild size="sm" variant="outline" className="w-full">
                  <a href="#harita">Haritada görün</a>
                </Button>
              }
            >
              <address className="not-italic">
                {addressLines(contact.address).map((line) => (
                  <span key={line} className="block font-semibold">
                    {line}
                  </span>
                ))}
              </address>
            </ContactCard>
          </ul>

          <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]">
            <div className="rounded-2xl bg-paper p-6 shadow-card sm:p-10">
              <h2 className="text-2xl font-bold sm:text-3xl">Mesaj gönderin</h2>
              <p className="mt-2 mb-8 text-ink-soft">
                Mesajınız e-postayla bana ulaşır; seçtiğiniz kanaldan dönüş yaparım.
              </p>
              <ContactForm />
            </div>
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl bg-brand p-6 text-white sm:p-7" data-tone="dark">
                <h2 className="text-xl font-bold">Sosyal medya</h2>
                <p className="mt-2 text-white/80">
                  Güncel paylaşımlar{" "}
                  <span className="font-semibold text-white">{instagramHandle(contact.instagramUrl)}</span> hesabında.
                </p>
                <SocialLinks socials={contact.socials} variant="circle-dark" className="mt-5" />
              </div>
            </aside>
          </div>

          <div
            id="harita"
            className="mt-6 grid scroll-mt-24 gap-8 rounded-2xl bg-paper p-6 shadow-card sm:p-10 lg:mt-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:items-center lg:gap-12"
          >
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Görüşme adresi</h2>
              <address className="mt-4 text-lg leading-relaxed not-italic">
                {addressLines(contact.address).map((line, i) => (
                  <span key={line} className={i === 0 ? "block font-semibold text-ink" : "block text-ink-soft"}>
                    {line}
                  </span>
                ))}
              </address>
              <p className="mt-4 text-ink-soft">Online görüşmeler Türkiye&apos;nin her yerinden, görüntülü.</p>
              <Button asChild variant="outline" className="mt-6">
                <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer">
                  Yol tarifi alın <ArrowUpRightIcon />
                  <span className="sr-only"> (Google Haritalar, yeni sekmede)</span>
                </a>
              </Button>
            </div>
            <MapEmbed query={mapQuery(contact.address)} label={contact.address.venue} />
          </div>
        </Container>
      </Section>
      <Faq ask={false} />
      {/* Toasts only where a form or share action can raise one. */}
      <Toaster />
    </>
  );
}
