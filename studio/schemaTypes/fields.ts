import { defineField } from "sanity";

type ImageFieldOptions = {
  name: string;
  title: string;
  description?: string;
  required?: boolean;
  group?: string;
};

/** Image with hotspot and a required alt text whenever an image is set. */
export function imageField({ name, title, description, required, group }: ImageFieldOptions) {
  return defineField({
    name,
    title,
    description,
    group,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alternatif metin",
        description: "Görme engelli ziyaretçiler ve arama motorları için fotoğrafı kısaca anlatın.",
        type: "string",
        validation: (rule) =>
          rule.custom((alt, context) => {
            const parent = context.parent as { asset?: unknown } | undefined;
            if (parent?.asset && !alt?.trim()) return "Görsel eklendiyse alternatif metin zorunludur.";
            return true;
          }),
      }),
    ],
    validation: required ? (rule) => rule.required().error("Görsel zorunludur.") : undefined,
  });
}

export function slugField(source = "title") {
  return defineField({
    name: "slug",
    title: "Bağlantı adresi (slug)",
    description: "Sayfa adresinde görünür. Başlıktan otomatik üretmek için 'Generate' düğmesini kullanın.",
    type: "slug",
    options: {
      source,
      maxLength: 96,
      slugify: (input: string) =>
        input
          .toLocaleLowerCase("tr-TR")
          .replace(/ç/g, "c")
          .replace(/ğ/g, "g")
          .replace(/ı/g, "i")
          .replace(/ö/g, "o")
          .replace(/ş/g, "s")
          .replace(/ü/g, "u")
          .normalize("NFKD")
          .replace(/[̀-ͯ]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
          .slice(0, 96),
    },
    validation: (rule) => rule.required().error("Bağlantı adresi zorunludur."),
  });
}

export const orderField = defineField({
  name: "order",
  title: "Sıra",
  description: "Küçük sayı önce gösterilir.",
  type: "number",
  initialValue: 10,
  validation: (rule) => rule.integer().min(0),
});

export const seoField = defineField({
  name: "seo",
  title: "SEO",
  type: "seo",
  group: "seo",
});
