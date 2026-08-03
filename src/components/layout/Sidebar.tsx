'use client';

import React from 'react';
import { UserRole } from '@/types';
import { 
  LayoutDashboard, 
  Sparkles, 
  Award, 
  FolderGit2, 
  BookOpen, 
  Trophy, 
  FileText, 
  Globe, 
  Bot, 
  ShieldCheck, 
  CheckCircle2, 
  BarChart3, 
  History, 
  Briefcase, 
  Building, 
  Users, 
  UserPlus, 
  Search, 
  Calendar, 
  Server, 
  SlidersHorizontal,
  Flame
} from 'lucide-react';

interface SidebarProps {
  currentRole: UserRole;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRole,
  activeTab,
  onTabChange
}) => {

  const navByRole: Record<UserRole, { id: string; label: string; icon: React.ReactNode; badge?: string }[]> = {
    student: [
      { id: 'dashboard', label: 'Overview Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
      { id: 'skill-graph', label: 'Skill Graph & Scores', icon: <Sparkles className="w-4 h-4" />, badge: 'AI' },
      { id: 'projects', label: 'Projects & Research', icon: <FolderGit2 className="w-4 h-4" /> },
      { id: 'credentials', label: 'Blockchain Credentials', icon: <Award className="w-4 h-4" />, badge: 'Polygon' },
      { id: 'ai-mentor', label: 'AI Career Mentor (RAG)', icon: <Bot className="w-4 h-4" />, badge: 'GPT-5.5' },
      { id: 'resume-builder', label: 'AI Resume Builder', icon: <FileText className="w-4 h-4" /> },
      { id: 'portfolio', label: 'Portfolio Generator', icon: <Globe className="w-4 h-4" /> },
    ],
    faculty: [
      { id: 'verification-queue', label: 'Verification Queue', icon: <CheckCircle2 className="w-4 h-4" />, badge: '4 Pending' },
      { id: 'blockchain-issuer', label: 'Blockchain Credential Issuer', icon: <ShieldCheck className="w-4 h-4" /> },
      { id: 'faculty-analytics', label: 'Department Analytics', icon: <BarChart3 className="w-4 h-4" /> },
      { id: 'audit-logs', label: 'System Audit Trail', icon: <History className="w-4 h-4" /> },
    ],
    placement: [
      { id: 'drive-manager', label: 'Drive & Jobs Manager', icon: <Briefcase className="w-4 h-4" /> },
      { id: 'candidate-ranker', label: 'AI Candidate Ranker', icon: <Flame className="w-4 h-4" />, badge: 'Vector Search' },
      { id: 'placement-analytics', label: 'Placement Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    ],
    recruiter: [
      { id: 'job-creator', label: 'Create Job / Internship', icon: <UserPlus className="w-4 h-4" /> },
      { id: 'candidate-matcher', label: 'AI Candidate Matcher', icon: <Search className="w-4 h-4" />, badge: 'Qdrant' },
      { id: 'interview-scheduler', label: 'Interview Scheduler', icon: <Calendar className="w-4 h-4" /> },
    ],
    super_admin: [
      { id: 'tenant-manager', label: 'University Tenants', icon: <Building className="w-4 h-4" /> },
      { id: 'system-health', label: 'System & Gas Monitor', icon: <Server className="w-4 h-4" /> },
      { id: 'audit-logs', label: 'Global Audit Logs', icon: <History className="w-4 h-4" /> },
    ]
  };

  const navItems = navByRole[currentRole] || [];

  return (
    <aside className="w-64 shrink-0 border-r border-slate-800/80 bg-slate-950/60 p-4 hidden md:block">
      <div className="space-y-6">
        
        {/* Role Header Badge */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Scope</span>
          <div className="mt-0.5 text-xs font-bold text-white capitalize">{currentRole.replace('_', ' ')} Workspace</div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium transition ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30 shadow-md'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-indigo-400' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                    isActive ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Status Card */}
        <div className="rounded-xl border border-indigo-500/20 bg-gradient-to-b from-indigo-950/30 to-purple-950/30 p-3 text-xs">
          <div className="flex items-center justify-between text-indigo-300 font-semibold">
            <span>Polygon Node</span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            Block #58492014 synced with IPFS gateway.
          </p>
        </div>

      </div>
    </aside>
  );
};
