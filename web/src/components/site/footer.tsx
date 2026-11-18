import { cacheLife } from "next/cache";
import Link from "next/link";
import { Monogram, Wordmark } from "@/components/brand/logo";
import { Container, Railed } from "@/components/herbarium/folio";
import { InstagramIcon, WhatsAppIcon, XIcon } from "@/components/icons/brand-icons";
import { getContact, telHref } from "@/lib/contact";
import { NAV, SITE, WHATSAPP_GREETING, whatsappHref } from "@/lib/site";
import { getAnnouncements } from "@/sanity/fetch";

async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

const linkClass =
  "inline-flex min-h-11 items-center gap-2.5 text-paper/90 underline-offset-4 hover:text-paper hover:underline";

export async function Footer() {
  const [contact, announcements, year] = await Promise.all([getContact(), getAnnouncements(), currentYear()]);
  const pages = NAV.filter((item) => item.href !== "/duyurular" || announcements.length > 0);

  return (
    <footer data-surface="olive" className="surface pb-24 sm:pb-10">
      <Container className="pt-16 lg:pt-20">
        <Railed
          aside={
            <div className="flex flex-col items-start gap-6 pb-12 lg:pb-0">
              <Monogram className="h-14 w-auto [--logo-accent:var(--color-bronze)]" />
              <Wordmark className="h-6" />
              <p className="max-w-xs text-sm leading-relaxed text-sage">
                Bilimsel temelli, sürdürülebilir ve kişiye özgü beslenme danışmanlığı. {contact.location} ve online.
              </p>
            </div>
          }
          mainClassName="grid gap-10 sm:grid-cols-[1fr_1.6fr_0.9fr]"
        >
          <div>
            <h2 className="mb-3 text-sm font-semibold text-sage">Sayfalar</h2>
            <ul>
              {pages.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/randevu" className={linkClass}>
                  Randevu talebi
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold text-sage">İletişim</h2>
            <ul>
              <li>
                <a
                  href={whatsappHref(contact.whatsapp, WHATSAPP_GREETING)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <WhatsAppIcon className="size-4" /> WhatsApp
                </a>
              </li>
              <li>
                <a href={telHref(contact.phoneDisplay)} className={`${linkClass} tabular`}>
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className={`${linkClass} [overflow-wrap:anywhere]`}>
                  {contact.email}
                </a>
              </li>
              <li className="flex min-h-11 items-center text-paper/90">{contact.location}</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold text-sage">Takip edin</h2>
            <ul>
              <li>
                <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <InstagramIcon className="size-4" /> Instagram
                </a>
              </li>
              {contact.xUrl ? (
                <li>
                  <a href={contact.xUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <XIcon className="size-3.5" /> X
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </Railed>
        <div className="mt-16 flex flex-col gap-3 border-t border-rule py-6 text-sm text-sage sm:flex-row sm:items-start sm:justify-between">
          <p className="tabular">
            © {year} {SITE.name}
          </p>
          <p className="max-w-md sm:text-right">
            Sitedeki yazılar genel bilgilendirme içindir; kişisel değerlendirme ve tıbbi tavsiyenin yerini tutmaz.
          </p>
        </div>
      </Container>
    </footer>
  );
}
