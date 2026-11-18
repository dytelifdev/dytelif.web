import type { Metadata } from "next";
import { Container, Folio, Railed } from "@/components/herbarium/folio";
import { PageIntro } from "@/components/herbarium/page-intro";
import { MountedPhoto, SpecimenLabel } from "@/components/herbarium/specimen";
import { InstagramIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
import { getContact } from "@/lib/contact";
import { getProducts, getSettings } from "@/sanity/fetch";
import { ogImageUrl } from "@/sanity/image";

const DEFAULT_TITLE = "Ürünlerimiz";
const DEFAULT_INTRO =
  "Bu sayfa hazırlanıyor. Ürünler hazır olduğunda burada tanıtılacak; haberdar olmak için Instagram'ı takip edebilirsiniz.";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const image = ogImageUrl(settings?.productsImage);
  return {
    title: settings?.productsTitle || DEFAULT_TITLE,
    description: settings?.productsIntro || "Dyt. Elif Sude Özkan ürün tanıtımları çok yakında bu sayfada.",
    alternates: { canonical: "/urunler" },
    ...(image ? { openGraph: { images: [{ url: image, width: 1200, height: 630 }] } } : {}),
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
        <PageIntro title={title} lead={intro} />
        <Folio surface="paper">
          <Container className="py-16 lg:py-24">
            <ul className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <li key={product._id}>
                  <MountedPhoto
                    image={product.image}
                    aspect={4 / 5}
                    sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 92vw"
                  />
                  <SpecimenLabel
                    className="relative z-10 -mt-6 ml-6 px-4 pb-1"
                    title={<span id={product.slug ?? undefined}>{product.title}</span>}
                    rows={product.summary ? [{ term: "Tanıtım", value: product.summary }] : []}
                  />
                </li>
              ))}
            </ul>
          </Container>
        </Folio>
      </>
    );
  }

  return (
    <Folio surface="folder" className="overflow-hidden">
      <Container className="py-14 lg:py-24">
        <Railed
          asideClassName="flex flex-col justify-center gap-8 pb-14 lg:pb-0"
          aside={
            <>
              <h1 className="font-display text-display">
                {title}
                <span className="block italic">çok yakında.</span>
              </h1>
              <p className="max-w-md text-lg leading-relaxed text-on-surface-soft">{intro}</p>
              <Button asChild size="lg" className="self-start">
                <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">
                  <InstagramIcon /> Instagram&apos;da takip edin
                </a>
              </Button>
            </>
          }
        >
          <div className="settle relative mx-auto max-w-md lg:mx-0 lg:pb-12">
            <MountedPhoto
              image={settings?.productsImage}
              aspect={4 / 5}
              tapes={["top-left", "bottom-right"]}
              sizes="(min-width: 1024px) 30rem, 92vw"
              className="lg:w-[min(30rem,72%)]"
            />
            <SpecimenLabel
              className="relative z-20 -mt-8 ml-auto w-[80%] px-4 pb-1 sm:w-72 lg:absolute lg:right-0 lg:bottom-0 lg:mt-0"
              title={title}
              rows={[
                { term: "Duyuru", value: "Instagram'da paylaşılacak" },
                { term: "Satış", value: "Bu sayfada satış yapılmaz" },
              ]}
            />
          </div>
        </Railed>
      </Container>
    </Folio>
  );
}
