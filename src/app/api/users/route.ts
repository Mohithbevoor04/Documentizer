import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { User } from '@/types';

// GET /api/users - Fetch users from MySQL database
export async function GET() {
  try {
    const rows = await query<any[]>('SELECT * FROM users ORDER BY created_at DESC');
    
    const users: User[] = rows.map(r => ({
      id: r.id,
      name: r.name,
      email: r.email,
      phoneNumber: r.phone_number,
      role: r.role,
      primaryRole: r.primary_role,
      allowedRoles: typeof r.allowed_roles === 'string' ? JSON.parse(r.allowed_roles) : r.allowed_roles,
      avatar: r.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      universityId: r.university_id,
      universityName: r.university_name
    }));

    return NextResponse.json({ success: true, source: 'mysql', users });

  } catch (error: any) {
    console.warn('MySQL GET /api/users fallback:', error.message);
    return NextResponse.json({ success: false, error: error.message || 'Database connection error' }, { status: 500 });
  }
}

// POST /api/users - Register or update user in MySQL database
export async function POST(request: Request) {
  try {
    const user: User = await request.json();

    if (!user.id || !user.email) {
      return NextResponse.json({ success: false, error: 'User ID and email are required' }, { status: 400 });
    }

    const sql = `
      INSERT INTO users (id, name, email, phone_number, role, primary_role, allowed_roles, avatar, university_id, university_name)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        phone_number = VALUES(phone_number),
        role = VALUES(role),
        primary_role = VALUES(primary_role),
        allowed_roles = VALUES(allowed_roles),
        university_id = VALUES(university_id),
        university_name = VALUES(university_name)
    `;

    const params = [
      user.id,
      user.name,
      user.email,
      user.phoneNumber || null,
      user.role,
      user.primaryRole,
      JSON.stringify(user.allowedRoles),
      user.avatar || null,
      user.universityId,
      user.universityName
    ];

    await query(sql, params);

    return NextResponse.json({
      success: true,
      message: 'User registered/updated in MySQL database successfully',
      user
    });

  } catch (error: any) {
    console.warn('MySQL POST /api/users error:', error.message);
    return NextResponse.json({ success: false, error: error.message || 'Failed to save user to MySQL' }, { status: 500 });
  }
}
