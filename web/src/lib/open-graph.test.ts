import { beforeEach, describe, expect, it, vi } from "vitest";
import { openGraph } from "./open-graph";

const getSettings = vi.hoisted(() => vi.fn());
vi.mock("@/sanity/fetch", () => ({ getSettings }));
vi.mock("@/sanity/image", () => ({
  ogImageUrl: (image?: { asset?: { _id: string } | null } | null) =>
    image?.asset ? `https://cdn.sanity.io/${image.asset._id}.jpg` : undefined,
}));

const asset = (_id: string) => ({ asset: { _id } });
const imageOf = (url: unknown) => (url as { images: { url: string }[] }).images[0].url;

beforeEach(() => {
  getSettings.mockReset();
  getSettings.mockResolvedValue({ ogImage: null });
});

describe("openGraph", () => {
  it("keeps the shared site fields when a page sets its own object", async () => {
    const og = await openGraph({ type: "article", publishedTime: "2026-11-18" });
    expect(og).toMatchObject({ type: "article", siteName: "Dyt. Elif Sude Özkan", locale: "tr_TR" });
  });

  it("uses the first page image that exists", async () => {
    const og = await openGraph({ type: "website" }, null, asset("cover"), asset("other"));
    expect(imageOf(og)).toBe("https://cdn.sanity.io/cover.jpg");
  });

  it("falls back to the site-wide share image from Sanity", async () => {
    getSettings.mockResolvedValue({ ogImage: asset("site") });
    expect(imageOf(await openGraph({ type: "website" }, undefined))).toBe("https://cdn.sanity.io/site.jpg");
  });

  it("falls back to the default card when no image is set anywhere", async () => {
    getSettings.mockResolvedValue(null);
    const og = await openGraph({ type: "website" });
    expect(og.images).toEqual([expect.objectContaining({ url: "/og.png", width: 1200, height: 630 })]);
  });

  it("leaves title and description to the page's own metadata", async () => {
    const og = await openGraph({ type: "website" });
    expect(og).not.toHaveProperty("title");
    expect(og).not.toHaveProperty("description");
  });
});
