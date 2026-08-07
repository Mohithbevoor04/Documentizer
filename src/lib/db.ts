import mysql from 'mysql2/promise';

// Create a reusable MySQL connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
  database: process.env.MYSQL_DATABASE || 'talentchain_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function query<T = any>(sql: string, params: any[] = []): Promise<T> {
  try {
    const [results] = await pool.execute(sql, params);
    return results as T;
  } catch (error: any) {
    console.warn('MySQL Query Execution Warning:', error.message);
    throw error;
  }
}

export default pool;
