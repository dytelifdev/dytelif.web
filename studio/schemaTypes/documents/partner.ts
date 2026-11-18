import { UsersIcon } from "@sanity/icons/Users";
import { defineField, defineType } from "sanity";
import { imageField, orderField } from "../fields";

const HANDLE = /^[A-Za-z0-9._]{1,30}$/;

/**
 * Studios, specialists and brands the dietitian works with. Shown on the home
 * page as a register of stamps; each entry links to the partner's Instagram.
 */
export const partner = defineType({
  name: "partner",
  title: "İş birliği",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "name",
      title: "Ad",
      description: "Stüdyonun, uzmanın ya da markanın kendini tanıttığı ad.",
      type: "string",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "category",
      title: "Alan",
      description: "Kısa tanım, ör. Pilates ve yoga stüdyosu.",
      type: "string",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "area",
      title: "Semt",
      description: "İsteğe bağlı, ör. Özlüce.",
      type: "string",
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: "instagram",
      title: "Instagram kullanıcı adı",
      description: "@ olmadan, ör. merikafit.studyo. Boş bırakılırsa sitede bağlantı gösterilmez.",
      type: "string",
      validation: (rule) =>
        rule.custom((value) =>
          !value || HANDLE.test(value) ? true : "Yalnızca harf, rakam, nokta ve alt çizgi; en fazla 30 karakter.",
        ),
    }),
    imageField({
      name: "logo",
      title: "Logo",
      description: "Kare görsel; sitede yuvarlak kırpılır. Instagram profil görseli uygundur.",
    }),
    orderField,
  ],
  orderings: [{ title: "Sıra", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "category", media: "logo" } },
});
