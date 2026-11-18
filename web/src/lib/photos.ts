import type { StaticImageData } from "next/image";
import elif10 from "../../public/photo/elif10.webp";
import portrait from "../../public/photo/eif11.webp";
import elif12 from "../../public/photo/elif12.webp";
import elif1 from "../../public/photo/elif1.webp";
import elif2 from "../../public/photo/elif2.webp";
import elif3 from "../../public/photo/elif3.webp";
import elif5 from "../../public/photo/elif5.webp";
import elif6 from "../../public/photo/elif6.webp";
import elif7 from "../../public/photo/elif7.webp";
import elif8 from "../../public/photo/elif8.webp";
import elif9 from "../../public/photo/elif9.webp";

/**
 * The client's own photographs (web/public/photo). Static imports give Next.js
 * the dimensions and blur placeholder at build time. A photo uploaded to the
 * matching Sanity field always takes priority over these.
 */
export type LocalPhoto = {
  src: StaticImageData;
  alt: string;
  /** CSS object-position used when the frame crops the photo */
  focus?: string;
  caption?: string;
  category?: string;
};

export const PHOTOS = {
  heroPortrait: {
    src: portrait,
    alt: "Diyetisyen Elif Sude Özkan, beyaz önlüğüyle stüdyo portresi",
    focus: "50% 22%",
  },
  aboutPortrait: {
    src: elif10,
    alt: "Elif Sude Özkan, beyaz önlüğüyle aydınlık bir çalışma ortamında",
    focus: "50% 30%",
  },
  measurement: {
    src: elif7,
    alt: "Elif Sude Özkan, vücut analiz cihazının yanında",
    focus: "50% 40%",
  },
  graduation: {
    src: elif2,
    alt: "Elif Sude Özkan mezuniyet töreninde, cübbe ve kepiyle",
    focus: "50% 25%",
  },
  university: {
    src: elif3,
    alt: "Elif Sude Özkan, Acıbadem Üniversitesi binasının önünde",
    focus: "50% 45%",
  },
  event: {
    src: elif6,
    alt: "Elif Sude Özkan, Acıbadem Üniversitesi'ndeki bir beslenme etkinliğinde",
    focus: "50% 30%",
  },
} satisfies Record<string, LocalPhoto>;

/** Shown on /galeri and the home excerpt until the editor adds gallery photos in Sanity. */
export const GALLERY_PHOTOS: (LocalPhoto & { id: string })[] = [
  { id: "elif7", ...PHOTOS.measurement, caption: "Ölçüm ve vücut analizi", category: "Danışmanlık" },
  {
    id: "elif5",
    src: elif5,
    alt: "Elif Sude Özkan, beyaz önlüğüyle pencere önünde",
    caption: "Danışmanlık günü",
    category: "Danışmanlık",
  },
  { id: "elif2", ...PHOTOS.graduation, caption: "Mezuniyet, Temmuz 2025", category: "Eğitim" },
  { id: "elif6", ...PHOTOS.event, caption: "Acıbadem Üniversitesi'nde bir beslenme etkinliği", category: "Eğitim" },
  { id: "elif3", ...PHOTOS.university, caption: "Acıbadem Üniversitesi", category: "Eğitim" },
  { id: "elif12", src: elif12, alt: "Elif Sude Özkan, sarı koltuklu modern bir iç mekânda", category: "Günlük hayat" },
  { id: "elif9", src: elif9, alt: "Elif Sude Özkan, deniz kıyısında yeşil bir sandalyede", category: "Günlük hayat" },
  { id: "elif8", src: elif8, alt: "Elif Sude Özkan, deniz manzaralı bir verandada", category: "Günlük hayat" },
  { id: "elif1", src: elif1, alt: "Elif Sude Özkan, akşam vakti Boğaz köprüsü manzarasıyla", category: "Günlük hayat" },
];

/** Home gallery excerpt: varied moments that do not repeat photos used elsewhere on the home page. */
export const HOME_GALLERY = ["elif2", "elif9", "elif6", "elif3"].flatMap((id) =>
  GALLERY_PHOTOS.filter((photo) => photo.id === id),
);
