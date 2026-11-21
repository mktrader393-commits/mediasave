import type { Metadata } from "next";
import PinterestDownloader from "./PinterestDownloader";

export const metadata: Metadata = {
  title: "Pinterest Video Downloader - Download Pinterest Videos Free",
  description:
    "Download public Pinterest videos online for free with MediaSave. Paste a Pinterest video Pin link and save supported videos quickly. No registration required.",
  alternates: {
    canonical: "/pinterest-video-downloader",
  },
  keywords: [
    "Pinterest video downloader",
    "download Pinterest videos",
    "Pinterest video download online",
    "free Pinterest downloader",
    "Pinterest Pin video downloader",
    "MediaSave",
  ],
  openGraph: {
    title: "Pinterest Video Downloader | MediaSave",
    description:
      "Download supported public Pinterest videos online for free with MediaSave.",
    url: "https://www.mediasave.live/pinterest-video-downloader",
    siteName: "MediaSave",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Pinterest Video Downloader | MediaSave",
    description:
      "Download supported public Pinterest videos online for free with MediaSave.",
  },
};

export default function PinterestVideoDownloaderPage() {
  return <PinterestDownloader />;
}