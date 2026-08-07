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
    <aside className="w-64 shrink-0 border-r border-sky-200/60 bg-white/70 backdrop-blur-xl p-4 hidden md:block">
      <div className="space-y-6">
        
        {/* Role Header Badge */}
        <div className="rounded-xl border border-sky-200 bg-sky-50/90 p-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700">Current Scope</span>
          <div className="mt-0.5 text-xs font-extrabold text-slate-900 capitalize">{currentRole.replace('_', ' ')} Workspace</div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white font-extrabold shadow-md shadow-sky-600/20'
                    : 'text-slate-600 hover:bg-sky-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-white' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-sky-100 text-sky-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Status Card */}
        <div className="rounded-xl border border-sky-200 bg-gradient-to-b from-sky-50 to-blue-50/80 p-3 text-xs shadow-sm">
          <div className="flex items-center justify-between text-sky-800 font-bold">
            <span>Polygon Node</span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            Block #58492014 synced with IPFS gateway.
          </p>
        </div>

      </div>
    </aside>
  );
};
