
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mediasave.live"),

  title: {
    default: "MediaSave - Free Online Media Downloader",
    template: "%s | MediaSave",
  },

  description:
    "MediaSave is a simple online media downloader. Save publicly accessible media with an easy-to-use and user-friendly experience.",

  applicationName: "MediaSave",

  alternates: {
    canonical: "/",
  },

  keywords: [
    "MediaSave",
    "online media downloader",
    "free media downloader",
    "media saver",
    "download media online",
    "online video downloader",
  ],

  openGraph: {
    title: "MediaSave - Free Online Media Downloader",
    description:
      "Save publicly accessible media online with MediaSave.",
    url: "https://www.mediasave.live",
    siteName: "MediaSave",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "MediaSave - Free Online Media Downloader",
    description:
      "Save publicly accessible media online with MediaSave.",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
