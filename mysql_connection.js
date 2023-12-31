import mysql from "mysql2";

// Create connection pool (recommended for better performance)
// Database connection options
// export const mysqlConnectionOptions = {
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'management'
// };
export const mysqlConnectionOptions = {
  host: 'localhost',
  user: 'employee',
  password: '12345',
  database: 'management'
};

const pool = mysql.createPool({
  connectionLimit: 10,
  ...mysqlConnectionOptions
});

  // now get a Promise wrapped instance of that pool
  export const mysqlPromisePool = pool.promise();