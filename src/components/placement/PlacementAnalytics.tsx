'use client';

import React from 'react';
import { BarChart3, TrendingUp, Users, Building, Award, CheckCircle2 } from 'lucide-react';

export const PlacementAnalytics: React.FC = () => {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-cyan-400" />
            <span>Placement Intelligence & Analytics</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time hiring trends, average compensation, and skill demand metrics across departments.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-2 text-xs font-semibold text-cyan-300">
          <TrendingUp className="h-4 w-4 text-cyan-400" />
          <span>2026 Batch Placement Rate: 94.2%</span>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        
        <div className="glass-panel rounded-2xl p-5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Placed</span>
          <div className="text-3xl font-extrabold text-white mt-2">418 <span className="text-xs text-slate-400">/ 444 Students</span></div>
          <div className="mt-2 text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" /> 94.2% Conversion
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Highest Package</span>
          <div className="text-3xl font-extrabold text-amber-400 mt-2">$140,000</div>
          <p className="mt-2 text-xs text-slate-400">Polygon Labs (Blockchain & AI Engineer)</p>
        </div>

        <div className="glass-panel rounded-2xl p-5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Average CTC</span>
          <div className="text-3xl font-extrabold text-cyan-400 mt-2">$88,500</div>
          <p className="mt-2 text-xs text-slate-400">+18% vs 2025 Placement Cycle</p>
        </div>

        <div className="glass-panel rounded-2xl p-5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Partner Companies</span>
          <div className="text-3xl font-extrabold text-purple-400 mt-2">64</div>
          <p className="mt-2 text-xs text-slate-400">Web3, AI, Cloud & Enterprise SaaS</p>
        </div>

      </div>

      {/* Department Breakdown Bar Visualization */}
      <div className="glass-panel rounded-2xl p-6 space-y-6">
        <h3 className="text-sm font-bold text-white">Department Placement Breakdown</h3>

        <div className="space-y-4">
          {[
            { dept: 'Computer Science & Engineering', placed: 98, total: 102, avg: '$96,000' },
            { dept: 'Artificial Intelligence & Data Science', placed: 89, total: 92, avg: '$94,500' },
            { dept: 'Information Science & Engineering', placed: 84, total: 90, avg: '$85,000' },
            { dept: 'Electronics & Communication', placed: 75, total: 85, avg: '$78,000' },
          ].map(row => {
            const pct = Math.round((row.placed / row.total) * 100);
            return (
              <div key={row.dept} className="space-y-1.5 text-xs">
                <div className="flex justify-between font-medium text-slate-200">
                  <span>{row.dept}</span>
                  <span className="text-slate-400 font-mono">{row.placed} / {row.total} ({pct}%) • Avg: <strong className="text-emerald-400">{row.avg}</strong></span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-800">
                  <div className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
