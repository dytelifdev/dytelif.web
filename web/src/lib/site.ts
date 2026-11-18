/**
 * Verified fallbacks used until (or unless) the editor fills Site ayarları in Sanity.
 * Every value here was confirmed by the client; do not add unconfirmed facts.
 */
export const SITE = {
  name: "Dyt. Elif Sude Özkan",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://dytelifsudeozkan.com").replace(/\/$/, ""),
  description:
    "Nilüfer, Bursa'da yüz yüze ve Türkiye'nin her yerinden online beslenme danışmanlığı. Bilimsel temelli, sürdürülebilir ve kişiye özgü beslenme programları.",
  headline: "Beslenmeniz, size göre.",
  intro:
    "Bilimsel temelli, sürdürülebilir ve kişiye özgü beslenme programları. Nilüfer'de yüz yüze, Türkiye'nin her yerinden online.",
  whatsapp: "905330167278",
  phoneDisplay: "+90 533 016 72 78",
  email: "info.elifsudeozkan@gmail.com",
  location: "Nilüfer, Bursa",
  instagramUrl: "https://www.instagram.com/bursadiyetisyenelifsudeozkan/",
  address: {
    venue: "Mossa Rooms Özlüce",
    street: "Ertuğrul, 161. (270) Sk. No: 5C",
    postalCode: "16235",
    district: "Nilüfer",
    city: "Bursa",
  },
} as const;

export type Address = { venue: string; street: string; postalCode: string; district: string; city: string };

/** Display lines: venue, street, then "postal code district / city". */
export function addressLines(a: Address) {
  return [a.venue, a.street, [a.postalCode, `${a.district} / ${a.city}`].filter(Boolean).join(" ")].filter(Boolean);
}

/** Google Maps search for the address (Maps URLs API), unless the editor set a place link. */
export function mapsHref(a: Address, override?: string | null) {
  if (override) return override;
  const query = [a.venue, a.street, a.postalCode, a.district, a.city].filter(Boolean).join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function instagramHref(handle: string) {
  return `https://www.instagram.com/${handle}/`;
}

export const NAV = [
  { href: "/hakkimda", label: "Hakkımda" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/blog", label: "Blog" },
  { href: "/galeri", label: "Galeri" },
  { href: "/duyurular", label: "Duyurular" },
  { href: "/urunler", label: "Ürünlerimiz" },
  { href: "/iletisim", label: "İletişim" },
] as const;

export function whatsappHref(number: string, text?: string) {
  const base = `https://wa.me/${number.replace(/\D/g, "")}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const WHATSAPP_GREETING =
  "Merhaba, web sitenizden ulaşıyorum. Beslenme danışmanlığı hakkında bilgi almak istiyorum.";
