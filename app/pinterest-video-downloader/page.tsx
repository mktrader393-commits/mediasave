import type { Metadata } from "next";
import PinterestDownloader from "./PinterestDownloader";

export const metadata: Metadata = {
  title: "Pinterest Video Downloader - Download Pinterest Videos Free | MediaSave",
  description:
  "Download Pinterest videos online for free with MediaSave. Paste a public Pinterest video Pin link and save supported videos quickly. No registration required.",
  alternates: {
    canonical: "/pinterest-video-downloader",
  },
  openGraph: {
    title: "Pinterest Video Downloader | MediaSave",
    description:
      "Save supported public Pinterest videos online for free with MediaSave.",
    url: "https://www.mediasave.live/pinterest-video-downloader",
    siteName: "MediaSave",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Pinterest Video Downloader | MediaSave",
    description:
      "Download supported public Pinterest videos online for free.",
  },
};

export default function PinterestVideoDownloaderPage() {
  return <PinterestDownloader />;
}