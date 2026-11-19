import { ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  robots: { index: false },
};

const SHORTCUTS = [
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/hakkimda", label: "Hakkımda" },
  { href: "/blog", label: "Blog" },
  { href: "/randevu", label: "Randevu talebi" },
];

export default function NotFound() {
  return (
    <Section tone="white" className="py-20 sm:py-28 lg:py-32">
      <Container className="flex flex-col items-center text-center">
        <p
          aria-hidden="true"
          className="tabular text-[clamp(6rem,4rem+10vw,11rem)] leading-none font-extrabold tracking-tight text-brand"
        >
          404
        </p>
        <h1 className="mt-4 text-title font-extrabold">Aradığınız sayfa bulunamadı</h1>
        <p className="mt-4 max-w-lg text-lg text-ink-soft">
          Sayfa taşınmış ya da kaldırılmış olabilir. Ana sayfadan ya da aşağıdaki bağlantılardan devam edebilirsiniz.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">Ana sayfaya dönün</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/iletisim">İletişim</Link>
          </Button>
        </div>
        <ul className="mt-12 flex flex-wrap justify-center gap-2">
          {SHORTCUTS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-page px-4 font-semibold text-ink transition-colors hover:bg-brand-soft hover:text-brand"
              >
                {item.label} <ArrowRightIcon aria-hidden="true" className="size-4" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
