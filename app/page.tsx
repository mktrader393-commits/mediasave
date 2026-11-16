'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return; // Yahan link check hota hai

    setLoading(true);
    setErrorMessage('');
    setResultData(null);

    try {
      const response = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Network error. Please try again.");
      }

      setResultData(data);
    } catch (error: any) {
      setErrorMessage(error.message || "Network error. Please try again.");
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
          Paste your Instagram link below to instantly download high-quality videos and photos without any watermark.
        </p>

        <form onSubmit={handleDownload} className="w-full bg-[#1a1025] p-4 rounded-2xl border border-purple-900/50 shadow-2xl flex flex-col gap-4">
          <input
            type="text"
            placeholder="https://www.instagram.com/reel/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-[#0d0714] border border-purple-800/60 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? "Processing..." : "↓ Download"}
          </button>
        </form>

        {errorMessage && (
          <div className="mt-4 p-3 bg-red-950/50 border border-red-800 text-red-200 text-sm rounded-xl w-full text-center">
            {errorMessage}
          </div>
        )}

        {resultData && resultData.success && (
          <div className="mt-6 w-full bg-[#1a1025] p-4 rounded-2xl border border-purple-900/50 flex flex-col items-center gap-4">
            <p className="text-green-400 font-medium">Video ready for download!</p>
            {resultData.downloadUrl && (
              <a
                href={resultData.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition"
              >
                Download File
              </a>
            )}
          </div>
        )}
      </div>

      <footer className="text-gray-500 text-xs mt-12">
        MediaSave - Fast & Free Instagram Downloader
      </footer>
    </main>
  );
}