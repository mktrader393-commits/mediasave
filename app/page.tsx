'use client';

import { useState } from 'react';
import { Download, Sparkles, ShieldCheck, Zap, Video, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setErrorMessage('');
    setResultData(null);

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (data.success) {
        setResultData(data.data);
      } else {
        setErrorMessage(data.message || 'Failed to fetch video.');
      }
    } catch (err) {
      setErrorMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-black text-white flex flex-col justify-between">
      {/* Header */}
      <header className="p-6 flex justify-between items-center max-w-6xl mx-auto w-full">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-2 rounded-xl text-white font-bold text-xl flex items-center justify-center shadow-lg">
            <Download className="w-6 h-6" />
          </div>
          <span className="text-2xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
            MediaSave
          </span>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center max-w-4xl mx-auto w-full py-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-pink-300 text-sm font-medium mb-6 shadow-inner">
          <Sparkles className="w-4 h-4" /> Fast & Free Instagram Downloader
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
          Download Instagram <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">Reels, Videos & Photos</span>
        </h1>
        
        <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl">
          Paste your Instagram link below to instantly download high-quality videos and photos without any watermark.
        </p>

        {/* Input Form */}
        <form onSubmit={handleDownload} className="w-full max-w-2xl bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-2xl flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Paste Instagram link here (e.g., https://www.instagram.com/reel/...)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-transparent px-4 py-3 text-white placeholder-gray-400 focus:outline-none text-base"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Download className="w-5 h-5" /> Download
              </>
            )}
          </button>
        </form>

        {/* Error Message */}
        {errorMessage && (
          <div className="mt-4 text-red-400 bg-red-900/20 border border-red-500/30 px-4 py-2 rounded-xl text-sm">
            {errorMessage}
          </div>
        )}

        {/* Result Card Preview */}
        {resultData && (
          <div className="mt-8 w-full max-w-md bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 shadow-2xl flex flex-col items-center gap-4 text-center animate-fade-in">
            <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
              <CheckCircle2 className="w-5 h-5" /> Video Ready to Download!
            </div>
            <img src={resultData.thumbnail} alt="Thumbnail" className="w-32 h-32 object-cover rounded-xl shadow-md border border-white/10" />
            <h3 className="font-semibold text-white">{resultData.title}</h3>
            <a
              href={resultData.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Download className="w-5 h-5" /> Download MP4 Now
            </a>
          </div>
        )}

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full text-left">
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
            <div className="bg-pink-500/20 p-3 rounded-xl w-fit text-pink-400 mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Lightning Fast</h3>
            <p className="text-gray-400 text-sm">Download your favorite reels and videos in seconds with optimized speed.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
            <div className="bg-purple-500/20 p-3 rounded-xl w-fit text-purple-400 mb-4">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">HD Quality</h3>
            <p className="text-gray-400 text-sm">Get original quality MP4 videos and high-resolution images straight from Instagram.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
            <div className="bg-yellow-500/20 p-3 rounded-xl w-fit text-yellow-400 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">100% Safe & Free</h3>
            <p className="text-gray-400 text-sm">No registration or software installation required. Completely free to use.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-gray-500 text-sm border-t border-white/10">
        <p>© 2026 MediaSave. All rights reserved.</p>
      </footer>
    </div>
  );
}