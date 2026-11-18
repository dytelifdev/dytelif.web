import "server-only";
import { getSettings } from "@/sanity/fetch";
import { SITE } from "./site";

/** Contact details: Site ayarları in Sanity first, confirmed defaults otherwise. */
export async function getContact() {
  const s = await getSettings();
  return {
    whatsapp: s?.whatsapp || SITE.whatsapp,
    phoneDisplay: s?.phoneDisplay || SITE.phoneDisplay,
    email: s?.email || SITE.email,
    location: s?.location || SITE.location,
    instagramUrl: s?.instagramUrl || SITE.instagramUrl,
    xUrl: s?.xUrl || null,
    doktorTakvimiUrl: s?.doktorTakvimiUrl || null,
  };
}

export type Contact = Awaited<ReturnType<typeof getContact>>;

export function telHref(display: string) {
  return `tel:${display.replace(/[^\d+]/g, "")}`;
}
