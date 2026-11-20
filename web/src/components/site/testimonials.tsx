import { QuoteIcon } from "lucide-react";
import { getTestimonials } from "@/sanity/fetch";
import { Container, Section, SectionHeader } from "./section";

type Item = { _id: string; name: string | null; context: string | null; quote: string | null };

/**
 * Layout preview for the design review only. Shown when no real review is published and
 * SHOW_SAMPLE_TESTIMONIALS=true (set in .env.local), and never on the live Vercel site.
 * The first real review entered in Studio replaces all of them.
 */
const SAMPLES: Item[] = [
  {
    _id: "ornek-1",
    name: "Ayşe K.",
    context: "Yüz yüze danışan",
    quote:
      "Ölçümlerden sonra hazırlanan plan günlük düzenime kolayca oturdu. Her görüşmede neyi neden yaptığımızı açıkça anlattı.",
  },
  {
    _id: "ornek-2",
    name: "Merve T.",
    context: "Online danışan",
    quote:
      "Şehir dışında olmama rağmen online görüşmelerle düzenli takip edebiliyorum. Sorularıma her zaman anlaşılır cevaplar aldım.",
  },
  {
    _id: "ornek-3",
    name: "Selin A.",
    context: "Yüz yüze danışan",
    quote:
      "Yasak listesi yerine sevdiğim yemeklerle kurulan bir düzen oldu. İlk kez sürdürebileceğim bir plana sahibim.",
  },
];

// Samples can never reach the production deployment, whatever the flag says.
const showSamples = process.env.SHOW_SAMPLE_TESTIMONIALS === "true" && process.env.VERCEL_ENV !== "production";

/** Client feedback entered in Studio with the client's permission; omitted when there is none. */
export async function Testimonials() {
  const real = await getTestimonials();
  const items: Item[] = real.length > 0 ? real.slice(0, 6) : showSamples ? SAMPLES : [];
  if (items.length === 0) return null;
  return (
    <Section tone="sand" aria-labelledby="yorumlar" className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeader id="yorumlar" title="Danışanlarım anlatıyor" align="center" />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {items.map((item) => (
            <li key={item._id}>
              <figure className="flex h-full flex-col rounded-2xl bg-paper p-7 shadow-card sm:p-8">
                <QuoteIcon aria-hidden="true" className="size-8 text-brass" />
                <blockquote className="mt-5 flex-1 text-[1.0625rem] leading-relaxed text-ink">
                  <p>{item.quote}</p>
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                  <span
                    aria-hidden="true"
                    className="grid size-11 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white"
                  >
                    {(item.name ?? "").trim().charAt(0).toLocaleUpperCase("tr")}
                  </span>
                  <span>
                    <span className="block font-bold">{item.name}</span>
                    {item.context ? <span className="text-sm text-ink-soft">{item.context}</span> : null}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
