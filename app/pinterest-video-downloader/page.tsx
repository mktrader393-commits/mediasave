import type { Metadata } from "next";
import {
  Download,
  ShieldCheck,
  Sparkles,
  Video,
  Zap,
} from "lucide-react";
import PinterestDownloader from "./PinterestDownloader";

export const metadata: Metadata = {
  title: "Pinterest Video Downloader - Download Pinterest Videos Free",
  description:
    "Download public Pinterest videos online for free with MediaSave. Paste a Pinterest video Pin link and save supported videos quickly. No registration required.",
  alternates: {
    canonical: "/pinterest-video-downloader",
  },
  keywords: [
    "Pinterest video downloader",
    "download Pinterest videos",
    "Pinterest video download online",
    "free Pinterest downloader",
    "Pinterest Pin video downloader",
    "MediaSave",
  ],
  openGraph: {
    title: "Pinterest Video Downloader | MediaSave",
    description:
      "Download supported public Pinterest videos online for free with MediaSave.",
    url: "https://www.mediasave.live/pinterest-video-downloader",
    siteName: "MediaSave",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Pinterest Video Downloader | MediaSave",
    description:
      "Download supported public Pinterest videos online for free with MediaSave.",
  },
};

export default function PinterestVideoDownloaderPage() {
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

            <PinterestDownloader />

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