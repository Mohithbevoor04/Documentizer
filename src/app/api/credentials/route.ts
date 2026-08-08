import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { CredentialRecord } from '@/types';

// GET /api/credentials - Fetch all credentials from MySQL
export async function GET() {
  try {
    const rows = await query<any[]>('SELECT * FROM credentials ORDER BY created_at DESC');
    const credentials: CredentialRecord[] = rows.map(r => ({
      id: r.id,
      title: r.title,
      type: r.type,
      studentName: r.student_name,
      studentRoll: r.student_roll,
      universityName: r.university_name,
      issuerName: r.issuer_name,
      issuedAt: r.issued_at,
      ipfsHash: r.ipfs_hash,
      txHash: r.tx_hash,
      contractAddress: r.contract_address,
      tokenId: r.token_id,
      status: r.status,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(`https://polygonscan.com/tx/${r.tx_hash}`)}`,
      metadata: {
        skillsVerified: ['Verified On-Chain'],
        description: r.title
      }
    }));
    return NextResponse.json({ success: true, source: 'mysql', credentials });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST /api/credentials - Store newly issued Polygon credential in MySQL
export async function POST(request: Request) {
  try {
    const item: CredentialRecord = await request.json();
    const sql = `
      INSERT INTO credentials (id, title, type, student_name, student_roll, university_name, issuer_name, issued_at, ipfs_hash, tx_hash, contract_address, token_id, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE status = VALUES(status)
    `;
    const params = [
      item.id,
      item.title,
      item.type,
      item.studentName,
      item.studentRoll,
      item.universityName,
      item.issuerName,
      item.issuedAt,
      item.ipfsHash,
      item.txHash,
      item.contractAddress,
      item.tokenId,
      item.status
    ];

    await query(sql, params);
    return NextResponse.json({ success: true, message: 'Polygon credential saved to MySQL database', item });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
