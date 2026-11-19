import { CogIcon } from "@sanity/icons/Cog";
import { defineArrayMember, defineField, defineType } from "sanity";
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
    { name: "social", title: "Sosyal medya" },
    { name: "legal", title: "Yasal metinler" },
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
      title: "Konum (kısa)",
      description: "Metinlerde geçen kısa konum: semt ve şehir.",
      type: "string",
      group: "contact",
      initialValue: "Nilüfer, Bursa",
    }),
    defineField({
      name: "address",
      title: "Açık adres",
      description: "Footer'da, İletişim sayfasında ve arama motorlarına verilen işletme bilgisinde görünür.",
      type: "object",
      group: "contact",
      options: { collapsible: false },
      fields: [
        defineField({ name: "venue", title: "Mekân adı", type: "string", initialValue: "Mossa Rooms Özlüce" }),
        defineField({
          name: "street",
          title: "Mahalle, sokak ve numara",
          type: "string",
          initialValue: "Ertuğrul, 161. (270) Sk. No: 5C",
        }),
        defineField({ name: "postalCode", title: "Posta kodu", type: "string", initialValue: "16235" }),
        defineField({ name: "district", title: "İlçe", type: "string", initialValue: "Nilüfer" }),
        defineField({ name: "city", title: "İl", type: "string", initialValue: "Bursa" }),
      ],
    }),
    defineField({
      name: "mapsUrl",
      title: "Harita bağlantısı",
      description: "İsteğe bağlı: Google Maps'teki işletme bağlantısı. Boşsa adres Google Maps'te aranır.",
      type: "url",
      group: "contact",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram adresi",
      type: "url",
      group: "social",
      initialValue: "https://www.instagram.com/bursadiyetisyenelifsudeozkan/",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
    ...(
      [
        ["xUrl", "X (Twitter) adresi"],
        ["facebookUrl", "Facebook adresi"],
        ["linkedinUrl", "LinkedIn adresi"],
        ["tiktokUrl", "TikTok adresi"],
        ["youtubeUrl", "YouTube adresi"],
      ] as const
    ).map(([name, title]) =>
      defineField({
        name,
        title,
        description: "Adres girildiğinde ikonu sitenin üst şeridinde, footer'da ve iletişim sayfasında görünür.",
        type: "url",
        group: "social",
        validation: (rule) => rule.uri({ scheme: ["https"] }),
      }),
    ),
    defineField({
      name: "doktorTakvimiUrl",
      title: "DoktorTakvimi profil adresi",
      description: "Boş bırakılırsa sitede gösterilmez.",
      type: "url",
      group: "contact",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "faqs",
      title: "Sıkça sorulan sorular",
      description: "Ana sayfada ve Hizmetler sayfasında görünür. Boş bırakılırsa sitedeki varsayılan sorular kullanılır.",
      type: "array",
      group: "home",
      of: [
        defineArrayMember({
          type: "object",
          name: "faq",
          title: "Soru",
          fields: [
            defineField({
              name: "question",
              title: "Soru",
              type: "string",
              validation: (rule) => rule.required().max(140),
            }),
            defineField({
              name: "answer",
              title: "Cevap",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required().max(600),
            }),
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        }),
      ],
    }),
    defineField({
      name: "privacyNotice",
      title: "KVKK aydınlatma metni",
      description:
        "Hukuki danışmanlıkla hazırlanmış metni buraya ekleyin. Boşken /kvkk sayfasında sitenin gerçek veri akışını anlatan taslak metin gösterilir.",
      type: "blockContent",
      group: "legal",
    }),
    defineField({
      name: "privacyPolicy",
      title: "Gizlilik politikası",
      description: "Boşken /gizlilik-politikasi sayfasında taslak metin gösterilir.",
      type: "blockContent",
      group: "legal",
    }),
    defineField({
      name: "cookiePolicy",
      title: "Çerez politikası",
      description: "Boşken /cerez-politikasi sayfasında taslak metin gösterilir.",
      type: "blockContent",
      group: "legal",
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
    defineField({
      name: "productsSeo",
      title: "Ürünler sayfası SEO",
      description: "Boş bırakılırsa sayfa başlığı, metni ve görseli kullanılır.",
      type: "seo",
      group: "products",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site ayarları" }),
  },
});
