'use client';

import React, { useState } from 'react';
import { UserRole, User } from '@/types';
import { UNIVERSITIES } from '@/lib/mockData';
import { 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  UserCheck, 
  Wallet, 
  Bell, 
  ChevronDown,
  CheckCircle2,
  Cpu,
  GraduationCap,
  Briefcase,
  Layers,
  LogOut,
  UserSquare2,
  Lock
} from 'lucide-react';

interface NavbarProps {
  currentUser: User | null;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  selectedUniversity: string;
  onUniversityChange: (uniId: string) => void;
  onLogout: () => void;
  unreadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  currentRole,
  onRoleChange,
  selectedUniversity,
  onUniversityChange,
  onLogout,
  unreadCount = 3
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showUniMenu, setShowUniMenu] = useState(false);

  const roles: { role: UserRole; label: string; icon: React.ReactNode; color: string }[] = [
    { role: 'student', label: 'Student Portal', icon: <GraduationCap className="w-4 h-4" />, color: 'text-indigo-400' },
    { role: 'faculty', label: 'Faculty & Verification', icon: <ShieldCheck className="w-4 h-4" />, color: 'text-emerald-400' },
    { role: 'placement', label: 'Placement Officer', icon: <Briefcase className="w-4 h-4" />, color: 'text-cyan-400' },
    { role: 'recruiter', label: 'Corporate Recruiter', icon: <UserCheck className="w-4 h-4" />, color: 'text-amber-400' },
    { role: 'super_admin', label: 'Super Admin', icon: <Layers className="w-4 h-4" />, color: 'text-purple-400' },
  ];

  const currentRoleInfo = roles.find(r => r.role === currentRole)!;
  const currentUni = UNIVERSITIES.find(u => u.id === selectedUniversity) || UNIVERSITIES[0];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/25">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
              <Cpu className="h-5 w-5 text-indigo-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-xl text-white">
                Talent<span className="gradient-text-indigo">Chain</span>
              </span>
              <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-400 border border-indigo-500/20">
                AI v2.4
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400 hidden sm:block">
              Blockchain & AI Talent Intelligence
            </p>
          </div>
        </div>

        {/* Center Tenant Switcher */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setShowUniMenu(!showUniMenu)}
            className="flex items-center gap-2.5 rounded-lg border border-slate-800 bg-slate-900/60 px-3.5 py-1.5 text-xs font-medium text-slate-200 transition hover:border-slate-700 hover:bg-slate-800/60"
          >
            <Building2 className="h-3.5 w-3.5 text-indigo-400" />
            <span className="truncate max-w-[200px]">{currentUni.name}</span>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </button>

          {showUniMenu && (
            <div className="absolute top-full left-0 mt-2 w-72 rounded-xl border border-slate-800 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-xl z-50">
              <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Select Institution Tenant
              </div>
              <div className="mt-1 space-y-1">
                {UNIVERSITIES.map(u => (
                  <button
                    key={u.id}
                    onClick={() => {
                      onUniversityChange(u.id);
                      setShowUniMenu(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition ${
                      u.id === selectedUniversity 
                        ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30' 
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="font-medium">{u.name}</div>
                      <div className="text-[10px] text-slate-400">{u.location}</div>
                    </div>
                    {u.id === selectedUniversity && <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3">
          
          {/* Polygon Wallet & Network Status Badge */}
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-3 py-1 text-xs font-medium text-purple-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <Wallet className="h-3.5 w-3.5 text-purple-400" />
            <span>Polygon PoS</span>
            <span className="text-[10px] text-purple-300/80 font-mono bg-purple-900/50 px-1.5 py-0.5 rounded border border-purple-500/20">Block #58.4M</span>
            <span className="text-[10px] opacity-75 font-mono">0x8f2C...9712</span>
          </div>

          {/* Notifications */}
          <button className="relative rounded-lg border border-slate-800 bg-slate-900/60 p-2 text-slate-300 hover:bg-slate-800 hover:text-white transition">
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Role Switcher Menu */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 rounded-xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/60 to-purple-950/60 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md hover:border-indigo-500/50 transition"
            >
              <span className={currentRoleInfo.color}>{currentRoleInfo.icon}</span>
              <span className="hidden sm:inline">{currentRoleInfo.label}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-slate-800 bg-slate-950/95 p-2.5 shadow-2xl backdrop-blur-2xl z-50">
                <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-800/80 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Switch Persona View
                  </span>
                  <span className="text-[10px] font-medium text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                    {currentUser?.allowedRoles && currentUser.allowedRoles.length > 1 ? `${currentUser.allowedRoles.length} Authorized Views` : 'Single Role Account'}
                  </span>
                </div>

                <div className="space-y-1">
                  {roles.map(r => {
                    const isAllowed = currentUser?.allowedRoles?.includes(r.role) ?? (r.role === currentRole);
                    const isActive = r.role === currentRole;

                    return (
                      <button
                        key={r.role}
                        disabled={!isAllowed}
                        onClick={() => {
                          if (isAllowed) {
                            onRoleChange(r.role);
                            setShowRoleMenu(false);
                          }
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs transition ${
                          isActive
                            ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/30 text-white font-bold border border-indigo-500/40 shadow-inner'
                            : isAllowed
                              ? 'text-slate-300 hover:bg-slate-900 cursor-pointer'
                              : 'text-slate-500 bg-slate-950/40 cursor-not-allowed opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`p-1.5 rounded-lg bg-slate-900 ${isAllowed ? r.color : 'text-slate-600'}`}>
                            {r.icon}
                          </div>
                          <div className="text-left">
                            <div className="font-medium">{r.label}</div>
                            {!isAllowed && (
                              <div className="text-[9px] text-slate-500">Requires {r.label} Authorization</div>
                            )}
                          </div>
                        </div>
                        {isActive ? (
                          <CheckCircle2 className="h-4 w-4 text-indigo-400" />
                        ) : !isAllowed ? (
                          <Lock className="h-3.5 w-3.5 text-slate-600" />
                        ) : null}
                      </button>
                    );
                  })}
                </div>

                <div className="border-t border-slate-800/80 mt-2.5 pt-2 space-y-1">
                  <div className="px-2 py-1 text-[10px] text-slate-500 leading-tight">
                    Need access to another role? Sign out to authenticate as a different user identity.
                  </div>
                  <button
                    onClick={() => {
                      setShowRoleMenu(false);
                      onLogout();
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold bg-rose-500/10 text-rose-400 hover:bg-rose-950/40 border border-rose-500/20 transition"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Switch Account / Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill & Sign Out Button */}
          {currentUser && (
            <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-300">
              <img src={currentUser.avatar} alt={currentUser.name} className="h-5 w-5 rounded-full object-cover shrink-0" />
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-white leading-tight">{currentUser.name}</div>
                {currentUser.phoneNumber && (
                  <div className="text-[10px] text-amber-400 font-mono leading-tight">{currentUser.phoneNumber}</div>
                )}
              </div>
              <button
                onClick={onLogout}
                title="Sign Out to Auth Portal"
                className="p-1 hover:text-rose-400 text-slate-400 transition"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

        </div>

      </div>
    </header>
  );
};
