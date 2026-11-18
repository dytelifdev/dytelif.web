import { PackageIcon } from "@sanity/icons/Package";
import { defineField, defineType } from "sanity";
import { imageField, orderField, seoField, slugField } from "../fields";

/**
 * Product teasers only. No price, stock, cart or checkout by design:
 * the public list stays hidden until Site ayarları > Ürünler is set to "Ürünleri göster".
 */
export const product = defineType({
  name: "product",
  title: "Ürün tanıtımı",
  type: "document",
  icon: PackageIcon,
  groups: [
    { name: "content", title: "İçerik", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Ürün adı",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(80),
    }),
    { ...slugField(), group: "content" },
    defineField({
      name: "summary",
      title: "Kısa açıklama",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.required().max(260),
    }),
    imageField({ name: "image", title: "Görsel", group: "content" }),
    { ...orderField, group: "content" },
    seoField,
  ],
  orderings: [{ title: "Sıra", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "summary", media: "image" } },
});
