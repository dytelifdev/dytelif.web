import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { Container, Folio, Railed } from "@/components/herbarium/folio";
import { PageIntro } from "@/components/herbarium/page-intro";
import { SpecimenSheet } from "@/components/herbarium/specimen";
import { InstagramIcon, WhatsAppIcon, XIcon } from "@/components/icons/brand-icons";
import { PortableText } from "@/components/portable-text";
import { getContact, telHref } from "@/lib/contact";
import { SITE, WHATSAPP_GREETING, whatsappHref } from "@/lib/site";
import { getSettings } from "@/sanity/fetch";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Dyt. Elif Sude Özkan ile iletişim: WhatsApp, telefon, e-posta ve iletişim formu. Nilüfer, Bursa'da yüz yüze, Türkiye'nin her yerinden online görüşme.",
  alternates: { canonical: "/iletisim" },
};

export default async function ContactPage() {
  const [contact, settings] = await Promise.all([getContact(), getSettings()]);
  const linkClass =
    "inline-flex min-h-11 max-w-full items-center gap-2 underline decoration-ink/30 underline-offset-4 [overflow-wrap:anywhere] hover:decoration-ink";

  const rows = [
    {
      term: "WhatsApp",
      value: (
        <a
          href={whatsappHref(contact.whatsapp, WHATSAPP_GREETING)}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          <WhatsAppIcon className="size-4 shrink-0" /> Mesaj yazın
        </a>
      ),
    },
    {
      term: "Telefon",
      value: (
        <a href={telHref(contact.phoneDisplay)} className={`tabular ${linkClass}`}>
          {contact.phoneDisplay}
        </a>
      ),
    },
    {
      term: "E-posta",
      value: (
        <a href={`mailto:${contact.email}`} className={linkClass}>
          {contact.email}
        </a>
      ),
    },
    {
      term: "Instagram",
      value: (
        <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <InstagramIcon className="size-4 shrink-0" /> @bursadiyetisyenelifsudeozkan
        </a>
      ),
    },
    ...(contact.xUrl
      ? [
          {
            term: "X",
            value: (
              <a href={contact.xUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <XIcon className="size-3.5" /> Profili açın
              </a>
            ),
          },
        ]
      : []),
    { term: "Görüşme", value: `${contact.location}; yüz yüze ve online` },
    ...(contact.doktorTakvimiUrl
      ? [
          {
            term: "DoktorTakvimi",
            value: (
              <a href={contact.doktorTakvimiUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Profilden randevu
              </a>
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      <PageIntro
        title="İletişim"
        lead="Sorularınız için WhatsApp'tan yazabilir, arayabilir ya da formu doldurabilirsiniz. Yüz yüze görüşmeler Nilüfer'de; online görüşmeler Türkiye'nin her yerinden."
      />
      <Folio surface="paper">
        <Container className="py-16 lg:py-24">
          <Railed
            aside={
              <dl data-wa-cta className="mb-14 border-t-2 border-ink lg:mb-0">
                {rows.map((row) => (
                  <div
                    key={row.term}
                    className="grid gap-x-4 border-b border-rule py-3 sm:grid-cols-[7.5rem_1fr] sm:py-4"
                  >
                    <dt className="text-sm text-ink-soft sm:text-base">{row.term}</dt>
                    <dd className="min-w-0">{row.value}</dd>
                  </div>
                ))}
              </dl>
            }
          >
            <SpecimenSheet className="p-5 sm:p-8 lg:p-10">
              <h2 className="mb-8 font-display text-3xl sm:text-4xl">Mesaj gönderin</h2>
              <ContactForm />
            </SpecimenSheet>
          </Railed>
        </Container>
      </Folio>
      <Folio surface="paper" id="kisisel-veriler" className="scroll-mt-6 border-t border-rule">
        <Container className="py-16 lg:py-20">
          <Railed aside={<h2 className="pb-6 font-display text-3xl lg:pb-0">Kişisel verileriniz</h2>}>
            <div className="prose-folio">
              {settings?.privacyNotice?.length ? (
                <PortableText value={settings.privacyNotice} />
              ) : (
                <>
                  <p>
                    Formlarda paylaştığınız ad, iletişim bilgisi ve mesaj; yalnızca talebinize dönüş yapılması amacıyla
                    e-postayla {SITE.name}&apos;a iletilir. Bu site form içeriklerini bir veritabanında saklamaz.
                  </p>
                  <p className="mt-4">
                    Ziyaret istatistikleri çerez kullanmayan ve kişisel bilgi toplamayan Vercel Web Analytics ile
                    ölçülür. Formlardaki otomatik gönderim koruması Cloudflare Turnstile ile sağlanır.
                  </p>
                  <p className="mt-4">
                    Verilerinizle ilgili talepleriniz için{" "}
                    <a href={`mailto:${contact.email}`} className="[overflow-wrap:anywhere]">
                      {contact.email}
                    </a>{" "}
                    adresine yazabilirsiniz.
                  </p>
                </>
              )}
            </div>
          </Railed>
        </Container>
      </Folio>
    </>
  );
}
