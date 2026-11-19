import { CommentIcon } from "@sanity/icons/Comment";
import { defineField, defineType } from "sanity";
import { orderField } from "../fields";

/**
 * Real client feedback, published only with the client's permission. The home
 * page shows this section only when at least one entry is published.
 */
export const testimonial = defineType({
  name: "testimonial",
  title: "Danışan yorumu",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "name",
      title: "Ad",
      description: "Danışanın izin verdiği biçimde, ör. Ayşe K.",
      type: "string",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "context",
      title: "Kısa bilgi",
      description: "İsteğe bağlı, ör. Online danışan · 3 ay.",
      type: "string",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "quote",
      title: "Yorum",
      description: "Danışanın kendi sözleri; kısaltabilirsiniz ama anlamını değiştirmeyin.",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required().max(480),
    }),
    defineField({
      name: "consent",
      title: "Danışanın yayın izni var",
      description: "İzin alınmamış yorum yayımlanamaz.",
      type: "boolean",
      initialValue: false,
      validation: (rule) =>
        rule.custom((value) => (value === true ? true : "Yayımlamak için danışanın iznini onaylayın.")),
    }),
    orderField,
  ],
  orderings: [{ title: "Sıra", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "quote" } },
});
