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
    background_color: "#f6f3ec",
    theme_color: "#204b38",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
