'use client';

import React, { useState } from 'react';
import { UserRole, User, SkillItem, AchievementItem, CredentialRecord, JobOpportunity, CandidateApplication, AuditLog } from '@/types';
import { 
  INITIAL_SKILLS, 
  INITIAL_ACHIEVEMENTS, 
  INITIAL_CREDENTIALS, 
  INITIAL_JOBS, 
  INITIAL_APPLICATIONS, 
  INITIAL_AUDIT_LOGS,
  UNIVERSITIES 
} from '@/lib/mockData';
import { BlockchainService } from '@/lib/blockchainService';

// Auth Component
import { AuthPortal } from '@/components/auth/AuthPortal';

// Layout Components
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';

// Student Components
import { StudentDashboard } from '@/components/student/StudentDashboard';
import { SkillGraph } from '@/components/student/SkillGraph';
import { StudentProjects } from '@/components/student/StudentProjects';
import { BlockchainCredentials } from '@/components/student/BlockchainCredentials';
import { AIMentor } from '@/components/student/AIMentor';
import { ResumeBuilder } from '@/components/student/ResumeBuilder';
import { PortfolioGenerator } from '@/components/student/PortfolioGenerator';

// Faculty Components
import { VerificationQueue } from '@/components/faculty/VerificationQueue';
import { BlockchainIssuer } from '@/components/faculty/BlockchainIssuer';
import { AuditLogs } from '@/components/faculty/AuditLogs';

// Placement Components
import { DriveManager } from '@/components/placement/DriveManager';
import { CandidateRanker } from '@/components/placement/CandidateRanker';
import { PlacementAnalytics } from '@/components/placement/PlacementAnalytics';

// Recruiter Components
import { JobCreator } from '@/components/recruiter/JobCreator';
import { CandidateMatcher } from '@/components/recruiter/CandidateMatcher';
import { InterviewScheduler } from '@/components/recruiter/InterviewScheduler';

// Super Admin Components
import { TenantManager } from '@/components/admin/TenantManager';
import { SystemHealth } from '@/components/admin/SystemHealth';

export default function Home() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Global Workspace State
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [selectedUniversity, setSelectedUniversity] = useState('uni_dsatm_01');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Datasets State
  const [skills, setSkills] = useState<SkillItem[]>(INITIAL_SKILLS);
  const [achievements, setAchievements] = useState<AchievementItem[]>(INITIAL_ACHIEVEMENTS);
  const [credentials, setCredentials] = useState<CredentialRecord[]>(INITIAL_CREDENTIALS);
  const [jobs, setJobs] = useState<JobOpportunity[]>(INITIAL_JOBS);
  const [applications, setApplications] = useState<CandidateApplication[]>(INITIAL_APPLICATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  // Authentication Success Handler
  const handleAuthenticated = (user: User) => {
    setCurrentUser(user);
    setCurrentRole(user.role);
    setSelectedUniversity(user.universityId);
    
    const defaultTabs: Record<UserRole, string> = {
      student: 'dashboard',
      faculty: 'verification-queue',
      placement: 'drive-manager',
      recruiter: 'candidate-matcher',
      super_admin: 'tenant-manager'
    };
    setActiveTab(defaultTabs[user.role]);
  };

  // Role Switcher Handler with RBAC Guard & Audit Log
  const handleRoleChange = (targetRole: UserRole) => {
    if (!currentUser) return;

    const allowed = currentUser.allowedRoles?.includes(targetRole) ?? (targetRole === currentUser.role);
    if (!allowed) {
      console.warn(`[RBAC] Access denied: User ${currentUser.name} (${currentUser.primaryRole}) is not authorized to view ${targetRole}.`);
      return;
    }

    setCurrentRole(targetRole);
    setCurrentUser({ ...currentUser, role: targetRole });

    const defaultTabs: Record<UserRole, string> = {
      student: 'dashboard',
      faculty: 'verification-queue',
      placement: 'drive-manager',
      recruiter: 'candidate-matcher',
      super_admin: 'tenant-manager'
    };
    setActiveTab(defaultTabs[targetRole]);

    // Record Role View Audit Log
    const newLog: AuditLog = {
      id: `log_${Date.now()}`,
      actorName: currentUser.name,
      actorRole: currentUser.primaryRole,
      action: 'SWITCH_ACTIVE_ROLE_VIEW',
      target: `Switched view from ${currentRole} to ${targetRole}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ip: '192.168.1.104'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Logout Handler
  const handleLogout = () => {
    setCurrentUser(null);
  };

  // State Handler: Add new project / achievement
  const handleAddAchievement = (newAch: AchievementItem) => {
    setAchievements([newAch, ...achievements]);
    const newLog: AuditLog = {
      id: `log_${Date.now()}`,
      actorName: currentUser?.name || 'Alex Rivera',
      actorRole: currentRole,
      action: 'SUBMIT_ACHIEVEMENT_FOR_VERIFICATION',
      target: `${newAch.title} (${newAch.type})`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ip: '192.168.1.104'
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

  // State Handler: Faculty verifies achievement & issues Polygon credential
  const handleVerifyAchievement = async (id: string) => {
    const ach = achievements.find(a => a.id === id);
    if (!ach) return;

    const newCred = await BlockchainService.issueCredentialOnPolygon(ach, currentUser?.name || 'Dr. Sarah Jenkins (HOD)');

    setAchievements(achievements.map(a => {
      if (a.id === id) {
        return {
          ...a,
          verificationStatus: 'verified',
          verifiedBy: currentUser?.name || 'Dr. Sarah Jenkins (HOD CSE)',
          verifiedAt: new Date().toISOString().split('T')[0],
          ipfsHash: newCred.ipfsHash,
          txHash: newCred.txHash,
          tokenId: newCred.tokenId
        };
      }
      return a;
    }));

    setCredentials([newCred, ...credentials]);

    const newLog: AuditLog = {
      id: `log_${Date.now()}`,
      actorName: currentUser?.name || 'Dr. Sarah Jenkins',
      actorRole: 'faculty',
      action: 'VERIFY_AND_ISSUE_CREDENTIAL',
      target: `${ach.title} (Student: ${ach.studentName})`,
      hash: newCred.txHash,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ip: '192.168.1.104'
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

  const handleRejectAchievement = (id: string) => {
    setAchievements(achievements.map(a => a.id === id ? { ...a, verificationStatus: 'rejected' } : a));
  };

  const handleAddJob = (newJob: JobOpportunity) => {
    setJobs([newJob, ...jobs]);
  };

  // Render view based on active Tab and Role
  const renderContent = () => {
    switch (activeTab) {
      // Student Views
      case 'dashboard':
        return <StudentDashboard skills={skills} achievements={achievements} credentials={credentials} jobs={jobs} onNavigate={setActiveTab} />;
      case 'skill-graph':
        return <SkillGraph skills={skills} />;
      case 'projects':
        return <StudentProjects achievements={achievements} onAddAchievement={handleAddAchievement} />;
      case 'credentials':
        return <BlockchainCredentials credentials={credentials} />;
      case 'ai-mentor':
        return <AIMentor />;
      case 'resume-builder':
        return <ResumeBuilder />;
      case 'portfolio':
        return <PortfolioGenerator />;

      // Faculty Views
      case 'verification-queue':
        return <VerificationQueue achievements={achievements} onVerify={handleVerifyAchievement} onReject={handleRejectAchievement} />;
      case 'blockchain-issuer':
        return <BlockchainIssuer />;
      case 'faculty-analytics':
      case 'placement-analytics':
        return <PlacementAnalytics />;
      case 'audit-logs':
        return <AuditLogs logs={auditLogs} />;

      // Placement Views
      case 'drive-manager':
        return <DriveManager jobs={jobs} onAddJob={handleAddJob} />;
      case 'candidate-ranker':
        return <CandidateRanker applications={applications} />;

      // Recruiter Views
      case 'job-creator':
        return <JobCreator onAddJob={handleAddJob} />;
      case 'candidate-matcher':
        return <CandidateMatcher />;
      case 'interview-scheduler':
        return <InterviewScheduler />;

      // Super Admin Views
      case 'tenant-manager':
        return <TenantManager />;
      case 'system-health':
        return <SystemHealth />;

      default:
        return <StudentDashboard skills={skills} achievements={achievements} credentials={credentials} jobs={jobs} onNavigate={setActiveTab} />;
    }
  };

  // If user is not authenticated, display Role-Based Authentication & OTP 2FA Portal
  if (!currentUser) {
    return <AuthPortal onAuthenticated={handleAuthenticated} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 via-blue-50/60 to-indigo-50/80 text-slate-900 font-sans">
      
      {/* Top Navbar */}
      <Navbar
        currentUser={currentUser}
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        selectedUniversity={selectedUniversity}
        onUniversityChange={setSelectedUniversity}
        onLogout={handleLogout}
      />

      {/* Main Workspace Layout */}
      <div className="flex flex-1">
        
        {/* Left Sidebar */}
        <Sidebar
          currentRole={currentRole}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto overflow-y-auto">
          {renderContent()}
        </main>

      </div>

    </div>
  );
}
