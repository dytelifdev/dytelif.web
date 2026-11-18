import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { CONTENT_TAGS } from "@/sanity/fetch";

/**
 * Sanity GROQ-powered webhook (create, update, delete) → on-demand revalidation.
 * Projection to configure in Sanity:  {_type, "slug": slug.current}
 * Every list, detail page, the home page and the sitemap read through type tags,
 * so expiring the type tag refreshes old and new slugs alike; a deleted or renamed
 * document's old URL renders 404 on the next request.
 */
const payloadSchema = z.object({
  _type: z.enum(CONTENT_TAGS),
  slug: z.string().max(200).nullish(),
});

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return Response.json({ message: "Webhook yapılandırılmamış." }, { status: 500 });

  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  const body = await request.text();
  if (!signature || !(await isValidSignature(body, signature, secret))) {
    return Response.json({ message: "Geçersiz imza." }, { status: 401 });
  }

  let json: unknown;
  try {
    json = JSON.parse(body);
  } catch {
    return Response.json({ message: "Geçersiz gövde." }, { status: 400 });
  }

  const parsed = payloadSchema.safeParse(json);
  if (!parsed.success) return Response.json({ message: "Beklenmeyen içerik türü." }, { status: 400 });

  // Webhooks come from outside a Server Action: expire immediately so the editor
  // sees the change on the next request instead of one stale render.
  revalidateTag(parsed.data._type, { expire: 0 });

  return Response.json({ revalidated: parsed.data._type, slug: parsed.data.slug ?? null });
}
