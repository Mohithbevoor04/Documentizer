'use client';

import React, { useState } from 'react';
import { CandidateApplication } from '@/types';
import { Flame, Sparkles, CheckCircle2, ShieldCheck, Search, Filter } from 'lucide-react';

interface CandidateRankerProps {
  applications: CandidateApplication[];
}

export const CandidateRanker: React.FC<CandidateRankerProps> = ({ applications }) => {
  const [apps, setApps] = useState<CandidateApplication[]>(applications);
  const [filterStatus, setFilterStatus] = useState<'all' | 'shortlisted' | 'applied'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleStatus = (id: string) => {
    setApps(apps.map(a => {
      if (a.id === id) {
        const nextStatus = a.status === 'applied' ? 'shortlisted' : 'applied';
        return { ...a, status: nextStatus };
      }
      return a;
    }));
  };

  const filteredApps = apps.filter(cand => {
    if (filterStatus !== 'all' && cand.status !== filterStatus) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchText = `${cand.studentName} ${cand.studentRoll} ${cand.jobTitle} ${cand.companyName}`.toLowerCase();
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
            <Flame className="h-6 w-6 text-amber-400" />
            <span>AI Candidate Ranking Engine</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Qdrant vector semantic scoring + Polygon verified achievement weightings.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/20 px-3.5 py-2 text-xs font-semibold text-amber-300">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span>Automated Vector Shortlisting Enabled</span>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="glass-panel rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Status Tabs */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
          {(['all', 'shortlisted', 'applied'] as const).map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition flex-1 sm:flex-none ${
                filterStatus === st
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st} ({st === 'all' ? apps.length : apps.filter(a => a.status === st).length})
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 w-full sm:w-72">
          <Search className="h-4 w-4 text-slate-500 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Filter candidates or roles..."
            className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full"
          />
        </div>

      </div>

      {/* Candidate Ranking List */}
      {filteredApps.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center space-y-3">
          <Filter className="h-10 w-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Candidate Applications Match Filter</h3>
          <p className="text-xs text-slate-400">Try changing the status tab or clearing the search query.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApps.map((cand, idx) => (
            <div key={cand.id} className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 font-extrabold text-white text-sm shadow-md">
                  #{idx + 1}
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-white text-base">{cand.studentName}</h3>
                    <span className="text-xs text-slate-400 font-mono">({cand.studentRoll})</span>
                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                      <ShieldCheck className="h-3 w-3" /> Polygon Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Applied for: <span className="text-indigo-300 font-semibold">{cand.jobTitle}</span> ({cand.companyName})
                  </p>
                </div>
              </div>

              {/* Metrics & Action */}
              <div className="flex items-center gap-6 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">AI Match Score</span>
                  <span className="text-lg font-extrabold text-amber-400 font-mono">{cand.matchScore}%</span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">CGPA</span>
                  <span className="text-sm font-bold text-white font-mono">{cand.cgpa}</span>
                </div>

                <button
                  onClick={() => toggleStatus(cand.id)}
                  className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                    cand.status === 'shortlisted'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {cand.status === 'shortlisted' ? '✓ Shortlisted' : 'Shortlist Candidate'}
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
