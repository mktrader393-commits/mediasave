"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowDownToLine,
  CheckCircle2,
  Download,
  Link2,
} from "lucide-react";

export default function PinterestDownloader() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setDownloadUrl("");

    let parsedUrl: URL;

    try {
      parsedUrl = new URL(url.trim());
    } catch {
      setError("Please enter a valid Pinterest link.");
      return;
    }

    const allowedHosts = [
      "pinterest.com",
      "www.pinterest.com",
      "pin.it",
      "www.pin.it",
    ];

    if (!allowedHosts.includes(parsedUrl.hostname.toLowerCase())) {
      setError("Please enter a valid Pinterest video Pin link.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/pinterest-download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || data.message || "Unable to process this Pinterest link."
        );
      }

      const resultUrl = data.downloadUrl || data.url;

      if (!resultUrl) {
        throw new Error("No downloadable video was found.");
      }

      setDownloadUrl(resultUrl);
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
    <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-violet-100 bg-white p-4 shadow-xl shadow-violet-100/60 sm:p-7">
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="pinterest-url"
          className="mb-3 block text-left text-sm font-bold text-slate-800"
        >
          Paste Pinterest video link
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-100">
            <Link2 size={19} className="shrink-0 text-violet-500" />
            <input
              id="pinterest-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste Pinterest video link here..."
              className="h-14 w-full min-w-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 sm:text-base"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="flex h-14 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-500 px-7 font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Processing...
              </>
            ) : (
              <>
                <Download size={19} />
                Download
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-left text-sm text-red-700">
          {error}
        </div>
      )}

      {downloadUrl && (
        <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-5 text-left">
          <div className="mb-3 flex items-center gap-2 font-bold text-green-800">
            <CheckCircle2 size={20} />
            Your video is ready!
          </div>
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3 font-bold text-white transition hover:opacity-90"
          >
            <ArrowDownToLine size={19} />
            Download Video
          </a>
        </div>
      )}

      <p className="mt-5 text-xs leading-5 text-slate-500">
        Supports publicly accessible Pinterest video Pins. Private or
        restricted content is not supported.
      </p>
    </div>
  );
}