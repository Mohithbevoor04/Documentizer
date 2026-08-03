'use client';

import React, { useState } from 'react';
import { Search, Sparkles, ShieldCheck, CheckCircle2, Calendar, Award, ExternalLink } from 'lucide-react';

export const CandidateMatcher: React.FC = () => {
  const [query, setQuery] = useState('Polygon smart contract engineer with RAG experience');
  const [onlyVerified, setOnlyVerified] = useState(true);

  const candidates = [
    {
      name: 'Alex Rivera',
      roll: '1DT22CS045',
      university: 'Dayananda Sagar Academy of Tech & Mgmt',
      cgpa: 9.4,
      talentScore: 98,
      matchScore: 97,
      verifiedProjectsCount: 2,
      topSkills: ['Solidity', 'TypeScript', 'Qdrant Vector DB', 'FastAPI', 'PyTorch'],
      highlights: 'Built Polygon DeFi aggregator reducing gas costs by 35% + Co-authored legal contract RAG paper.'
    },
    {
      name: 'Elena Rostova',
      roll: '1DT22CS089',
      university: 'Dayananda Sagar Academy of Tech & Mgmt',
      cgpa: 9.2,
      talentScore: 95,
      matchScore: 94,
      verifiedProjectsCount: 1,
      topSkills: ['PyTorch', 'TensorFlow', 'Vision Transformers', 'Python'],
      highlights: 'Designed 98.4% precision ViT medical imaging classifier.'
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Search className="h-6 w-6 text-amber-400" />
            <span>AI Candidate Semantic Search</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Search verified student profiles using natural language query embeddings in Qdrant.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-xs text-slate-300 font-semibold cursor-pointer">
            <input
              type="checkbox"
              checked={onlyVerified}
              onChange={e => setOnlyVerified(e.target.checked)}
              className="accent-amber-500 rounded"
            />
            <span>Polygon Verified Only</span>
          </label>
        </div>
      </div>

      {/* Semantic Search Box */}
      <div className="glass-panel rounded-2xl p-4 flex items-center gap-3">
        <Sparkles className="h-5 w-5 text-amber-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="e.g. Find senior students with verified Solidity contracts and sub-100ms vector search experience..."
          className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
        />
        <button className="rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition shrink-0">
          Run Semantic Match
        </button>
      </div>

      {/* Candidate Search Results */}
      <div className="space-y-4">
        {candidates.map((cand, idx) => (
          <div key={idx} className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm">
                  #{idx + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-base">{cand.name}</h3>
                    <span className="text-xs text-slate-400">({cand.roll})</span>
                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                      <ShieldCheck className="h-3 w-3" /> Polygon Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{cand.university}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Vector Match</span>
                  <span className="text-lg font-extrabold text-amber-400 font-mono">{cand.matchScore}%</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Talent Score</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono">{cand.talentScore}/100</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
              <strong className="text-amber-300">AI Highlight Summary:</strong> {cand.highlights}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {cand.topSkills.map(sk => (
                <span key={sk} className="rounded-md bg-slate-900 px-2 py-0.5 text-[11px] text-slate-300 border border-slate-800">
                  {sk}
                </span>
              ))}
            </div>

            <div className="border-t border-slate-800/80 pt-3 flex justify-end gap-3">
              <button className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 transition">
                <Calendar className="h-4 w-4 text-amber-400" />
                <span>Schedule Technical Interview</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
