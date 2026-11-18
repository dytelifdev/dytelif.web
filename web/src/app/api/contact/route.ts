import { Resend } from "resend";
import { FORMAT_LABELS, inquirySchema, PREFERRED_CHANNELS, type Inquiry } from "@/lib/inquiry";

const MAX_BODY_BYTES = 12_000;
const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const isProduction = process.env.NODE_ENV === "production";

function reply(status: number, message: string) {
  return Response.json({ ok: status < 300, message }, { status });
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}

/** Header-safe single line: no CR/LF, no control characters, bounded length. */
function oneLine(value: string, max = 80) {
  return value
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .trim()
    .slice(0, max);
}

async function verifyTurnstile(token: string, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Never skip bot protection in production; allow local development without keys.
    return isProduction ? "unconfigured" : "ok";
  }
  if (!token) return "failed";
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);
  try {
    const res = await fetch(SITEVERIFY_URL, { method: "POST", body: form, signal: AbortSignal.timeout(8000) });
    const data = (await res.json()) as { success?: boolean };
    return data.success ? "ok" : "failed";
  } catch {
    return "error";
  }
}

function composeEmail(data: Inquiry) {
  const rows: [string, string][] = [
    ["Ad soyad", data.name],
    ["E-posta", data.email || "-"],
    ["Telefon", data.phone || "-"],
  ];
  if (data.kind === "appointment") {
    rows.push(
      ["Hizmet", data.service],
      ["Görüşme şekli", FORMAT_LABELS[data.format]],
      ["Dönüş tercihi", PREFERRED_CHANNELS[data.preferredChannel]],
    );
  }
  const heading = data.kind === "appointment" ? "Yeni randevu talebi" : "Yeni iletişim mesajı";
  const message = data.message || "-";

  const text = [
    heading,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Mesaj:",
    message,
    "",
    "Bu e-posta web sitesindeki formdan gönderildi. Randevu otomatik oluşturulmaz; lütfen kişiye dönüş yapın.",
  ].join("\n");

  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.55;color:#202B24">
<h2 style="font-size:18px;margin:0 0 12px">${heading}</h2>
<table style="border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#5b6a60">${k}</td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>
<p style="margin:16px 0 4px;color:#5b6a60">Mesaj</p>
<p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>
<p style="margin:20px 0 0;font-size:13px;color:#5b6a60">Bu e-posta web sitesindeki formdan gönderildi. Randevu otomatik oluşturulmaz; lütfen kişiye dönüş yapın.</p>
</div>`;

  const subject = oneLine(`${data.kind === "appointment" ? "Randevu talebi" : "İletişim"}: ${data.name}`);
  return { subject, text, html };
}

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > MAX_BODY_BYTES) return reply(413, "Mesaj çok uzun.");

  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return reply(413, "Mesaj çok uzun.");
    body = JSON.parse(raw);
  } catch {
    return reply(400, "Form verisi okunamadı.");
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) return reply(400, "Lütfen formdaki işaretli alanları kontrol edin.");
  const data = parsed.data;

  // Honeypot filled: answer like a success so bots learn nothing.
  if (data.website) return reply(200, "Mesajınız alındı.");

  const ip =
    request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
  const token = typeof body.turnstileToken === "string" ? body.turnstileToken.slice(0, 2048) : "";
  const verdict = await verifyTurnstile(token, ip);
  if (verdict === "unconfigured") return reply(503, "Form şu anda yapılandırılıyor. Lütfen WhatsApp'tan yazın.");
  if (verdict === "failed") return reply(403, "Güvenlik doğrulaması tamamlanamadı. Sayfayı yenileyip tekrar deneyin.");
  if (verdict === "error") return reply(502, "Güvenlik doğrulamasına ulaşılamadı. Biraz sonra tekrar deneyin.");

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) {
    console.error(
      "[contact] e-posta gönderimi yapılandırılmamış (RESEND_API_KEY / RESEND_FROM_EMAIL / CONTACT_TO_EMAIL)",
    );
    return reply(503, "Form şu anda yapılandırılıyor. Lütfen WhatsApp'tan yazın.");
  }

  const { subject, text, html } = composeEmail(data);
  const { error } = await new Resend(apiKey).emails.send({
    from: `Web sitesi formu <${from}>`,
    to: [to],
    replyTo: data.email || undefined,
    subject,
    text,
    html,
  });

  if (error) {
    // Log the provider's error class only; never the visitor's data.
    console.error("[contact] Resend hatası:", error.name);
    return reply(502, "Mesaj şu anda iletilemedi. Lütfen biraz sonra tekrar deneyin ya da WhatsApp'tan yazın.");
  }

  return reply(200, "Mesajınız iletildi. En kısa sürede size dönüş yapılacak.");
}
