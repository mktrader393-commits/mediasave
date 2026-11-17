'use client';

import { useState, type FormEvent } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDownload = async (e: FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      setErrorMessage('Please paste an Instagram link.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setResultData(null);

    try {
      const response = await fetch(
        `/api/download?url=${encodeURIComponent(url.trim())}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to process this link.');
      }

      const downloadUrl =
        data.downloadUrl ||
        data.videoUrl ||
        data.downloads?.find((item: any) => item.downloadUrl)?.downloadUrl;

      if (!downloadUrl) {
        throw new Error('No downloadable file found. Please try another link.');
      }

      setResultData({
        downloadUrl,
        thumbnailUrl:
          data.thumbnailUrl ||
          data.downloads?.[0]?.imageUrl ||
          '',
        caption: data.caption || '',
        username: data.authorUsername || '',
      });

    } catch (error: any) {
      setErrorMessage(error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0d0714] text-white flex flex-col items-center justify-between p-6">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center pt-12">

        <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent">
          Download Instagram Reels, Videos & Photos
        </h1>

        <p className="text-gray-400 text-center mb-8 text-sm md:text-base">
          Paste your Instagram link below to download videos and photos.
        </p>

        <form
          onSubmit={handleDownload}
          className="w-full bg-[#1a1025] p-4 rounded-2xl border border-purple-900/50 shadow-2xl flex flex-col gap-4"
        >
          <input
            type="url"
            required
            placeholder="https://www.instagram.com/reel/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-[#0d0714] border border-purple-800/60 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : '↓ Download'}
          </button>
        </form>

        {errorMessage && (
          <div className="mt-4 p-3 bg-red-950/50 border border-red-800 text-red-200 text-sm rounded-xl w-full text-center">
            {errorMessage}
          </div>
        )}

        {resultData && (
          <div className="mt-6 w-full bg-[#1a1025] p-4 rounded-2xl border border-purple-900/50 flex flex-col items-center gap-4">

            <p className="text-green-400 font-medium">
              Video ready for download!
            </p>

            {resultData.thumbnailUrl && (
              <img
                src={resultData.thumbnailUrl}
                alt="Instagram video preview"
                className="w-full max-w-xs rounded-xl"
              />
            )}

            {resultData.username && (
              <p className="text-gray-400 text-sm">
                @{resultData.username}
              </p>
            )}

            <a
              href={resultData.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition"
            >
              ↓ Download Video
            </a>

            <p className="text-xs text-gray-400 text-center">
              If the video opens in a new tab, use your browser's Save or Download option.
            </p>
          </div>
        )}
      </div>

      <footer className="text-gray-500 text-xs mt-12">
        MediaSave - Fast & Free Instagram Downloader
      </footer>
    </main>
  );
}