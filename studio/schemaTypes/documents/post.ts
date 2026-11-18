import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineField, defineType } from "sanity";
import { imageField, seoField, slugField } from "../fields";

export const post = defineType({
  name: "post",
  title: "Blog yazısı",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "İçerik", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Başlık",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(110),
    }),
    { ...slugField(), group: "content" },
    defineField({
      name: "publishedAt",
      title: "Yayın tarihi",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Kısa özet",
      description: "Listelerde ve arama sonuçlarında görünür.",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.required().max(260),
    }),
    imageField({ name: "coverImage", title: "Kapak görseli", group: "content" }),
    defineField({
      name: "body",
      title: "Yazı",
      type: "blockContent",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    seoField,
  ],
  orderings: [
    { title: "Yayın tarihi (yeni)", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", date: "publishedAt", media: "coverImage" },
    prepare: ({ title, date, media }) => ({
      title,
      subtitle: date ? new Date(date).toLocaleDateString("tr-TR") : "Tarih yok",
      media,
    }),
  },
});
