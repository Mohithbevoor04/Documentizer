import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { CandidateApplication } from '@/types';

// GET /api/applications - Fetch candidate job applications from MySQL
export async function GET() {
  try {
    const rows = await query<any[]>('SELECT * FROM applications ORDER BY applied_at DESC');
    const applications: CandidateApplication[] = rows.map(r => ({
      id: r.id,
      opportunityId: r.opportunity_id,
      jobTitle: r.job_title,
      companyName: r.company_name,
      studentId: r.student_id,
      studentName: r.student_name,
      studentRoll: r.student_roll,
      cgpa: Number(r.cgpa),
      talentScore: Number(r.talent_score),
      matchScore: Number(r.match_score),
      status: r.status,
      appliedAt: r.applied_at
    }));
    return NextResponse.json({ success: true, source: 'mysql', applications });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST /api/applications - Submit job application to MySQL
export async function POST(request: Request) {
  try {
    const app: CandidateApplication = await request.json();

    const sql = `
      INSERT INTO applications (id, opportunity_id, job_title, company_name, student_id, student_name, student_roll, cgpa, talent_score, match_score, status, applied_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE status = VALUES(status)
    `;

    const params = [
      app.id || `app_${Date.now()}`,
      app.opportunityId,
      app.jobTitle,
      app.companyName,
      app.studentId,
      app.studentName,
      app.studentRoll,
      app.cgpa,
      app.talentScore,
      app.matchScore,
      app.status || 'applied',
      app.appliedAt || new Date().toISOString()
    ];

    await query(sql, params);
    return NextResponse.json({ success: true, message: 'Application submitted and saved to MySQL database', application: app });
  } catch (error: any) {
    console.warn('MySQL POST /api/applications error:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
