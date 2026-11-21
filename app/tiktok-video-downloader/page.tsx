import type { Metadata } from "next";
import {
  Video,
  ShieldCheck,
  Zap,
  Download,
} from "lucide-react";
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
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="px-4 pb-16 pt-14 sm:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-900 to-gray-600 text-white shadow-lg">
            <Video size={32} />
          </div>

          <div className="mb-4 inline-flex rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
            Free TikTok Video Downloader
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            TikTok Video Downloader
            <span className="block bg-gradient-to-r from-gray-900 via-pink-600 to-cyan-500 bg-clip-text text-transparent">
              Without Watermark
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Download public TikTok videos in HD quality without a watermark.
            Fast, free and easy to use with MediaSave.
          </p>

          <TikTokDownloader />

          <div className="mt-7 flex flex-wrap justify-center gap-5 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <ShieldCheck size={17} className="text-green-600" />
              Free to use
            </span>
            <span className="flex items-center gap-2">
              <Zap size={17} className="text-yellow-500" />
              Fast processing
            </span>
            <span className="flex items-center gap-2">
              <Download size={17} className="text-blue-500" />
              HD when available
            </span>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-gray-50 px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            How to Download TikTok Videos
          </h2>

          <div className="mt-9 grid gap-5 sm:grid-cols-3">
            {[
              {
                number: "01",
                title: "Copy Video Link",
                description:
                  "Open TikTok, select a public video and copy its link.",
              },
              {
                number: "02",
                title: "Paste the Link",
                description:
                  "Paste your copied TikTok URL into the box above.",
              },
              {
                number: "03",
                title: "Download Video",
                description:
                  "Process the link and download the available video.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-gray-200 bg-white p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gray-900 font-bold text-white">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            Why Use MediaSave TikTok Downloader?
          </h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 p-6">
              <ShieldCheck className="mb-3 text-green-600" size={27} />
              <h3 className="font-bold">No-Watermark Downloads</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Get a watermark-free video when the source provides one.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6">
              <Zap className="mb-3 text-yellow-500" size={27} />
              <h3 className="font-bold">Simple and Fast</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Paste a public video link and process it in a few steps.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6">
              <Video className="mb-3 text-blue-600" size={27} />
              <h3 className="font-bold">HD Quality</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                HD quality is available when supported by the video source.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6">
              <Download className="mb-3 text-purple-600" size={27} />
              <h3 className="font-bold">No App Required</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Use MediaSave directly in your web browser.
              </p>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-100 pt-10">
            <h2 className="text-2xl font-bold text-center">
              TikTok Video Downloader Without Watermark
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600">
              <p>
                MediaSave is a free TikTok Video Downloader that helps you
                download public TikTok videos without a watermark when a
                watermark-free download is available. You can use this online
                TikTok downloader directly in your browser without installing
                an app or creating an account.
              </p>

              <p>
                To use the TikTok Video Downloader, copy the link of a public
                TikTok video and paste it into the download box above. Select
                Download and wait while MediaSave processes the video. If the
                source supports HD quality, you may be able to download the
                video in HD. Available quality depends on the original video
                and its source.
              </p>

              <p>
                This tool is designed to make downloading supported public
                TikTok videos simple on mobile phones, tablets and computers.
                Please respect creators' rights and only download or share
                videos when you own them or have permission.
              </p>

              <p>
                Looking for other video download tools? You can also use
                MediaSave's{" "}
                <a
                  href="/instagram-video-downloader"
                  className="font-semibold text-pink-600 hover:underline"
                >
                  Instagram Video Downloader
                </a>{" "}
                or{" "}
                <a
                  href="/pinterest-video-downloader"
                  className="font-semibold text-pink-600 hover:underline"
                >
                  Pinterest Video Downloader
                </a>
                . Visit the{" "}
                <a
                  href="/"
                  className="font-semibold text-pink-600 hover:underline"
                >
                  MediaSave homepage
                </a>{" "}
                to explore all available tools.
              </p>
            </div>
          </div>

          <p className="mt-8 text-center text-xs leading-6 text-gray-500">
            MediaSave is an independent service and is not affiliated with
            TikTok. Only download videos you own or have permission to use.
          </p>
        </div>
      </section>
    </main>
  );
}