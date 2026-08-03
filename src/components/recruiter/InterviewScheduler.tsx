'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Video, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

export const InterviewScheduler: React.FC = () => {
  const [scheduled, setScheduled] = useState(false);

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Calendar className="h-6 w-6 text-amber-400" />
          <span>Interview Scheduler & AI Question Generator</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Schedule technical interviews with verified candidates and generate role-specific questions.
        </p>
      </div>

      <div className="glass-panel rounded-2xl p-6 space-y-6">
        <h3 className="text-sm font-bold text-white">Schedule Technical Round for Alex Rivera</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Candidate Name</label>
            <input
              type="text"
              readOnly
              value="Alex Rivera (1DT22CS045)"
              className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-white font-semibold"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Target Position</label>
            <input
              type="text"
              readOnly
              value="Full Stack Blockchain & AI Engineer"
              className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-white font-semibold"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Interview Date & Time</label>
            <input
              type="datetime-local"
              defaultValue="2026-08-10T14:30"
              className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-white focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Meeting Link</label>
            <input
              type="text"
              defaultValue="https://meet.google.com/talentchain-interview-01"
              className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-white focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {/* AI Generated Technical Questions */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
            <Cpu className="h-4 w-4 text-purple-400" />
            <span>GPT-5.5 AI Tailored Technical Questions for Alex</span>
          </div>

          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">Q1:</span>
              <span>"In your DeFi Liquidity Aggregator project, how did you handle re-entrancy attack mitigation across Polygon rollups?"</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">Q2:</span>
              <span>"Explain your hybrid sparse-dense chunk reranking implementation with Qdrant vector databases."</span>
            </li>
          </ul>
        </div>

        <button
          onClick={() => setScheduled(true)}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 font-semibold text-slate-950 hover:bg-amber-400 transition shadow-lg shadow-amber-500/20 text-xs"
        >
          <Video className="h-4 w-4" />
          <span>Confirm & Send Calendar Invite</span>
        </button>

        {scheduled && (
          <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-400 font-bold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Interview Invite & AI Question Sheet Dispatched!</span>
          </div>
        )}
      </div>

    </div>
  );
};
