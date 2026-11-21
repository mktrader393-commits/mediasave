"use client";

import { useState, type FormEvent } from "react";
import {
  Download,
  Loader2,
  Link as LinkIcon,
  AlertCircle,
  CircleCheck,
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
    <>
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
    </>
  );
}