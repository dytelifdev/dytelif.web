import { ImageResponse } from "next/og";
import { BRAND_COLORS, MONOGRAM } from "@/components/brand/paths";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon rendered at build time from the outlined ES monogram on the client's tile colour. */
export default function AppleIcon() {
  const [, , w, h] = MONOGRAM.viewBox.split(" ").map(Number);
  const height = 116;
  const width = Math.round((w / h) * height);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: BRAND_COLORS.tile,
      }}
    >
      <svg width={width} height={height} viewBox={MONOGRAM.viewBox}>
        <path d={MONOGRAM.letters} fill={BRAND_COLORS.cream} />
        <path d={MONOGRAM.swoosh} fill={BRAND_COLORS.giltOnDark} />
      </svg>
    </div>,
    size,
  );
}
