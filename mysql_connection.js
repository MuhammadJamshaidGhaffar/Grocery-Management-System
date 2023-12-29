import mysql from "mysql2";

// Create connection pool (recommended for better performance)
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'management'
});

  // now get a Promise wrapped instance of that pool
  export const mysqlPromisePool = pool.promise();