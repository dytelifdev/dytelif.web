import { ImagesIcon } from "@sanity/icons/Images";
import { defineField, defineType } from "sanity";
import { imageField, orderField } from "../fields";

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Galeri fotoğrafı",
  type: "document",
  icon: ImagesIcon,
  fields: [
    imageField({ name: "image", title: "Fotoğraf", required: true }),
    defineField({
      name: "caption",
      title: "Fotoğraf altı yazısı",
      description: "Kısa, isteğe bağlı açıklama.",
      type: "string",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      description: "Galerideki filtre için. Örnek: Danışmanlık, Mutfak, Etkinlik.",
      type: "string",
      validation: (rule) => rule.max(40),
    }),
    orderField,
  ],
  orderings: [{ title: "Sıra", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "caption", alt: "image.alt", subtitle: "category", media: "image" },
    prepare: ({ title, alt, subtitle, media }) => ({ title: title || alt || "Fotoğraf", subtitle, media }),
  },
});
