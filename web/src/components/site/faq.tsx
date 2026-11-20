import { ArrowRightIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
import { getContact, telHref } from "@/lib/contact";
import { DEFAULT_FAQS } from "@/lib/profile";
import { WHATSAPP_GREETING, whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";
import { getSettings } from "@/sanity/fetch";
import { Container, Section, type Tone } from "./section";

export type FaqItem = { question: string; answer: string };

/**
 * Questions as native disclosure rows: no script needed. The general list (Studio, or the
 * confirmed defaults) lives in full on İletişim; the home page shows its first few with a
 * link there, and service pages pass their own `items`. Only the full general list emits
 * FAQPage data, so the same questions are never marked up on two pages.
 */
export async function Faq({
  tone = "ivory",
  items,
  limit,
  moreHref,
  title = "Sıkça sorulan sorular",
  lead = "Aklınıza takılan başka bir şey varsa yazmanız yeterli.",
  ask = true,
  id = "sss",
}: {
  tone?: Tone;
  items?: readonly FaqItem[];
  /** Show only the first few questions. */
  limit?: number;
  /** "Tüm sorular" link under a shortened list. */
  moreHref?: string;
  title?: string;
  lead?: string;
  /** The WhatsApp and phone box under the heading. */
  ask?: boolean;
  id?: string;
}) {
  const [settings, contact] = await Promise.all([getSettings(), getContact()]);
  const general = settings?.faqs?.length
    ? settings.faqs.flatMap((f) => (f.question && f.answer ? [{ question: f.question, answer: f.answer }] : []))
    : DEFAULT_FAQS;
  const all = items ?? general;
  const faqs = limit ? all.slice(0, limit) : all;
  if (faqs.length === 0) return null;
  const structured = items !== undefined || faqs.length === all.length;

  return (
    <Section tone={tone} id={id} aria-labelledby={`${id}-baslik`} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
      {structured ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }}
        />
      ) : null}
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 id={`${id}-baslik`} className="text-headline font-bold">
            {title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{lead}</p>
          {ask ? (
            <div data-wa-cta className={cn("mt-8 rounded-2xl p-6", tone === "sand" ? "bg-paper" : "bg-sand")}>
              <p className="font-bold text-ink">Sorunuzu doğrudan sorun</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Button asChild>
                  <a href={whatsappHref(contact.whatsapp, WHATSAPP_GREETING)} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon /> WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href={telHref(contact.phoneDisplay)} className="tabular">
                    {contact.phoneDisplay}
                  </a>
                </Button>
              </div>
            </div>
          ) : null}
        </div>
        <div>
          <div className="flex flex-col gap-3">
            {faqs.map((f) => (
              <details
                key={f.question}
                className="group rounded-xl border border-line bg-paper transition-colors open:border-brand/30 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 py-4 text-left text-[1.0625rem] font-semibold text-ink transition-colors hover:text-brand sm:px-6">
                  {f.question}
                  <PlusIcon
                    aria-hidden="true"
                    className="size-5 shrink-0 text-brand transition-transform duration-300 ease-out-expo group-open:rotate-45"
                  />
                </summary>
                <p className="px-5 pb-5 leading-relaxed text-ink-soft sm:px-6">{f.answer}</p>
              </details>
            ))}
          </div>
          {moreHref && all.length > faqs.length ? (
            <Button asChild variant="link" className="mt-6">
              <Link href={moreHref}>
                Tüm soruları görün <ArrowRightIcon />
              </Link>
            </Button>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
