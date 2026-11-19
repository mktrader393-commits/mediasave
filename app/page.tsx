"use client";

import { useState, type FormEvent } from "react";

type DownloadItem = {
  downloadUrl?: string;
  url?: string;
  imageUrl?: string;
};

type ApiResult = {
  success?: boolean;
  error?: string;
  message?: string;
  videoUrl?: string;
  downloadUrl?: string;
  thumbnailUrl?: string;
  imageUrl?: string;
  caption?: string;
  authorUsername?: string;
  username?: string;
  downloads?: DownloadItem[];
  data?: ApiResult;
};

export default function Home() {
  const [instagramUrl, setInstagramUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ApiResult | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleDownload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setResult(null);
    setCopied(false);

    const url = instagramUrl.trim();

    if (!url) {
      setError("Please paste an Instagram link first.");
      return;
    }

    try {
      const parsedUrl = new URL(url);
      const allowedHosts = [
        "instagram.com",
        "www.instagram.com",
        "m.instagram.com",
        "instagr.am",
        "www.instagr.am",
      ];

      if (
        !["http:", "https:"].includes(parsedUrl.protocol) ||
        !allowedHosts.includes(parsedUrl.hostname.toLowerCase())
      ) {
        setError("Please enter a valid Instagram link.");
        return;
      }
    } catch {
      setError("Please enter a valid URL.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `/api/download?url=${encodeURIComponent(url)}`,
        { method: "GET" }
      );

      const data: ApiResult = await response.json();

      if (!response.ok || data.success === false || data.error) {
        throw new Error(
          data.error || data.message || "Unable to download this content."
        );
      }

      const apiData = data.data || data;

      const downloadUrl =
        apiData.downloadUrl ||
        apiData.videoUrl ||
        apiData.downloads?.find((item) => item.downloadUrl)?.downloadUrl ||
        apiData.downloads?.find((item) => item.url)?.url;

      if (!downloadUrl) {
        throw new Error(
          "No downloadable video was found. Please try another Instagram link."
        );
      }

      setResult({
        ...apiData,
        downloadUrl,
        thumbnailUrl:
          apiData.thumbnailUrl ||
          apiData.imageUrl ||
          apiData.downloads?.find((item) => item.imageUrl)?.imageUrl,
      });
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

  async function copyLink() {
    if (!result?.downloadUrl) return;

    try {
      await navigator.clipboard.writeText(result.downloadUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Could not copy the link. Please copy it manually.");
    }
  }

  const downloadUrl = result?.downloadUrl;
  const thumbnail = result?.thumbnailUrl;
  const username = result?.authorUsername || result?.username;

  return (
    <main className="min-h-screen overflow-hidden bg-[#faf9ff] text-slate-900">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="absolute -right-40 top-40 h-96 w-96 rounded-full bg-pink-200/30 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-xl font-bold text-white shadow-lg shadow-purple-200">
              M
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight">
                Media<span className="text-violet-600">Save</span>
              </span>
              <p className="text-[10px] font-medium tracking-[0.2em] text-slate-400">
                MEDIA DOWNLOADER
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Free to use
          </div>

          <a
            href="#how-it-works"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold transition hover:border-violet-300 hover:text-violet-700"
          >
            How it works
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 px-5 pb-16 pt-16 sm:px-8 sm:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white px-4 py-2 text-xs font-semibold text-violet-700 shadow-sm">
            <span className="text-base">✦</span>
            SIMPLE · FAST · FREE
          </div>

          <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl">
            Save your favourite
            <br />
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
              Instagram videos
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            Download Instagram Reels and videos with ease. Just paste your
            link, process it, and save your video.
          </p>

          {/* Download form */}
          <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-white bg-white p-3 shadow-2xl shadow-purple-100/80 sm:p-5">
            <form onSubmit={handleDownload}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-violet-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100">
                  <svg
                    className="h-5 w-5 shrink-0 text-slate-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" />
                    <path d="M14 11a5 5 0 0 0-7.07 0l-3 3A5 5 0 0 0 11 21.07l1.72-1.72" />
                  </svg>

                  <input
                    type="url"
                    value={instagramUrl}
                    onChange={(event) => setInstagramUrl(event.target.value)}
                    placeholder="Paste Instagram video or Reel link here..."
                    className="h-14 min-w-0 w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 sm:text-base"
                    aria-label="Instagram URL"
                  />

                  {instagramUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        setInstagramUrl("");
                        setError("");
                        setResult(null);
                      }}
                      className="shrink-0 rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                      aria-label="Clear URL"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 text-sm font-bold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-200 disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-44"
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Download
                      <span className="text-lg">→</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-500">✓</span>
                No registration
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-500">✓</span>
                Easy to use
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-500">✓</span>
                Free service
              </span>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div
              role="alert"
              className="mx-auto mt-5 max-w-3xl rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-left text-sm text-red-700"
            >
              <span className="mr-2 font-bold">Error:</span>
              {error}
            </div>
          )}

          {/* Download result */}
          {result && downloadUrl && (
            <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-emerald-100 bg-white p-5 text-left shadow-xl shadow-emerald-100/40 sm:p-7">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-xl text-emerald-700">
                  ✓
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">
                    Your video is ready!
                  </h2>
                  <p className="text-sm text-slate-500">
                    Your download link has been generated.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-5 sm:flex-row">
                {thumbnail && (
                  <div className="w-full overflow-hidden rounded-2xl bg-slate-100 sm:w-40 sm:shrink-0">
                    <img
                      src={thumbnail}
                      alt="Instagram video thumbnail"
                      className="aspect-[4/5] h-full w-full object-cover"
                    />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  {username && (
                    <p className="mb-2 text-sm font-semibold text-violet-700">
                      @{username.replace(/^@/, "")}
                    </p>
                  )}

                  <p className="mb-5 line-clamp-3 text-sm leading-6 text-slate-600">
                    {result.caption || "Instagram video ready to download."}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <a
  href={`/api/file?url=${encodeURIComponent(downloadUrl)}`}
  download="MediaSave-Video.mp4"
  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
>
  <span>↓</span>
  Download Video
</a>

                    <button
                      type="button"
                      onClick={copyLink}
                      className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:text-violet-700"
                    >
                      {copied ? "Copied!" : "Copy Link"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="relative z-10 border-y border-slate-200/70 bg-white/70 px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
              Three simple steps
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              How MediaSave works
            </h2>
            <p className="mt-4 text-slate-500">
              Save your favourite content in just a few simple steps.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                number: "01",
                icon: "↗",
                title: "Copy the link",
                description:
                  "Open Instagram, find the Reel or video you want, and copy its link.",
              },
              {
                number: "02",
                icon: "⌕",
                title: "Paste the link",
                description:
                  "Paste the copied Instagram URL into the MediaSave input box.",
              },
              {
                number: "03",
                icon: "↓",
                title: "Download",
                description:
                  "Press the Download button and use the generated link to save your video.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-100/60"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-3xl font-bold text-violet-600">
                    {step.icon}
                  </div>
                  <span className="text-sm font-bold tracking-widest text-slate-300">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
              Why MediaSave
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Made for simple downloads
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "⚡",
                title: "Fast process",
                description:
                  "Get your download link through a simple and straightforward process.",
              },
              {
                icon: "✦",
                title: "Simple interface",
                description:
                  "A clean design that makes downloading easy for everyone.",
              },
              {
                icon: "♡",
                title: "Free to use",
                description:
                  "Use MediaSave without creating an account or signing up.",
              },
              {
                icon: "▣",
                title: "Mobile friendly",
                description:
                  "Use the website on your phone, tablet, or computer.",
              },
              {
                icon: "↓",
                title: "Easy downloads",
                description:
                  "Access the generated video link and save supported content.",
              },
              {
                icon: "◎",
                title: "Simple workflow",
                description:
                  "Just copy, paste, process, and download.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 transition hover:border-violet-200 hover:shadow-lg hover:shadow-purple-100/50"
              >
                <div className="mb-4 text-3xl">{feature.icon}</div>
                <h3 className="font-bold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 bg-white px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
              Need help?
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Is MediaSave free to use?",
                answer:
                  "Yes, MediaSave is free to use. No account or registration is required.",
              },
              {
                question: "How do I download an Instagram video?",
                answer:
                  "Copy the link of a supported Instagram Reel or video, paste it into the box above, and press Download.",
              },
              {
                question: "Why is my video not downloading?",
                answer:
                  "Some links may be private, unavailable, unsupported, or temporarily inaccessible. Try a public Instagram link.",
              },
              {
                question: "Can I use MediaSave on my phone?",
                answer:
                  "Yes, MediaSave is designed to work on mobile phones, tablets, and desktop browsers.",
              },
            ].map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 open:bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-800">
                  {faq.question}
                  <span className="text-xl text-violet-600 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-slate-500">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 bg-[#faf9ff] px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-lg font-extrabold">
              Media<span className="text-violet-600">Save</span>
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Simple and easy media downloads.
            </p>
          </div>

          <p className="text-xs text-slate-400">
            © 2026 MediaSave. All rights reserved.
          </p>

          <a
            href="#"
            className="text-sm font-medium text-slate-500 transition hover:text-violet-600"
          >
            Back to top ↑
          </a>
        </div>

        <p className="mx-auto mt-6 max-w-4xl text-center text-[11px] leading-5 text-slate-400">
          MediaSave is an independent tool and is not affiliated with
          Instagram or Meta. Please respect content ownership and only
          download content you have permission to use.
        </p>
      </footer>
    </main>
  );
}