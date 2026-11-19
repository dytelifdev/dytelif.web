import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import { CookieNotice } from "@/components/site/cookie-notice";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { RouteProgress } from "@/components/site/route-progress";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { openGraph } from "@/lib/open-graph";
import { SITE } from "@/lib/site";
import { getSettings } from "@/sanity/fetch";
import "./globals.css";

/** Every page is prerendered and refreshed on demand by the Sanity webhook. */
export const ensureStatic = "navigation";

// One upright sans for the whole site; latin-ext carries the Turkish letters.
const sans = Figtree({
  subsets: ["latin", "latin-ext"],
  variable: "--font-figtree",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    metadataBase: new URL(SITE.url),
    title: { default: `${SITE.name} | Diyetisyen, Nilüfer Bursa`, template: `%s | ${SITE.name}` },
    description: settings?.description || SITE.description,
    applicationName: SITE.name,
    formatDetection: { telephone: false, email: false, address: false },
    // No description here: Next fills og:description from each page's own description.
    openGraph: await openGraph({ type: "website" }),
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: "#2c5234",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={sans.variable}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#icerik"
          className="sr-only z-200 rounded-lg bg-white px-4 py-3 font-semibold text-brand focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          İçeriğe geç
        </a>
        <RouteProgress />
        <Header />
        <main id="icerik" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <CookieNotice />
        {/* The analytics endpoint exists only on Vercel; elsewhere the script would 404. */}
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
