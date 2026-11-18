import Link from "next/link";
import { Container, Folio, Railed } from "@/components/herbarium/folio";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
import { getContact } from "@/lib/contact";
import { WHATSAPP_GREETING, whatsappHref } from "@/lib/site";

/** The page's real close: one clear next step, the same on every page. */
export async function ClosingCta({ title = "İlk adım kısa bir mesaj." }: { title?: string }) {
  const contact = await getContact();
  return (
    <Folio surface="folder">
      <Container className="py-20 lg:py-28">
        <Railed aside={<h2 className="pb-8 font-display text-headline lg:pb-0">{title}</h2>}>
          <p className="max-w-2xl text-lg leading-relaxed text-on-surface-soft sm:text-xl">
            WhatsApp&apos;tan yazabilir ya da randevu talebi gönderebilirsiniz. Talebiniz bana e-postayla ulaşır; uygun
            zamanı birlikte belirledikten sonra randevunuz kesinleşir.
          </p>
          <div data-wa-cta className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button asChild size="lg">
              <a href={whatsappHref(contact.whatsapp, WHATSAPP_GREETING)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> WhatsApp&apos;tan yazın
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/randevu">Randevu talebi gönderin</Link>
            </Button>
            <Button asChild variant="link" className="sm:ml-4">
              <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">
                <InstagramIcon /> Instagram&apos;da takip edin
              </a>
            </Button>
          </div>
        </Railed>
      </Container>
    </Folio>
  );
}
