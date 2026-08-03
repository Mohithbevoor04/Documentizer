'use client';

import React, { useState } from 'react';
import { AchievementItem } from '@/types';
import { 
  FolderGit2, 
  Award, 
  BookOpen, 
  Trophy, 
  CheckCircle2, 
  Clock, 
  Plus, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles,
  Cpu
} from 'lucide-react';

interface StudentProjectsProps {
  achievements: AchievementItem[];
  onAddAchievement: (newAch: AchievementItem) => void;
}

export const StudentProjects: React.FC<StudentProjectsProps> = ({
  achievements,
  onAddAchievement
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'project' | 'certificate' | 'research' | 'hackathon'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<AchievementItem['type']>('project');
  const [description, setDescription] = useState('');
  const [techStack, setTechStack] = useState('');
  const [proofUrl, setProofUrl] = useState('');

  const filtered = activeFilter === 'all' 
    ? achievements 
    : achievements.filter(a => a.type === activeFilter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newAch: AchievementItem = {
      id: `ach_${Date.now()}`,
      studentId: 'usr_student_01',
      studentName: 'Alex Rivera',
      studentRoll: '1DT22CS045',
      department: 'Computer Science & Engineering',
      title,
      type,
      description,
      techStack: techStack.split(',').map(s => s.trim()).filter(Boolean),
      proofUrl: proofUrl || 'https://github.com/alexrivera/new-project',
      verificationStatus: 'pending',
      aiScore: Math.floor(88 + Math.random() * 10),
      aiSummary: 'AI static security & structure evaluation completed successfully.',
      createdAt: new Date().toISOString().split('T')[0]
    };

    onAddAchievement(newAch);
    setShowAddModal(false);
    setTitle('');
    setDescription('');
    setTechStack('');
    setProofUrl('');
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <FolderGit2 className="h-6 w-6 text-indigo-400" />
            <span>Projects & Research Vault</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Academic contributions & production projects backed by Polygon smart contract verification.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30"
        >
          <Plus className="h-4 w-4" />
          Submit New Achievement
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Artifacts' },
          { id: 'project', label: 'Projects' },
          { id: 'research', label: 'Research Papers' },
          { id: 'certificate', label: 'Certificates' },
          { id: 'hackathon', label: 'Hackathons' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as any)}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
              activeFilter === tab.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Achievement Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(item => (
          <div key={item.id} className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between gap-4">
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-slate-900 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400 border border-slate-800">
                  {item.type}
                </span>

                {item.verificationStatus === 'verified' ? (
                  <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Polygon Verified
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    <Clock className="h-3.5 w-3.5" /> Faculty Review Pending
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">{item.description}</p>
              </div>

              {item.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.techStack.map(t => (
                    <span key={t} className="rounded-md bg-slate-900 px-2 py-0.5 text-[11px] text-slate-400 border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Card Footer */}
            <div className="border-t border-slate-800/80 pt-4 flex flex-col gap-2">
              {item.aiScore && (
                <div className="flex items-center justify-between text-xs bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                  <span className="flex items-center gap-1.5 text-purple-300 font-medium">
                    <Cpu className="h-3.5 w-3.5 text-purple-400" /> AI Code Score:
                  </span>
                  <span className="font-mono font-bold text-white">{item.aiScore} / 100</span>
                </div>
              )}

              <div className="flex items-center justify-between text-xs">
                <a
                  href={item.proofUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-indigo-400 hover:underline font-semibold"
                >
                  <span>Repository / Proof</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                <span className="text-slate-500">{item.createdAt}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Add Achievement Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="glass-panel w-full max-w-lg rounded-2xl p-6 space-y-4 border border-indigo-500/30">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-400" />
                <span>Submit Achievement for Verification</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Autonomous Vision Transformer"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Type</label>
                  <select
                    value={type}
                    onChange={e => setType(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-white focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="project">Project</option>
                    <option value="research">Research Paper</option>
                    <option value="certificate">Certificate</option>
                    <option value="hackathon">Hackathon</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Repository / Proof URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={proofUrl}
                    onChange={e => setProofUrl(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  placeholder="Solidity, Python, PyTorch, React"
                  value={techStack}
                  onChange={e => setTechStack(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Description & Key Results</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain problem solved, methodology, performance metrics achieved..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500 transition shadow-md"
                >
                  Submit for AI & Faculty Review
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
