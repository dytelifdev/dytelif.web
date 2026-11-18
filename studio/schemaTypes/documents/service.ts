import { HeartIcon } from "@sanity/icons/Heart";
import { defineField, defineType } from "sanity";
import { imageField, orderField, seoField, slugField } from "../fields";

export const service = defineType({
  name: "service",
  title: "Hizmet",
  type: "document",
  icon: HeartIcon,
  groups: [
    { name: "content", title: "İçerik", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Hizmet adı",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(80),
    }),
    { ...slugField(), group: "content" },
    defineField({
      name: "summary",
      title: "Kısa özet",
      description: "Listelerde görünür. 1–2 cümle.",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.required().max(240),
    }),
    imageField({ name: "image", title: "Görsel", group: "content" }),
    defineField({ name: "body", title: "Açıklama", type: "blockContent", group: "content" }),
    { ...orderField, group: "content" },
    defineField({
      name: "featured",
      title: "Ana sayfada öne çıkar",
      type: "boolean",
      group: "content",
      initialValue: true,
    }),
    seoField,
  ],
  orderings: [{ title: "Sıra", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "summary", media: "image" } },
});
