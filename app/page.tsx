'use client';

import { useState, type FormEvent } from 'react';

type DownloadResult = {
  downloadUrl: string;
  thumbnailUrl: string;
  username: string;
  caption: string;
};

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [error, setError] = useState('');

  const handleDownload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanUrl = url.trim();

    if (!cleanUrl) {
      setError('Please paste an Instagram link.');
      return;
    }

    try {
      const parsedUrl = new URL(cleanUrl);
      const host = parsedUrl.hostname.toLowerCase();

      if (
        !['instagram.com', 'www.instagram.com', 'instagr.am', 'www.instagr.am'].includes(host)
      ) {
        setError('Please enter a valid Instagram link.');
        return;
      }
    } catch {
      setError('Please enter a valid Instagram link.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(
        `/api/download?url=${encodeURIComponent(cleanUrl)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to process your link.');
      }

      const downloadUrl =
        data.downloadUrl ||
        data.videoUrl ||
        data.downloads?.find(
          (item: any) => item.downloadUrl
        )?.downloadUrl ||
        data.downloads?.find(
          (item: any) => item.url
        )?.url;

      if (!downloadUrl) {
        throw new Error('No downloadable file found. Please try another link.');
      }

      setResult({
        downloadUrl,
        thumbnailUrl:
          data.thumbnailUrl ||
          data.downloads?.find(
            (item: any) => item.imageUrl
          )?.imageUrl ||
          '',
        username: data.authorUsername || '',
        caption: data.caption || '',
      });

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">

          <a href="/" className="text-2xl font-black tracking-tight">
            <span className="text-purple-700">Media</span>
            <span className="text-pink-500">Save.</span>
          </a>

          <nav className="hidden sm:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#home" className="hover:text-purple-700">Home</a>
            <a href="#how" className="hover:text-purple-700">How it works</a>
            <a href="#features" className="hover:text-purple-700">Features</a>
            <a href="#faq" className="hover:text-purple-700">FAQ</a>
          </nav>

          <a
            href="#download"
            className="bg-purple-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-purple-800 transition"
          >
            Get Started
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-b from-purple-50 via-white to-white">

        <div className="absolute -top-24 -left-20 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl" />
        <div className="absolute top-20 -right-20 w-72 h-72 bg-pink-200/40 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-5 pt-20 pb-24 text-center">

          <div className="inline-flex items-center gap-2 bg-white border border-purple-100 shadow-sm rounded-full px-4 py-2 text-sm text-purple-700 font-semibold mb-7">
            <span>✦</span>
            Simple • Fast • Easy
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
            Download Instagram
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-500">
              Reels & Videos
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-gray-500 text-base sm:text-lg leading-relaxed">
            Save your favorite Instagram videos and reels in just a few clicks.
            Paste a link and get started with MediaSave.
          </p>

          {/* DOWNLOAD BOX */}
          <div id="download" className="max-w-3xl mx-auto mt-12">

            <form
              onSubmit={handleDownload}
              className="bg-white p-3 rounded-2xl border border-gray-200 shadow-2xl shadow-purple-100/70 flex flex-col sm:flex-row gap-3"
            >

              <div className="flex-1 flex items-center px-4 gap-3">
                <span className="text-2xl text-purple-600">↗</span>

                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste Instagram link here..."
                  className="w-full min-w-0 py-4 text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-purple-700 to-pink-600 text-white font-bold px-9 py-4 rounded-xl hover:opacity-90 transition disabled:opacity-60"
              >
                {loading ? 'Processing...' : '↓ Download'}
              </button>

            </form>

            <p className="text-xs text-gray-400 mt-4">
              Paste a public Instagram post or reel link to continue.
            </p>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="mt-5 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* DOWNLOAD RESULT */}
            {result && (
              <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-5 shadow-lg text-left">

                <div className="flex items-center gap-2 text-green-700 font-bold mb-5">
                  <span>✓</span>
                  Your file is ready!
                </div>

                {result.thumbnailUrl && (
                  <img
                    src={result.thumbnailUrl}
                    alt="Instagram preview"
                    className="w-full max-h-80 object-contain rounded-xl bg-gray-50 mb-5"
                  />
                )}

                {result.username && (
                  <p className="text-sm text-gray-500 mb-3">
                    @{result.username}
                  </p>
                )}

                {result.caption && (
                  <p className="text-sm text-gray-600 mb-4">
                    {result.caption}
                  </p>
                )}

                <a
                  href={result.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition"
                >
                  ↓ Download File
                </a>

                <p className="text-xs text-gray-400 text-center mt-3">
                  If the file opens in a new tab, use your browser's save option.
                </p>

              </div>
            )}

          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <span>✓ Easy to use</span>
            <span>✓ Mobile friendly</span>
            <span>✓ Simple process</span>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20 px-5 bg-gray-50">

        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-14">
            <p className="text-purple-700 font-bold text-sm uppercase tracking-widest">
              Easy process
            </p>

            <h2 className="text-3xl sm:text-4xl font-black mt-3">
              How MediaSave Works
            </h2>

            <p className="text-gray-500 mt-4">
              Download your favorite content in three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-7">

            {[
              {
                number: '01',
                icon: '🔗',
                title: 'Copy Instagram Link',
                description: 'Copy the link of the public Instagram reel or post you want to save.',
              },
              {
                number: '02',
                icon: '📋',
                title: 'Paste Your Link',
                description: 'Paste your copied Instagram link into the MediaSave download box.',
              },
              {
                number: '03',
                icon: '⬇️',
                title: 'Download Your File',
                description: 'Process the link and open the available downloadable file.',
              },
            ].map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center">
                  <span className="text-4xl">{step.icon}</span>
                  <span className="text-purple-200 font-black text-3xl">{step.number}</span>
                </div>

                <h3 className="font-bold text-xl mt-7">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mt-3">
                  {step.description}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 px-5">

        <div className="max-w-6xl mx-auto text-center">

          <p className="text-purple-700 font-bold text-sm uppercase tracking-widest">
            Why MediaSave
          </p>

          <h2 className="text-3xl sm:text-4xl font-black mt-3">
            A Simple Way to Save Videos
          </h2>

          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Enjoy a clean and straightforward experience on your favorite devices.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-14">

            {[
              {
                icon: '⚡',
                title: 'Simple & Fast',
                description: 'A straightforward process to get your downloadable file.',
              },
              {
                icon: '📱',
                title: 'Mobile Friendly',
                description: 'Use MediaSave on your smartphone, tablet or computer.',
              },
              {
                icon: '🎯',
                title: 'Easy Interface',
                description: 'A clean design with simple navigation and fewer steps.',
              },
              {
                icon: '🎬',
                title: 'Video Preview',
                description: 'View an available thumbnail before opening your file.',
              },
              {
                icon: '🌐',
                title: 'Online Access',
                description: 'Access the website through your browser.',
              },
              {
                icon: '✨',
                title: 'Clean Experience',
                description: 'Enjoy a minimal interface focused on your task.',
              },
            ].map((feature) => (
              <div key={feature.title} className="text-left p-7 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition">
                <div className="text-3xl">{feature.icon}</div>
                <h3 className="font-bold text-lg mt-5">{feature.title}</h3>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-5 bg-purple-50/60">

        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-12">
            <p className="text-purple-700 font-bold text-sm uppercase tracking-widest">
              Need help?
            </p>

            <h2 className="text-3xl sm:text-4xl font-black mt-3">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">

            {[
              {
                q: 'How do I download an Instagram video?',
                a: 'Copy a public Instagram link, paste it into the MediaSave input box and click Download.',
              },
              {
                q: 'Is MediaSave mobile friendly?',
                a: 'Yes. The website layout is designed to adapt to phones, tablets and desktop screens.',
              },
              {
                q: 'Why is my Instagram link not working?',
                a: 'Check that your link is correct and that the Instagram content is publicly accessible. Some links may not be supported.',
              },
              {
                q: 'Can I download private Instagram content?',
                a: 'No. MediaSave is intended for publicly accessible content that you have permission to save.',
              },
            ].map((item) => (
              <details key={item.q} className="group bg-white rounded-xl border border-purple-100 p-5">
                <summary className="cursor-pointer font-bold list-none flex items-center justify-between gap-4">
                  {item.q}
                  <span className="text-purple-700 text-xl group-open:rotate-45 transition">+</span>
                </summary>

                <p className="text-gray-500 text-sm leading-relaxed mt-4">
                  {item.a}
                </p>
              </details>
            ))}

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-10 px-5">

        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">

            <div className="text-center md:text-left">
              <a href="/" className="text-2xl font-black">
                <span className="text-purple-700">Media</span>
                <span className="text-pink-500">Save.</span>
              </a>

              <p className="text-sm text-gray-400 mt-2">
                A simple way to save publicly available Instagram videos.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-5 text-sm text-gray-500">
              <a href="#home" className="hover:text-purple-700">Home</a>
              <a href="#how" className="hover:text-purple-700">How it works</a>
              <a href="#faq" className="hover:text-purple-700">FAQ</a>
            </div>

          </div>

          <div className="border-t border-gray-100 mt-8 pt-6 text-center">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} MediaSave. All rights reserved.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              MediaSave is an independent service and is not affiliated with Instagram or Meta.
            </p>
          </div>

        </div>
      </footer>

    </main>
  );
}