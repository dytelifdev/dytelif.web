import type { Metadata } from "next";
import Link from "next/link";
import { InstagramIcon } from "@/components/icons/brand-icons";
import { InstagramBand } from "@/components/site/instagram-band";
import { PageHero } from "@/components/site/page-hero";
import { PostCard, type PostCardItem } from "@/components/site/post-card";
import { Container, Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { getContact } from "@/lib/contact";
import { getPosts } from "@/sanity/fetch";

export const metadata: Metadata = {
  title: "Blog",
  description: "Sofranız için kısa, net ve kaynaklı beslenme rehberleri: dengeli tabak, etiket okuma, su ve lif.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const [posts, contact] = await Promise.all([getPosts(), getContact()]);
  const items: PostCardItem[] = posts.map((p) => ({
    _id: p._id,
    href: `/blog/${p.slug}`,
    title: p.title,
    summary: p.excerpt,
    publishedAt: p.publishedAt,
    image: p.coverImage,
  }));
  const [first, ...rest] = items;

  return (
    <>
      <PageHero
        title="Blog"
        lead="Sofranız için kısa, net ve kaynaklı rehberler. Her yazı, hemen uygulayabileceğiniz bir adımla biter."
        crumbs={[{ href: "/blog", label: "Blog" }]}
      />
      <Section tone="page" aria-label="Yazılar" className="py-16 sm:py-20 lg:py-24">
        <Container>
          {first ? (
            <>
              <PostCard item={first} featured headingLevel="h2" />
              {rest.length > 0 ? (
                <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                  {rest.map((item) => (
                    <li key={item._id}>
                      <PostCard item={item} headingLevel="h2" />
                    </li>
                  ))}
                </ul>
              ) : null}
            </>
          ) : (
            <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl bg-white px-6 py-14 text-center shadow-card sm:px-12">
              <span className="grid size-14 place-items-center rounded-2xl bg-brand-soft text-brand">
                <InstagramIcon className="size-7" />
              </span>
              <h2 className="mt-6 text-2xl font-bold sm:text-3xl">İlk yazılar hazırlanıyor</h2>
              <p className="mt-3 max-w-md text-lg text-ink-soft">
                Yazılar yayımlanana kadar güncel paylaşımlar Instagram&apos;da.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">
                    <InstagramIcon /> Instagram&apos;ı açın
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/duyurular">Duyurular</Link>
                </Button>
              </div>
            </div>
          )}
        </Container>
      </Section>
      <InstagramBand />
    </>
  );
}
