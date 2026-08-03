'use client';

import React from 'react';
import { SkillItem, AchievementItem, CredentialRecord, JobOpportunity } from '@/types';
import { AIService } from '@/lib/aiService';
import { 
  Sparkles, 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  Briefcase, 
  ExternalLink, 
  ArrowUpRight, 
  ShieldCheck, 
  Zap,
  BookOpen,
  Cpu
} from 'lucide-react';

interface StudentDashboardProps {
  skills: SkillItem[];
  achievements: AchievementItem[];
  credentials: CredentialRecord[];
  jobs: JobOpportunity[];
  onNavigate: (tabId: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  skills,
  achievements,
  credentials,
  jobs,
  onNavigate
}) => {
  const scoreData = AIService.computeCareerScore(skills, achievements);

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI-Powered Talent Intelligence</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="gradient-text-indigo">Alex Rivera</span>
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              Your academic & project credentials are cryptographically anchored on Polygon. Your current AI Career Score ranks in the <span className="text-emerald-400 font-semibold">top 2% of candidates</span>.
            </p>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => onNavigate('credentials')}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30"
            >
              <Award className="h-4 w-4" />
              View Credentials
            </button>
            <button 
              onClick={() => onNavigate('ai-mentor')}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition"
            >
              <Cpu className="h-4 w-4 text-purple-400" />
              Ask AI Mentor
            </button>
          </div>
        </div>
      </div>

      {/* Main Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* AI Career Score Card */}
        <div className="glass-panel glass-panel-hover rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">AI Career Score</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-white tracking-tight">{scoreData.overallScore}</span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-0.5">
              <ArrowUpRight className="h-3.5 w-3.5" /> +4.2% this month
            </span>
          </div>
          <div className="mt-3 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{ width: `${scoreData.overallScore}%` }} />
          </div>
          <p className="mt-2 text-[11px] text-slate-400">Verified code security & architecture rating</p>
        </div>

        {/* Talent Score Card */}
        <div className="glass-panel glass-panel-hover rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Global Talent Rank</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-white tracking-tight">{scoreData.talentScore}</span>
            <span className="text-xs font-semibold text-emerald-400 font-mono">Percentile: 98.6</span>
          </div>
          <div className="mt-3 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-2 rounded-full" style={{ width: `${scoreData.talentScore}%` }} />
          </div>
          <p className="mt-2 text-[11px] text-slate-400">Based on vector embedding analysis in Qdrant</p>
        </div>

        {/* Polygon Credentials Card */}
        <div className="glass-panel glass-panel-hover rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Verified Credentials</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-white tracking-tight">{credentials.length}</span>
            <span className="text-xs font-semibold text-purple-300 font-mono">100% Immutable</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>Anchored on Polygon Testnet</span>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">Cryptographically verifiable by recruiters</p>
        </div>

        {/* Active Projects Card */}
        <div className="glass-panel glass-panel-hover rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Verified Projects</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Zap className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-white tracking-tight">{achievements.length}</span>
            <span className="text-xs font-semibold text-cyan-400">2 Verified, 1 Pending</span>
          </div>
          <div className="mt-3 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full" style={{ width: '75%' }} />
          </div>
          <p className="mt-2 text-[11px] text-slate-400">Projects evaluated by AI & Faculty HOD</p>
        </div>

      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: AI Matched Opportunities (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-indigo-400" />
              <span>AI Matched Opportunities</span>
            </h2>
            <span className="text-xs text-slate-400 font-medium">Ranked by Vector Cosine Similarity</span>
          </div>

          <div className="space-y-4">
            {jobs.map(job => (
              <div key={job.id} className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <img 
                    src={job.companyLogo} 
                    alt={job.companyName} 
                    className="h-12 w-12 rounded-xl object-contain bg-slate-900 p-2 border border-slate-800"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-base">{job.title}</h3>
                      <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-bold text-indigo-400 border border-indigo-500/20">
                        {job.matchScore}% Match
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{job.companyName} • {job.location}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {job.skillsRequired.map(skill => (
                        <span key={skill} className="rounded-md bg-slate-900 px-2 py-0.5 text-[11px] text-slate-300 border border-slate-800">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-end justify-between gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                  <span className="text-xs font-semibold text-emerald-400">{job.stipendOrSalary}</span>
                  <button className="rounded-xl bg-indigo-600/90 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition shadow-md">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: AI Insights & Quick Roadmap (1 col) */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-400" />
            <span>AI Talent Insights</span>
          </h2>

          <div className="glass-panel rounded-2xl p-5 space-y-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Strengths Summary</span>
              <ul className="mt-2 space-y-2 text-xs text-slate-300">
                {scoreData.insights.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-slate-800 pt-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Recommended Actions</span>
              <ul className="mt-2 space-y-2 text-xs text-slate-300">
                {scoreData.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0 mt-1.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button 
              onClick={() => onNavigate('skill-graph')}
              className="w-full mt-2 rounded-xl border border-indigo-500/30 bg-indigo-950/40 py-2.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-900/40 transition text-center"
            >
              Explore Interactive Skill Graph →
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
