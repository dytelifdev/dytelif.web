import { describe, expect, it } from "vitest";
import { inquirySchema } from "./inquiry";

const contact = {
  kind: "contact",
  name: "Ayşe Yılmaz",
  email: "ayse@example.com",
  phone: "0533 016 72 78",
  consent: true,
  website: "",
  message: "Online görüşme hakkında bilgi almak istiyorum.",
} as const;

const appointment = {
  kind: "appointment",
  name: "Ayşe Yılmaz",
  email: "ayse@example.com",
  phone: "+90 533 016 72 78",
  consent: true,
  website: "",
  service: "Yetişkin beslenme danışmanlığı",
  format: "online",
  preferredChannel: "whatsapp",
  message: "",
} as const;

function issuePaths(input: unknown) {
  const result = inquirySchema.safeParse(input);
  expect(result.success).toBe(false);
  return result.error!.issues.map((issue) => issue.path.join("."));
}

describe("contact form schema", () => {
  it("accepts a message with name, e-mail and phone", () => {
    expect(inquirySchema.safeParse(contact).success).toBe(true);
  });

  it("requires name, e-mail and phone together", () => {
    expect(issuePaths({ ...contact, email: "" })).toContain("email");
    expect(issuePaths({ ...contact, phone: "" })).toContain("phone");
    expect(issuePaths({ ...contact, name: "" })).toContain("name");
  });

  it("asks for a full phone number with the area code", () => {
    expect(issuePaths({ ...contact, phone: "016 72 78" })).toContain("phone");
  });

  it("rejects a malformed e-mail address and phone number", () => {
    expect(issuePaths({ ...contact, email: "ayse@" })).toContain("email");
    expect(issuePaths({ ...contact, phone: "telefonum yok" })).toContain("phone");
  });

  it("requires consent", () => {
    expect(issuePaths({ ...contact, consent: false })).toContain("consent");
  });

  it("enforces message length", () => {
    expect(issuePaths({ ...contact, message: "Merhaba" })).toContain("message");
    expect(issuePaths({ ...contact, message: "a".repeat(1501) })).toContain("message");
  });

  it("trims surrounding whitespace", () => {
    const result = inquirySchema.parse({ ...contact, name: "  Ayşe Yılmaz  " });
    expect(result.name).toBe("Ayşe Yılmaz");
  });

  it("drops fields the form does not collect", () => {
    const result = inquirySchema.parse({ ...contact, weight: "80 kg", diagnosis: "x" });
    expect(result).not.toHaveProperty("weight");
    expect(result).not.toHaveProperty("diagnosis");
  });
});

describe("appointment request schema", () => {
  it("accepts a complete request with an empty note", () => {
    expect(inquirySchema.safeParse(appointment).success).toBe(true);
  });

  it("requires a service, a meeting format and a reply channel", () => {
    expect(issuePaths({ ...appointment, service: "" })).toContain("service");
    expect(issuePaths({ ...appointment, format: "telefonla" })).toContain("format");
    expect(issuePaths({ ...appointment, preferredChannel: "sms" })).toContain("preferredChannel");
  });

  it("rejects an unknown form kind", () => {
    expect(inquirySchema.safeParse({ ...contact, kind: "order" }).success).toBe(false);
  });
});
