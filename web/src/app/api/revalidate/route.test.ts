import { encodeSignatureHeader, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CONTENT_TAGS } from "@/sanity/tags";
import { POST } from "./route";

const revalidateTag = vi.hoisted(() => vi.fn());
vi.mock("next/cache", () => ({ revalidateTag }));

const SECRET = "test-webhook-secret";

async function signed(body: string, secret = SECRET) {
  const signature = await encodeSignatureHeader(body, Date.now(), secret);
  return new Request("http://localhost/api/revalidate", {
    method: "POST",
    headers: { "content-type": "application/json", [SIGNATURE_HEADER_NAME]: signature },
    body,
  });
}

beforeEach(() => {
  revalidateTag.mockReset();
  vi.stubEnv("SANITY_REVALIDATE_SECRET", SECRET);
});

describe("POST /api/revalidate", () => {
  it("returns 500 when the webhook secret is not configured", async () => {
    vi.stubEnv("SANITY_REVALIDATE_SECRET", "");
    const res = await POST(await signed(JSON.stringify({ _type: "post" })));
    expect(res.status).toBe(500);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("rejects a request without a signature with 401", async () => {
    const res = await POST(
      new Request("http://localhost/api/revalidate", { method: "POST", body: JSON.stringify({ _type: "post" }) }),
    );
    expect(res.status).toBe(401);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("rejects a request signed with another secret with 401", async () => {
    const res = await POST(await signed(JSON.stringify({ _type: "post" }), "wrong-secret"));
    expect(res.status).toBe(401);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("rejects a body changed after signing with 401", async () => {
    const original = await signed(JSON.stringify({ _type: "post", slug: "a" }));
    const tampered = new Request(original.url, {
      method: "POST",
      headers: original.headers,
      body: JSON.stringify({ _type: "siteSettings", slug: "a" }),
    });
    expect((await POST(tampered)).status).toBe(401);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("rejects a signed payload with an unknown document type with 400", async () => {
    const res = await POST(await signed(JSON.stringify({ _type: "sanity.imageAsset" })));
    expect(res.status).toBe(400);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("rejects a signed body that is not JSON with 400", async () => {
    expect((await POST(await signed("not json"))).status).toBe(400);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it.each(CONTENT_TAGS)("expires the %s tag immediately", async (type) => {
    const res = await POST(await signed(JSON.stringify({ _type: type, slug: "ornek" })));
    expect(res.status).toBe(200);
    expect(revalidateTag).toHaveBeenCalledExactlyOnceWith(type, { expire: 0 });
    expect(await res.json()).toEqual({ revalidated: type, slug: "ornek" });
  });

  it("accepts a deleted or slug-less document", async () => {
    const res = await POST(await signed(JSON.stringify({ _type: "siteSettings", slug: null })));
    expect(res.status).toBe(200);
    expect(revalidateTag).toHaveBeenCalledWith("siteSettings", { expire: 0 });
  });
});
