const mysql = require('mysql2/promise');

// DEBUG: Cetak variabel yang dibaca (Password akan disensor)
console.log("=== DATABASE DEBUG INFO ===");
console.log("DB_HOST:", process.env.MYSQLHOST || process.env.DB_HOST || "NOT SET (will use localhost)");
console.log("DB_USER:", process.env.MYSQLUSER || process.env.DB_USER);
console.log("DB_NAME:", process.env.MYSQLDATABASE || process.env.DB_NAME);
console.log("DB_PORT:", process.env.MYSQLPORT || process.env.DB_PORT);
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("============================");

const pool = mysql.createPool({
  host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
  user: process.env.MYSQLUSER || process.env.DB_USER,
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
  database: process.env.MYSQLDATABASE || process.env.DB_NAME,
  port: Number(process.env.MYSQLPORT || process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_POOL_LIMIT || 10),
  queueLimit: 0,
  ssl: (process.env.MYSQLHOST || process.env.DB_HOST) && process.env.NODE_ENV === 'production' 
       ? { rejectUnauthorized: false } : false
});

async function dbQuery(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

module.exports = {
  pool,
  dbQuery
};
