import Image from "next/image";
import { InstagramIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
import { getContact } from "@/lib/contact";
import { GALLERY_PHOTOS } from "@/lib/photos";
import { instagramHandle } from "@/lib/site";
import { Container, Section } from "./section";
import { SocialLinks } from "./social-links";

const TILES = ["elif2", "elif6", "elif1", "elif8", "elif9", "elif3"].flatMap((id) =>
  GALLERY_PHOTOS.filter((photo) => photo.id === id),
);

/** Social accounts up front: her own photographs as a tile wall that opens Instagram. */
export async function InstagramBand() {
  const contact = await getContact();
  const handle = instagramHandle(contact.instagramUrl);
  const others = contact.socials.filter((s) => s.network !== "instagram");
  return (
    <Section tone="white" aria-labelledby="sosyal-medya" className="defer-render py-16 sm:py-20 lg:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <h2 id="sosyal-medya" className="text-headline font-bold">
            Instagram&apos;da takip edin
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Güncel paylaşımlar, duyurular ve danışmanlık günlerinden kareler{" "}
            <span className="font-semibold text-ink">{handle}</span> hesabında.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">
                <InstagramIcon /> Takip edin
              </a>
            </Button>
            {others.length > 0 ? <SocialLinks socials={others} /> : null}
          </div>
        </div>
        <a
          href={contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${handle} Instagram hesabını açın (yeni sekmede)`}
          className="group/wall grid grid-cols-3 gap-2 rounded-2xl sm:gap-3"
        >
          {TILES.map((photo) => (
            <span
              key={photo.id}
              className="group relative block aspect-square overflow-hidden rounded-xl bg-brand-soft"
            >
              <Image
                src={photo.src}
                alt=""
                sizes="(min-width: 1024px) 15rem, 31vw"
                className="size-full object-cover transition-transform duration-700 ease-out-expo motion-safe:group-hover:scale-105"
                style={{ objectPosition: photo.focus ?? "50% 30%" }}
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 grid place-items-center bg-brand/0 text-white opacity-0 transition-[background-color,opacity] duration-300 group-hover:bg-brand/55 group-hover:opacity-100"
              >
                <InstagramIcon className="size-8" />
              </span>
            </span>
          ))}
        </a>
      </Container>
    </Section>
  );
}
