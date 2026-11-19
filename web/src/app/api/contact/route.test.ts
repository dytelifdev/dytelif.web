import { beforeEach, describe, expect, it, vi } from "vitest";

// Resend and Cloudflare are replaced: these tests never reach the network or send e-mail.
const send = vi.hoisted(() => vi.fn());
vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const INBOX = "info.elifsudeozkan@gmail.com";

const contact = {
  kind: "contact",
  name: "Ayşe Yılmaz",
  email: "ayse@example.com",
  phone: "0533 016 72 78",
  consent: true,
  website: "",
  message: "Online görüşme hakkında bilgi almak istiyorum.",
  turnstileToken: "token-from-widget",
};

const appointment = {
  kind: "appointment",
  name: "Ayşe Yılmaz",
  email: "ayse@example.com",
  phone: "0533 016 72 78",
  consent: true,
  website: "",
  service: "Yetişkin beslenme danışmanlığı",
  format: "online",
  preferredChannel: "whatsapp",
  message: "",
  turnstileToken: "token-from-widget",
};

const siteverify = vi.fn<typeof fetch>();

type Setup = { production?: boolean; turnstileSecret?: string; resendKey?: string };

/** The route reads NODE_ENV when it loads, so each test imports a fresh copy. */
async function loadRoute({ production = false, turnstileSecret = "test-secret", resendKey = "re_test" }: Setup = {}) {
  vi.stubEnv("NODE_ENV", production ? "production" : "test");
  vi.stubEnv("TURNSTILE_SECRET_KEY", turnstileSecret);
  vi.stubEnv("RESEND_API_KEY", resendKey);
  vi.stubEnv("RESEND_FROM_EMAIL", "form@dytelifsudeozkan.com");
  vi.stubEnv("CONTACT_TO_EMAIL", INBOX);
  vi.resetModules();
  return (await import("./route")).POST;
}

function request(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "cf-connecting-ip": "203.0.113.7" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

beforeEach(() => {
  send.mockReset();
  send.mockResolvedValue({ data: { id: "email_1" }, error: null });
  siteverify.mockReset();
  siteverify.mockResolvedValue(Response.json({ success: true }));
  vi.stubGlobal("fetch", siteverify);
});

describe("POST /api/contact: input", () => {
  it("rejects a body over the size limit with 413", async () => {
    const POST = await loadRoute();
    const res = await POST(request({ ...contact, message: "a".repeat(13_000) }));
    expect(res.status).toBe(413);
  });

  it("rejects malformed JSON with 400", async () => {
    const POST = await loadRoute();
    expect((await POST(request("{not json"))).status).toBe(400);
  });

  it("rejects invalid fields with 400 before calling Cloudflare or Resend", async () => {
    const POST = await loadRoute();
    const res = await POST(request({ ...contact, email: "", phone: "" }));
    expect(res.status).toBe(400);
    expect(siteverify).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });

  it("answers a filled honeypot like a success but sends nothing", async () => {
    const POST = await loadRoute();
    const res = await POST(request({ ...contact, website: "https://spam.example" }));
    expect(res.status).toBe(200);
    expect(siteverify).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });
});

describe("POST /api/contact: Turnstile", () => {
  it("never skips bot protection in production when the secret is missing", async () => {
    const POST = await loadRoute({ production: true, turnstileSecret: "" });
    const res = await POST(request(contact));
    expect(res.status).toBe(503);
    expect(siteverify).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });

  it("allows local development without Turnstile keys", async () => {
    const POST = await loadRoute({ turnstileSecret: "" });
    expect((await POST(request(contact))).status).toBe(200);
  });

  it("rejects a request without a token with 403", async () => {
    const POST = await loadRoute();
    const res = await POST(request({ ...contact, turnstileToken: undefined }));
    expect(res.status).toBe(403);
    expect(siteverify).not.toHaveBeenCalled();
  });

  it("verifies the token on the server with the secret and visitor IP", async () => {
    const POST = await loadRoute();
    await POST(request(contact));
    expect(siteverify).toHaveBeenCalledOnce();
    const [url, init] = siteverify.mock.calls[0];
    expect(url).toBe(SITEVERIFY_URL);
    const form = init?.body as FormData;
    expect(form.get("secret")).toBe("test-secret");
    expect(form.get("response")).toBe("token-from-widget");
    expect(form.get("remoteip")).toBe("203.0.113.7");
  });

  it("rejects a token Cloudflare does not accept with 403", async () => {
    siteverify.mockResolvedValue(Response.json({ success: false, "error-codes": ["invalid-input-response"] }));
    const POST = await loadRoute();
    expect((await POST(request(contact))).status).toBe(403);
    expect(send).not.toHaveBeenCalled();
  });

  it("returns 502 when Cloudflare cannot be reached", async () => {
    siteverify.mockRejectedValue(new TypeError("fetch failed"));
    const POST = await loadRoute();
    expect((await POST(request(contact))).status).toBe(502);
    expect(send).not.toHaveBeenCalled();
  });
});

describe("POST /api/contact: e-mail", () => {
  it("returns 503 when e-mail delivery is not configured", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const POST = await loadRoute({ resendKey: "" });
    expect((await POST(request(contact))).status).toBe(503);
    expect(send).not.toHaveBeenCalled();
  });

  it("sends one e-mail to the inbox with the visitor as reply-to", async () => {
    const POST = await loadRoute();
    const res = await POST(request(contact));
    expect(res.status).toBe(200);
    expect(send).toHaveBeenCalledOnce();
    const mail = send.mock.calls[0][0];
    expect(mail.to).toEqual([INBOX]);
    expect(mail.from).toContain("<form@dytelifsudeozkan.com>");
    expect(mail.replyTo).toBe("ayse@example.com");
    expect(mail.text).toContain(contact.message);
  });

  it("includes the chosen service in an appointment request", async () => {
    const POST = await loadRoute();
    expect((await POST(request(appointment))).status).toBe(200);
    const mail = send.mock.calls[0][0];
    expect(mail.subject).toBe("Randevu talebi: Ayşe Yılmaz");
    expect(mail.text).toContain("Yetişkin beslenme danışmanlığı");
    expect(mail.replyTo).toBe("ayse@example.com");
  });

  it("keeps the subject on one line and escapes HTML", async () => {
    const POST = await loadRoute();
    await POST(
      request({ ...contact, name: "Ali\r\nBcc: x@example.com", message: "<script>alert(1)</script> merhaba" }),
    );
    const mail = send.mock.calls[0][0];
    expect(mail.subject).not.toMatch(/[\r\n]/);
    expect(mail.html).not.toContain("<script>");
    expect(mail.html).toContain("&lt;script&gt;");
  });

  it("logs only the provider's error class, never the visitor's data", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    send.mockResolvedValue({ data: null, error: { name: "validation_error", message: "ayse@example.com is invalid" } });
    const POST = await loadRoute();
    const res = await POST(request(contact));
    expect(res.status).toBe(502);
    const logged = JSON.stringify(log.mock.calls);
    expect(logged).toContain("validation_error");
    expect(logged).not.toContain("ayse@example.com");
    expect(logged).not.toContain("Ayşe");
  });
});
