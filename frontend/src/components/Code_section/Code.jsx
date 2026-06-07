import React from 'react';
import { useState } from 'react';

export default function Code({ code, language, loading }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  return (
    <div className="w-full h-full bg-gray-950 text-gray-200 flex flex-col font-mono border border-gray-800 rounded-lg overflow-hidden">
      <div className="bg-gray-900 px-4 py-2 border-b border-gray-800 flex items-center justify-between text-xs text-gray-400">
        <div>
          {loading ? (
            <div className="h-5 bg-gray-800 animate-pulse rounded w-16"></div>
          ) : (
            <span className="bg-gray-800 px-2 py-1 rounded text-green-400 font-semibold">
              {language || 'Plain Text'}
            </span>
          )}
        </div>

        <button
            onClick={handleCopy}
            disabled={loading || !code}
            className={`px-3 py-1 rounded-md text-[11px] font-medium tracking-wider border transition-all duration-200 active:scale-95 cursor-pointer ${
              copied
                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-400'
                : 'bg-[#1f2937] border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-40 disabled:pointer-events-none'
            }`}
          >
            {copied ? '✓ COPIED' : 'COPY CODE'}
          </button>
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-gray-800"></span>
          <span className="w-3 h-3 rounded-full bg-gray-800"></span>
        </div>
      </div>
      {loading && (
        <div role="status" className="p-4 animate-pulse space-y-3 flex-1 bg-gray-950">
          <div className="h-4 bg-gray-900 rounded w-1/3"></div>
          <div className="h-4 bg-gray-900 rounded w-1/2 pl-4"></div>
          <div className="h-4 bg-gray-900 rounded w-2/3 pl-8"></div>
          <div className="h-4 bg-gray-900 rounded w-3/4 pl-12"></div>
          <div className="h-4 bg-gray-900 rounded w-1/4 pl-8"></div>
          <div className="h-4 bg-gray-900 rounded w-1/2"></div>
          <span className="sr-only">Loading code...</span>
        </div>
      )}
      {!loading && (
        <div className="p-4 flex-1 overflow-auto text-sm leading-relaxed text-gray-300 whitespace-pre">
          <code>
            {code || ''}
          </code>
        </div>
      )}
    </div>
  );
}