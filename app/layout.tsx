import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mediasave.live"),

  title: {
    default: "Instagram Video Downloader - MediaSave",
    template: "%s | MediaSave",
  },

  description:
    "Download Instagram Reels and videos online with MediaSave. A simple, free and fast Instagram video downloader. No registration required.",

  applicationName: "MediaSave",

  alternates: {
    canonical: "/",
  },

  keywords: [
    "Instagram video downloader",
    "Instagram Reels downloader",
    "download Instagram videos",
    "Instagram downloader online",
    "free Instagram video downloader",
    "MediaSave",
  ],

  openGraph: {
    title: "Instagram Video Downloader - MediaSave",
    description:
      "Download Instagram Reels and videos online with MediaSave. Simple, fast and free.",
    url: "https://www.mediasave.live",
    siteName: "MediaSave",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Instagram Video Downloader - MediaSave",
    description:
      "Download Instagram Reels and videos online with MediaSave.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H9CY0E8B38"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H9CY0E8B38');
          `}
        </Script>
      </body>
    </html>
  );
}