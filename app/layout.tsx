import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mediasave.live"),

 title: {
  default: "Instagram Video Downloader & Reels Saver | MediaSave",
  template: "%s | MediaSave",
},

 description:
  "Download Instagram Reels and videos online with MediaSave. Paste a public Instagram link to save supported videos for free. No registration required.",

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
  title: "Instagram Video Downloader & Reels Saver | MediaSave",
 description:
  "Download Instagram Reels and videos online with MediaSave. Paste a public Instagram link to save supported videos for free. No registration required.",
  url: "https://www.mediasave.live",
  siteName: "MediaSave",
  locale: "en_US",
  type: "website",
},

twitter: {
  card: "summary",
  title: "Instagram Video Downloader & Reels Saver | MediaSave",
  description:
  "Download Instagram Reels and videos online with MediaSave. Paste a public Instagram link to save supported videos for free. No registration required.",
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
  <Script
    id="google-adsense"
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3122810728432344"
    strategy="beforeInteractive"
    crossOrigin="anonymous"
  />

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