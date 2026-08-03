'use client';

import React, { useState } from 'react';
import { UserRole, SkillItem, AchievementItem, CredentialRecord, JobOpportunity, CandidateApplication, AuditLog } from '@/types';
import { 
  INITIAL_SKILLS, 
  INITIAL_ACHIEVEMENTS, 
  INITIAL_CREDENTIALS, 
  INITIAL_JOBS, 
  INITIAL_APPLICATIONS, 
  INITIAL_AUDIT_LOGS 
} from '@/lib/mockData';
import { BlockchainService } from '@/lib/blockchainService';

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
  // Global State
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

  // Handle Role Switching and reset tab appropriately
  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    const defaultTabs: Record<UserRole, string> = {
      student: 'dashboard',
      faculty: 'verification-queue',
      placement: 'drive-manager',
      recruiter: 'candidate-matcher',
      super_admin: 'tenant-manager'
    };
    setActiveTab(defaultTabs[role]);
  };

  // State Handler: Add new project / achievement
  const handleAddAchievement = (newAch: AchievementItem) => {
    setAchievements([newAch, ...achievements]);
    // Add audit log
    const newLog: AuditLog = {
      id: `log_${Date.now()}`,
      actorName: 'Alex Rivera',
      actorRole: 'student',
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

    // Issue Polygon Credential
    const newCred = await BlockchainService.issueCredentialOnPolygon(ach, 'Dr. Sarah Jenkins (HOD)');

    // Update achievement status
    setAchievements(achievements.map(a => {
      if (a.id === id) {
        return {
          ...a,
          verificationStatus: 'verified',
          verifiedBy: 'Dr. Sarah Jenkins (HOD CSE)',
          verifiedAt: new Date().toISOString().split('T')[0],
          ipfsHash: newCred.ipfsHash,
          txHash: newCred.txHash,
          tokenId: newCred.tokenId
        };
      }
      return a;
    }));

    setCredentials([newCred, ...credentials]);

    // Add Audit Log
    const newLog: AuditLog = {
      id: `log_${Date.now()}`,
      actorName: 'Dr. Sarah Jenkins',
      actorRole: 'faculty',
      action: 'VERIFY_AND_ISSUE_CREDENTIAL',
      target: `${ach.title} (Student: ${ach.studentName})`,
      hash: newCred.txHash,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ip: '192.168.1.104'
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

  // State Handler: Faculty rejects achievement
  const handleRejectAchievement = (id: string) => {
    setAchievements(achievements.map(a => a.id === id ? { ...a, verificationStatus: 'rejected' } : a));
  };

  // State Handler: Add new job placement drive
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

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 font-sans">
      
      {/* Top Navbar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        selectedUniversity={selectedUniversity}
        onUniversityChange={setSelectedUniversity}
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
