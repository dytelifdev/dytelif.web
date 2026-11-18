import { ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container, Folio, Railed } from "@/components/herbarium/folio";
import { Ledger, LedgerEntry } from "@/components/herbarium/ledger";
import { MountedPhoto, SpecimenLabel } from "@/components/herbarium/specimen";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { JsonLd } from "@/components/json-ld";
import { SanityImage } from "@/components/sanity-image";
import { ClosingCta } from "@/components/site/closing-cta";
import { Partners } from "@/components/site/partners";
import { Button } from "@/components/ui/button";
import { getContact } from "@/lib/contact";
import { formatDate } from "@/lib/format";
import { HOME_GALLERY, PHOTOS } from "@/lib/photos";
import { PROCESS, PROFILE, SERVICE_AREAS } from "@/lib/profile";
import { SITE, WHATSAPP_GREETING, whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";
import { getAnnouncements, getGallery, getPosts, getServices, getSettings } from "@/sanity/fetch";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Staggered mounts for the gallery excerpt: varied scale and drop, one grammar.
const galleryMounts = [
  { aspect: 4 / 5, className: "col-span-7 sm:col-span-4", tapes: ["top-left", "top-right"] as const },
  { aspect: 1, className: "col-span-5 mt-16 sm:col-span-3 sm:mt-24", tapes: ["top"] as const },
  {
    aspect: 3 / 4,
    className: "col-span-6 col-start-4 -mt-6 sm:col-span-3 sm:col-start-auto sm:mt-6",
    tapes: ["top-right"] as const,
  },
  { aspect: 4 / 5, className: "hidden sm:col-span-2 sm:mt-32 sm:block", tapes: ["top"] as const },
];

export default async function HomePage() {
  const [settings, contact, services, posts, announcements, gallery] = await Promise.all([
    getSettings(),
    getContact(),
    getServices(),
    getPosts(),
    getAnnouncements(),
    getGallery(),
  ]);

  const headline = settings?.heroHeadline || SITE.headline;
  const intro = settings?.heroIntro || SITE.intro;
  const wa = whatsappHref(contact.whatsapp, WHATSAPP_GREETING);
  const featured = services.filter((s) => s.featured !== false).slice(0, 6);
  const journal = [
    ...posts.slice(0, 3).map((p) => ({ ...p, href: `/blog/${p.slug}`, kind: "Yazı", summary: p.excerpt })),
    ...announcements
      .slice(0, 2)
      .map((a) => ({ ...a, href: `/duyurular/${a.slug}`, kind: "Duyuru", summary: a.summary })),
  ].sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
  // CMS gallery first; the client's own photographs until it has entries.
  const excerpt =
    gallery.length > 0
      ? gallery.map((item) => ({ key: item._id, image: item.image, fallback: undefined }))
      : HOME_GALLERY.map((photo) => ({ key: photo.id, image: null, fallback: photo }));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: PROFILE.name,
          jobTitle: PROFILE.title,
          url: SITE.url,
          email: `mailto:${contact.email}`,
          alumniOf: { "@type": "CollegeOrUniversity", name: "Acıbadem Üniversitesi" },
          workLocation: {
            "@type": "Place",
            name: contact.address.venue,
            address: {
              "@type": "PostalAddress",
              streetAddress: contact.address.street,
              postalCode: contact.address.postalCode,
              addressLocality: contact.address.district,
              addressRegion: contact.address.city,
              addressCountry: "TR",
            },
            hasMap: contact.mapsUrl,
          },
          knowsLanguage: ["tr", "en"],
          sameAs: [contact.instagramUrl, contact.xUrl].filter(Boolean),
        }}
      />

      {/* Folder: the specimen sheet and the first action */}
      <Folio surface="folder" className="overflow-hidden">
        <Container className="pt-10 pb-16 sm:pt-14 lg:pt-16 lg:pb-24">
          <Railed
            asideClassName="flex flex-col gap-10 pb-14 lg:pt-6 lg:pb-4"
            aside={
              <>
                <div>
                  <h1 className="font-display text-display">{headline}</h1>
                  <p className="mt-6 max-w-md text-lg leading-relaxed text-on-surface-soft sm:text-xl">{intro}</p>
                </div>
                <div
                  data-wa-cta
                  className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap lg:flex-col lg:items-start xl:flex-row"
                >
                  <Button asChild size="lg">
                    <a href={wa} target="_blank" rel="noopener noreferrer">
                      <WhatsAppIcon /> WhatsApp&apos;tan yazın
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/randevu">Randevu talebi gönderin</Link>
                  </Button>
                </div>
              </>
            }
          >
            <div className="settle relative mx-auto max-w-md lg:mx-0 lg:max-w-none lg:pb-14">
              <MountedPhoto
                image={settings?.heroImage}
                fallback={PHOTOS.heroPortrait}
                aspect={4 / 5}
                eager
                sizes="(min-width: 1024px) 34rem, (min-width: 640px) 28rem, 92vw"
                className="lg:w-[min(34rem,70%)]"
              />
              <SpecimenLabel
                className="relative z-20 -mt-10 ml-auto w-[88%] px-4 pb-1 sm:w-80 lg:absolute lg:right-0 lg:bottom-0 lg:mt-0"
                title={SITE.name}
                rows={[
                  { term: "Unvan", value: PROFILE.title },
                  { term: "Eğitim", value: "Beslenme ve Diyetetik, Acıbadem Üniversitesi, 2025" },
                  { term: "Görüşme", value: `${contact.location}; yüz yüze ve online` },
                ]}
              />
            </div>
          </Railed>
        </Container>
      </Folio>

      {/* Paper: approach and the consultation sequence */}
      <Folio surface="paper">
        <Container className="py-20 lg:py-28">
          <Railed
            aside={
              <div className="flex flex-col gap-12 pb-12 lg:pb-0">
                <h2 className="font-display text-headline">Hazır liste değil, size ait bir düzen.</h2>
                <MountedPhoto
                  image={null}
                  fallback={PHOTOS.measurement}
                  aspect={4 / 5}
                  tapes={["top"]}
                  sizes="(min-width: 1024px) 20rem, 70vw"
                  className="w-[min(20rem,78%)]"
                />
              </div>
            }
          >
            <p className="max-w-2xl text-xl leading-relaxed">
              Beslenme planınız; yaşamınıza, alışkanlıklarınıza ve sağlık durumunuza göre kurulur. Her öneri bilimsel
              temele dayanır ve düzenli takiple birlikte güncellenir.
            </p>
            <dl className="mt-12 grid border-t-2 border-ink sm:grid-cols-2">
              {PROCESS.map((step, i) => (
                <div
                  key={step.term}
                  className={cn("border-b border-rule py-7", i % 2 === 0 ? "sm:pr-8" : "sm:border-l sm:pl-8")}
                >
                  <dt className="font-display text-2xl">{step.term}</dt>
                  <dd className="mt-2 text-ink-soft">{step.detail}</dd>
                </div>
              ))}
            </dl>
          </Railed>
        </Container>
      </Folio>

      {/* Olive: who she is, her facts mounted on a label that crosses the photo */}
      <Folio surface="olive">
        <Container className="py-20 lg:py-28">
          <Railed
            aside={
              <div className="relative mx-auto mb-14 max-w-sm lg:mx-0 lg:mb-0">
                <MountedPhoto
                  image={settings?.aboutImage}
                  fallback={PHOTOS.aboutPortrait}
                  aspect={3 / 4}
                  tapes={["top"]}
                  sizes="(min-width: 1024px) 24rem, 90vw"
                />
                <SpecimenLabel
                  className="relative z-10 -mt-10 ml-8 px-4 pb-1"
                  title="Mesleki bilgiler"
                  rows={[
                    { term: "Eğitim", value: "Acıbadem Üniversitesi, Beslenme ve Diyetetik" },
                    { term: "Klinik staj", value: "Acıbadem Hastaneleri, Gaziosmanpaşa EAH" },
                    { term: "Dil", value: PROFILE.languages.join(", ") },
                  ]}
                />
              </div>
            }
            mainClassName="flex flex-col justify-center"
          >
            <h2 className="font-display text-headline">{PROFILE.name}</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-surface-soft">{PROFILE.summary[0]}</p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-on-surface-soft">{PROFILE.summary[1]}</p>
            <Button asChild variant="outline" className="mt-10 self-start">
              <Link href="/hakkimda">
                Hakkımda <ArrowRightIcon />
              </Link>
            </Button>
          </Railed>
        </Container>
      </Folio>

      {/* Paper: services register */}
      <Folio surface="paper">
        <Container className="py-20 lg:py-28">
          <Railed
            aside={
              <div className="flex flex-col items-start gap-5 pb-10 lg:sticky lg:top-10 lg:pb-0">
                <h2 className="font-display text-headline">Hizmetler</h2>
                <p className="max-w-sm text-ink-soft">
                  Yüz yüze ve online görüşmeler, ön değerlendirme ve ölçümle başlar.
                </p>
                {featured.length > 0 ? (
                  <Button asChild variant="link">
                    <Link href="/hizmetler">Tüm hizmetler</Link>
                  </Button>
                ) : null}
              </div>
            }
          >
            {featured.length > 0 ? (
              <Ledger>
                {featured.map((service) => (
                  <LedgerEntry
                    key={service._id}
                    href={`/hizmetler/${service.slug}`}
                    title={service.title ?? ""}
                    summary={service.summary}
                  />
                ))}
              </Ledger>
            ) : (
              <>
                <ul className="border-t-2 border-ink">
                  {SERVICE_AREAS.map((area) => (
                    <li key={area.title} className="border-b border-rule py-7">
                      <h3 className="font-display text-2xl leading-tight sm:text-3xl">{area.title}</h3>
                      <p className="mt-3 max-w-2xl text-ink-soft">{area.summary}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-ink-soft">
                  Ayrıntılı hizmet sayfaları hazırlanıyor. Sorularınız için{" "}
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                    WhatsApp&apos;tan yazabilirsiniz
                  </a>
                  .
                </p>
              </>
            )}
          </Railed>
        </Container>
      </Folio>

      {/* Olive: partners pressed as stamps on a cream sheet (hidden until one is published) */}
      <Partners />

      {/* Folder: gallery excerpt */}
      <Folio surface="folder" className="overflow-hidden">
        <Container className="py-20 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-headline">Galeri</h2>
            <Button asChild variant="link">
              <Link href="/galeri">Tüm fotoğraflar</Link>
            </Button>
          </div>
          <div className="mt-14 grid grid-cols-12 items-start gap-4 sm:gap-6">
            {excerpt.slice(0, galleryMounts.length).map((item, i) => {
              const mount = galleryMounts[i];
              return (
                <figure key={item.key} className={mount.className}>
                  <MountedPhoto
                    image={item.image}
                    fallback={item.fallback}
                    aspect={mount.aspect}
                    tapes={[...mount.tapes]}
                    sizes="(min-width: 640px) 30vw, 55vw"
                  />
                </figure>
              );
            })}
          </div>
        </Container>
      </Folio>

      {/* Paper: latest writing and announcements */}
      {journal.length > 0 ? (
        <Folio surface="paper">
          <Container className="py-20 lg:py-28">
            <Railed
              aside={
                <div className="flex flex-col items-start gap-5 pb-10 lg:pb-0">
                  <h2 className="font-display text-headline">Yazılar ve duyurular</h2>
                  <Button asChild variant="link">
                    <Link href="/blog">Bütün yazılar</Link>
                  </Button>
                </div>
              }
            >
              <Ledger>
                {journal.map((entry) => (
                  <LedgerEntry
                    key={entry._id}
                    href={entry.href}
                    title={entry.title ?? ""}
                    summary={entry.summary}
                    meta={
                      <>
                        {entry.kind} ·{" "}
                        <time dateTime={entry.publishedAt ?? undefined}>{formatDate(entry.publishedAt)}</time>
                      </>
                    }
                    media={
                      "coverImage" in entry && entry.coverImage ? (
                        <SanityImage
                          image={entry.coverImage}
                          aspect={1}
                          sizes="7rem"
                          className="aspect-square w-full object-cover"
                        />
                      ) : undefined
                    }
                  />
                ))}
              </Ledger>
            </Railed>
          </Container>
        </Folio>
      ) : null}

      <ClosingCta />
    </>
  );
}
