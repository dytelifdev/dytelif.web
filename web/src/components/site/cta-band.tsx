import Image from "next/image";
import Link from "next/link";
import { Lockup } from "@/components/brand/logo";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
import { getContact } from "@/lib/contact";
import { PHOTOS } from "@/lib/photos";
import { WHATSAPP_GREETING, whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The brand's invitation: her own photograph in her practice, edge to edge, beside a
 * deep green panel signed with the logo. `last` adds white room below when the band
 * closes a page, so the footer's contact box never touches it.
 */
export async function CtaBand({
  title = "Beslenmeniz, sizin kadar özel olmalı.",
  lead = "İlk görüşmede sizi dinliyor, ölçümlerinizi alıyor ve size özel planın ilk adımını birlikte atıyoruz.",
  last,
}: {
  title?: string;
  lead?: string;
  last?: boolean;
}) {
  const contact = await getContact();
  const photo = PHOTOS.studio;
  return (
    <div className={cn("defer-render", last && "bg-white pb-16 sm:pb-20")}>
      <section
        data-tone="dark"
        aria-labelledby="davet"
        className="grid bg-brand-dark text-white lg:min-h-144 lg:grid-cols-2"
      >
        <div className="relative aspect-4/3 overflow-hidden sm:aspect-video lg:aspect-auto">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            style={{ objectPosition: photo.focus }}
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-16 lg:py-20 xl:px-24">
          <Lockup label="" className="h-9 w-auto self-start text-cream sm:h-10" />
          <h2 id="davet" className="mt-10 max-w-xl text-headline font-bold text-cream">
            {title}
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/80">{lead}</p>
          <div data-wa-cta className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="cream">
              <Link href="/randevu">Randevu talebi gönderin</Link>
            </Button>
            <Button asChild size="lg" variant="outline-light">
              <a href={whatsappHref(contact.whatsapp, WHATSAPP_GREETING)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> WhatsApp&apos;tan yazın
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
