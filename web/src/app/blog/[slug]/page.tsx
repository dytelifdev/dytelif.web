import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Folio, Railed } from "@/components/herbarium/folio";
import { PageIntro } from "@/components/herbarium/page-intro";
import { MountedPhoto, SpecimenLabel } from "@/components/herbarium/specimen";
import { JsonLd } from "@/components/json-ld";
import { PortableText } from "@/components/portable-text";
import { ClosingCta } from "@/components/site/closing-cta";
import { ShareButton } from "@/components/site/share-button";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
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
  const image = ogImageUrl(post.seo?.image) ?? ogImageUrl(post.coverImage);
  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post._updatedAt,
      ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
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
      <PageIntro size="title" title={post.title} lead={post.excerpt}>
        <Button asChild variant="link" className="self-start">
          <Link href="/blog">
            <ArrowLeftIcon /> Bütün yazılar
          </Link>
        </Button>
      </PageIntro>
      <Folio surface="paper">
        <Container className="py-16 lg:py-24">
          <Railed
            aside={
              <div className="mb-12 flex flex-col gap-6 lg:sticky lg:top-10 lg:mb-0">
                <SpecimenLabel
                  className="max-w-sm px-4 pb-1"
                  title="Yazı bilgisi"
                  rows={[
                    { term: "Yazar", value: `Dyt. ${PROFILE.name}` },
                    {
                      term: "Yayın",
                      value: <time dateTime={post.publishedAt ?? undefined}>{formatDate(post.publishedAt)}</time>,
                    },
                  ]}
                />
                <div>
                  <ShareButton title={post.title ?? SITE.name} path={path} />
                </div>
              </div>
            }
          >
            <article>
              {post.coverImage?.asset ? (
                <MountedPhoto
                  image={post.coverImage}
                  aspect={3 / 2}
                  eager
                  sizes="(min-width: 1024px) 50rem, 100vw"
                  className="mb-12"
                />
              ) : null}
              <div className="prose-folio">
                <PortableText value={post.body} />
              </div>
            </article>
            {post.related.length > 0 ? (
              <nav aria-label="Diğer yazılar" className="mt-16 max-w-[68ch] border-t-2 border-ink pt-6">
                <h2 className="text-sm font-semibold text-ink-soft">Diğer yazılar</h2>
                <ul className="mt-3">
                  {post.related.map((item) => (
                    <li key={item._id} className="border-b border-rule">
                      <Link
                        href={`/blog/${item.slug}`}
                        className="flex min-h-16 flex-col justify-center py-3 hover:underline"
                      >
                        <span className="font-display text-xl">{item.title}</span>
                        <time dateTime={item.publishedAt ?? undefined} className="text-sm text-ink-soft">
                          {formatDate(item.publishedAt)}
                        </time>
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
