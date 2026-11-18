import { ImageResponse } from "next/og";
import { MONOGRAM } from "@/components/brand/paths";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon rendered at build time from the outlined monogram. */
export default function AppleIcon() {
  const [, , w, h] = MONOGRAM.viewBox.split(" ").map(Number);
  const width = 132;
  const height = Math.round((h / w) * width);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#204b38",
      }}
    >
      <svg width={width} height={height} viewBox={MONOGRAM.viewBox}>
        <path d={MONOGRAM.body} fill="#f6f3ec" />
        <path d={MONOGRAM.dots} fill="#cdba94" />
      </svg>
    </div>,
    size,
  );
}
