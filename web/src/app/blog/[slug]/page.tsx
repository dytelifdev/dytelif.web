import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { JsonLd } from "@/components/json-ld";
import { Article } from "@/components/site/article";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero, PageHeroSkeleton } from "@/components/site/page-hero";
import { PostCard } from "@/components/site/post-card";
import { Container, Section, SectionHeader } from "@/components/site/section";
import { openGraph } from "@/lib/open-graph";
import { PROFILE } from "@/lib/profile";
import { SITE } from "@/lib/site";
import { getPost, getPosts, staticSlugs } from "@/sanity/fetch";
import { ogImageUrl } from "@/sanity/image";

export async function generateStaticParams() {
  return staticSlugs(await getPosts());
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Sayfa bulunamadı", robots: { index: false } };
  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: await openGraph(
      { type: "article", publishedTime: post.publishedAt ?? undefined, modifiedTime: post._updatedAt },
      post.seo?.image,
      post.coverImage,
    ),
  };
}

// The closing band stays in the shared App Shell; the post reads params inside Suspense.
export default function PostPage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <>
      <Suspense fallback={<PageHeroSkeleton />}>
        <Post params={params} />
      </Suspense>
      <CtaBand last />
    </>
  );
}

async function Post({ params }: Pick<PageProps<"/blog/[slug]">, "params">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const path = `/blog/${post.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          dateModified: post._updatedAt,
          mainEntityOfPage: `${SITE.url}${path}`,
          author: { "@type": "Person", name: PROFILE.name, jobTitle: PROFILE.title, url: SITE.url },
          ...(ogImageUrl(post.coverImage) ? { image: ogImageUrl(post.coverImage) } : {}),
        }}
      />
      <PageHero
        title={post.title}
        lead={post.excerpt}
        crumbs={[
          { href: "/blog", label: "Blog" },
          { href: path, label: post.title ?? "" },
        ]}
      />
      <Article
        title={post.title ?? SITE.name}
        path={path}
        publishedAt={post.publishedAt}
        cover={post.coverImage}
        body={post.body}
      />
      {post.related.length > 0 ? (
        <Section tone="sand" aria-labelledby="diger-yazilar" className="py-16 sm:py-20">
          <Container>
            <SectionHeader id="diger-yazilar" title="Diğer yazılar" />
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {post.related.map((item) => (
                <li key={item._id}>
                  <PostCard
                    item={{
                      _id: item._id,
                      href: `/blog/${item.slug}`,
                      title: item.title,
                      publishedAt: item.publishedAt,
                    }}
                  />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
