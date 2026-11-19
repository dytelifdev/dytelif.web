import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";
import { Lockup } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { getContact, telHref } from "@/lib/contact";
import { NAV } from "@/lib/site";
import { getAnnouncements, getServices } from "@/sanity/fetch";
import { HomeLink } from "./home-link";
import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-links";
import { Container } from "./section";
import { SocialLinks } from "./social-links";

const barLink =
  "inline-flex min-h-11 items-center gap-2 rounded-md px-2 text-white/90 transition-colors hover:bg-white/12 hover:text-white";

export async function Header() {
  const [announcements, contact, services] = await Promise.all([getAnnouncements(), getContact(), getServices()]);
  // An empty section never gets a navigation link.
  const items = NAV.filter((item) => item.href !== "/duyurular" || announcements.length > 0).map(({ href, label }) => ({
    href,
    label,
    children:
      href === "/hizmetler"
        ? services.flatMap((s) => (s.slug && s.title ? [{ href: `/hizmetler/${s.slug}`, label: s.title }] : []))
        : undefined,
  }));

  return (
    <>
      {/* Contact strip: social accounts left, how to reach her right. */}
      <div data-tone="dark" className="bg-brand text-sm">
        <Container className="flex h-11 items-center justify-between gap-4">
          <SocialLinks socials={contact.socials} variant="bare" className="-ml-3" />
          <ul className="flex items-center gap-1 sm:gap-3">
            <li className="hidden lg:block">
              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className={barLink}>
                <MapPinIcon aria-hidden="true" className="size-4" />
                {contact.location} · Online
              </a>
            </li>
            <li className="hidden md:block">
              <a href={`mailto:${contact.email}`} className={barLink}>
                <MailIcon aria-hidden="true" className="size-4" />
                {contact.email}
              </a>
            </li>
            <li>
              <a href={telHref(contact.phoneDisplay)} className={`${barLink} tabular -mr-2 font-semibold`}>
                <PhoneIcon aria-hidden="true" className="size-4" />
                {contact.phoneDisplay}
              </a>
            </li>
          </ul>
        </Container>
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-white">
        <Container className="flex h-18 items-center justify-between gap-6 xl:h-20">
          <HomeLink
            className="-my-2 shrink-0 rounded-md py-2 text-logo-green"
            aria-label="Dyt. Elif Sude Özkan, ana sayfa"
          >
            <Lockup label="" className="h-8 sm:h-9 xl:h-10" />
          </HomeLink>
          <NavLinks items={items} className="hidden xl:block" />
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/randevu">Randevu al</Link>
            </Button>
            <MobileNav items={items} contact={contact} />
          </div>
        </Container>
      </header>
    </>
  );
}
