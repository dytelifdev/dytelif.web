import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PHOTOS } from "@/lib/photos";
import { PROCESS } from "@/lib/profile";
import { Photo } from "./photo";
import { Container, Section } from "./section";

/** The four steps of a consultation, in order, on the green band. */
export function Process({ title = "Süreç nasıl işliyor?" }: { title?: string }) {
  return (
    <Section tone="green" aria-labelledby="surec" className="defer-render overflow-hidden py-16 sm:py-20 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <h2 id="surec" className="text-headline font-bold">
            {title}
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-white/80">
            Her program ön değerlendirmeyle başlar ve düzenli takiple güncellenir. Yüz yüze ya da online, süreç aynıdır.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="white">
              <Link href="/randevu">Randevu talebi gönderin</Link>
            </Button>
            <Button asChild size="lg" variant="outline-light">
              <Link href="/hizmetler">Hizmetleri inceleyin</Link>
            </Button>
          </div>
          <Photo
            fallback={PHOTOS.measurement}
            aspect={4 / 3}
            sizes="(min-width: 1024px) 30rem, 92vw"
            className="mt-10 hidden bg-white/10 lg:block"
          />
        </div>
        <ol className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {PROCESS.map((step, i) => (
            <li key={step.term} className="rounded-2xl bg-white/8 p-6 sm:p-7">
              <span
                aria-hidden="true"
                className="tabular grid size-12 place-items-center rounded-full bg-cream text-lg font-extrabold text-brand"
              >
                {i + 1}
              </span>
              <h3 className="mt-5 text-xl font-bold">{step.term}</h3>
              <p className="mt-2 leading-relaxed text-white/80">{step.detail}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
