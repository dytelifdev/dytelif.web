import type { ReactNode } from "react";
import { PortableText } from "@/components/portable-text";
import { LEGAL } from "@/lib/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PageHero } from "./page-hero";
import { Container, Section } from "./section";

/**
 * KVKK, privacy and cookie pages. The editor's text from Studio wins; until a
 * lawyer-approved text is entered, a factual description of the site's real
 * data flow is shown.
 */
export function LegalPage({
  href,
  title,
  lead,
  value,
  fallback,
}: {
  href: string;
  title: string;
  lead: string;
  value: Parameters<typeof PortableText>[0]["value"];
  fallback: ReactNode;
}) {
  return (
    <>
      <PageHero title={title} lead={lead} crumbs={[{ href, label: title }]} />
      <Section tone="white" className="py-14 sm:py-16 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-16">
          <nav aria-label="Bilgilendirme metinleri" className="lg:sticky lg:top-28 lg:self-start">
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {LEGAL.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={item.href === href ? "page" : undefined}
                    className={cn(
                      "flex min-h-11 items-center rounded-lg px-4 font-semibold transition-colors",
                      "bg-page text-ink hover:bg-brand-soft hover:text-brand lg:bg-transparent",
                      "aria-[current=page]:bg-brand-soft aria-[current=page]:text-brand",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <article className="prose-site [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_li]:mb-1.5 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&>h2:first-child]:mt-0">
            {Array.isArray(value) && value.length > 0 ? <PortableText value={value} /> : fallback}
          </article>
        </Container>
      </Section>
    </>
  );
}
