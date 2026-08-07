'use client';

import React, { useState } from 'react';
import { UserRole, User } from '@/types';
import { UNIVERSITIES } from '@/lib/mockData';
import { OTPVerification } from './OTPVerification';
import { PhoneAuthService } from '@/lib/phoneAuthService';
import { UserService } from '@/lib/userService';
import { 
  GraduationCap, 
  ShieldCheck, 
  Briefcase, 
  UserCheck, 
  Layers, 
  Cpu, 
  Lock, 
  Mail, 
  Building2, 
  ArrowRight,
  Sparkles,
  KeyRound,
  CheckCircle2,
  Phone
} from 'lucide-react';

interface AuthPortalProps {
  onAuthenticated: (user: User) => void;
}

export const AuthPortal: React.FC<AuthPortalProps> = ({ onAuthenticated }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [selectedUni, setSelectedUni] = useState(UNIVERSITIES[0].id);

  // Form State
  const [email, setEmail] = useState('alex.rivera@dsatm.edu');
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [countryCode, setCountryCode] = useState('+91');
  const [password, setPassword] = useState('••••••••••••');
  const [fullName, setFullName] = useState('Alex Rivera');
  const [extraIdentifier, setExtraIdentifier] = useState('1DT22CS045');

  // Step 2 OTP State
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [generatedOtp, setGeneratedOtp] = useState('849201');
  const [formattedPhone, setFormattedPhone] = useState('+91 98765 43210');

  const roles: { id: UserRole; label: string; icon: React.ReactNode; color: string; desc: string }[] = [
    { id: 'student', label: 'Student', icon: <GraduationCap className="h-5 w-5" />, color: 'text-indigo-400', desc: 'Portfolio, AI Mentor & Verified Credentials' },
    { id: 'faculty', label: 'Faculty / Admin', icon: <ShieldCheck className="h-5 w-5" />, color: 'text-emerald-400', desc: 'Verify Achievements & Issue Polygon Tokens' },
    { id: 'placement', label: 'Placement Officer', icon: <Briefcase className="h-5 w-5" />, color: 'text-cyan-400', desc: 'Corporate Drives & Candidate Ranking' },
    { id: 'recruiter', label: 'Corporate Recruiter', icon: <UserCheck className="h-5 w-5" />, color: 'text-amber-400', desc: 'AI JD Matcher & Interview Scheduler' },
    { id: 'super_admin', label: 'Super Admin', icon: <Layers className="h-5 w-5" />, color: 'text-purple-400', desc: 'Multi-Tenant & Smart Contract Monitoring' },
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    // Pre-fill realistic emails per role
    const defaultEmails: Record<UserRole, string> = {
      student: 'alex.rivera@dsatm.edu',
      faculty: 'sarah.jenkins@dsatm.edu',
      placement: 'placement.office@dsatm.edu',
      recruiter: 'recruiter@polygon.technology',
      super_admin: 'admin@talentchain.ai'
    };
    const defaultNames: Record<UserRole, string> = {
      student: 'Alex Rivera',
      faculty: 'Dr. Sarah Jenkins',
      placement: 'Prof. Placement Lead',
      recruiter: 'Polygon Talent Team',
      super_admin: 'Master System Admin'
    };
    setEmail(defaultEmails[role]);
    setFullName(defaultNames[role]);
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await PhoneAuthService.sendPhoneOTP(phoneNumber, countryCode);
    setGeneratedOtp(res.otpCode);
    setFormattedPhone(res.formattedPhone);
    setStep('otp');
  };

  const handleResendOtp = async () => {
    const res = await PhoneAuthService.sendPhoneOTP(phoneNumber, countryCode);
    setGeneratedOtp(res.otpCode);
    setFormattedPhone(res.formattedPhone);
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    const names: Record<UserRole, string> = {
      student: 'Alex Rivera',
      faculty: 'Dr. Sarah Jenkins',
      placement: 'Prof. Placement Officer',
      recruiter: 'Polygon Recruiter',
      super_admin: 'Global Super Admin'
    };
    const emails: Record<UserRole, string> = {
      student: 'alex.rivera@dsatm.edu',
      faculty: 'sarah.jenkins@dsatm.edu',
      placement: 'placement@dsatm.edu',
      recruiter: 'recruiter@polygon.technology',
      super_admin: 'admin@talentchain.ai'
    };

    const roleAllowedRolesMap: Record<UserRole, UserRole[]> = {
      student: ['student'],
      faculty: ['faculty', 'student'],
      placement: ['placement', 'student'],
      recruiter: ['recruiter'],
      super_admin: ['super_admin', 'faculty', 'placement', 'recruiter', 'student']
    };

    const user: User = {
      id: `usr_${role}_${Date.now()}`,
      name: names[role],
      email: emails[role],
      phoneNumber: '+91 98765 43210',
      role,
      primaryRole: role,
      allowedRoles: roleAllowedRolesMap[role],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      universityId: selectedUni,
      universityName: UNIVERSITIES.find(u => u.id === selectedUni)?.name || 'Dayananda Sagar Academy of Tech & Mgmt'
    };

    onAuthenticated(user);
  };

  const handleOtpSuccess = () => {
    const roleAllowedRolesMap: Record<UserRole, UserRole[]> = {
      student: ['student'],
      faculty: ['faculty', 'student'],
      placement: ['placement', 'student'],
      recruiter: ['recruiter'],
      super_admin: ['super_admin', 'faculty', 'placement', 'recruiter', 'student']
    };

    const user: User = {
      id: `usr_${selectedRole}_${Date.now()}`,
      name: fullName,
      email,
      phoneNumber: formattedPhone,
      role: selectedRole,
      primaryRole: selectedRole,
      allowedRoles: roleAllowedRolesMap[selectedRole],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      universityId: selectedUni,
      universityName: UNIVERSITIES.find(u => u.id === selectedUni)?.name || 'Dayananda Sagar Academy of Tech & Mgmt'
    };

    // Save user persistently in local database registry
    const registeredUser = UserService.registerUser(user);
    onAuthenticated(registeredUser);
  };

  if (step === 'otp') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#090d16]">
        <OTPVerification
          email={email}
          phone={formattedPhone}
          role={selectedRole}
          generatedOtp={generatedOtp}
          onVerifySuccess={handleOtpSuccess}
          onResendOtp={handleResendOtp}
          onBack={() => setStep('credentials')}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 md:p-8 bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 text-slate-900 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-sky-400/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl space-y-8 relative z-10">
        
        {/* Header Title Branding */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-300 bg-sky-100 px-4 py-1.5 text-xs font-bold text-sky-800 shadow-sm">
            <Cpu className="h-4 w-4 animate-pulse text-sky-600" />
            <span>Role-Based Authentication & Polygon 2FA Security</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Talent<span className="gradient-text-indigo">Chain</span> AI Portal
          </h1>
          <p className="text-xs md:text-sm text-slate-600 max-w-lg mx-auto font-medium">
            Select your enterprise role below to sign in or create a verified university identity.
          </p>
        </div>

        {/* Persona Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {roles.map(r => (
            <button
              key={r.id}
              onClick={() => handleRoleSelect(r.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all text-center space-y-2 ${
                selectedRole === r.id
                  ? 'bg-white border-sky-400 shadow-lg shadow-sky-500/15 ring-2 ring-sky-300 scale-[1.02]'
                  : 'bg-white/80 border-sky-200 text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              <div className={`p-2.5 rounded-xl bg-sky-50 ${r.color}`}>
                {r.icon}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">{r.label}</div>
                <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{r.desc}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Main Auth Form & Quick Demo Side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Form (2 cols) */}
          <div className="lg:col-span-2 glass-panel rounded-3xl p-6 md:p-8 space-y-6 border border-sky-200 shadow-xl bg-white/95 text-slate-900">
            
            <div className="flex items-center justify-between border-b border-sky-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-slate-900 uppercase tracking-wider capitalize">
                  {selectedRole.replace('_', ' ')} Access Portal
                </span>
              </div>

              {/* Login vs Signup Switcher */}
              <div className="flex bg-sky-50 p-1 rounded-xl border border-sky-200">
                <button
                  onClick={() => setMode('login')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                    mode === 'login' ? 'bg-sky-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setMode('signup')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                    mode === 'signup' ? 'bg-sky-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Register Account
                </button>
              </div>
            </div>

            <form onSubmit={handleCredentialsSubmit} className="space-y-4 text-xs">
              
              {mode === 'signup' && (
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-sky-200 bg-sky-50/50 px-3.5 py-2.5 text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">University / Corporate Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-sky-200 bg-sky-50/50 pl-9 pr-3.5 py-2.5 text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Mobile Phone (Real SMS 2FA)</label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={e => setCountryCode(e.target.value)}
                      className="rounded-xl border border-sky-200 bg-sky-50/50 px-2 py-2.5 text-slate-900 focus:border-sky-500 focus:outline-none text-xs font-mono"
                    >
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+61">🇦🇺 +61</option>
                    </select>
                    <div className="relative flex-1">
                      <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="98765 43210"
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                        className="w-full rounded-xl border border-sky-200 bg-sky-50/50 pl-9 pr-3.5 py-2.5 text-slate-900 font-mono focus:border-sky-500 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Role-Specific Secondary Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Institution Tenant</label>
                  <select
                    value={selectedUni}
                    onChange={e => setSelectedUni(e.target.value)}
                    className="w-full rounded-xl border border-sky-200 bg-sky-50/50 px-3.5 py-2.5 text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none"
                  >
                    {UNIVERSITIES.map(u => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {selectedRole === 'student' ? 'Student Roll Number' : selectedRole === 'faculty' ? 'Faculty ID' : 'Designation / Department'}
                  </label>
                  <input
                    type="text"
                    value={extraIdentifier}
                    onChange={e => setExtraIdentifier(e.target.value)}
                    className="w-full rounded-xl border border-sky-200 bg-sky-50/50 px-3.5 py-2.5 text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Security OTP Notice */}
              <div className="bg-sky-50 p-3 rounded-xl border border-sky-200 flex items-center justify-between text-[11px] text-sky-800">
                <div className="flex items-center gap-2">
                  <KeyRound className="h-4 w-4 text-sky-600 shrink-0" />
                  <span className="font-semibold">2FA Security Enabled: 6-Digit SMS OTP required upon login</span>
                </div>
                <span className="font-mono text-emerald-600 font-bold">Polygon MFA</span>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 py-3 font-extrabold text-white hover:opacity-95 transition shadow-lg shadow-sky-600/30"
              >
                <span>{mode === 'login' ? 'Continue to 2FA Security' : 'Register & Send SMS OTP'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

            </form>

          </div>

          {/* Quick Demo Instant Sign-In Cards (1 col) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>One-Click Quick Persona Logins</span>
            </div>

            <div className="space-y-2.5">
              {roles.map(r => (
                <button
                  key={r.id}
                  onClick={() => handleQuickDemoLogin(r.id)}
                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/90 border border-sky-200 hover:border-sky-400 hover:bg-sky-50/50 transition text-left group shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-lg bg-sky-50 ${r.color}`}>
                      {r.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-sky-700 transition">
                        Quick Demo {r.label}
                      </div>
                      <div className="text-[10px] text-slate-500">Bypass OTP & enter dashboard instantly</div>
                    </div>
                  </div>

                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-sky-600 transition" />
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
