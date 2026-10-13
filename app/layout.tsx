import type { Metadata } from "next";
import { brand, contact, siteUrl, socials } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppPopup } from "@/components/WhatsAppPopup";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    siteName: brand.name,
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
    images: [{ url: brand.logo, width: 1254, height: 1254 }],
  },
};

/**
 * Applies the saved (or OS-preferred) theme before first paint so the
 * page never flashes the wrong theme. Mirrors ThemeToggle's logic.
 */
const themeInitScript = `(function(){try{var t=localStorage.getItem("unus-theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}document.documentElement.dataset.theme=t;}catch(e){}})();`;

/**
 * Structured data: tells Google this site belongs to an Organization
 * (with contact email and social profiles) and is a WebSite. Rendered
 * as JSON-LD in <head>; `email`/`sameAs` drop out if unconfigured.
 */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: brand.name,
      url: siteUrl,
      logo: `${siteUrl}${brand.logo}`,
      email: contact.email || undefined,
      sameAs: socials.map((s) => s.href),
    },
    {
      "@type": "WebSite",
      name: brand.name,
      url: siteUrl,
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <WhatsAppPopup />
      </body>
    </html>
  );
}
