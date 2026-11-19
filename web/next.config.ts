import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Most visitors arrive once from Instagram or search: the Tailwind sheet ships inside
    // the HTML instead of as a render-blocking request. Measured 2026-11-19: turning it
    // off shrinks the HTML but costs mobile LCP about 1.2 s.
    inlineCss: true,
  },
  poweredByHeader: false,
  images: {
    // Local photos (public/photo) use the Next.js optimizer; Sanity assets pass
    // their own CDN loader per image (components/cdn-image.tsx).
    formats: ["image/avif", "image/webp"],
    qualities: [75],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
