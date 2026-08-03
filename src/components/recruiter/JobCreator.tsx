'use client';

import React, { useState } from 'react';
import { JobOpportunity } from '@/types';
import { UserPlus, Sparkles, CheckCircle2, ArrowRight, Cpu } from 'lucide-react';

interface JobCreatorProps {
  onAddJob: (job: JobOpportunity) => void;
}

export const JobCreator: React.FC<JobCreatorProps> = ({ onAddJob }) => {
  const [companyName, setCompanyName] = useState('Polygon Labs');
  const [title, setTitle] = useState('');
  const [stipendOrSalary, setStipendOrSalary] = useState('$125,000 / yr');
  const [skillsRequired, setSkillsRequired] = useState('Solidity, TypeScript, Next.js, Python, FastAPI');
  const [description, setDescription] = useState('');
  const [isCreated, setIsCreated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newJob: JobOpportunity = {
      id: `job_${Date.now()}`,
      companyName,
      companyLogo: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
      title,
      type: 'full_time',
      location: 'Remote',
      isRemote: true,
      stipendOrSalary,
      deadline: '2026-09-30',
      skillsRequired: skillsRequired.split(',').map(s => s.trim()).filter(Boolean),
      description,
      minCgpa: 8.5,
      status: 'open',
      matchScore: 98,
      applicantsCount: 0
    };

    onAddJob(newJob);
    setIsCreated(true);
    setTimeout(() => setIsCreated(false), 3000);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <UserPlus className="h-6 w-6 text-amber-400" />
          <span>Post Job & AI Embed Requirements</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Job postings are automatically chunked, embedded via text-embedding-ada-002, and indexed into Qdrant vector search.
        </p>
      </div>

      <div className="glass-panel rounded-2xl p-6 space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Company Name</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Position Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Senior Smart Contract Auditor"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Compensation Range</label>
              <input
                type="text"
                required
                value={stipendOrSalary}
                onChange={e => setStipendOrSalary(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Required Skills (Comma separated)</label>
              <input
                type="text"
                required
                value={skillsRequired}
                onChange={e => setSkillsRequired(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Job Description & Responsibilities</label>
            <textarea
              rows={4}
              required
              placeholder="Describe technical stack, day-to-day responsibilities, and team culture..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-white focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* AI Vector Indexing Badge */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-300 font-medium">
              <Cpu className="h-4 w-4 text-indigo-400" />
              <span>Automatic Qdrant Vector Embedding Indexing</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
              Enabled
            </span>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 font-semibold text-slate-950 hover:bg-amber-400 transition shadow-lg shadow-amber-500/20"
          >
            <span>Publish Job & Run AI Matching</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {isCreated && (
          <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-400 font-bold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Job Opportunity Published & Vector Index Created!</span>
          </div>
        )}
      </div>

    </div>
  );
};
