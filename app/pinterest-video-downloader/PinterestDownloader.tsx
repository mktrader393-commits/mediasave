"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowDownToLine,
  CheckCircle2,
  Download,
  Link2,
  ShieldCheck,
  Sparkles,
  Video,
  Zap,
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
    <main className="min-h-screen overflow-hidden bg-white text-slate-800">
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl" />
        <div className="absolute -right-40 top-72 h-96 w-96 rounded-full bg-fuchsia-200/40 blur-3xl" />
      </div>

      <div className="relative z-10">
        <header className="border-b border-slate-100 bg-white/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <a href="/" className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-200">
                <Download size={21} />
              </span>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Media<span className="text-violet-600">Save</span>
              </span>
            </a>

            <a
              href="/"
              className="rounded-full border border-violet-200 px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
            >
              Instagram Downloader
            </a>
          </div>
        </header>

        <section className="px-5 pb-16 pt-16 sm:pb-24 sm:pt-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
              <Sparkles size={16} />
              Free Online Pinterest Downloader
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-6xl">
              Pinterest Video
              <span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
                Downloader
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Download supported public Pinterest videos online with MediaSave.
              Simply paste your Pin link and save your video in a few easy steps.
            </p>

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

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <ShieldCheck size={17} className="text-violet-600" />
                No registration
              </span>
              <span className="flex items-center gap-2">
                <Zap size={17} className="text-violet-600" />
                Simple process
              </span>
              <span className="flex items-center gap-2">
                <Video size={17} className="text-violet-600" />
                Public video Pins
              </span>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-100 bg-slate-50/70 px-5 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                How to Download Pinterest Videos
              </h2>
              <p className="mt-3 text-slate-600">
                Save a supported public Pinterest video in three simple steps.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Copy the Pin link",
                  description:
                    "Open Pinterest, select a public video Pin and copy its link.",
                },
                {
                  number: "02",
                  title: "Paste the link",
                  description:
                    "Paste the copied Pinterest link into the MediaSave downloader.",
                },
                {
                  number: "03",
                  title: "Download your video",
                  description:
                    "If the public Pin is supported, process it and download the video.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-lg font-extrabold text-white">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-slate-900">
                Why Use MediaSave?
              </h2>
              <p className="mt-3 text-slate-600">
                A simple way to save supported public Pinterest videos.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: <Download size={23} />,
                  title: "Easy to Use",
                  description:
                    "A straightforward link-and-download experience.",
                },
                {
                  icon: <ShieldCheck size={23} />,
                  title: "Public Pins Only",
                  description:
                    "Designed for publicly accessible Pinterest video Pins.",
                },
                {
                  icon: <Zap size={23} />,
                  title: "No Registration",
                  description:
                    "Use the downloader without creating a MediaSave account.",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>

            <div className="mt-9 space-y-4">
              {[
                {
                  question: "Is MediaSave's Pinterest downloader free?",
                  answer:
                    "MediaSave is designed to provide a free online downloader for supported public Pinterest videos.",
                },
                {
                  question: "Can I download private Pinterest videos?",
                  answer:
                    "No. Private, restricted or inaccessible Pinterest content is not supported.",
                },
                {
                  question: "Do I need to install an app?",
                  answer:
                    "No app installation is required. You can use the website in a supported browser.",
                },
                {
                  question: "Why is my Pinterest link not working?",
                  answer:
                    "Some Pins may be unavailable, image-only, restricted or unsupported. Try another publicly accessible video Pin.",
                },
              ].map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-slate-200 bg-white p-5"
                >
                  <summary className="cursor-pointer list-none font-bold text-slate-900 marker:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {faq.question}
                      <span className="text-xl text-violet-600 transition group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-t border-slate-100 bg-white px-5 py-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-sm font-semibold text-slate-700">
              MediaSave — Save what inspires you.
            </p>
            <a
              href="/"
              className="text-sm font-semibold text-violet-600 transition hover:text-fuchsia-600"
            >
              Instagram Video Downloader
            </a>
          </div>
          <p className="mx-auto mt-5 max-w-6xl text-center text-xs leading-5 text-slate-400">
            MediaSave is an independent tool and is not affiliated with or
            endorsed by Pinterest. Please respect content ownership and
            download only content you have permission to use.
          </p>
        </footer>
      </div>
    </main>
  );
}