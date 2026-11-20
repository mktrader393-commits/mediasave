import type { Metadata } from "next";
import TikTokDownloader from "./TikTokDownloader";

export const metadata: Metadata = {
  title: "TikTok Video Downloader Without Watermark | MediaSave",
  description:
    "Download public TikTok videos without watermark in HD quality when available. Fast, free and easy TikTok video downloader by MediaSave.",
  alternates: {
    canonical: "https://www.mediasave.live/tiktok-video-downloader",
  },
  openGraph: {
    title: "TikTok Video Downloader Without Watermark | MediaSave",
    description:
      "Download public TikTok videos without watermark using MediaSave.",
    url: "https://www.mediasave.live/tiktok-video-downloader",
    siteName: "MediaSave",
    type: "website",
  },
};

export default function TikTokVideoDownloaderPage() {
  return <TikTokDownloader />;
}