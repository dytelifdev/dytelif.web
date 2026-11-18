import type { Metadata } from "next";
import Link from "next/link";
import { Container, Folio, Railed } from "@/components/herbarium/folio";
import { MountedPhoto, SpecimenLabel } from "@/components/herbarium/specimen";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Folio surface="folder" className="overflow-hidden">
      <Container className="py-16 lg:py-24">
        <Railed
          asideClassName="flex flex-col justify-center gap-8 pb-14 lg:pb-0"
          aside={
            <>
              <h1 className="font-display text-display">Bu föy arşivde yok.</h1>
              <p className="max-w-md text-lg leading-relaxed text-on-surface-soft">
                Aradığınız sayfa taşınmış ya da kaldırılmış olabilir. Ana sayfadan devam edebilirsiniz.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/">Ana sayfaya dönün</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/iletisim">İletişim</Link>
                </Button>
              </div>
            </>
          }
        >
          <div className="relative mx-auto max-w-sm lg:mx-0 lg:pb-10">
            <MountedPhoto image={null} aspect={4 / 5} tapes={["top"]} sizes="24rem" className="lg:w-[min(24rem,70%)]" />
            <SpecimenLabel
              className="relative z-20 -mt-8 ml-auto w-[80%] px-4 pb-1 sm:w-64 lg:absolute lg:right-0 lg:bottom-0 lg:mt-0"
              title="Kayıt bulunamadı"
              rows={[{ term: "Hata", value: "404" }]}
            />
          </div>
        </Railed>
      </Container>
    </Folio>
  );
}
