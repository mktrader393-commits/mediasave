"use client";

import { useState, type FormEvent } from "react";
import {
  Download,
  Loader2,
  Link as LinkIcon,
  Video,
  ShieldCheck,
  Zap,
  CircleCheck,
  AlertCircle,
} from "lucide-react";

type TikTokResult = {
  success?: boolean;
  error?: string;
  title?: string;
  cover?: string | null;
  author?: string;
  downloadUrl?: string;
  quality?: string;
};

export default function TikTokDownloader() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TikTokResult | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!url.trim()) {
      setError("Please paste a TikTok video link.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/tiktok-download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data: TikTokResult = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to process this video.");
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

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

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-9 max-w-2xl rounded-2xl border border-gray-200 bg-white p-3 shadow-xl shadow-gray-200/60 sm:flex sm:items-center"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
              <LinkIcon className="shrink-0 text-gray-400" size={21} />
              <input
                type="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError("");
                  setResult(null);
                }}
                placeholder="Paste TikTok video link here..."
                className="h-12 w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-gray-400 sm:text-base"
                aria-label="TikTok video URL"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gray-900 to-gray-700 px-7 font-semibold text-white transition hover:from-pink-600 hover:to-cyan-600 disabled:cursor-not-allowed disabled:opacity-60 sm:mt-0 sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 size={19} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Download size={19} />
                  Download
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mx-auto mt-5 flex max-w-2xl items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-left text-sm text-red-700">
              <AlertCircle size={19} className="mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          {result?.success && (
            <div className="mx-auto mt-7 max-w-2xl rounded-2xl border border-green-200 bg-green-50 p-5 text-left">
              <div className="flex items-center gap-2 font-semibold text-green-800">
                <CircleCheck size={20} />
                Video is ready!
              </div>

              <div className="mt-4 flex flex-col gap-4 sm:flex-row">
                {result.cover && (
                  <img
                    src={result.cover}
                    alt="TikTok video preview"
                    className="h-40 w-full rounded-xl object-cover sm:w-32"
                  />
                )}

                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-gray-900">
                    {result.title || "TikTok Video"}
                  </h2>

                  {result.author && (
                    <p className="mt-1 text-sm text-gray-600">
                      By {result.author}
                    </p>
                  )}

                  <p className="mt-2 text-sm font-medium text-green-700">
                    {result.quality || "Standard"} quality · No watermark
                  </p>

                  <a
                    href={result.downloadUrl}
                    download="mediasave-tiktok.mp4"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 sm:w-auto"
                  >
                    <Download size={19} />
                    Download Video
                  </a>
                </div>
              </div>
            </div>
          )}

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

          <p className="mt-8 text-center text-xs leading-6 text-gray-500">
            MediaSave is an independent service and is not affiliated with
            TikTok. Only download videos you own or have permission to use.
          </p>
        </div>
      </section>
    </main>
  );
}