import { SkillItem, AchievementItem, JobOpportunity } from '@/types';

export interface CareerScoreBreakdown {
  overallScore: number;
  talentScore: number;
  technical: number;
  domain: number;
  achievements: number;
  softSkills: number;
  insights: string[];
  recommendations: string[];
}

export interface ResumeAnalysisResult {
  atsScore: number;
  keywordMatch: number;
  formattingScore: number;
  strengths: string[];
  improvements: string[];
  missingKeywords: string[];
}

export class AIService {
  // Simulate AI Career & Talent Score computation
  static computeCareerScore(skills: SkillItem[], achievements: AchievementItem[]): CareerScoreBreakdown {
    const verifiedSkills = skills.filter(s => s.verified);
    const avgSkillLevel = skills.length > 0 
      ? Math.round(skills.reduce((acc, curr) => acc + curr.level, 0) / skills.length)
      : 70;
    
    const verifiedProjectsCount = achievements.filter(a => a.verificationStatus === 'verified').length;
    const projectBonus = verifiedProjectsCount * 8;

    const technical = Math.min(99, Math.round(avgSkillLevel * 0.95 + (verifiedSkills.length * 2)));
    const domain = Math.min(98, 85 + projectBonus);
    const achievementsScore = Math.min(99, 82 + (achievements.length * 5));
    const softSkills = 88;

    const overallScore = Math.round((technical * 0.35) + (domain * 0.25) + (achievementsScore * 0.25) + (softSkills * 0.15));
    const talentScore = Math.round((overallScore * 0.96) + 3);

    return {
      overallScore,
      talentScore,
      technical,
      domain,
      achievements: achievementsScore,
      softSkills,
      insights: [
        `High mastery in ${skills[0]?.skill || 'Core Tech Stack'} with verifiable Polygon blockchain backing.`,
        `Top 2% student in department for production project deployment & research contributions.`,
        `Strong alignment with Web3 & AI engineering roles.`
      ],
      recommendations: [
        'Complete Kubernetes cluster management certification to reach 98+ Cloud score.',
        'Publish paper on Vector Search optimization to unlock tier-1 AI researcher roles.',
        'Participate in 1 more international hackathon to boost global talent ranking.'
      ]
    };
  }

  // Simulate RAG Query for AI Mentor
  static async queryAIMentor(query: string, studentName: string): Promise<string> {
    const q = query.toLowerCase();
    
    if (q.includes('resume') || q.includes('cv')) {
      return `Hello ${studentName}! I reviewed your resume against current placement trends. Your project "**DeFi Liquidity Aggregator**" is verified on-chain, which increases recruiter response rate by 3.4x. I recommend highlighting your Qdrant vector database research at the top of your experience section.`;
    }
    if (q.includes('polygon') || q.includes('blockchain') || q.includes('smart contract')) {
      return `Your Polygon smart contract credentials demonstrate production proficiency in Solidity and Hardhat. Top recruiters like Coinbase and Polygon Labs prioritize candidates with cryptographic proof of code verification.`;
    }
    if (q.includes('job') || q.includes('internship') || q.includes('match') || q.includes('opportunity')) {
      return `Based on your hybrid AI + Web3 skill graph, you have a **97% match** for the **Full Stack Blockchain & AI Engineer** position at Polygon Labs and a **94% match** for OpenAI's AI Systems Intern role!`;
    }

    return `That's a great career path question, ${studentName}. Based on your current profile (CGPA: 9.4, 2 Verified Credentials, Career Score: 93), your optimal next step is focusing on Distributed Systems & AI Pipeline Optimization. Would you like me to generate a tailored 30-day skill roadmap?`;
  }

  // Simulate Resume Analysis
  static analyzeResume(resumeText: string): ResumeAnalysisResult {
    return {
      atsScore: 92,
      keywordMatch: 89,
      formattingScore: 95,
      strengths: [
        'Strong action verbs in project descriptions',
        'Includes Polygon blockchain transaction hashes for instant verification',
        'Quantifiable outcomes (e.g., "reduced gas costs by 35%")'
      ],
      improvements: [
        'Add system architecture diagrams link to your portfolio',
        'Include targeted keywords: CI/CD, Kubernetes, gRPC'
      ],
      missingKeywords: ['Kubernetes', 'gRPC', 'Terraform', 'Kafka']
    };
  }

  // Vector Search Job Matcher Simulation
  static calculateJobMatch(studentSkills: string[], jobSkills: string[]): number {
    const matched = studentSkills.filter(s => jobSkills.some(js => js.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(js.toLowerCase())));
    const ratio = matched.length / Math.max(jobSkills.length, 1);
    return Math.min(99, Math.max(70, Math.round(75 + ratio * 24)));
  }
}
