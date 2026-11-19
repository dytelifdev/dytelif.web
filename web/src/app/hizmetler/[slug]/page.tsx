import { ArrowRightIcon, CheckIcon, MapPinIcon, VideoIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { JsonLd } from "@/components/json-ld";
import { PortableText } from "@/components/portable-text";
import { Faq } from "@/components/site/faq";
import { PageHero, PageHeroSkeleton } from "@/components/site/page-hero";
import { Photo } from "@/components/site/photo";
import { Process } from "@/components/site/process";
import { Container, Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { getContact } from "@/lib/contact";
import { openGraph } from "@/lib/open-graph";
import { PROFILE } from "@/lib/profile";
import { SITE, whatsappHref } from "@/lib/site";
import { serviceVisual } from "@/lib/visuals";
import { getService, getServices, staticSlugs } from "@/sanity/fetch";

/** What every consultation includes, from the CV's practice notes; true for each service. */
const INCLUDED = [
  "Beslenme alışkanlıklarınızın ve sağlık geçmişinizin konuşulduğu ön görüşme",
  "Boy, kilo ve çevre ölçümleri",
  "Kan tahlili ve vücut analizi sonuçlarının birlikte yorumlanması",
  "Yaşamınıza ve sağlık durumunuza uygun, kişiye özgü program",
  "Düzenli takip görüşmeleriyle planın güncellenmesi",
];

export async function generateStaticParams() {
  return staticSlugs(await getServices());
}

export async function generateMetadata({ params }: PageProps<"/hizmetler/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return { title: "Sayfa bulunamadı", robots: { index: false } };
  return {
    title: service.seo?.title || service.title,
    description: service.seo?.description || service.summary,
    alternates: { canonical: `/hizmetler/${service.slug}` },
    openGraph: await openGraph({ type: "website" }, service.seo?.image, service.image),
  };
}

// The URL-independent parts (process, FAQ) stay in the shared App Shell; the service itself
// reads params inside Suspense, so navigation paints at once and prefetched links fill instantly.
export default function ServicePage({ params }: PageProps<"/hizmetler/[slug]">) {
  return (
    <>
      <Suspense fallback={<PageHeroSkeleton media />}>
        <ServiceDetail params={params} />
      </Suspense>
      <Process />
      <Faq />
    </>
  );
}

async function ServiceDetail({ params }: Pick<PageProps<"/hizmetler/[slug]">, "params">) {
  const { slug } = await params;
  const [service, services, contact] = await Promise.all([getService(slug), getServices(), getContact()]);
  if (!service) notFound();
  const others = services.filter((s) => s.slug !== service.slug);
  const appointment = `/randevu?hizmet=${encodeURIComponent(service.title ?? "")}`;
  const wa = whatsappHref(
    contact.whatsapp,
    `Merhaba, web sitenizden ulaşıyorum. "${service.title}" hakkında bilgi almak istiyorum.`,
  );

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.summary,
          serviceType: "Beslenme danışmanlığı",
          areaServed: [contact.location, "Türkiye"],
          url: `${SITE.url}/hizmetler/${service.slug}`,
          provider: { "@type": "Person", name: PROFILE.name, jobTitle: PROFILE.title, url: SITE.url },
        }}
      />
      <PageHero
        title={service.title}
        lead={service.summary}
        crumbs={[
          { href: "/hizmetler", label: "Hizmetler" },
          { href: `/hizmetler/${service.slug}`, label: service.title ?? "" },
        ]}
        media={
          <Photo
            image={service.image}
            fallback={serviceVisual(service.slug)}
            aspect={4 / 3}
            eager
            sizes="(min-width: 1024px) 32rem, 92vw"
            className="bg-white/10"
          />
        }
      >
        <Button asChild size="lg" variant="white">
          <Link href={appointment}>Bu hizmet için randevu talebi</Link>
        </Button>
        <Button asChild size="lg" variant="outline-light">
          <a href={wa} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon /> Soru sorun
          </a>
        </Button>
      </PageHero>

      <Section tone="white" className="py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-16">
          <div>
            {service.body?.length ? (
              <article className="prose-site mb-12">
                <PortableText value={service.body} />
              </article>
            ) : null}
            <div className="rounded-2xl bg-page p-6 sm:p-8">
              <h2 className="text-2xl font-bold">Görüşmede neler var?</h2>
              <ul className="mt-6 grid gap-3.5">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand text-white">
                      <CheckIcon aria-hidden="true" className="size-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="flex gap-4 rounded-2xl border border-line p-5 sm:p-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                  <MapPinIcon aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h3 className="font-bold">Yüz yüze</h3>
                  <p className="mt-1 text-[0.9375rem] text-ink-soft">
                    {contact.address.venue}, {contact.address.district} / {contact.address.city}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-2xl border border-line p-5 sm:p-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                  <VideoIcon aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h3 className="font-bold">Online</h3>
                  <p className="mt-1 text-[0.9375rem] text-ink-soft">Türkiye&apos;nin her yerinden görüntülü görüşme</p>
                </div>
              </div>
            </div>
          </div>
          <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <div data-wa-cta className="rounded-2xl bg-cream p-6 sm:p-7">
              <p className="text-lg font-bold">Bu hizmetle ilgili</p>
              <p className="mt-2 text-ink-soft">
                Ön görüşme için talep bırakın ya da sorunuzu WhatsApp&apos;tan sorun.
              </p>
              <div className="mt-5 grid gap-3">
                <Button asChild>
                  <Link href={appointment}>Randevu talebi gönderin</Link>
                </Button>
                <Button asChild variant="outline">
                  <a href={wa} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon /> WhatsApp&apos;tan yazın
                  </a>
                </Button>
              </div>
            </div>
            {others.length > 0 ? (
              <nav aria-label="Diğer hizmetler" className="rounded-2xl border border-line p-5 sm:p-6">
                <h2 className="font-bold">Diğer hizmetler</h2>
                <ul className="mt-3 grid gap-1">
                  {others.map((s) => (
                    <li key={s._id}>
                      <Link
                        href={`/hizmetler/${s.slug}`}
                        prefetch
                        className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-brand-soft"
                      >
                        <Photo
                          image={s.image}
                          fallback={serviceVisual(s.slug)}
                          aspect={1}
                          alt=""
                          sizes="3.5rem"
                          className="size-14 shrink-0 rounded-lg"
                        />
                        <span className="flex-1 leading-snug font-semibold text-ink group-hover:text-brand">
                          {s.title}
                        </span>
                        <ArrowRightIcon aria-hidden="true" className="size-4 shrink-0 text-brand" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </aside>
        </Container>
      </Section>
    </>
  );
}
