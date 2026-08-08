import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { AuditLog } from '@/types';

// GET /api/audit-logs - Fetch system audit logs from MySQL
export async function GET() {
  try {
    const rows = await query<any[]>('SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT 100');
    const logs: AuditLog[] = rows.map(r => ({
      id: r.id,
      actorName: r.actor_name,
      actorRole: r.actor_role,
      action: r.action,
      target: r.target,
      hash: r.hash,
      timestamp: r.timestamp,
      ip: '127.0.0.1'
    }));
    return NextResponse.json({ success: true, source: 'mysql', logs });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST /api/audit-logs - Insert security audit event into MySQL
export async function POST(request: Request) {
  try {
    const item: AuditLog = await request.json();
    const sql = `
      INSERT INTO audit_logs (id, actor_name, actor_role, action, target, hash)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [
      item.id || `log_${Date.now()}`,
      item.actorName,
      item.actorRole,
      item.action,
      item.target,
      item.hash || null
    ];

    await query(sql, params);
    return NextResponse.json({ success: true, message: 'Audit log saved to MySQL database', item });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
