'use client';

import React, { useState } from 'react';
import { SkillItem } from '@/types';
import { Sparkles, CheckCircle2, ShieldCheck, Plus, Layers, Cpu } from 'lucide-react';

interface SkillGraphProps {
  skills: SkillItem[];
  onAddSkill?: (newSkill: SkillItem) => void;
}

export const SkillGraph: React.FC<SkillGraphProps> = ({ skills }) => {
  const [skillList, setSkillList] = useState<SkillItem[]>(skills);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<SkillItem['category']>('Frameworks');
  const [newSkillLevel, setNewSkillLevel] = useState(80);

  const categories: SkillItem['category'][] = ['Languages', 'Frameworks', 'Blockchain', 'AI/ML', 'Database', 'Cloud/DevOps'];

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const item: SkillItem = {
      skill: newSkillName.trim(),
      level: newSkillLevel,
      verified: false,
      category: newSkillCategory
    };

    setSkillList([...skillList, item]);
    setNewSkillName('');
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-indigo-400" />
            <span>Interactive Skill Graph</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Blockchain-verified technical competencies analyzed by AI vector embeddings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
            <ShieldCheck className="h-4 w-4" />
            <span>{skillList.filter(s => s.verified).length} Verified Competencies</span>
          </div>
        </div>
      </div>

      {/* Skills Grouped by Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(cat => {
          const categorySkills = skillList.filter(s => s.category === cat);
          if (categorySkills.length === 0) return null;

          return (
            <div key={cat} className="glass-panel rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="h-4 w-4 text-indigo-400" />
                  <span>{cat}</span>
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Avg: {Math.round(categorySkills.reduce((a, b) => a + b.level, 0) / categorySkills.length)}%
                </span>
              </div>

              <div className="space-y-4">
                {categorySkills.map(item => (
                  <div key={item.skill} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-200">{item.skill}</span>
                        {item.verified ? (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            <CheckCircle2 className="h-3 w-3" /> Polygon Verified
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                            Self Reported
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-slate-400 font-bold">{item.level}%</span>
                    </div>

                    <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-800">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          item.verified
                            ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400'
                            : 'bg-slate-600'
                        }`}
                        style={{ width: `${item.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Skill Form */}
      <div className="glass-panel rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Plus className="h-4 w-4 text-indigo-400" />
          <span>Add Custom Skill to Graph</span>
        </h3>

        <form onSubmit={handleAddSkill} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Skill Name (e.g. Docker, Rust)"
            value={newSkillName}
            onChange={e => setNewSkillName(e.target.value)}
            className="rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />

          <select
            value={newSkillCategory}
            onChange={e => setNewSkillCategory(e.target.value as SkillItem['category'])}
            className="rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <div className="flex items-center gap-3">
            <input
              type="range"
              min="30"
              max="100"
              value={newSkillLevel}
              onChange={e => setNewSkillLevel(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
            <span className="text-xs font-mono text-indigo-400 font-bold">{newSkillLevel}%</span>
          </div>

          <button
            type="submit"
            className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition shadow-md"
          >
            Add Skill
          </button>
        </form>
      </div>

    </div>
  );
};
