/**
 * Verified fallbacks used until (or unless) the editor fills Site ayarları in Sanity.
 * Every value here was confirmed by the client; do not add unconfirmed facts.
 */
export const SITE = {
  name: "Dyt. Elif Sude Özkan",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://dytelifsudeozkan.com").replace(/\/$/, ""),
  description:
    "Diyetisyen Elif Sude Özkan ile kişiye özel beslenme danışmanlığı: Nilüfer, Bursa'da yüz yüze, Türkiye'nin her yerinden online. Ölçümle başlayan, takiple kalıcı olan programlar.",
  headline: "Beslenmenizi hayatınıza göre tasarlayalım.",
  intro:
    "Ölçümle başlayan, size özel kurulan ve düzenli takiple alışkanlığa dönüşen bir beslenme danışmanlığı. Nilüfer'de yüz yüze ya da Türkiye'nin her yerinden online.",
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

/** The address as one search line for Google Maps. */
export function mapQuery(a: Address) {
  return [a.venue, a.street, a.postalCode, a.district, a.city].filter(Boolean).join(", ");
}

/** Google Maps search for the address (Maps URLs API), unless the editor set a place link. */
export function mapsHref(a: Address, override?: string | null) {
  if (override) return override;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery(a))}`;
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

/** Information pages listed under "Kurumsal" in the footer. */
export const LEGAL = [
  { href: "/kvkk", label: "KVKK Aydınlatma Metni" },
  { href: "/gizlilik-politikasi", label: "Gizlilik Politikası" },
  { href: "/cerez-politikasi", label: "Çerez Politikası" },
] as const;

export type SocialNetwork = "instagram" | "x" | "facebook" | "linkedin" | "tiktok" | "youtube";

export const SOCIAL_LABELS: Record<SocialNetwork, string> = {
  instagram: "Instagram",
  x: "X (Twitter)",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
  youtube: "YouTube",
};

/** "@handle" from an Instagram profile URL, for display next to the icon. */
export function instagramHandle(url: string) {
  const match = url.match(/instagram\.com\/([^/?#]+)/i);
  return match ? `@${match[1]}` : "Instagram";
}

export function whatsappHref(number: string, text?: string) {
  const base = `https://wa.me/${number.replace(/\D/g, "")}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const WHATSAPP_GREETING =
  "Merhaba, web sitenizden ulaşıyorum. Beslenme danışmanlığı hakkında bilgi almak istiyorum.";
