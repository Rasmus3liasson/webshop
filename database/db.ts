import mysql, { Pool, PoolConnection } from "mysql2/promise";

interface QueryOptions {
  query: string;
  values?: any[];
}

export async function query({ query, values = [] }: QueryOptions) {
  const pool: Pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

let connection: PoolConnection | null = null;

try {
    connection = await pool.getConnection();
    const [results] = await connection.execute(query, values);
    return results;
} catch (error: any) {
    throw new Error(error.message);
} finally {
    if (connection) {
        connection.release();
    }
}
}