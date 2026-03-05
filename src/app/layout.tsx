import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://halobenaya.com";
const siteName = "halobenaya - Benaya Joshua";
const siteDescription =
  "Personal portfolio of Benaya Joshua, software engineer and informatics student.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s | halobenaya - Benaya Joshua",
  },
  description: siteDescription,
  keywords: [
    "Benaya Joshua",
    "Benaya Josua",
    "halobenaya",
    "portfolio",
    "software engineer",
    "informatics",
  ],
  authors: [{ name: "Benaya Joshua", url: siteUrl }],
  creator: "Benaya Joshua",
  publisher: "Benaya Joshua",
  icons: {
    icon: "/pagar.png",
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteName,
    description: siteDescription,
    siteName: "halobenaya",
    images: [
      {
        url: "/image/ben2.png",
        width: 1200,
        height: 630,
        alt: "Benaya Joshua",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/image/ben2.png"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Benaya Joshua",
  alternateName: ["Benaya Josua", "halobenaya"],
  url: siteUrl,
  jobTitle: "Software Engineer",
  description: siteDescription,
  image: `${siteUrl}/image/ben2.png`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          id="ld-person"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
