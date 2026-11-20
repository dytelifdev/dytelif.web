import { cacheLife } from "next/cache";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";
import { Lockup, Monogram } from "@/components/brand/logo";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
import { getContact, telHref } from "@/lib/contact";
import { addressLines, LEGAL, NAV, SITE, WHATSAPP_GREETING, whatsappHref } from "@/lib/site";
import { getAnnouncements, getServices } from "@/sanity/fetch";
import { Container } from "./section";
import { SocialLinks } from "./social-links";

async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

const linkClass = "inline-flex min-h-11 items-center gap-2.5 text-white/75 transition-colors hover:text-white";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 text-base font-bold text-white">{title}</h2>
      <ul>{children}</ul>
    </div>
  );
}

export async function Footer() {
  const [contact, announcements, services, year] = await Promise.all([
    getContact(),
    getAnnouncements(),
    getServices(),
    currentYear(),
  ]);
  const pages = NAV.filter((item) => item.href !== "/duyurular" || announcements.length > 0);
  const wa = whatsappHref(contact.whatsapp, WHATSAPP_GREETING);

  return (
    <footer data-tone="dark" className="text-white">
      {/* The contact box sits across the seam between the page and the night-green footer. One
          gradient paints both halves, and the green below starts a pixel higher underneath it:
          two green boxes meeting on a fractional pixel left a light hairline on phones. */}
      <div className="relative z-10 bg-[linear-gradient(to_bottom,var(--color-ivory)_50%,var(--color-deep)_50%)]">
        <Container>
          <div className="flex flex-col gap-6 rounded-2xl bg-brand px-6 py-8 sm:px-10 md:flex-row md:items-center md:justify-between lg:px-14 lg:py-10">
            <div>
              <p className="text-2xl font-bold text-cream sm:text-3xl">İlk adımı birlikte atalım.</p>
              <p className="mt-2 text-white/80">
                Bir mesaj ya da kısa bir telefon yeterli; gerisini birlikte planlayalım.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="cream">
                <a href={wa} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> WhatsApp&apos;tan yazın
                </a>
              </Button>
              <Button asChild size="lg" variant="outline-light">
                <a href={telHref(contact.phoneDisplay)}>
                  <PhoneIcon /> Hemen arayın
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <div className="relative -mt-px overflow-hidden bg-deep pb-28 sm:pb-12">
        {/* Her ES mark as a faint watermark, bottom right. */}
        <Monogram
          label=""
          className="pointer-events-none absolute -right-16 -bottom-24 h-[26rem] w-auto text-cream opacity-[0.045] sm:-right-10 lg:h-[34rem]"
        />
        <Container className="relative pt-14 lg:pt-16">
          <div className="flex flex-col gap-8 border-b border-white/12 pb-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <Lockup className="h-10 max-w-full text-white sm:h-11" />
              <p className="mt-6 text-xl font-semibold text-cream sm:text-2xl">Bilimle planlanır, size göre yaşanır.</p>
              <p className="mt-2 text-white/65">
                Kişiye özel beslenme danışmanlığı; Nilüfer&apos;de yüz yüze, Türkiye&apos;nin dört bir yanından online.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <p className="font-semibold">Beni sosyal medyada takip edin</p>
              <SocialLinks socials={contact.socials} variant="circle-dark" />
            </div>
          </div>

          <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
            <Column title="Sayfalar">
              <li>
                <Link href="/" className={linkClass}>
                  Ana sayfa
                </Link>
              </li>
              {pages
                // Hakkımda and İletişim live under "Kurumsal".
                .filter((item) => item.href !== "/iletisim" && item.href !== "/hakkimda")
                .map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
            </Column>
            <Column title="Hizmetler">
              {services.map((service) => (
                <li key={service._id}>
                  <Link href={`/hizmetler/${service.slug}`} prefetch className={linkClass}>
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/randevu" className={linkClass}>
                  Randevu talebi
                </Link>
              </li>
            </Column>
            <Column title="Kurumsal">
              <li>
                <Link href="/hakkimda" className={linkClass}>
                  Hakkımda
                </Link>
              </li>
              {LEGAL.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/iletisim" className={linkClass}>
                  İletişim
                </Link>
              </li>
            </Column>
            <Column title="İletişim">
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <WhatsAppIcon className="size-4 shrink-0" /> WhatsApp
                </a>
              </li>
              <li>
                <a href={telHref(contact.phoneDisplay)} className={`${linkClass} tabular`}>
                  <PhoneIcon aria-hidden="true" className="size-4 shrink-0" /> {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className={`${linkClass} wrap-anywhere`}>
                  <MailIcon aria-hidden="true" className="size-4 shrink-0" /> {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} items-start py-2.5`}
                >
                  <MapPinIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                  <address className="not-italic">
                    {addressLines(contact.address).map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </a>
              </li>
            </Column>
          </div>

          <div className="flex flex-col gap-2 border-t border-white/12 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
            <p className="tabular">
              © {year} {SITE.name}. Tüm hakları saklıdır.
            </p>
            <p>Diyetisyen · {contact.location}</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
