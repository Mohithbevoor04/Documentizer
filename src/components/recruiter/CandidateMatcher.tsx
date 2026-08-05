'use client';

import React, { useState } from 'react';
import { Search, Sparkles, ShieldCheck, CheckCircle2, Calendar, Filter, X } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  roll: string;
  university: string;
  cgpa: number;
  talentScore: number;
  matchScore: number;
  isVerified: boolean;
  verifiedProjectsCount: number;
  topSkills: string[];
  highlights: string;
}

export const CandidateMatcher: React.FC = () => {
  const [query, setQuery] = useState('Polygon smart contract engineer with RAG experience');
  const [onlyVerified, setOnlyVerified] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [minMatchScore, setMinMatchScore] = useState<number>(0);

  const candidatePool: Candidate[] = [
    {
      id: 'c1',
      name: 'Alex Rivera',
      roll: '1DT22CS045',
      university: 'Dayananda Sagar Academy of Tech & Mgmt',
      cgpa: 9.4,
      talentScore: 98,
      matchScore: 97,
      isVerified: true,
      verifiedProjectsCount: 2,
      topSkills: ['Solidity', 'TypeScript', 'Qdrant Vector DB', 'FastAPI', 'PyTorch'],
      highlights: 'Built Polygon DeFi aggregator reducing gas costs by 35% + Co-authored legal contract RAG paper.'
    },
    {
      id: 'c2',
      name: 'Elena Rostova',
      roll: '1DT22CS089',
      university: 'Dayananda Sagar Academy of Tech & Mgmt',
      cgpa: 9.2,
      talentScore: 95,
      matchScore: 94,
      isVerified: true,
      verifiedProjectsCount: 1,
      topSkills: ['PyTorch', 'TensorFlow', 'Vision Transformers', 'Python'],
      highlights: 'Designed 98.4% precision ViT medical imaging classifier with verifiable model hashes on Polygon.'
    },
    {
      id: 'c3',
      name: 'Marcus Vance',
      roll: '1DT22CS112',
      university: 'Dayananda Sagar Academy of Tech & Mgmt',
      cgpa: 8.9,
      talentScore: 91,
      matchScore: 89,
      isVerified: true,
      verifiedProjectsCount: 2,
      topSkills: ['React', 'Next.js', 'Solidity', 'Web3.js', 'Tailwind CSS'],
      highlights: 'Developed decentralized credential verifier frontend handling over 10,000 requests.'
    },
    {
      id: 'c4',
      name: 'Sophia Chen',
      roll: '1DT22CS134',
      university: 'MIT School of Engineering',
      cgpa: 9.6,
      talentScore: 99,
      matchScore: 96,
      isVerified: true,
      verifiedProjectsCount: 3,
      topSkills: ['Rust', 'Solidity', 'Zero-Knowledge Proofs', 'C++'],
      highlights: 'Implemented zk-SNARK verifier circuit for privacy-preserving talent identity verification.'
    },
    {
      id: 'c5',
      name: 'Rahul Sharma',
      roll: '1DT22CS078',
      university: 'Dayananda Sagar Academy of Tech & Mgmt',
      cgpa: 8.5,
      talentScore: 86,
      matchScore: 82,
      isVerified: false,
      verifiedProjectsCount: 0,
      topSkills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
      highlights: 'Created automated university placement analytics web pipeline.'
    }
  ];

  const availableSkills = ['All', 'Solidity', 'PyTorch', 'TypeScript', 'Qdrant Vector DB', 'Rust', 'React'];

  // Filter logic
  const filteredCandidates = candidatePool.filter(cand => {
    // 1. Polygon Verified filter
    if (onlyVerified && !cand.isVerified) return false;

    // 2. Min match score filter
    if (cand.matchScore < minMatchScore) return false;

    // 3. Skill filter
    if (selectedSkill !== 'All' && !cand.topSkills.includes(selectedSkill)) return false;

    // 4. Text Query filter
    if (query.trim() !== '') {
      const q = query.toLowerCase();
      const matchText = `${cand.name} ${cand.roll} ${cand.university} ${cand.topSkills.join(' ')} ${cand.highlights}`.toLowerCase();
      return matchText.includes(q);
    }

    return true;
  });

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Search className="h-6 w-6 text-amber-400" />
            <span>AI Candidate Semantic Search & Filtering</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Search and filter verified student talent profiles using Qdrant vector embeddings and Polygon proof status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-xs font-semibold text-slate-200 cursor-pointer hover:border-slate-700 transition">
            <input
              type="checkbox"
              checked={onlyVerified}
              onChange={e => setOnlyVerified(e.target.checked)}
              className="accent-amber-500 rounded h-4 w-4"
            />
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Polygon Verified Only
            </span>
          </label>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-panel rounded-2xl p-4 space-y-4 border border-amber-500/20">
        {/* Semantic Search Box */}
        <div className="flex items-center gap-3 bg-slate-950/80 rounded-xl p-3 border border-slate-800 focus-within:border-amber-500/50 transition">
          <Sparkles className="h-5 w-5 text-amber-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by keyword, skill, or achievement (e.g. Solidity, RAG, ViT, Alex Rivera)..."
            className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-500 hover:text-white text-xs p-1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Dynamic Filters Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
          
          {/* Skill Tag Filters */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-400 font-medium text-[11px] flex items-center gap-1 mr-1">
              <Filter className="h-3.5 w-3.5 text-amber-400" /> Filter Skill:
            </span>
            {availableSkills.map(skill => (
              <button
                key={skill}
                onClick={() => setSelectedSkill(skill)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  selectedSkill === skill
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>

          {/* Min Score Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium text-[11px]">Min Vector Match:</span>
            <select
              value={minMatchScore}
              onChange={e => setMinMatchScore(Number(e.target.value))}
              className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-1 text-xs font-medium text-white focus:outline-none focus:border-amber-500"
            >
              <option value={0}>All Match Scores</option>
              <option value={85}>85% + Match</option>
              <option value={90}>90% + Match</option>
              <option value={95}>95% + Top Tier</option>
            </select>
          </div>

        </div>
      </div>

      {/* Results Header / Counter */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Showing <span className="text-amber-400">{filteredCandidates.length}</span> Candidate Matches
        </span>
        {(query || onlyVerified || selectedSkill !== 'All' || minMatchScore > 0) && (
          <button
            onClick={() => {
              setQuery('');
              setOnlyVerified(false);
              setSelectedSkill('All');
              setMinMatchScore(0);
            }}
            className="text-xs text-slate-400 hover:text-amber-300 underline"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Candidate Search Results */}
      {filteredCandidates.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center space-y-3">
          <Search className="h-10 w-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Matching Candidates Found</h3>
          <p className="text-xs text-slate-400">Try adjusting your search query, clearing skill filters, or unchecking "Polygon Verified Only".</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCandidates.map((cand, idx) => (
            <div key={cand.id} className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-4 border border-slate-800/80">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
                    #{idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-white text-base">{cand.name}</h3>
                      <span className="text-xs text-slate-400">({cand.roll})</span>
                      {cand.isVerified ? (
                        <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                          <ShieldCheck className="h-3 w-3" /> Polygon Verified
                        </span>
                      ) : (
                        <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400 border border-slate-700">
                          Unverified Profile
                        </span>
                      )}
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
                  <span
                    key={sk}
                    onClick={() => setSelectedSkill(sk)}
                    className={`rounded-md px-2 py-0.5 text-[11px] border cursor-pointer transition ${
                      selectedSkill === sk
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
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
      )}

    </div>
  );
};
