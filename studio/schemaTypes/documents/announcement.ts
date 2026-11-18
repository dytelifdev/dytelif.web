import { BellIcon } from "@sanity/icons/Bell";
import { defineField, defineType } from "sanity";
import { imageField, seoField, slugField } from "../fields";

export const announcement = defineType({
  name: "announcement",
  title: "Duyuru",
  type: "document",
  icon: BellIcon,
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
      title: "Duyuru tarihi",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Kısa metin",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.required().max(260),
    }),
    imageField({ name: "image", title: "Görsel", group: "content" }),
    defineField({ name: "body", title: "Ayrıntı", type: "blockContent", group: "content" }),
    seoField,
  ],
  orderings: [
    { title: "Tarih (yeni)", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", date: "publishedAt", media: "image" },
    prepare: ({ title, date, media }) => ({
      title,
      subtitle: date ? new Date(date).toLocaleDateString("tr-TR") : undefined,
      media,
    }),
  },
});
