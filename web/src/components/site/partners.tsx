import { Container, Folio, Railed } from "@/components/herbarium/folio";
import { SpecimenSheet, Tape } from "@/components/herbarium/specimen";
import { InstagramIcon } from "@/components/icons/brand-icons";
import { SanityImage } from "@/components/sanity-image";
import { instagramHref } from "@/lib/site";
import { getPartners } from "@/sanity/fetch";
import { hasImage } from "@/sanity/image";
import type { PARTNERS_QUERY_RESULT } from "@/sanity/types";

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
 * Exchange register: the studios, specialists and brands she works with, each
 * pressed onto a cream sheet as a round accession stamp with a bronze ring.
 * The whole row links to the partner's Instagram; hovering one dims the rest.
 * Renders nothing until at least one partner is published in Sanity.
 */
export async function Partners({ title = "İş birlikleri" }: { title?: string }) {
  const partners = await getPartners();
  if (partners.length === 0) return null;
  return (
    <Folio surface="olive" aria-labelledby="is-birlikleri">
      <Container className="py-20 lg:py-28">
        <Railed
          aside={
            <div className="flex flex-col gap-5 pb-14 lg:pb-0">
              <h2 id="is-birlikleri" className="font-display text-headline">
                {title}
              </h2>
              <p className="max-w-sm text-lg leading-relaxed text-on-surface-soft">
                Bursa&apos;da birlikte çalıştığım stüdyolar, uzmanlar ve markalar. Her birinin Instagram hesabına
                buradan ulaşabilirsiniz.
              </p>
            </div>
          }
        >
          <SpecimenSheet className="px-5 pt-9 pb-4 sm:px-8 sm:pt-11 lg:px-10">
            <Tape position="top-left" />
            <Tape position="top-right" />
            <ul className="grid border-t-2 border-ink sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-1 [&:has(a:focus-visible)>li:not(:focus-within)]:opacity-55 [&:has(a:hover)>li:not(:hover)]:opacity-55">
              {partners.map((partner) => (
                <PartnerEntry key={partner._id} partner={partner} />
              ))}
            </ul>
          </SpecimenSheet>
        </Railed>
      </Container>
    </Folio>
  );
}

function PartnerEntry({ partner }: { partner: Partner }) {
  const name = partner.name ?? "";
  const meta = [partner.category, partner.area].filter(Boolean).join(" · ");
  // Small screens: stamp beside name and meta, handle underneath. From lg the register
  // is one column and the handle moves to its own column on the right.
  const row =
    "grid grid-cols-[3.75rem_minmax(0,1fr)] items-center gap-x-5 gap-y-1.5 py-5 lg:grid-cols-[4.25rem_minmax(0,1fr)_auto] lg:gap-x-6 lg:py-4";
  const body = (
    <>
      <div className="row-span-2 aspect-square rounded-full outline-1 outline-offset-3 outline-bronze/70 transition-transform duration-500 ease-out-expo motion-safe:group-hover:-rotate-6 lg:row-span-1">
        {hasImage(partner.logo) ? (
          <SanityImage
            image={partner.logo}
            aspect={1}
            alt=""
            sizes="4.5rem"
            className="size-full rounded-full bg-paper object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="grid size-full place-items-center rounded-full bg-paper font-display text-xl text-bronze-ink"
          >
            {initials(name)}
          </span>
        )}
      </div>
      <div
        className={`min-w-0 lg:row-span-1 lg:self-center ${partner.instagram ? "self-end" : "row-span-2 self-center"}`}
      >
        <h3 className="font-display text-xl leading-snug text-balance decoration-1 underline-offset-[0.18em] group-hover:underline">
          {name}
        </h3>
        {meta ? <span className="mt-0.5 block text-sm text-ink-soft">{meta}</span> : null}
      </div>
      {partner.instagram ? (
        <span className="col-start-2 flex items-center gap-1.5 self-start text-sm font-medium wrap-anywhere text-ink lg:col-start-3 lg:row-start-1 lg:self-center">
          <InstagramIcon aria-hidden="true" className="size-3.5 shrink-0" />@{partner.instagram}
        </span>
      ) : null}
    </>
  );
  return (
    <li className="border-b border-ink/15 transition-opacity duration-300">
      {partner.instagram ? (
        <a
          href={instagramHref(partner.instagram)}
          target="_blank"
          rel="noopener noreferrer"
          className={`group ${row} focus-visible:outline-offset-4`}
        >
          {body}
          <span className="sr-only">, Instagram hesabı, yeni sekmede açılır</span>
        </a>
      ) : (
        <div className={row}>{body}</div>
      )}
    </li>
  );
}
