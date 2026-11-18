import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Folio, Railed } from "@/components/herbarium/folio";
import { PageIntro } from "@/components/herbarium/page-intro";
import { MountedPhoto } from "@/components/herbarium/specimen";
import { PortableText } from "@/components/portable-text";
import { ShareButton } from "@/components/site/share-button";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import { openGraph } from "@/lib/open-graph";
import { SITE } from "@/lib/site";
import { getAnnouncement, getAnnouncements, staticSlugs } from "@/sanity/fetch";

export async function generateStaticParams() {
  return staticSlugs(await getAnnouncements());
}

export async function generateMetadata({ params }: PageProps<"/duyurular/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = await getAnnouncement(slug);
  if (!item) return { title: "Sayfa bulunamadı", robots: { index: false } };
  return {
    title: item.seo?.title || item.title,
    description: item.seo?.description || item.summary,
    alternates: { canonical: `/duyurular/${item.slug}` },
    openGraph: await openGraph({ type: "article" }, item.seo?.image, item.image),
  };
}

export default async function AnnouncementPage({ params }: PageProps<"/duyurular/[slug]">) {
  const { slug } = await params;
  const item = await getAnnouncement(slug);
  if (!item) notFound();

  return (
    <>
      <PageIntro size="title" title={item.title} lead={item.summary}>
        <Button asChild variant="link" className="self-start">
          <Link href="/duyurular">
            <ArrowLeftIcon /> Bütün duyurular
          </Link>
        </Button>
      </PageIntro>
      <Folio surface="paper">
        <Container className="py-16 lg:py-24">
          <Railed
            aside={
              <div className="mb-10 flex flex-col items-start gap-5 lg:mb-0">
                <time dateTime={item.publishedAt ?? undefined} className="border-t-2 border-ink pt-3 text-ink-soft">
                  {formatDate(item.publishedAt)}
                </time>
                <ShareButton title={item.title ?? SITE.name} path={`/duyurular/${item.slug}`} />
              </div>
            }
          >
            {item.image?.asset ? (
              <MountedPhoto
                image={item.image}
                aspect={3 / 2}
                eager
                sizes="(min-width: 1024px) 50rem, 100vw"
                className="mb-12"
              />
            ) : null}
            <div className="prose-folio">
              {item.body?.length ? <PortableText value={item.body} /> : <p>{item.summary}</p>}
            </div>
          </Railed>
        </Container>
      </Folio>
    </>
  );
}
