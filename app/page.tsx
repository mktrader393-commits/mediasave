import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Instagram, TikTok & Pinterest Video Downloader",
  description:
    "Download public Instagram Reels, TikTok videos and Pinterest video Pins online for free with MediaSave. Fast, simple and easy video downloading on mobile and desktop.",
  alternates: {
    canonical: "https://www.mediasave.live",
  },
  openGraph: {
    title: "Free Instagram, TikTok & Pinterest Video Downloader | MediaSave",
    description:
      "Save supported public Instagram Reels, TikTok videos and Pinterest video Pins with MediaSave. Free and easy online video downloader.",
    url: "https://www.mediasave.live",
    siteName: "MediaSave",
    type: "website",
  },
};

const tools = [
  {
    name: "Instagram Downloader",
    description:
      "Download public Instagram Reels and videos in a few simple steps.",
    href: "/instagram-video-downloader",
    icon: "◎",
    label: "Instagram",
    gradient: "from-pink-500 to-orange-400",
    light: "bg-pink-50",
  },
  {
    name: "TikTok Downloader",
    description:
      "Save public TikTok videos without watermark when available.",
    href: "/tiktok-video-downloader",
    icon: "♪",
    label: "No Watermark",
    gradient: "from-slate-900 to-slate-600",
    light: "bg-slate-100",
  },
  {
    name: "Pinterest Downloader",
    description:
      "Download supported public Pinterest video Pins easily.",
    href: "/pinterest-video-downloader",
    icon: "P",
    label: "Pinterest",
    gradient: "from-red-600 to-rose-400",
    light: "bg-red-50",
  },
];

const benefits = [
  {
    icon: "⚡",
    title: "Fast Processing",
    description: "Get your supported video links processed in simple steps.",
  },
  {
    icon: "🔓",
    title: "No Registration",
    description: "Use the available downloader tools without creating an account.",
  },
  {
    icon: "📱",
    title: "Mobile Friendly",
    description: "Enjoy a responsive experience on phones, tablets and computers.",
  },
  {
    icon: "🌍",
    title: "Easy Access",
    description: "Use MediaSave directly from your web browser.",
  },
];

const steps = [
  {
    number: "01",
    icon: "🔗",
    title: "Copy Video Link",
    description:
      "Open Instagram, TikTok or Pinterest and copy the link of a supported public video.",
  },
  {
    number: "02",
    icon: "📋",
    title: "Paste the Link",
    description:
      "Choose the correct MediaSave downloader and paste your copied link.",
  },
  {
    number: "03",
    icon: "⬇️",
    title: "Download and Save",
    description:
      "Process your link and download the available video to your device.",
  },
];

const faqs = [
  {
    question: "What is MediaSave?",
    answer:
      "MediaSave is an online platform offering video downloader tools for supported public content from Instagram, TikTok and Pinterest.",
  },
  {
    question: "Is MediaSave free?",
    answer:
      "Yes. MediaSave offers its available downloader tools free of charge.",
  },
  {
    question: "Do I need an account to download videos?",
    answer:
      "No. You can use the available downloader tools without signing in or creating an account.",
  },
  {
    question: "Can I use MediaSave on my phone?",
    answer:
      "Yes. MediaSave is designed to work on mobile phones, tablets and desktop computers.",
  },
  {
    question: "Can I download TikTok videos without a watermark?",
    answer:
      "MediaSave supports watermark-free downloads of public TikTok videos when the source makes them available.",
  },
  {
    question: "Does MediaSave store downloaded videos?",
    answer:
      "MediaSave provides download links for supported content. Your downloaded files are saved to your device through your browser.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-xl font-black text-white shadow-lg shadow-violet-200">
              M
            </span>
            <span className="text-2xl font-black tracking-tight">
              Media<span className="text-violet-600">Save</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
            <Link href="/" className="text-violet-600">Home</Link>
            <Link href="#tools" className="transition hover:text-violet-600">Tools</Link>
            <Link href="#how-it-works" className="transition hover:text-violet-600">How It Works</Link>
            <Link href="#faq" className="transition hover:text-violet-600">FAQ</Link>
          </nav>

          <a
            href="#account"
            className="rounded-full border border-violet-200 px-5 py-2.5 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
          >
            Account
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative isolate px-5 pb-24 pt-20 sm:px-8 sm:pb-32 sm:pt-28">
        <div className="absolute -left-32 top-10 -z-10 h-80 w-80 rounded-full bg-violet-100/80 blur-3xl" />
        <div className="absolute -right-32 top-24 -z-10 h-80 w-80 rounded-full bg-indigo-100/70 blur-3xl" />

        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white px-4 py-2 text-xs font-bold text-violet-700 shadow-sm sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            ONE PLATFORM. THREE POWERFUL TOOLS.
          </div>

          <h1 className="mt-8 text-4xl font-black leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl">
            Free Instagram, TikTok & Pinterest
            <span className="mt-2 block bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Video Downloader
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
            Your simple destination to download supported videos from
            Instagram, TikTok and Pinterest. No complicated steps. Just
            copy, paste and save.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="#tools"
              className="rounded-full bg-violet-600 px-9 py-4 text-center font-bold text-white shadow-xl shadow-violet-200 transition hover:-translate-y-1 hover:bg-violet-700"
            >
              Explore All Tools <span className="ml-2">→</span>
            </Link>
            <Link
              href="#how-it-works"
              className="rounded-full border border-slate-200 bg-white px-9 py-4 text-center font-bold text-slate-700 transition hover:border-violet-300 hover:text-violet-700"
            >
              How It Works
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm font-medium text-slate-500">
            <span>✓ Free to use</span>
            <span>✓ No account required</span>
            <span>✓ Works on mobile</span>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-slate-100 bg-white p-5 shadow-xl shadow-violet-100/50">
            <div>
              <p className="text-2xl font-black text-violet-600">3</p>
              <p className="mt-1 text-xs font-semibold text-slate-500 sm:text-sm">Platforms</p>
            </div>
            <div>
              <p className="text-2xl font-black text-violet-600">Free</p>
              <p className="mt-1 text-xs font-semibold text-slate-500 sm:text-sm">To Use</p>
            </div>
            <div>
              <p className="text-2xl font-black text-violet-600">24/7</p>
              <p className="mt-1 text-xs font-semibold text-slate-500 sm:text-sm">Online Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* DOWNLOAD TOOLS */}
      <section id="tools" className="scroll-mt-24 bg-slate-50 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-violet-600">
              Choose Your Platform
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
              All Your Downloaders
              <span className="block text-violet-600">In One Place.</span>
            </h2>
            <p className="mt-5 leading-8 text-slate-500">
              Select a platform below and use its dedicated downloader to
              save supported public videos.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {tools.map((tool) => (
              <article
                key={tool.name}
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-violet-200 hover:shadow-2xl hover:shadow-violet-100"
              >
                <div className="flex items-center justify-between">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${tool.light}`}>
                    <span className={`bg-gradient-to-br ${tool.gradient} bg-clip-text text-4xl font-black text-transparent`}>
                      {tool.icon}
                    </span>
                  </div>
                  <span className="rounded-full bg-violet-50 px-3 py-2 text-[11px] font-bold text-violet-700">
                    {tool.label}
                  </span>
                </div>

                <h3 className="mt-8 text-xl font-black">{tool.name}</h3>
                <p className="mt-3 min-h-[72px] text-sm leading-7 text-slate-500">
                  {tool.description}
                </p>

                <Link
                  href={tool.href}
                  className="mt-7 flex items-center justify-between rounded-xl bg-violet-600 px-5 py-4 text-sm font-bold text-white transition hover:bg-violet-700"
                >
                  Open Downloader
                  <span className="text-xl transition group-hover:translate-x-1">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="scroll-mt-24 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-violet-600">
              Easy as 1, 2, 3
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
              How Does It Work?
            </h2>
            <p className="mt-4 text-slate-500">
              Saving your favorite supported videos is simple.
            </p>
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="relative text-center">
                <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-3xl border border-violet-100 bg-violet-50 text-4xl shadow-sm">
                  {step.icon}
                  <span className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-xs font-black text-white">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-7 text-xl font-black">{step.title}</h3>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-slate-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY MEDIASAVE */}
      <section className="bg-gradient-to-br from-violet-50 via-white to-indigo-50 px-5 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-2">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-violet-600">
              Why MediaSave?
            </span>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              A Better Way to
              <span className="block text-violet-600">Save Your Videos.</span>
            </h2>
            <p className="mt-6 max-w-xl leading-8 text-slate-500">
              MediaSave brings multiple downloader tools together in one
              simple platform. Choose your favorite service and enjoy an
              easy-to-use experience from your browser.
            </p>
            <Link
              href="#tools"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-violet-600 px-8 py-4 font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-1 hover:bg-violet-700"
            >
              Start Exploring <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-white bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="text-3xl">{benefit.icon}</span>
                <h3 className="mt-5 font-black">{benefit.title}</h3>
                <p className="mt-2 text-xs leading-6 text-slate-500 sm:text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACCOUNT */}
      <section id="account" className="scroll-mt-24 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-violet-100 bg-white px-7 py-12 text-center shadow-xl shadow-violet-100/50 sm:px-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 text-3xl">
            👤
          </div>
          <h2 className="mt-6 text-2xl font-black sm:text-3xl">
            Your Account, Your Choice.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-8 text-slate-500">
            Google and Apple sign-in options are planned for optional
            account access. You can continue using all available
            MediaSave downloaders without an account.
          </p>
          <span className="mt-7 inline-flex rounded-full bg-violet-50 px-5 py-2.5 text-sm font-bold text-violet-700">
            Account features coming soon
          </span>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 bg-slate-50 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-violet-600">
              Got Questions?
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-slate-500">
              Find answers to common questions about MediaSave.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition open:border-violet-200 open:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
                  {faq.question}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-50 text-xl text-violet-600 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-7 text-slate-500">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 px-5 pb-8 pt-16 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-xl font-black">
                M
              </span>
              <span className="text-2xl font-black">
                Media<span className="text-violet-400">Save</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-8 text-slate-400">
              Download supported public videos from Instagram, TikTok and Pinterest with MediaSave. Explore our free online video downloader tools.
            </p>
          </div>

          <div>
            <h3 className="font-black">Our Tools</h3>
            <div className="mt-5 flex flex-col gap-4 text-sm text-slate-400">
              <Link className="transition hover:text-violet-300" href="/instagram-video-downloader">Instagram Downloader</Link>
              <Link className="transition hover:text-violet-300" href="/tiktok-video-downloader">TikTok Downloader</Link>
              <Link className="transition hover:text-violet-300" href="/pinterest-video-downloader">Pinterest Downloader</Link>
            </div>
          </div>

          <div>
            <h3 className="font-black">Quick Links</h3>
            <div className="mt-5 flex flex-col gap-4 text-sm text-slate-400">
              <Link className="transition hover:text-violet-300" href="/">Home</Link>
              <Link className="transition hover:text-violet-300" href="#tools">All Tools</Link>
              <Link className="transition hover:text-violet-300" href="#how-it-works">How It Works</Link>
              <Link className="transition hover:text-violet-300" href="#faq">FAQs</Link>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-7xl border-t border-slate-800 pt-7 text-center">
          <p className="text-xs leading-6 text-slate-500">
            MediaSave is an independent service and is not affiliated with
            Instagram, TikTok or Pinterest. Please respect copyright,
            privacy and the terms of the original platforms.
          </p>
          <p className="mt-4 text-xs text-slate-500">
            © 2026 MediaSave. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}