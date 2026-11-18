import { ImageResponse } from "next/og";
import { MONOGRAM, WORDMARK } from "@/components/brand/paths";

const size = { width: 1200, height: 630 };

/**
 * Default share image: folder field, cream sheet with the monogram pressed in, outlined wordmark.
 * Served as a plain route, not the opengraph-image file convention: file-based metadata
 * overrides generateMetadata, so it would hide the share images editors upload in Sanity.
 * Used by lib/open-graph.ts when neither the page nor Site ayarları has an image.
 */
export function GET() {
  const [, , ww, wh] = WORDMARK.viewBox.split(" ").map(Number);
  const [, , mw, mh] = MONOGRAM.viewBox.split(" ").map(Number);
  const wordmarkWidth = 600;
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#204b38", position: "relative" }}>
      <div
        style={{ position: "absolute", left: 470, top: 0, bottom: 0, width: 1, background: "rgba(246,243,236,0.22)" }}
      />
      <div style={{ position: "absolute", left: 72, top: 250, display: "flex" }}>
        <svg width={wordmarkWidth} height={Math.round((wh / ww) * wordmarkWidth)} viewBox={WORDMARK.viewBox}>
          <path d={WORDMARK.d} fill="#f6f3ec" />
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          right: 90,
          top: 70,
          width: 380,
          height: 490,
          background: "#fffdf8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width={220} height={Math.round((mh / mw) * 220)} viewBox={MONOGRAM.viewBox}>
          <path d={MONOGRAM.body} fill="rgba(32,43,36,0.12)" />
          <path d={MONOGRAM.dots} fill="#aa9574" />
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          right: 390,
          top: 54,
          width: 120,
          height: 30,
          background: "rgba(230,220,199,0.9)",
          transform: "rotate(-30deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 60,
          top: 54,
          width: 120,
          height: 30,
          background: "rgba(230,220,199,0.9)",
          transform: "rotate(30deg)",
        }}
      />
    </div>,
    size,
  );
}
