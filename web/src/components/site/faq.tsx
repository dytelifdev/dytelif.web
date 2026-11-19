import { PlusIcon } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
import { getContact, telHref } from "@/lib/contact";
import { DEFAULT_FAQS } from "@/lib/profile";
import { WHATSAPP_GREETING, whatsappHref } from "@/lib/site";
import { getSettings } from "@/sanity/fetch";
import { Container, Section } from "./section";

/** Questions from Studio (or the confirmed defaults) as native disclosure rows: no script needed. */
export async function Faq({ tone = "white" }: { tone?: "white" | "page" }) {
  const [settings, contact] = await Promise.all([getSettings(), getContact()]);
  const faqs = settings?.faqs?.length
    ? settings.faqs.flatMap((f) => (f.question && f.answer ? [{ question: f.question, answer: f.answer }] : []))
    : DEFAULT_FAQS;

  return (
    <Section tone={tone} aria-labelledby="sss" className="defer-render py-16 sm:py-20 lg:py-24">
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
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="sss" className="text-headline font-bold">
            Sıkça sorulan sorular
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Aklınıza takılan başka bir şey varsa yazmanız yeterli.
          </p>
          <div data-wa-cta className="mt-8 rounded-2xl bg-cream p-6">
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
        </div>
        <div className="flex flex-col gap-3">
          {faqs.map((f) => (
            <details
              key={f.question}
              className="group rounded-xl border border-line bg-white transition-colors open:border-brand/30 [&_summary::-webkit-details-marker]:hidden"
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
      </Container>
    </Section>
  );
}
