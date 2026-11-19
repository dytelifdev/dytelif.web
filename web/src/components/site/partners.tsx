import { InstagramIcon } from "@/components/icons/brand-icons";
import { SanityImage } from "@/components/sanity-image";
import { instagramHref } from "@/lib/site";
import { getPartners } from "@/sanity/fetch";
import { hasImage } from "@/sanity/image";
import type { PARTNERS_QUERY_RESULT } from "@/sanity/types";
import { AutoScrollStrip } from "./auto-scroll-strip";
import { Container, Section, SectionHeader } from "./section";

type Partner = PARTNERS_QUERY_RESULT[number];

const initials = (name: string) =>
  name
    .replace(/^(Dr|Dyt|Uzm)\.\s*/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toLocaleUpperCase("tr");

/**
 * Studios, specialists and brands she works with, on a strip that scrolls on
 * its own. Each card links to the partner's Instagram. Renders nothing until
 * at least one partner is published in Sanity.
 */
export async function Partners({ tone = "white" }: { tone?: "white" | "page" }) {
  const partners = await getPartners();
  if (partners.length === 0) return null;
  // Short lists are repeated so the loop always has enough cards to fill wide screens.
  const slides = partners.length < 6 ? [...partners, ...partners] : partners;
  return (
    <Section tone={tone} aria-labelledby="is-birlikleri" className="defer-render py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeader
          id="is-birlikleri"
          title="İş birliklerim"
          lead="Bursa'da birlikte çalıştığım stüdyolar, uzmanlar ve markalar."
          className="mb-0 lg:mb-0"
        />
      </Container>
      <div className="mx-auto max-w-384">
        <AutoScrollStrip label="İş birlikleri">
          {slides.map((partner, i) => (
            <PartnerSlide key={`${partner._id}-${i}`} partner={partner} duplicate={i >= partners.length} />
          ))}
        </AutoScrollStrip>
      </div>
    </Section>
  );
}

function PartnerSlide({ partner, duplicate }: { partner: Partner; duplicate: boolean }) {
  const name = partner.name ?? "";
  const meta = [partner.category, partner.area].filter(Boolean).join(" · ");
  const body = (
    <>
      <span className="block size-16 shrink-0 overflow-hidden rounded-full bg-cream ring-1 ring-line">
        {hasImage(partner.logo) ? (
          <SanityImage image={partner.logo} aspect={1} alt="" sizes="4rem" className="size-full object-cover" />
        ) : (
          <span aria-hidden="true" className="grid size-full place-items-center text-lg font-bold text-brand">
            {initials(name)}
          </span>
        )}
      </span>
      <span className="min-w-0">
        <span className="block leading-snug font-bold text-ink">{name}</span>
        {meta ? <span className="mt-0.5 block text-sm text-ink-soft">{meta}</span> : null}
        {partner.instagram ? (
          <span className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-brand">
            <InstagramIcon aria-hidden="true" className="size-3.5 shrink-0" />
            <span className="truncate">@{partner.instagram}</span>
          </span>
        ) : null}
      </span>
    </>
  );
  const card =
    "flex h-full items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-[border-color,box-shadow] duration-300";
  return (
    // Repeated cards exist only to fill the loop; assistive tech reads each partner once.
    <li className="w-76 min-w-0 flex-none pl-5" aria-hidden={duplicate || undefined}>
      {partner.instagram ? (
        <a
          href={instagramHref(partner.instagram)}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={duplicate ? -1 : undefined}
          className={`${card} hover:border-brand/40 hover:shadow-card`}
        >
          {body}
          <span className="sr-only">, Instagram hesabı, yeni sekmede açılır</span>
        </a>
      ) : (
        <div className={card}>{body}</div>
      )}
    </li>
  );
}
