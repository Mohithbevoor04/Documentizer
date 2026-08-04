export type UserRole = 'student' | 'faculty' | 'placement' | 'recruiter' | 'super_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  primaryRole: UserRole;
  allowedRoles: UserRole[];
  avatar: string;
  universityId: string;
  universityName: string;
}

export interface SkillItem {
  skill: string;
  level: number; // 0 - 100
  verified: boolean;
  category: 'Languages' | 'Frameworks' | 'AI/ML' | 'Database' | 'Cloud/DevOps' | 'Blockchain';
}

export interface AchievementItem {
  id: string;
  studentId: string;
  studentName: string;
  studentRoll: string;
  department: string;
  title: string;
  type: 'project' | 'certificate' | 'research' | 'hackathon';
  description: string;
  techStack: string[];
  proofUrl: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verifiedBy?: string;
  verifiedAt?: string;
  ipfsHash?: string;
  txHash?: string;
  tokenId?: string;
  aiScore?: number;
  aiSummary?: string;
  createdAt: string;
}

export interface CredentialRecord {
  id: string;
  title: string;
  type: 'project' | 'certificate' | 'research' | 'hackathon' | 'degree';
  studentName: string;
  studentRoll: string;
  universityName: string;
  issuerName: string;
  issuedAt: string;
  ipfsHash: string;
  txHash: string;
  contractAddress: string;
  tokenId: string;
  status: 'valid' | 'revoked';
  qrCode: string;
  metadata: {
    grade?: string;
    skillsVerified: string[];
    description: string;
  };
}

export interface JobOpportunity {
  id: string;
  companyName: string;
  companyLogo: string;
  title: string;
  type: 'internship' | 'full_time';
  location: string;
  isRemote: boolean;
  stipendOrSalary: string;
  deadline: string;
  skillsRequired: string[];
  description: string;
  minCgpa: number;
  status: 'open' | 'closed';
  matchScore?: number;
  applicantsCount: number;
}

export interface CandidateApplication {
  id: string;
  opportunityId: string;
  jobTitle: string;
  companyName: string;
  studentId: string;
  studentName: string;
  studentRoll: string;
  cgpa: number;
  talentScore: number;
  matchScore: number;
  status: 'applied' | 'shortlisted' | 'interviewed' | 'offered' | 'rejected';
  appliedAt: string;
}

export interface AuditLog {
  id: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  target: string;
  hash?: string;
  timestamp: string;
  ip: string;
}

export interface SystemMetric {
  tps: number;
  polygonGasGwei: number;
  qdrantVectorCount: number;
  aiModelLatencyMs: number;
  activeNodes: number;
  contractStatus: 'Operational' | 'Degraded' | 'Maintenance';
}
