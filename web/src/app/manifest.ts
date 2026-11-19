import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "Dyt. Elif Sude",
    description: SITE.description,
    lang: "tr",
    start_url: "/",
    display: "browser",
    background_color: "#f7f7f7",
    theme_color: "#2c5234",
    // Faithful ES tile; /icon.svg is tuned for browser tabs (reinforced hairlines).
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
