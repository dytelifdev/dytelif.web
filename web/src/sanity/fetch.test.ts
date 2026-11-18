import { beforeEach, describe, expect, it, vi } from "vitest";

const fetchMock = vi.hoisted(() => vi.fn());
const cacheTag = vi.hoisted(() => vi.fn());
vi.mock("server-only", () => ({}));
vi.mock("next/cache", () => ({ cacheLife: vi.fn(), cacheTag }));
vi.mock("./client", () => ({ sanity: { fetch: fetchMock } }));

const reader = await import("./fetch");

beforeEach(() => {
  fetchMock.mockReset();
  fetchMock.mockResolvedValue([]);
  cacheTag.mockReset();
});

describe("Sanity readers", () => {
  // Regression: a cached HTTP response without tags survived revalidateTag and served
  // stale announcements after a publish.
  it.each([
    ["getSettings", []],
    ["getServices", []],
    ["getService", ["ornek"]],
    ["getPosts", []],
    ["getPost", ["ornek"]],
    ["getGallery", []],
    ["getAnnouncements", []],
    ["getAnnouncement", ["ornek"]],
    ["getProducts", []],
    ["getPartners", []],
    ["getSitemapEntries", []],
  ] as const)("%s bypasses the fetch cache so only the tagged entry caches", async (name, args) => {
    await (reader[name] as (...a: string[]) => Promise<unknown>)(...args);
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock.mock.calls[0][2]).toEqual({ cache: "no-store" });
    expect(cacheTag).toHaveBeenCalled();
  });

  it("tags each reader with its document type", async () => {
    await reader.getPartners();
    expect(cacheTag).toHaveBeenCalledWith("partner");
  });

  it("falls back to a placeholder slug when the CMS has no documents", () => {
    expect(reader.staticSlugs([])).toEqual([{ slug: reader.PLACEHOLDER_SLUG }]);
    expect(reader.staticSlugs([{ slug: "a" }, { slug: null }])).toEqual([{ slug: "a" }]);
  });
});
