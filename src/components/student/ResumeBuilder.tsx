'use client';

import React, { useState } from 'react';
import { AIService, ResumeAnalysisResult } from '@/lib/aiService';
import { FileText, Sparkles, Download, CheckCircle2, AlertCircle, RefreshCw, Award } from 'lucide-react';

export const ResumeBuilder: React.FC = () => {
  const [analysis, setAnalysis] = useState<ResumeAnalysisResult>(
    AIService.analyzeResume('')
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleReanalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysis({
        ...analysis,
        atsScore: 95,
        keywordMatch: 93
      });
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <FileText className="h-6 w-6 text-indigo-400" />
            <span>AI Resume Builder & ATS Evaluator</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Auto-generate ATS-optimized resume embedded with Polygon credential proof hashes.
          </p>
        </div>

        <button
          onClick={handleReanalyze}
          disabled={isAnalyzing}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30"
        >
          <RefreshCw className={`h-4 w-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
          <span>{isAnalyzing ? 'Analyzing ATS Alignment...' : 'Re-Analyze Resume'}</span>
        </button>
      </div>

      {/* ATS Score & Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="glass-panel rounded-2xl p-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">ATS Score</span>
            <div className="text-4xl font-extrabold text-white mt-2">{analysis.atsScore}<span className="text-sm text-slate-400">/100</span></div>
            <p className="text-[11px] text-emerald-400 font-semibold mt-1">✓ Top Tier ATS Compatibility</p>
          </div>
          <div className="h-16 w-16 rounded-full border-4 border-indigo-500 flex items-center justify-center font-extrabold text-indigo-400 text-lg">
            92%
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Keyword Density</span>
            <div className="text-4xl font-extrabold text-white mt-2">{analysis.keywordMatch}%</div>
            <p className="text-[11px] text-indigo-300 font-semibold mt-1">Web3 & AI Alignment</p>
          </div>
          <div className="h-16 w-16 rounded-full border-4 border-purple-500 flex items-center justify-center font-extrabold text-purple-400 text-lg">
            89%
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Formatting & Structure</span>
            <div className="text-4xl font-extrabold text-white mt-2">{analysis.formattingScore}%</div>
            <p className="text-[11px] text-emerald-400 font-semibold mt-1">Clean Machine-Readable Layout</p>
          </div>
          <div className="h-16 w-16 rounded-full border-4 border-emerald-500 flex items-center justify-center font-extrabold text-emerald-400 text-lg">
            95%
          </div>
        </div>

      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: AI Resume Preview */}
        <div className="glass-panel rounded-2xl p-6 space-y-4 font-sans text-xs text-slate-300 border border-indigo-500/20">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-lg font-bold text-white">ALEX RIVERA</h2>
              <p className="text-indigo-400 text-xs">Full Stack Blockchain & AI Engineer | CGPA: 9.4</p>
            </div>
            <button className="flex items-center gap-1.5 rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white hover:bg-slate-800">
              <Download className="h-3.5 w-3.5" />
              <span>Export PDF</span>
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider text-indigo-300">Summary</h4>
              <p className="mt-1 leading-relaxed">
                Computer Science Senior specializing in distributed systems, smart contracts, and RAG architectures. Built Polygon DeFi aggregator reducing gas costs by 35%. Co-authored research on Qdrant vector retrieval.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider text-indigo-300">Verified Project Achievements (Polygon Anchored)</h4>
              <div className="mt-2 space-y-2">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex justify-between font-bold text-white">
                    <span>DeFi Liquidity Aggregator</span>
                    <span className="text-purple-400 font-mono text-[10px]">Tx: 0x9a8b...0f9a8b</span>
                  </div>
                  <p className="text-slate-400">Implemented zero-knowledge rollups and Pyth feeds on Polygon zkEVM.</p>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex justify-between font-bold text-white">
                    <span>Distributed RAG Engine</span>
                    <span className="text-purple-400 font-mono text-[10px]">Tx: 0x1f2e...0a1f2e</span>
                  </div>
                  <p className="text-slate-400">Sub-50ms vector chunk retrieval benchmarked using FastAPI & Qdrant.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: AI Improvement Suggestions */}
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span>Resume Strengths</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {analysis.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-400" />
              <span>Recommended Improvements & Missing Keywords</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {analysis.improvements.map((imp, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                  <span>{imp}</span>
                </li>
              ))}
            </ul>

            <div className="border-t border-slate-800 pt-3 flex flex-wrap gap-1.5">
              <span className="text-[11px] text-slate-400 font-bold w-full">Suggested Industry Keywords:</span>
              {analysis.missingKeywords.map(kw => (
                <span key={kw} className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-300 border border-amber-500/20">
                  + {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
