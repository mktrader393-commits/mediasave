import type { Metadata } from "next";
import TikTokDownloader from "./TikTokDownloader";

export const metadata: Metadata = {
  title: "TikTok Video Downloader Without Watermark",
  description:
    "Download public TikTok videos without watermark in HD quality when available. Use MediaSave's free online TikTok video downloader. No registration required.",
  alternates: {
    canonical: "/tiktok-video-downloader",
  },
  keywords: [
    "TikTok video downloader",
    "TikTok downloader without watermark",
    "download TikTok videos",
    "TikTok video download online",
    "free TikTok downloader",
    "MediaSave",
  ],
  openGraph: {
    title: "TikTok Video Downloader Without Watermark | MediaSave",
    description:
      "Download public TikTok videos without watermark using MediaSave.",
    url: "https://www.mediasave.live/tiktok-video-downloader",
    siteName: "MediaSave",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "TikTok Video Downloader | MediaSave",
    description:
      "Download public TikTok videos with MediaSave.",
  },
};

export default function TikTokVideoDownloaderPage() {
  return <TikTokDownloader />;
}