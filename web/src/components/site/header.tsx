import Link from "next/link";
import { Wordmark } from "@/components/brand/logo";
import { Container } from "@/components/herbarium/folio";
import { Button } from "@/components/ui/button";
import { getContact } from "@/lib/contact";
import { NAV } from "@/lib/site";
import { getAnnouncements } from "@/sanity/fetch";
import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-links";

export async function Header() {
  const [announcements, contact] = await Promise.all([getAnnouncements(), getContact()]);
  // An empty section never gets a navigation link.
  const items = NAV.filter((item) => item.href !== "/duyurular" || announcements.length > 0).map(({ href, label }) => ({
    href,
    label,
  }));

  return (
    <header data-surface="folder" className="surface">
      <Container className="flex h-18 items-center justify-between gap-6 border-b border-rule lg:h-20">
        <Link href="/" className="-my-2 py-2" aria-label="Dyt. Elif Sude Özkan, ana sayfa">
          <Wordmark className="h-5 sm:h-6 xl:h-7" />
        </Link>
        <NavLinks items={items} className="hidden lg:block" />
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/randevu">Randevu talebi</Link>
          </Button>
          <MobileNav items={items} whatsapp={contact.whatsapp} />
        </div>
      </Container>
    </header>
  );
}
