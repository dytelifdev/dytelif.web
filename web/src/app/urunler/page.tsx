import type { Metadata } from "next";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons/brand-icons";
import { PageHero } from "@/components/site/page-hero";
import { Photo } from "@/components/site/photo";
import { Container, Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { getContact } from "@/lib/contact";
import { openGraph } from "@/lib/open-graph";
import { whatsappHref } from "@/lib/site";
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
  if (showList) {
    return (
      <>
        <PageHero title={title} lead={intro} crumbs={[{ href: "/urunler", label: title }]} />
        <Section tone="ivory" aria-label="Ürün tanıtımları" className="py-16 sm:py-20 lg:py-24">
          <Container>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {products.map((product) => (
                <li
                  key={product._id}
                  id={product.slug ?? undefined}
                  className="overflow-hidden rounded-2xl bg-paper shadow-card"
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
      </>
    );
  }

  // Coming soon: the green band carries the title alone; the portrait and the way to hear
  // first get a section of their own, so the page never runs straight into the footer.
  return (
    <>
      <PageHero title={`${title} çok yakında`} lead={intro} crumbs={[{ href: "/urunler", label: title }]} />
      <Section tone="ivory" aria-labelledby="haberdar-olun" className="py-16 sm:py-20 lg:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Photo
            image={settings?.productsImage}
            fallback={PRODUCTS_VISUAL}
            aspect={4 / 3}
            eager
            sizes="(min-width: 1024px) 36rem, 92vw"
            className="mx-auto w-full max-w-xl lg:max-w-none"
          />
          <div>
            <h2 id="haberdar-olun" className="text-headline font-bold">
              İlk siz haberdar olun
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-soft">
              Ürünler hazır olduğunda size WhatsApp&apos;tan haber verelim. Bu sırada güncel paylaşımlar
              Instagram&apos;da.
            </p>
            <div data-wa-cta className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {/* A waiting list without a database: one WhatsApp message she answers at launch. */}
              <Button asChild size="lg">
                <a
                  href={whatsappHref(contact.whatsapp, "Merhaba, ürünleriniz hazır olduğunda haber almak istiyorum.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon /> Hazır olunca haber alın
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">
                  <InstagramIcon /> Instagram&apos;da takip edin
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
