import { defineArrayMember, defineField, defineType } from "sanity";

// "//host" is protocol-relative (external), so a site path must be "/" not followed by another "/" or "\".
const SAFE_URL = /^(https?:\/\/|mailto:|tel:|\/(?![/\\]))/i;

export const blockContent = defineType({
  name: "blockContent",
  title: "Metin",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraf", value: "normal" },
        { title: "Ara başlık", value: "h2" },
        { title: "Küçük ara başlık", value: "h3" },
        { title: "Alıntı", value: "blockquote" },
      ],
      lists: [
        { title: "Madde işaretli", value: "bullet" },
        { title: "Numaralı", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Kalın", value: "strong" },
          { title: "İtalik", value: "em" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            title: "Bağlantı",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "Adres",
                type: "string",
                validation: (rule) =>
                  rule
                    .required()
                    .custom((value) =>
                      !value || SAFE_URL.test(value)
                        ? true
                        : "https://, mailto:, tel: ya da site içi bir yol (/blog gibi) girin.",
                    ),
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      title: "Görsel",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternatif metin",
          type: "string",
          validation: (rule) => rule.required().error("Alternatif metin zorunludur."),
        }),
        defineField({ name: "caption", title: "Görsel altı yazısı", type: "string" }),
      ],
    }),
  ],
});
