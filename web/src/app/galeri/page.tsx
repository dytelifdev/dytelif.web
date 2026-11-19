import type { Metadata } from "next";
import { GalleryGrid, type GalleryPhoto } from "@/components/gallery/gallery-grid";
import { InstagramIcon } from "@/components/icons/brand-icons";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { Container, Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { getContact } from "@/lib/contact";
import { GALLERY_PHOTOS } from "@/lib/photos";
import { getGallery } from "@/sanity/fetch";
import { hasImage, imageSource } from "@/sanity/image";

export const metadata: Metadata = {
  title: "Galeri",
  description:
    "Dyt. Elif Sude Özkan'ın danışmanlık, eğitim ve günlük hayatından fotoğraflar. Yüz yüze görüşmeler Nilüfer, Bursa'da.",
  alternates: { canonical: "/galeri" },
};

export default async function GalleryPage() {
  const [items, contact] = await Promise.all([getGallery(), getContact()]);
  // Resolve CDN URLs on the server so the client gets plain data, not the URL builder.
  const cmsPhotos: GalleryPhoto[] = items.flatMap((item) => {
    if (!hasImage(item.image)) return [];
    const { src, width, height } = imageSource(item.image);
    return [
      {
        id: item._id,
        src,
        cdn: true,
        width,
        height,
        alt: item.image.alt || item.caption || "Galeri fotoğrafı",
        lqip: item.image.asset.metadata?.lqip ?? undefined,
        caption: item.caption,
        category: item.category,
      },
    ];
  });
  // The client's own photographs until the editor adds gallery entries in Sanity.
  const photos: GalleryPhoto[] =
    cmsPhotos.length > 0
      ? cmsPhotos
      : GALLERY_PHOTOS.map(({ id, src, alt, caption, category }) => ({ id, src, cdn: false, alt, caption, category }));

  return (
    <>
      <PageHero
        title="Galeri"
        lead="Danışmanlıktan, eğitimden ve günlük hayattan kareler."
        crumbs={[{ href: "/galeri", label: "Galeri" }]}
      />
      <Section tone="page" aria-label="Fotoğraflar" className="py-16 sm:py-20 lg:py-24">
        <Container>
          {photos.length > 0 ? (
            <GalleryGrid photos={photos} />
          ) : (
            <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow-card">
              <p className="text-lg">Galeri yakında burada. Güncel kareler Instagram&apos;da.</p>
              <Button asChild className="mt-6">
                <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">
                  <InstagramIcon /> Instagram
                </a>
              </Button>
            </div>
          )}
        </Container>
      </Section>
      <CtaBand last />
    </>
  );
}
