import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      title: "Arama sonucu başlığı",
      description: "Boş bırakılırsa sayfa başlığı kullanılır. En fazla 60 karakter önerilir.",
      type: "string",
      validation: (rule) => rule.max(70).warning("60 karakteri geçen başlıklar arama sonuçlarında kesilebilir."),
    }),
    defineField({
      name: "description",
      title: "Arama sonucu açıklaması",
      description: "Boş bırakılırsa kısa özet kullanılır. 120–160 karakter önerilir.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(180).warning("160 karakteri geçen açıklamalar kesilebilir."),
    }),
    defineField({
      name: "image",
      title: "Paylaşım görseli",
      description: "Sosyal medyada paylaşıldığında görünür. 1200×630 önerilir.",
      type: "image",
    }),
  ],
});
