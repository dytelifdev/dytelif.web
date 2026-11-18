import type { Metadata } from "next";
import { Container, Folio } from "@/components/herbarium/folio";
import { Ledger, LedgerEntry } from "@/components/herbarium/ledger";
import { PageIntro } from "@/components/herbarium/page-intro";
import { InstagramIcon } from "@/components/icons/brand-icons";
import { SanityImage } from "@/components/sanity-image";
import { Button } from "@/components/ui/button";
import { getContact } from "@/lib/contact";
import { formatDate } from "@/lib/format";
import { getPosts } from "@/sanity/fetch";

export const metadata: Metadata = {
  title: "Blog",
  description: "Beslenme üzerine bilimsel temelli, anlaşılır yazılar ve uygulanabilir öneriler.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const [posts, contact] = await Promise.all([getPosts(), getContact()]);

  return (
    <>
      <PageIntro title="Blog" lead="Beslenme üzerine bilimsel temelli, anlaşılır yazılar." />
      <Folio surface="paper">
        <Container className="py-16 lg:py-24">
          {posts.length > 0 ? (
            <Ledger className="mx-auto max-w-5xl">
              {posts.map((post) => (
                <LedgerEntry
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  title={post.title ?? ""}
                  summary={post.excerpt}
                  headingLevel="h2"
                  meta={<time dateTime={post.publishedAt ?? undefined}>{formatDate(post.publishedAt)}</time>}
                  media={
                    post.coverImage?.asset ? (
                      <SanityImage
                        image={post.coverImage}
                        aspect={1}
                        sizes="7rem"
                        className="aspect-square w-full object-cover"
                      />
                    ) : undefined
                  }
                />
              ))}
            </Ledger>
          ) : (
            <div className="mx-auto max-w-5xl border-t-2 border-ink pt-8">
              <p className="max-w-xl text-lg">
                İlk yazılar hazırlanıyor. O zamana kadar güncel paylaşımlar Instagram&apos;da.
              </p>
              <Button asChild variant="outline" className="mt-6">
                <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">
                  <InstagramIcon /> Instagram
                </a>
              </Button>
            </div>
          )}
        </Container>
      </Folio>
    </>
  );
}
