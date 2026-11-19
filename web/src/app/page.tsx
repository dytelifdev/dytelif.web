import { ArrowRightIcon, CalendarCheckIcon, CheckIcon, MapPinIcon, VideoIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons/brand-icons";
import { JsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/site/cta-band";
import { Faq } from "@/components/site/faq";
import { InstagramBand } from "@/components/site/instagram-band";
import { Partners } from "@/components/site/partners";
import { Photo } from "@/components/site/photo";
import { PostCard, type PostCardItem } from "@/components/site/post-card";
import { Consultation } from "@/components/site/consultation";
import { Process } from "@/components/site/process";
import { Container, Section, SectionHeader } from "@/components/site/section";
import { ServicesGrid } from "@/components/site/services-grid";
import { Testimonials } from "@/components/site/testimonials";
import { Button } from "@/components/ui/button";
import { getContact } from "@/lib/contact";
import { PHOTOS } from "@/lib/photos";
import { PROFILE } from "@/lib/profile";
import { instagramHandle, SITE, WHATSAPP_GREETING, whatsappHref } from "@/lib/site";
import { getAnnouncements, getPosts, getServices, getSettings } from "@/sanity/fetch";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const FACTS = [
  "Hazır liste yok: program yalnızca size göre hazırlanır",
  "Ölçüm, tahlil ve vücut analiziyle başlayan değerlendirme",
  "Her görüşmede birlikte güncellenen plan",
  "Yetişkin, anne ve çocuk, gebelik ve ileri yaş dönemleri için ayrı yaklaşım",
];

export default async function HomePage() {
  const [settings, contact, services, posts, announcements] = await Promise.all([
    getSettings(),
    getContact(),
    getServices(),
    getPosts(),
    getAnnouncements(),
  ]);

  const headline = settings?.heroHeadline || SITE.headline;
  const intro = settings?.heroIntro || SITE.intro;
  const wa = whatsappHref(contact.whatsapp, WHATSAPP_GREETING);
  const featured = services.filter((s) => s.featured !== false).slice(0, 9);
  const online = services.find((s) => s.slug === "online-beslenme-danismanligi");
  const journal: PostCardItem[] = [
    ...posts.slice(0, 3).map((p) => ({
      _id: p._id,
      href: `/blog/${p.slug}`,
      title: p.title,
      summary: p.excerpt,
      publishedAt: p.publishedAt,
      image: p.coverImage,
      kind: "Blog",
    })),
    ...announcements.slice(0, 3).map((a) => ({
      _id: a._id,
      href: `/duyurular/${a.slug}`,
      title: a.title,
      summary: a.summary,
      publishedAt: a.publishedAt,
      image: a.image,
      kind: "Duyuru",
    })),
  ]
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
    .slice(0, 3);

  const quick = [
    {
      icon: MapPinIcon,
      title: "Yüz yüze görüşme",
      text: `${contact.address.venue}, ${contact.address.district}`,
      href: contact.mapsUrl,
      external: true,
    },
    {
      icon: VideoIcon,
      title: "Online görüşme",
      text: "Türkiye'nin her yerinden görüntülü",
      href: online ? `/hizmetler/${online.slug}` : "/iletisim",
      external: false,
    },
    {
      icon: CalendarCheckIcon,
      title: "Randevu talebi",
      text: "Formu doldurun, size dönüş yapayım",
      href: "/randevu",
      external: false,
    },
  ];

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
          telephone: contact.phoneDisplay.replace(/\s/g, ""),
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
          sameAs: contact.socials.flatMap((s) => (s.url ? [s.url] : [])),
        }}
      />

      {/* Hero: who she is and the two ways to reach her, beside her portrait. */}
      <section className="bg-cream">
        <Container className="grid items-center gap-10 pt-10 pb-24 sm:pt-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 lg:pt-16 lg:pb-32">
          <div>
            <h1 className="text-display font-extrabold text-ink">{headline}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">{intro}</p>
            <div data-wa-cta className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href={wa} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> WhatsApp&apos;tan yazın
                </a>
              </Button>
              <Button asChild size="lg" variant="white">
                <Link href="/randevu">Randevu talebi gönderin</Link>
              </Button>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-white py-1.5 pr-4 pl-1.5 font-semibold text-ink transition-colors hover:text-brand"
              >
                <span className="grid size-8 place-items-center rounded-full bg-brand text-white">
                  <InstagramIcon className="size-4" />
                </span>
                {instagramHandle(contact.instagramUrl)}
                <span className="sr-only"> Instagram hesabı (yeni sekmede açılır)</span>
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <Photo
              image={settings?.heroImage}
              fallback={PHOTOS.heroPortrait}
              aspect={4 / 5}
              eager
              sizes="(min-width: 1024px) 30rem, (min-width: 640px) 28rem, 92vw"
              className="rounded-[1.75rem]"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white p-4 shadow-lift sm:inset-x-auto sm:left-5 sm:max-w-76 sm:p-5">
              <p className="font-bold text-ink">{SITE.name}</p>
              <p className="mt-1 text-sm leading-snug text-ink-soft">Diyetisyen · Kişiye özel beslenme danışmanlığı</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Three ways in, overlapping the hero's lower edge. */}
      <Section tone="white" className="pb-16 sm:pb-20 lg:pb-28">
        <Container className="relative -mt-14 lg:-mt-16">
          <ul className="grid gap-2 rounded-2xl bg-white p-2 shadow-lift sm:grid-cols-3">
            {quick.map(({ icon: Icon, title, text, href, external }) => {
              const content = (
                <>
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-bold text-ink">{title}</span>
                    <span className="block text-sm text-ink-soft">{text}</span>
                  </span>
                </>
              );
              const cls = "group flex h-full items-center gap-4 rounded-xl p-4 transition-colors hover:bg-page sm:p-5";
              return (
                <li key={title}>
                  {external ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                      {content}
                    </a>
                  ) : (
                    <Link href={href} className={cls}>
                      {content}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* About */}
          <div className="mt-16 grid items-center gap-10 sm:mt-20 lg:mt-28 lg:grid-cols-2 lg:gap-16">
            <Photo
              image={settings?.aboutImage}
              fallback={PHOTOS.aboutPortrait}
              aspect={4 / 5}
              sizes="(min-width: 1024px) 36rem, 92vw"
              className="mx-auto w-full max-w-md lg:max-w-none"
            />
            <div>
              <h2 className="text-headline font-bold">Merhaba, ben {PROFILE.name}</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                Her danışanımın hayatı, alışkanlıkları ve hedefi farklı. Bu yüzden hazır listelerle değil; sizi
                dinleyerek, ölçerek ve sizinle birlikte kurduğumuz bir düzenle çalışıyorum.
              </p>
              <ul className="mt-8 grid gap-3.5">
                {FACTS.map((fact) => (
                  <li key={fact} className="flex gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand text-white">
                      <CheckIcon aria-hidden="true" className="size-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-ink">{fact}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" variant="outline" className="mt-10">
                <Link href="/hakkimda">
                  Hakkımda <ArrowRightIcon />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
      <Section tone="page" aria-labelledby="hizmetler" className="defer-render py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeader
            id="hizmetler"
            title="Hizmetler"
            lead="Ölçümle başlar, size göre kurulur, takiple kalıcı olur."
            action={
              featured.length > 0 ? (
                <Button asChild variant="outline">
                  <Link href="/hizmetler">
                    Tüm hizmetler <ArrowRightIcon />
                  </Link>
                </Button>
              ) : undefined
            }
          />
          <ServicesGrid services={featured} />
        </Container>
      </Section>
      <Consultation />
      <Process />
      <Partners />
      <Testimonials />
      <CtaBand />
      <InstagramBand />
      {journal.length > 0 ? (
        <Section tone="page" aria-labelledby="yazilar" className="defer-render py-16 sm:py-20 lg:py-24">
          <Container>
            <SectionHeader
              id="yazilar"
              title={posts.length > 0 ? "Blog ve duyurular" : "Duyurular"}
              action={
                <Button asChild variant="outline">
                  <Link href={posts.length > 0 ? "/blog" : "/duyurular"}>
                    Tümünü görün <ArrowRightIcon />
                  </Link>
                </Button>
              }
            />
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {journal.map((item) => (
                <li key={item._id}>
                  <PostCard item={item} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}
      <Faq />
    </>
  );
}
