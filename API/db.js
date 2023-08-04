const { Pool } = require('pg');

// Create a new pool with your database credentials
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'lakmi',
  password: 'postgres',
  port: 5432, // Default PostgreSQL port
});

module.exports = pool;
