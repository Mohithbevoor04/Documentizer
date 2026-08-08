import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { JobOpportunity } from '@/types';

// GET /api/jobs - Fetch jobs from MySQL
export async function GET() {
  try {
    const rows = await query<any[]>('SELECT * FROM jobs ORDER BY created_at DESC');
    const jobs: JobOpportunity[] = rows.map(r => ({
      id: r.id,
      companyName: r.company_name,
      companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=100',
      title: r.title,
      type: r.type,
      location: r.location,
      isRemote: Boolean(r.is_remote),
      stipendOrSalary: r.stipend_or_salary,
      deadline: r.deadline,
      skillsRequired: typeof r.skills_required === 'string' ? JSON.parse(r.skills_required) : r.skills_required,
      description: r.description,
      minCgpa: Number(r.min_cgpa),
      status: r.status,
      applicantsCount: 0
    }));
    return NextResponse.json({ success: true, source: 'mysql', jobs });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST /api/jobs - Create job opportunity in MySQL
export async function POST(request: Request) {
  try {
    const item: JobOpportunity = await request.json();
    const sql = `
      INSERT INTO jobs (id, company_name, title, type, location, is_remote, stipend_or_salary, deadline, skills_required, description, min_cgpa, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE status = VALUES(status)
    `;
    const params = [
      item.id,
      item.companyName,
      item.title,
      item.type,
      item.location,
      item.isRemote ? 1 : 0,
      item.stipendOrSalary,
      item.deadline,
      JSON.stringify(item.skillsRequired),
      item.description,
      item.minCgpa,
      item.status
    ];

    await query(sql, params);
    return NextResponse.json({ success: true, message: 'Job saved to MySQL database', item });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
