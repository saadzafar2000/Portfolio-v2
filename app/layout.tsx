import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

import { AuroraWaves } from "@/components/layout/aurora-waves";
import { Backdrop } from "@/components/layout/backdrop";
import { Clarity } from "@/components/layout/clarity";
import { Preloader } from "@/components/layout/preloader";
import { Cursor } from "@/components/layout/cursor";
import { Footer } from "@/components/layout/footer";
import { FooterWrapper } from "@/components/layout/footer-wrapper";
import { Nav } from "@/components/layout/nav";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { getSiteSettings } from "@/lib/content";
import { cn } from "@/lib/utils";

// Self-hosted by next/font — no render-blocking request to Google, and no
// duplicate @import the way the previous build loaded these twice.
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Geometric display face for headlines.
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Monospace for meta labels, dates, and tech stack pills.
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  // Title and description are authored in lib/data/site.ts rather than composed
  // here — they are copy, and copy lives in the content layer.
  const { title, description, keywords } = site.seo;

  return {
    metadataBase: new URL(site.url),
    title: {
      default: title,
      template: `%s — ${site.name}`,
    },
    description,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    keywords,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: site.url,
      siteName: `${site.name} — Portfolio`,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@MSaadZafar2000",
      site: "@MSaadZafar2000",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    // No geo.* meta. It previously published exact city coordinates; location
    // is intentionally country-level across the whole site.
  };
}

export const viewport: Viewport = {
  themeColor: "#04060a",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const site = await getSiteSettings();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: site.name,
      url: site.url,
      email: `mailto:${site.email}`,
      // Repeated values are valid for jobTitle, and the positioning is
      // deliberately two-sided — Werkstudent hiring and freelance contracting
      // are different searches.
      jobTitle: site.jobTitles,
      description: site.bioShort,
      // Country-level only. The university below carries the regional signal
      // without publishing a home city.
      address: {
        "@type": "PostalAddress",
        addressCountry: "Germany",
      },
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "Frankfurt University of Applied Sciences",
        },
      ],
      sameAs: site.socials
        .filter((social) => social.kind !== "email")
        .map((social) => social.href),
      knowsAbout: [
        "Full Stack Development",
        "React",
        "Next.js",
        "Node.js",
        "TypeScript",
        "Tailwind CSS",
        "Blockchain",
        "Web3",
        "Solidity",
        "Ethereum",
        "Smart Contracts",
        "MERN Stack",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: `${site.name} — Portfolio`,
      url: site.url,
      author: { "@type": "Person", name: site.name },
      inLanguage: "en",
    },
  ];

  return (
    <html
      lang="en"
      className={cn(sans.variable, display.variable, mono.variable)}
    >
      <head>
        {/*
          Reveal animations server-render their hidden initial state. If the JS
          bundle never arrives, nothing would animate them back in and the page
          would read as blank. This resolves them to their final state instead.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <Preloader />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[80] focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-ink"
        >
          Skip to content
        </a>

        <ScrollProgress />
        <Cursor />
        <Backdrop />
        <AuroraWaves />

        <SmoothScroll>
          <Nav name={site.name} />
          <main id="main" className="relative z-10">
            {children}
          </main>
          <FooterWrapper>
            <Footer />
          </FooterWrapper>
        </SmoothScroll>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Clarity />
      </body>
    </html>
  );
}
