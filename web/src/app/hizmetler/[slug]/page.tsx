import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Folio, Railed } from "@/components/herbarium/folio";
import { PageIntro } from "@/components/herbarium/page-intro";
import { MountedPhoto } from "@/components/herbarium/specimen";
import { PortableText } from "@/components/portable-text";
import { ClosingCta } from "@/components/site/closing-cta";
import { Button } from "@/components/ui/button";
import { openGraph } from "@/lib/open-graph";
import { getService, getServices, staticSlugs } from "@/sanity/fetch";

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

export default async function ServicePage({ params }: PageProps<"/hizmetler/[slug]">) {
  const { slug } = await params;
  const [service, services] = await Promise.all([getService(slug), getServices()]);
  if (!service) notFound();
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 4);
  const hasImage = Boolean(service.image?.asset);

  return (
    <>
      <PageIntro size="title" title={service.title} lead={service.summary}>
        <Button asChild variant="link" className="self-start">
          <Link href="/hizmetler">
            <ArrowLeftIcon /> Tüm hizmetler
          </Link>
        </Button>
      </PageIntro>
      <Folio surface="paper">
        <Container className="py-16 lg:py-24">
          <Railed
            aside={
              <div className="mb-12 flex flex-col gap-8 lg:sticky lg:top-10 lg:mb-0">
                {hasImage ? (
                  <MountedPhoto
                    image={service.image}
                    aspect={4 / 5}
                    sizes="(min-width: 1024px) 26rem, 90vw"
                    className="max-w-sm"
                  />
                ) : null}
                <Button asChild size="lg" className="self-start">
                  <Link href={`/randevu?hizmet=${encodeURIComponent(service.title ?? "")}`}>
                    Bu hizmet için randevu talebi
                  </Link>
                </Button>
              </div>
            }
          >
            <article className="prose-folio">
              {service.body?.length ? <PortableText value={service.body} /> : <p>{service.summary}</p>}
            </article>
            {others.length > 0 ? (
              <nav aria-label="Diğer hizmetler" className="mt-16 border-t-2 border-ink pt-6">
                <h2 className="text-sm font-semibold text-ink-soft">Diğer hizmetler</h2>
                <ul className="mt-3">
                  {others.map((s) => (
                    <li key={s._id} className="border-b border-rule">
                      <Link
                        href={`/hizmetler/${s.slug}`}
                        className="flex min-h-14 items-center font-display text-xl hover:underline"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </Railed>
        </Container>
      </Folio>
      <ClosingCta />
    </>
  );
}
