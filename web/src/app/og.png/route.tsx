import { ImageResponse } from "next/og";
import { BRAND_COLORS, MONOGRAM, WORDMARK } from "@/components/brand/paths";

const size = { width: 1200, height: 630 };

/**
 * Default share image: folder field with the outlined lettering, and a cream sheet taped on the
 * right holding the client's ES monogram.
 * Served as a plain route, not the opengraph-image file convention: file-based metadata
 * overrides generateMetadata, so it would hide the share images editors upload in Sanity.
 * Used by lib/open-graph.ts when neither the page nor Site ayarları has an image.
 */
export function GET() {
  const [, , ww, wh] = WORDMARK.viewBox.split(" ").map(Number);
  const [, , mw, mh] = MONOGRAM.viewBox.split(" ").map(Number);
  const wordmarkWidth = 580;
  const wordmarkHeight = Math.round((wh / ww) * wordmarkWidth);
  const monoHeight = 270;
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#204b38", position: "relative" }}>
      <div
        style={{ position: "absolute", left: 690, top: 0, bottom: 0, width: 1, background: "rgba(246,243,236,0.22)" }}
      />
      <div style={{ position: "absolute", left: 72, top: Math.round(315 - wordmarkHeight / 2), display: "flex" }}>
        <svg width={wordmarkWidth} height={wordmarkHeight} viewBox={WORDMARK.viewBox}>
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
        <svg width={Math.round((mw / mh) * monoHeight)} height={monoHeight} viewBox={MONOGRAM.viewBox}>
          <path d={MONOGRAM.letters} fill={BRAND_COLORS.green} />
          <path d={MONOGRAM.swoosh} fill={BRAND_COLORS.giltOnLight} />
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
