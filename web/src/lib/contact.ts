import "server-only";
import { getSettings } from "@/sanity/fetch";
import { mapsHref, SITE, type Address, type SocialNetwork } from "./site";

const ALWAYS_SHOWN = new Set<SocialNetwork>(["instagram", "x", "facebook", "linkedin"]);

/** Contact details: Site ayarları in Sanity first, confirmed defaults otherwise. */
export async function getContact() {
  const s = await getSettings();
  const a = s?.address;
  const address: Address = {
    venue: a?.venue || SITE.address.venue,
    street: a?.street || SITE.address.street,
    postalCode: a?.postalCode || SITE.address.postalCode,
    district: a?.district || SITE.address.district,
    city: a?.city || SITE.address.city,
  };
  const instagramUrl = s?.instagramUrl || SITE.instagramUrl;
  // Instagram, X, Facebook and LinkedIn always show (an icon without a link until its address
  // is entered in Studio); TikTok and YouTube appear only once they have an address.
  const socials = (
    [
      ["instagram", instagramUrl],
      ["x", s?.xUrl],
      ["facebook", s?.facebookUrl],
      ["linkedin", s?.linkedinUrl],
      ["tiktok", s?.tiktokUrl],
      ["youtube", s?.youtubeUrl],
    ] as [SocialNetwork, string | null | undefined][]
  ).flatMap(([network, url]) => (url || ALWAYS_SHOWN.has(network) ? [{ network, url: url || null }] : []));

  return {
    address,
    mapsUrl: mapsHref(address, s?.mapsUrl),
    whatsapp: s?.whatsapp || SITE.whatsapp,
    phoneDisplay: s?.phoneDisplay || SITE.phoneDisplay,
    email: s?.email || SITE.email,
    location: s?.location || SITE.location,
    instagramUrl,
    xUrl: s?.xUrl || null,
    doktorTakvimiUrl: s?.doktorTakvimiUrl || null,
    socials,
  };
}

export type Contact = Awaited<ReturnType<typeof getContact>>;

export function telHref(display: string) {
  return `tel:${display.replace(/[^\d+]/g, "")}`;
}
