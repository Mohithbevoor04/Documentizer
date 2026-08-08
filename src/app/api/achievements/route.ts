import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { AchievementItem } from '@/types';

// GET /api/achievements - Fetch all student achievements from MySQL
export async function GET() {
  try {
    const rows = await query<any[]>('SELECT * FROM achievements ORDER BY created_at DESC');
    const achievements: AchievementItem[] = rows.map(r => ({
      id: r.id,
      studentId: r.student_id,
      studentName: r.student_name,
      studentRoll: r.student_roll,
      department: r.department,
      title: r.title,
      type: r.type,
      description: r.description,
      techStack: typeof r.tech_stack === 'string' ? JSON.parse(r.tech_stack) : r.tech_stack,
      verificationStatus: r.verification_status,
      proofUrl: r.proof_url || 'https://github.com/alexrivera/defi-aggregator',
      ipfsHash: r.ipfs_hash,
      txHash: r.tx_hash,
      createdAt: r.created_at
    }));
    return NextResponse.json({ success: true, source: 'mysql', achievements });
  } catch (error: any) {
    console.warn('MySQL GET /api/achievements fallback:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST /api/achievements - Insert new achievement submission into MySQL
export async function POST(request: Request) {
  try {
    const item: AchievementItem = await request.json();
    const sql = `
      INSERT INTO achievements (id, student_id, student_name, student_roll, department, title, type, description, tech_stack, verification_status, ipfs_hash, tx_hash)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        verification_status = VALUES(verification_status),
        ipfs_hash = VALUES(ipfs_hash),
        tx_hash = VALUES(tx_hash)
    `;
    const params = [
      item.id,
      item.studentId,
      item.studentName,
      item.studentRoll,
      item.department,
      item.title,
      item.type,
      item.description,
      JSON.stringify(item.techStack),
      item.verificationStatus,
      item.ipfsHash || null,
      item.txHash || null
    ];

    await query(sql, params);
    return NextResponse.json({ success: true, message: 'Achievement saved to MySQL database', item });
  } catch (error: any) {
    console.warn('MySQL POST /api/achievements error:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PATCH /api/achievements - Update status (e.g. approved/rejected by faculty)
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, verificationStatus, ipfsHash, txHash } = body;

    const sql = `
      UPDATE achievements 
      SET verification_status = ?, ipfs_hash = COALESCE(?, ipfs_hash), tx_hash = COALESCE(?, tx_hash)
      WHERE id = ?
    `;
    await query(sql, [verificationStatus, ipfsHash || null, txHash || null, id]);

    return NextResponse.json({ success: true, message: 'Achievement status updated in MySQL database' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
