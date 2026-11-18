import { z } from "zod";

/**
 * One schema, validated in the browser (React Hook Form) and again on the server.
 * Only contact data and a short message are collected: no health history,
 * diagnosis or body measurements.
 */
const PHONE = /^[+()\d\s-]{7,20}$/;

const optionalEmail = z
  .string()
  .trim()
  .max(120, "E-posta adresi çok uzun.")
  .refine((v) => v === "" || z.email().safeParse(v).success, "Geçerli bir e-posta adresi yazın.");

const optionalPhone = z
  .string()
  .trim()
  .max(20, "Telefon numarası çok uzun.")
  .refine((v) => v === "" || PHONE.test(v), "Telefon numarasını yalnızca rakamlarla yazın.");

const shared = {
  name: z.string().trim().min(2, "Adınızı ve soyadınızı yazın.").max(80, "Ad soyad en fazla 80 karakter olabilir."),
  email: optionalEmail,
  phone: optionalPhone,
  consent: z.boolean().refine((v) => v, "Gönderebilmek için onay kutusunu işaretleyin."),
  /** Honeypot: real visitors never see or fill this field. */
  website: z.string().max(200),
};

const CONTACT_MISSING = "Size dönebilmemiz için e-posta ya da telefon yazın.";
/** Either field fixes it, so both are marked. */
function requireContact(v: { email: string; phone: string }, ctx: z.RefinementCtx) {
  if (v.email !== "" || v.phone !== "") return;
  for (const path of ["email", "phone"]) ctx.addIssue({ code: "custom", message: CONTACT_MISSING, path: [path] });
}

export const contactSchema = z
  .object({
    kind: z.literal("contact"),
    ...shared,
    message: z
      .string()
      .trim()
      .min(10, "Mesajınız en az 10 karakter olmalı.")
      .max(1500, "Mesaj en fazla 1500 karakter olabilir."),
  })
  .superRefine(requireContact);

export const PREFERRED_CHANNELS = {
  whatsapp: "WhatsApp",
  telefon: "Telefon",
  eposta: "E-posta",
} as const;

export const appointmentSchema = z
  .object({
    kind: z.literal("appointment"),
    ...shared,
    service: z.string().trim().min(1, "Bir hizmet seçin.").max(100),
    format: z.enum(["yuz-yuze", "online", "farketmez"], { error: "Görüşme şeklini seçin." }),
    preferredChannel: z.enum(["whatsapp", "telefon", "eposta"], { error: "Size nasıl dönelim?" }),
    message: z.string().trim().max(800, "Not en fazla 800 karakter olabilir."),
  })
  .superRefine(requireContact);

export const inquirySchema = z.discriminatedUnion("kind", [contactSchema, appointmentSchema]);

export type ContactInput = z.input<typeof contactSchema>;
export type AppointmentInput = z.input<typeof appointmentSchema>;
export type Inquiry = z.output<typeof inquirySchema>;

export const FORMAT_LABELS = {
  "yuz-yuze": "Yüz yüze (Nilüfer, Bursa)",
  online: "Online",
  farketmez: "Fark etmez",
} as const;

export const NOT_SURE_SERVICE = "Henüz karar vermedim";
