import type { Metadata } from "next";
import { InstagramIcon } from "@/components/icons/brand-icons";
import { InstagramBand } from "@/components/site/instagram-band";
import { PageHero } from "@/components/site/page-hero";
import { Photo } from "@/components/site/photo";
import { Container, Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { getContact } from "@/lib/contact";
import { openGraph } from "@/lib/open-graph";
import { PRODUCTS_VISUAL } from "@/lib/visuals";
import { getProducts, getSettings } from "@/sanity/fetch";

const DEFAULT_TITLE = "Ürünlerimiz";
const DEFAULT_INTRO =
  "Bu sayfa hazırlanıyor. Ürünler hazır olduğunda burada tanıtılacak; haberdar olmak için Instagram'ı takip edebilirsiniz.";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const seo = settings?.productsSeo;
  return {
    title: seo?.title || settings?.productsTitle || DEFAULT_TITLE,
    description:
      seo?.description ||
      settings?.productsIntro ||
      "Dyt. Elif Sude Özkan'ın ürün tanıtımları hazırlanıyor. Ürünler hazır olduğunda bu sayfada tanıtılacak; bu sayfada satış yapılmaz.",
    alternates: { canonical: "/urunler" },
    openGraph: await openGraph({ type: "website" }, seo?.image, settings?.productsImage),
  };
}

/**
 * Teasers only, never commerce: no price, stock, cart or checkout. The list
 * appears only when the editor sets the page to "Ürünleri göster" and at least
 * one product is published; otherwise this is the coming-soon page.
 */
export default async function ProductsPage() {
  const [settings, products, contact] = await Promise.all([getSettings(), getProducts(), getContact()]);
  const title = settings?.productsTitle || DEFAULT_TITLE;
  const intro = settings?.productsIntro || DEFAULT_INTRO;
  const showList = settings?.productsStatus === "published" && products.length > 0;
  const follow = (
    <Button asChild size="lg" variant="white">
      <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">
        <InstagramIcon /> Instagram&apos;da takip edin
      </a>
    </Button>
  );

  if (showList) {
    return (
      <>
        <PageHero title={title} lead={intro} crumbs={[{ href: "/urunler", label: title }]} />
        <Section tone="page" aria-label="Ürün tanıtımları" className="py-16 sm:py-20 lg:py-24">
          <Container>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {products.map((product) => (
                <li
                  key={product._id}
                  id={product.slug ?? undefined}
                  className="overflow-hidden rounded-2xl bg-white shadow-card"
                >
                  <Photo
                    image={product.image}
                    aspect={4 / 5}
                    sizes="(min-width: 1024px) 25rem, (min-width: 640px) 46vw, 92vw"
                    className="rounded-none"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-bold">{product.title}</h2>
                    {product.summary ? <p className="mt-2 text-ink-soft">{product.summary}</p> : null}
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
        <InstagramBand />
      </>
    );
  }

  return (
    <>
      <PageHero
        title={`${title} çok yakında`}
        lead={intro}
        crumbs={[{ href: "/urunler", label: title }]}
        media={
          <Photo
            image={settings?.productsImage}
            fallback={PRODUCTS_VISUAL}
            aspect={4 / 3}
            eager
            sizes="(min-width: 1024px) 32rem, 92vw"
            className="bg-white/10"
          />
        }
      >
        {follow}
      </PageHero>
      <InstagramBand />
    </>
  );
}
