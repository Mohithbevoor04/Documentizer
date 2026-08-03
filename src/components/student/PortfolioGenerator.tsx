'use client';

import React, { useState } from 'react';
import { Globe, Sparkles, ExternalLink, ShieldCheck, Cpu, Code2, Copy, Check } from 'lucide-react';

export const PortfolioGenerator: React.FC = () => {
  const [theme, setTheme] = useState<'glass' | 'neon' | 'minimal'>('glass');
  const [publishedUrl, setPublishedUrl] = useState<string | null>('https://talentchain.ai/portfolio/alex-rivera');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (publishedUrl) {
      navigator.clipboard.writeText(publishedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Globe className="h-6 w-6 text-indigo-400" />
            <span>AI Automated Portfolio Generator</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Instantly generate a hosted developer portfolio backed by live Polygon smart contract proofs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {publishedUrl && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Link Copied!' : 'Share Portfolio'}</span>
            </button>
          )}

          <a
            href={publishedUrl || '#'}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30"
          >
            <span>Live Portfolio</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Theme Selector */}
      <div className="glass-panel rounded-2xl p-4 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Select Portfolio Aesthetic:</span>
        <div className="flex gap-2">
          {[
            { id: 'glass', label: 'Dark Glassmorphism' },
            { id: 'neon', label: 'Cyberpunk Neon' },
            { id: 'minimal', label: 'Minimalist Clean' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id as any)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                theme === t.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Live Interactive Preview Box */}
      <div className={`rounded-2xl p-8 space-y-8 border transition-all duration-500 ${
        theme === 'glass' 
          ? 'bg-slate-950/90 border-indigo-500/30 shadow-2xl backdrop-blur-2xl'
          : theme === 'neon'
          ? 'bg-black border-cyan-500/50 shadow-cyan-500/20 shadow-2xl'
          : 'bg-slate-900 border-slate-700'
      }`}>
        
        {/* Mock Hero Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 border-b border-slate-800 pb-8">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
            alt="Alex Rivera"
            className="h-24 w-24 rounded-2xl object-cover border-2 border-indigo-500 shadow-xl"
          />
          <div className="text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Polygon Verified Talent</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">Alex Rivera</h2>
            <p className="text-sm text-slate-300 max-w-lg">
              Full Stack Blockchain & AI Engineer building scalable liquidity protocols & RAG search engines.
            </p>
          </div>
        </div>

        {/* Featured Projects Grid Preview */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Code2 className="h-5 w-5 text-indigo-400" />
            <span>Featured Verified Works</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-sm">DeFi Liquidity Aggregator</h4>
                <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded font-mono">
                  Polygon Tx Verified
                </span>
              </div>
              <p className="text-xs text-slate-400">Decentralized yield protocol reducing gas fees by 35% using Polygon rollups.</p>
              <div className="flex gap-1.5">
                <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded text-indigo-300">Solidity</span>
                <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded text-indigo-300">Next.js</span>
              </div>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-sm">Distributed RAG Engine</h4>
                <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded font-mono">
                  Research Verified
                </span>
              </div>
              <p className="text-xs text-slate-400">Hybrid Sparse-Dense document retrieval engine using Qdrant vector DB.</p>
              <div className="flex gap-1.5">
                <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded text-indigo-300">Python</span>
                <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded text-indigo-300">Qdrant</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
