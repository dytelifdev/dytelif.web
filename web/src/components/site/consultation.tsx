import { ArrowRightIcon, CheckIcon, MapPinIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { getContact } from "@/lib/contact";
import { PHOTOS } from "@/lib/photos";
import type { LocalImage } from "./photo";
import { Photo } from "./photo";
import { Container, Section, SectionHeader } from "./section";
import { serviceVisual } from "@/lib/visuals";

function Mode({
  icon,
  title,
  lead,
  points,
  photo,
  action,
}: {
  icon: ReactNode;
  title: string;
  lead: string;
  points: string[];
  photo: LocalImage;
  action: ReactNode;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-card">
      <Photo fallback={photo} aspect={16 / 10} sizes="(min-width: 1024px) 38rem, 92vw" className="rounded-none" />
      <div className="flex flex-1 flex-col p-7 sm:p-9">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-full bg-brand-soft text-brand">{icon}</span>
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{lead}</p>
        <ul className="mt-6 grid gap-3">
          {points.map((point) => (
            <li key={point} className="flex gap-3">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand text-white">
                <CheckIcon aria-hidden="true" className="size-3.5" strokeWidth={3} />
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-8">{action}</div>
      </div>
    </article>
  );
}

/** The two ways to consult, side by side: the same care, in the room or on screen. */
export async function Consultation() {
  const contact = await getContact();
  return (
    <Section tone="white" aria-labelledby="danismanlik" className="defer-render py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeader
          id="danismanlik"
          title="Size uyan danışmanlık"
          lead="Yüz yüze ya da online; ölçümden takibe kadar aynı özen, aynı süreç."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <Mode
            icon={<MapPinIcon aria-hidden="true" className="size-5" />}
            title="Yüz yüze danışmanlık"
            lead={`${contact.address.venue}, ${contact.address.district}. Birebir görüşmede sizi tanıyor, ölçümlerinizi alıyor ve planı birlikte kuruyoruz.`}
            points={[
              "Boy, kilo ve çevre ölçümleri görüşmede alınır",
              "Tahlil ve vücut analizi sonuçlarınızı birlikte yorumlarız",
              "Takip görüşmeleri aynı adreste devam eder",
            ]}
            photo={PHOTOS.consult}
            action={
              <Button asChild size="lg">
                <Link href="/randevu">
                  Randevu talebi gönderin <ArrowRightIcon />
                </Link>
              </Button>
            }
          />
          <Mode
            icon={<VideoIcon aria-hidden="true" className="size-5" />}
            title="Online danışmanlık"
            lead="Türkiye'nin her yerinden, görüntülü görüşmeyle. Mesafe ya da yoğun bir tempo, düzenli takibin önüne geçmesin."
            points={[
              "Bilgisayarınız ya da telefonunuz yeterli",
              "Yüz yüze görüşmelerle aynı değerlendirme ve takip",
              "Görüşme gününü ve saatini birlikte belirleriz",
            ]}
            photo={serviceVisual("online-beslenme-danismanligi")}
            action={
              <Button asChild size="lg" variant="outline">
                <Link href="/hizmetler/online-beslenme-danismanligi" prefetch>
                  Online danışmanlık <ArrowRightIcon />
                </Link>
              </Button>
            }
          />
        </div>
      </Container>
    </Section>
  );
}
