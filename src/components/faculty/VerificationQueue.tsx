'use client';

import React from 'react';
import { AchievementItem } from '@/types';
import { CheckCircle2, XCircle, ShieldCheck, Cpu, Clock, ExternalLink } from 'lucide-react';

interface VerificationQueueProps {
  achievements: AchievementItem[];
  onVerify: (id: string) => void;
  onReject: (id: string) => void;
}

export const VerificationQueue: React.FC<VerificationQueueProps> = ({
  achievements,
  onVerify,
  onReject
}) => {
  const pending = achievements.filter(a => a.verificationStatus === 'pending');

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            <span>Student Verification Queue</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review student achievements and anchor approved credentials onto the Polygon ledger.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/20 px-3.5 py-2 text-xs font-semibold text-amber-300">
          <Clock className="h-4 w-4 text-amber-400" />
          <span>{pending.length} Submissions Awaiting Approval</span>
        </div>
      </div>

      {/* Queue List */}
      {pending.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center space-y-3">
          <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Verification Queue is Clear!</h3>
          <p className="text-xs text-slate-400">All submitted student projects & research papers have been verified.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pending.map(item => (
            <div key={item.id} className="glass-panel rounded-2xl p-6 space-y-4 border border-indigo-500/20">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
                    {item.type}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">{item.title}</h3>
                  <p className="text-xs text-slate-400">
                    Submitted by <span className="text-white font-semibold">{item.studentName}</span> ({item.studentRoll}) • {item.department}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={item.proofUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs text-indigo-400 hover:underline bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800"
                  >
                    <span>View Repository</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>

              {/* AI Code Score & Analysis Box */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white flex items-center gap-2">
                      <span>AI Quality & Security Audit: {item.aiScore} / 100</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.aiSummary}</p>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 shrink-0">
                  Zero Vulnerabilities Detected
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end items-center gap-3 pt-2">
                <button
                  onClick={() => onReject(item.id)}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-950/30 transition"
                >
                  <XCircle className="h-4 w-4" />
                  Reject Submission
                </button>

                <button
                  onClick={() => onVerify(item.id)}
                  className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition shadow-lg shadow-emerald-600/30"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Approve & Issue Polygon Credential
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
