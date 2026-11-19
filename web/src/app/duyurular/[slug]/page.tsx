import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Article } from "@/components/site/article";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero, PageHeroSkeleton } from "@/components/site/page-hero";
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

// The closing band stays in the shared App Shell; the announcement reads params inside Suspense.
export default function AnnouncementPage({ params }: PageProps<"/duyurular/[slug]">) {
  return (
    <>
      <Suspense fallback={<PageHeroSkeleton />}>
        <Announcement params={params} />
      </Suspense>
      <CtaBand last />
    </>
  );
}

async function Announcement({ params }: Pick<PageProps<"/duyurular/[slug]">, "params">) {
  const { slug } = await params;
  const item = await getAnnouncement(slug);
  if (!item) notFound();
  const path = `/duyurular/${item.slug}`;

  return (
    <>
      <PageHero
        title={item.title}
        lead={item.summary}
        crumbs={[
          { href: "/duyurular", label: "Duyurular" },
          { href: path, label: item.title ?? "" },
        ]}
      />
      <Article
        title={item.title ?? SITE.name}
        path={path}
        publishedAt={item.publishedAt}
        cover={item.image}
        body={item.body}
        fallback={<p>{item.summary}</p>}
      />
    </>
  );
}
