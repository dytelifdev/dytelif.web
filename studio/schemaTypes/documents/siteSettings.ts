import { CogIcon } from "@sanity/icons/Cog";
import { defineField, defineType } from "sanity";
import { imageField } from "../fields";

const WHATSAPP_DIGITS = /^\d{10,15}$/;

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site ayarları",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "home", title: "Ana sayfa", default: true },
    { name: "about", title: "Hakkımda" },
    { name: "contact", title: "İletişim" },
    { name: "products", title: "Ürünler" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Site adı",
      type: "string",
      group: "seo",
      initialValue: "Dyt. Elif Sude Özkan",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Site açıklaması",
      description: "Arama sonuçlarında ve paylaşımlarda görünür. 120–160 karakter önerilir.",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (rule) => rule.max(180),
    }),
    imageField({
      name: "ogImage",
      title: "Varsayılan paylaşım görseli",
      description: "1200×630 önerilir.",
      group: "seo",
    }),

    defineField({
      name: "heroHeadline",
      title: "Ana sayfa başlığı",
      description: "Kısa ve tek cümle. Boş bırakılırsa sitedeki varsayılan başlık kullanılır.",
      type: "string",
      group: "home",
      validation: (rule) => rule.max(90),
    }),
    defineField({
      name: "heroIntro",
      title: "Ana sayfa giriş metni",
      type: "text",
      rows: 3,
      group: "home",
      validation: (rule) => rule.max(280),
    }),
    imageField({
      name: "heroImage",
      title: "Ana sayfa portresi",
      description: "Dikey (4:5) portre önerilir; en az 1600 px yükseklik. Odak noktasını yüzünüze getirin.",
      group: "home",
    }),

    imageField({
      name: "aboutImage",
      title: "Hakkımda portresi",
      description: "Dikey (3:4) portre önerilir.",
      group: "about",
    }),
    defineField({
      name: "aboutIntro",
      title: "Hakkımda giriş metni",
      description: "Boş bırakılırsa CV'den derlenen varsayılan metin kullanılır.",
      type: "blockContent",
      group: "about",
    }),

    defineField({
      name: "whatsapp",
      title: "WhatsApp numarası",
      description: "Ülke koduyla, yalnızca rakam. Örnek: 905330167278",
      type: "string",
      group: "contact",
      initialValue: "905330167278",
      validation: (rule) =>
        rule.custom((value) =>
          !value || WHATSAPP_DIGITS.test(value) ? true : "Yalnızca rakam girin, ülke koduyla (90…).",
        ),
    }),
    defineField({
      name: "phoneDisplay",
      title: "Telefon (görünen biçim)",
      type: "string",
      group: "contact",
      initialValue: "+90 533 016 72 78",
    }),
    defineField({
      name: "email",
      title: "E-posta",
      type: "string",
      group: "contact",
      initialValue: "info.elifsudeozkan@gmail.com",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "location",
      title: "Konum",
      description: "Tam adres yerine semt ve şehir yeterli.",
      type: "string",
      group: "contact",
      initialValue: "Nilüfer, Bursa",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram adresi",
      type: "url",
      group: "contact",
      initialValue: "https://www.instagram.com/bursadiyetisyenelifsudeozkan/",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "xUrl",
      title: "X (Twitter) adresi",
      description: "Boş bırakılırsa X bağlantısı sitede gösterilmez.",
      type: "url",
      group: "contact",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "doktorTakvimiUrl",
      title: "DoktorTakvimi profil adresi",
      description: "Boş bırakılırsa sitede gösterilmez.",
      type: "url",
      group: "contact",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "privacyNotice",
      title: "Kişisel verilerin korunması (KVKK) aydınlatma metni",
      description:
        "Hukuki danışmanlıkla hazırlanmış metni buraya ekleyin. Boşken iletişim sayfasında taslak uyarısı gösterilir.",
      type: "blockContent",
      group: "contact",
    }),

    defineField({
      name: "productsStatus",
      title: "Ürünler sayfasının durumu",
      description:
        "'Çok yakında' seçiliyken ürün listesi gizlenir. Yayınlanmış ürünleri göstermek için 'Ürünleri göster' seçin.",
      type: "string",
      group: "products",
      initialValue: "comingSoon",
      options: {
        layout: "radio",
        list: [
          { title: "Çok yakında", value: "comingSoon" },
          { title: "Ürünleri göster", value: "published" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "productsTitle",
      title: "Ürünler sayfası başlığı",
      type: "string",
      group: "products",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "productsIntro",
      title: "Ürünler sayfası metni",
      type: "text",
      rows: 3,
      group: "products",
      validation: (rule) => rule.max(320),
    }),
    imageField({ name: "productsImage", title: "Ürünler sayfası görseli", group: "products" }),
  ],
  preview: {
    prepare: () => ({ title: "Site ayarları" }),
  },
});
