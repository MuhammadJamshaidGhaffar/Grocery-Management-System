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
  const promisePool = pool.promise();


// Usage
(async () => {
  try {
    // query database using promises
    const [rows , fields] = await promisePool.query("select * from customer");
    console.log("Rows : " , rows); // This will print the results of the query
    console.log("Fields : " , fields);
} catch (error) {
    console.error('Error querying database:', error);
  }
})();
