import type { Metadata } from "next";

export const metadata: Metadata = {
 title: "Instagram Video Downloader - Download Reels",
  description:
    "Download public Instagram Reels and videos online for free with MediaSave. Paste an Instagram link and save supported videos without registration.",
  alternates: {
    canonical: "https://www.mediasave.live/instagram-video-downloader",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function InstagramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}