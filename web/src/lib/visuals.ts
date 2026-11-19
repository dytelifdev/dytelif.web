import type { StaticImageData } from "next/image";
import anneCocuk from "../../public/images/hizmet-anne-cocuk.jpg";
import diyabet from "../../public/images/hizmet-diyabet.jpg";
import gebelik from "../../public/images/hizmet-gebelik.jpg";
import hastalik from "../../public/images/hizmet-hastalik.jpg";
import ileriYas from "../../public/images/hizmet-ileri-yas.jpg";
import kilo from "../../public/images/hizmet-kilo.jpg";
import online from "../../public/images/hizmet-online.jpg";
import vucutAnalizi from "../../public/images/hizmet-vucut-analizi.jpg";
import yetiskin from "../../public/images/hizmet-yetiskin.jpg";
import { PHOTOS } from "./photos";

/**
 * Licensed photography (Unsplash License; provenance beside each file in
 * public/images), one scene that says what each service is. A photo uploaded
 * in Sanity always wins.
 */
export type Visual = { src: StaticImageData; alt: string; focus?: string };

const SERVICE_VISUALS: Record<string, Visual> = {
  "yetiskin-beslenme-danismanligi": {
    src: yetiskin,
    alt: "Danışmanlık masasında, meyve kâsesinin yanında beslenme planı yazan diyetisyen",
  },
  "kilo-yonetimi": {
    src: kilo,
    alt: "Mezura sarılı beyaz tabakta bezelye ve fesleğen",
  },
  "anne-ve-cocuk-beslenmesi": {
    src: anneCocuk,
    alt: "Mutfakta birlikte salata hazırlayan anne ve kızı",
    focus: "50% 40%",
  },
  "gebelik-ve-emzirme-beslenmesi": {
    src: gebelik,
    alt: "Hamile bir kadının karnının önünde uzatılan kırmızı elma",
  },
  "ileri-yas-beslenmesi": {
    src: ileriYas,
    alt: "Ahşap masa başında kahvaltı eden, dedeyle torunların bulunduğu bir aile",
    focus: "60% 40%",
  },
  "hastaliklarda-beslenme": {
    src: hastalik,
    alt: "Açık mavi zemin üzerinde bir steteskop",
  },
  "diyabette-beslenme": {
    src: diyabet,
    alt: "Sebzeli bir yemek tabağının önünde kan şekeri ölçüm cihazı",
  },
  "online-beslenme-danismanligi": {
    src: online,
    alt: "Dizüstü bilgisayarda görüntülü görüşme yaparken el sallayan bir kadın",
    focus: "60% 50%",
  },
  "vucut-analizi-ve-olcum": {
    src: vucutAnalizi,
    alt: "Beyaz zemin üzerinde kıvrılmış bir mezura",
  },
};

/** The service's photo by slug, or the consultation scene for services added later. */
export function serviceVisual(slug: string | null | undefined): Visual {
  return (slug && SERVICE_VISUALS[slug]) || SERVICE_VISUALS["yetiskin-beslenme-danismanligi"];
}

/** "Ürünlerimiz" while the page is coming soon: her studio portrait. */
export const PRODUCTS_VISUAL: Visual = PHOTOS.heroPortrait;
