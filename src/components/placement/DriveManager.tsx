'use client';

import React, { useState } from 'react';
import { JobOpportunity } from '@/types';
import { Briefcase, Plus, Users, Calendar, MapPin, ExternalLink, Sparkles } from 'lucide-react';

interface DriveManagerProps {
  jobs: JobOpportunity[];
  onAddJob: (newJob: JobOpportunity) => void;
}

export const DriveManager: React.FC<DriveManagerProps> = ({ jobs, onAddJob }) => {
  const [showModal, setShowModal] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [title, setTitle] = useState('');
  const [stipendOrSalary, setStipendOrSalary] = useState('');
  const [type, setType] = useState<'internship' | 'full_time'>('full_time');
  const [skillsRequired, setSkillsRequired] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !title.trim()) return;

    const newJob: JobOpportunity = {
      id: `job_${Date.now()}`,
      companyName,
      companyLogo: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
      title,
      type,
      location: 'Bangalore / Remote',
      isRemote: true,
      stipendOrSalary: stipendOrSalary || '$100,000 / yr',
      deadline: '2026-09-30',
      skillsRequired: skillsRequired.split(',').map(s => s.trim()).filter(Boolean),
      description,
      minCgpa: 8.0,
      status: 'open',
      matchScore: 95,
      applicantsCount: 1
    };

    onAddJob(newJob);
    setShowModal(false);
    setCompanyName('');
    setTitle('');
    setStipendOrSalary('');
    setDescription('');
    setSkillsRequired('');
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-cyan-400" />
            <span>Placement Drives & Corporate Opportunities</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage university placement drives, campus recruitment, and corporate partnerships.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-cyan-500 transition shadow-lg shadow-cyan-600/30"
        >
          <Plus className="h-4 w-4" />
          Create New Placement Drive
        </button>
      </div>

      {/* Drives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map(job => (
          <div key={job.id} className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-4">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={job.companyLogo}
                  alt={job.companyName}
                  className="h-12 w-12 rounded-xl object-contain bg-slate-900 p-2 border border-slate-800"
                />
                <div>
                  <h3 className="font-bold text-white text-base">{job.title}</h3>
                  <p className="text-xs text-slate-400">{job.companyName}</p>
                </div>
              </div>

              <span className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-[10px] font-bold text-cyan-400 border border-cyan-500/20 capitalize">
                {job.type.replace('_', ' ')}
              </span>
            </div>

            <p className="text-xs text-slate-300 line-clamp-2">{job.description}</p>

            <div className="flex flex-wrap gap-1.5">
              {job.skillsRequired.map(skill => (
                <span key={skill} className="rounded-md bg-slate-900 px-2 py-0.5 text-[11px] text-slate-400 border border-slate-800">
                  {skill}
                </span>
              ))}
            </div>

            <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Users className="h-4 w-4 text-cyan-400" />
                <span><strong className="text-white">{job.applicantsCount}</strong> Student Applicants</span>
              </div>

              <span className="font-semibold text-emerald-400">{job.stipendOrSalary}</span>
            </div>

          </div>
        ))}
      </div>

      {/* Create Drive Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 space-y-4 border border-cyan-500/30">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-cyan-400" />
                <span>Create Placement Drive</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Polygon Labs"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Systems Engineer"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Type</label>
                  <select
                    value={type}
                    onChange={e => setType(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="full_time">Full Time</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Package / Stipend</label>
                  <input
                    type="text"
                    placeholder="$120,000 / yr"
                    value={stipendOrSalary}
                    onChange={e => setStipendOrSalary(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Required Skills (comma separated)</label>
                <input
                  type="text"
                  placeholder="Solidity, TypeScript, Python, FastAPI"
                  value={skillsRequired}
                  onChange={e => setSkillsRequired(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Job Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Details regarding duties, requirements, and interview timeline..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-cyan-600 px-4 py-2 font-semibold text-white hover:bg-cyan-500 transition shadow-md"
                >
                  Publish Drive
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
