import { User, SkillItem, AchievementItem, CredentialRecord, JobOpportunity, CandidateApplication, AuditLog, SystemMetric } from '@/types';

export const INITIAL_USER: User = {
  id: 'usr_student_01',
  name: 'Alex Rivera',
  email: 'alex.rivera@dsatm.edu',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  universityId: 'uni_dsatm_01',
  universityName: 'Dayananda Sagar Academy of Tech & Mgmt',
};

export const UNIVERSITIES = [
  { id: 'uni_dsatm_01', name: 'Dayananda Sagar Academy of Tech & Mgmt', location: 'Bangalore, India' },
  { id: 'uni_mit_02', name: 'MIT School of Engineering', location: 'Cambridge, MA' },
  { id: 'uni_stanford_03', name: 'Stanford Innovation Labs', location: 'Stanford, CA' }
];

export const INITIAL_SKILLS: SkillItem[] = [
  { skill: 'TypeScript', level: 92, verified: true, category: 'Languages' },
  { skill: 'React / Next.js', level: 95, verified: true, category: 'Frameworks' },
  { skill: 'Solidity / Polygon', level: 84, verified: true, category: 'Blockchain' },
  { skill: 'Python / FastAPI', level: 88, verified: true, category: 'Languages' },
  { skill: 'PyTorch / RAG', level: 80, verified: true, category: 'AI/ML' },
  { skill: 'Qdrant Vector DB', level: 78, verified: true, category: 'AI/ML' },
  { skill: 'Docker & Kubernetes', level: 75, verified: false, category: 'Cloud/DevOps' },
  { skill: 'MongoDB & Redis', level: 86, verified: true, category: 'Database' }
];

export const INITIAL_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach_01',
    studentId: 'usr_student_01',
    studentName: 'Alex Rivera',
    studentRoll: '1DT22CS045',
    department: 'Computer Science & Engineering',
    title: 'DeFi Liquidity Aggregator on Polygon',
    type: 'project',
    description: 'Built a decentralized yield aggregator reducing gas costs by 35% using Polygon zkEVM rollups and Pyth Price Feeds.',
    techStack: ['Solidity', 'Hardhat', 'Next.js', 'Ethers.js'],
    proofUrl: 'https://github.com/alexrivera/polygon-defi-aggregator',
    verificationStatus: 'verified',
    verifiedBy: 'Dr. Sarah Jenkins (HOD CSE)',
    verifiedAt: '2026-05-14',
    ipfsHash: 'QmX7Y28xL9pW4vR6tQ1nMkL8zP3aV5bW9kM7jR4tQ2nP1m',
    txHash: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    tokenId: '7482',
    aiScore: 96,
    aiSummary: 'Exceptional architectural clarity, high contract security standard with automated ReentrancyGuard checks.',
    createdAt: '2026-05-10'
  },
  {
    id: 'ach_02',
    studentId: 'usr_student_01',
    studentName: 'Alex Rivera',
    studentRoll: '1DT22CS045',
    department: 'Computer Science & Engineering',
    title: 'Distributed RAG Engine for Legal Contracts',
    type: 'research',
    description: 'Co-authored research paper on Hybrid Sparse-Dense Search using Qdrant vector databases for sub-50ms document retrieval.',
    techStack: ['Python', 'FastAPI', 'Qdrant', 'LangChain'],
    proofUrl: 'https://arxiv.org/abs/2026.04891',
    verificationStatus: 'verified',
    verifiedBy: 'Prof. Marcus Vance',
    verifiedAt: '2026-06-02',
    ipfsHash: 'QmR4tQ2nP1mX7Y28xL9pW4vR6tQ1nMkL8zP3aV5bW9kM7j',
    txHash: '0x1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1f2e',
    tokenId: '7499',
    aiScore: 94,
    aiSummary: 'Novel approach to vector chunk reranking with proven benchmark superiority over standard BM25.',
    createdAt: '2026-05-28'
  },
  {
    id: 'ach_03',
    studentId: 'usr_student_01',
    studentName: 'Alex Rivera',
    studentRoll: '1DT22CS045',
    department: 'Computer Science & Engineering',
    title: 'EthGlobal Hackathon - 1st Place Winner',
    type: 'hackathon',
    description: 'Awarded 1st place in Smart City Track for AI-driven decentralized microgrid power trading system.',
    techStack: ['Solidity', 'IPFS', 'FastAPI', 'Chainlink'],
    proofUrl: 'https://ethglobal.com/showcase/talentchain-microgrid',
    verificationStatus: 'pending',
    createdAt: '2026-07-29',
    aiScore: 92,
    aiSummary: 'High commercial viability and smart contract execution efficiency.'
  },
  {
    id: 'ach_04',
    studentId: 'usr_student_02',
    studentName: 'Elena Rostova',
    studentRoll: '1DT22CS089',
    department: 'Artificial Intelligence & Data Science',
    title: 'Autonomous Vision Transformer for Medical Imaging',
    type: 'project',
    description: 'Designed a lightweight ViT model achieving 98.4% diagnostic precision on chest X-ray datasets with 4x reduced parameter count.',
    techStack: ['PyTorch', 'TensorFlow', 'OpenCV', 'Streamlit'],
    proofUrl: 'https://github.com/elenarostova/med-vit',
    verificationStatus: 'pending',
    createdAt: '2026-08-01',
    aiScore: 95,
    aiSummary: 'State of the art quantization techniques applied with impressive benchmark validation.'
  }
];

export const INITIAL_CREDENTIALS: CredentialRecord[] = [
  {
    id: 'cred_01',
    title: 'DeFi Liquidity Aggregator Certificate',
    type: 'project',
    studentName: 'Alex Rivera',
    studentRoll: '1DT22CS045',
    universityName: 'Dayananda Sagar Academy of Tech & Mgmt',
    issuerName: 'Dr. Sarah Jenkins',
    issuedAt: '2026-05-14',
    ipfsHash: 'QmX7Y28xL9pW4vR6tQ1nMkL8zP3aV5bW9kM7jR4tQ2nP1m',
    txHash: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    contractAddress: '0x8f2C18D408e0B21356A495E465646fD6Ebc09712',
    tokenId: '7482',
    status: 'valid',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://polygonscan.com/tx/0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    metadata: {
      grade: 'Distinction (A+)',
      skillsVerified: ['Solidity', 'Hardhat', 'Web3', 'Contract Security'],
      description: 'Verified academic production project with complete unit test suites and zero critical audit vulnerabilities.'
    }
  },
  {
    id: 'cred_02',
    title: 'Distributed RAG Engine Research Verification',
    type: 'research',
    studentName: 'Alex Rivera',
    studentRoll: '1DT22CS045',
    universityName: 'Dayananda Sagar Academy of Tech & Mgmt',
    issuerName: 'Prof. Marcus Vance',
    issuedAt: '2026-06-02',
    ipfsHash: 'QmR4tQ2nP1mX7Y28xL9pW4vR6tQ1nMkL8zP3aV5bW9kM7j',
    txHash: '0x1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1f2e',
    contractAddress: '0x8f2C18D408e0B21356A495E465646fD6Ebc09712',
    tokenId: '7499',
    status: 'valid',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://polygonscan.com/tx/0x1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1f2e',
    metadata: {
      grade: 'Peer Reviewed',
      skillsVerified: ['Python', 'FastAPI', 'Qdrant Vector DB', 'NLP RAG'],
      description: 'Peer-reviewed research paper verified by University Academic Council.'
    }
  }
];

export const INITIAL_JOBS: JobOpportunity[] = [
  {
    id: 'job_01',
    companyName: 'Polygon Labs',
    companyLogo: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
    title: 'Full Stack Blockchain & AI Engineer',
    type: 'full_time',
    location: 'Bangalore / Remote',
    isRemote: true,
    stipendOrSalary: '$110,000 - $140,000 / yr',
    deadline: '2026-08-30',
    skillsRequired: ['Solidity', 'TypeScript', 'Next.js', 'Python', 'FastAPI'],
    description: 'Looking for a talented software engineer to build Next-Gen decentralized infrastructure integrated with AI-driven automated smart contract analysis.',
    minCgpa: 8.5,
    status: 'open',
    matchScore: 97,
    applicantsCount: 42
  },
  {
    id: 'job_02',
    companyName: 'OpenAI Enterprise Labs',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
    title: 'AI Systems & RAG Platform Intern',
    type: 'internship',
    location: 'San Francisco / Hybrid',
    isRemote: false,
    stipendOrSalary: '$9,500 / month',
    deadline: '2026-08-25',
    skillsRequired: ['Python', 'PyTorch', 'Vector Databases', 'LangChain', 'FastAPI'],
    description: 'Work with the frontier systems team building scalable RAG architectures and low-latency embeddings search for enterprise clients.',
    minCgpa: 8.8,
    status: 'open',
    matchScore: 94,
    applicantsCount: 128
  },
  {
    id: 'job_03',
    companyName: 'Coinbase Infrastructure',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Coinbase-logo.png',
    title: 'Smart Contract Auditor & Security Analyst',
    type: 'full_time',
    location: 'Remote',
    isRemote: true,
    stipendOrSalary: '$135,000 / yr',
    deadline: '2026-09-15',
    skillsRequired: ['Solidity', 'Hardhat', 'Ethers.js', 'Security Auditing'],
    description: 'Analyze, audit, and formal verification of multi-chain smart contract protocol deployments.',
    minCgpa: 8.0,
    status: 'open',
    matchScore: 89,
    applicantsCount: 31
  }
];

export const INITIAL_APPLICATIONS: CandidateApplication[] = [
  {
    id: 'app_01',
    opportunityId: 'job_01',
    jobTitle: 'Full Stack Blockchain & AI Engineer',
    companyName: 'Polygon Labs',
    studentId: 'usr_student_01',
    studentName: 'Alex Rivera',
    studentRoll: '1DT22CS045',
    cgpa: 9.4,
    talentScore: 94,
    matchScore: 97,
    status: 'shortlisted',
    appliedAt: '2026-08-01'
  },
  {
    id: 'app_02',
    opportunityId: 'job_02',
    jobTitle: 'AI Systems & RAG Platform Intern',
    companyName: 'OpenAI Enterprise Labs',
    studentId: 'usr_student_01',
    studentName: 'Alex Rivera',
    studentRoll: '1DT22CS045',
    cgpa: 9.4,
    talentScore: 94,
    matchScore: 94,
    status: 'applied',
    appliedAt: '2026-08-02'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log_01',
    actorName: 'Dr. Sarah Jenkins',
    actorRole: 'faculty',
    action: 'VERIFY_AND_ISSUE_CREDENTIAL',
    target: 'DeFi Liquidity Aggregator (Student: Alex Rivera)',
    hash: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    timestamp: '2026-05-14 14:32:05',
    ip: '192.168.1.104'
  },
  {
    id: 'log_02',
    actorName: 'Prof. Marcus Vance',
    actorRole: 'faculty',
    action: 'VERIFY_RESEARCH_PAPER',
    target: 'Distributed RAG Engine (Student: Alex Rivera)',
    hash: '0x1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1f2e',
    timestamp: '2026-06-02 11:15:40',
    ip: '192.168.1.112'
  },
  {
    id: 'log_03',
    actorName: 'Polygon Labs Recruiter',
    actorRole: 'recruiter',
    action: 'SHORTLIST_CANDIDATE',
    target: 'Alex Rivera (Job: Full Stack Blockchain & AI Engineer)',
    timestamp: '2026-08-02 09:45:12',
    ip: '34.210.98.15'
  }
];

export const INITIAL_SYSTEM_METRICS: SystemMetric = {
  tps: 2450,
  polygonGasGwei: 28.4,
  qdrantVectorCount: 148200,
  aiModelLatencyMs: 240,
  activeNodes: 128,
  contractStatus: 'Operational'
};
