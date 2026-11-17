'use client';

import { useState, type FormEvent } from 'react';

type Result = {
  downloadUrl: string;
  thumbnailUrl: string;
  username: string;
  caption: string;
};

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');

  const handleDownload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const instagramUrl = url.trim();

    if (!instagramUrl) {
      setError('Please paste an Instagram link.');
      return;
    }

    if (!/^https?:\/\/(www\.)?(instagram\.com|instagr\.am)\//i.test(instagramUrl)) {
      setError('Please enter a valid Instagram link.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(
        `/api/download?url=${encodeURIComponent(instagramUrl)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to process this Instagram link.');
      }

      const downloadUrl =
        data.downloadUrl ||
        data.videoUrl ||
        data.downloads?.find((item: any) => item.downloadUrl)?.downloadUrl ||
        data.downloads?.find((item: any) => item.url)?.url;

      if (!downloadUrl) {
        throw new Error('No downloadable file found. Please try another link.');
      }

      setResult({
        downloadUrl,
        thumbnailUrl:
          data.thumbnailUrl ||
          data.downloads?.find((item: any) => item.imageUrl)?.imageUrl ||
          '',
        username: data.authorUsername || '',
        caption: data.caption || '',
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 py-5 flex items-center justify-between">
          <a href="/" className="text-2xl font-extrabold tracking-tight text-purple-700">
            MediaSave<span className="text-pink-500">.</span>
          </a>

          <nav className="flex gap-5 text-sm font-medium text-gray-600">
            <a href="#how-it-works" className="hover:text-purple-700">How it works</a>
            <a href="#features" className="hover:text-purple-700">Features</a>
            <a href="#faq" className="hover:text-purple-700">FAQ</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="px-5 pt-20 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 text-purple-700 px-4 py-2 text-sm font-semibold mb-6">
            ✨ Simple. Fast. Free.
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Download Instagram
            <span className="block text-purple-700">Videos & Reels</span>
          </h1>

          <p className="mt-6 text-gray-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Save Instagram videos and reels easily. Just paste your link below
            and get your downloadable file.
          </p>

          {/* Download Form */}
          <form
            onSubmit={handleDownload}
            className="mt-10 bg-white border border-gray-200 shadow-xl shadow-purple-100/60 rounded-2xl p-3 flex flex-col sm:flex-row gap-3"
          >
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste Instagram link here..."
              className="flex-1 min-w-0 px-4 py-4 outline-none text-gray-800 placeholder:text-gray-400 rounded-xl"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-purple-700 hover:bg-purple-800 disabled:opacity-60 text-white font-semibold px-8 py-4 rounded-xl transition"
            >
              {loading ? 'Processing...' : '↓ Download'}
            </button>
          </form>

          <p className="text-xs text-gray-400 mt-4">
            Paste a public Instagram post or reel link to get started.
          </p>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl bg-red-50 border border-red-200 text-red-700 p-4 text-sm">
              {error}
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="mt-8 max-w-md mx-auto rounded-2xl border border-gray-200 bg-gray-50 p-5 text-left">
              <p className="text-green-700 font-semibold text-center mb-4">
                ✓ Your file is ready!
              </p>

              {result.thumbnailUrl && (
                <img
                  src={result.thumbnailUrl}
                  alt="Instagram content preview"
                  className="w-full max-h-80 object-contain rounded-xl mb-4 bg-gray-100"
                />
              )}

              {result.username && (
                <p className="text-sm text-gray-500 mb-3">
                  @{result.username}
                </p>
              )}

              {result.caption && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {result.caption}
                </p>
              )}

              <a
                href={result.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition"
              >
                ↓ Download File
              </a>

              <p className="text-xs text-gray-400 text-center mt-3">
                If the file opens in a new tab, use your browser's save option.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-gray-50 py-16 px-5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold">How to download</h2>
          <p className="text-gray-500 mt-3">Three simple steps to get your file.</p>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              { number: '01', title: 'Copy the link', desc: 'Copy the link of a public Instagram post or reel.' },
              { number: '02', title: 'Paste the link', desc: 'Paste your Instagram link into the box above.' },
              { number: '03', title: 'Download', desc: 'Process your link and open the downloadable file.' },
            ].map((step) => (
              <div key={step.number} className="bg-white border border-gray-100 rounded-2xl p-7">
                <div className="text-purple-700 font-extrabold text-3xl">{step.number}</div>
                <h3 className="font-bold text-lg mt-4">{step.title}</h3>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Why use MediaSave?</h2>

          <div className="grid sm:grid-cols-3 gap-8 mt-10">
            <div>
              <div className="text-3xl">⚡</div>
              <h3 className="font-bold mt-3">Simple process</h3>
              <p className="text-sm text-gray-500 mt-2">Get started with just an Instagram link.</p>
            </div>

            <div>
              <div className="text-3xl">📱</div>
              <h3 className="font-bold mt-3">Mobile friendly</h3>
              <p className="text-sm text-gray-500 mt-2">Use MediaSave on your phone or computer.</p>
            </div>

            <div>
              <div className="text-3xl">✨</div>
              <h3 className="font-bold mt-3">Clean experience</h3>
              <p className="text-sm text-gray-500 mt-2">A simple interface without unnecessary steps.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-gray-50 py-16 px-5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently asked questions
          </h2>

          <div className="space-y-5">
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="font-bold">How do I use MediaSave?</h3>
              <p className="text-sm text-gray-500 mt-2">
                Copy a public Instagram link, paste it into the input box and press Download.
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="font-bold">Can I use MediaSave on my phone?</h3>
              <p className="text-sm text-gray-500 mt-2">
                Yes, the website is designed to work on mobile phones and computers.
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="font-bold">Why is my link not working?</h3>
              <p className="text-sm text-gray-500 mt-2">
                Make sure the link is correct and the Instagram content is publicly accessible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <a href="/" className="text-xl font-extrabold text-purple-700">
            MediaSave.
          </a>

          <p className="text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} MediaSave. All rights reserved.
          </p>

          <p className="text-xs text-gray-400">
            Not affiliated with Instagram or Meta.
          </p>
        </div>
      </footer>
    </main>
  );
}