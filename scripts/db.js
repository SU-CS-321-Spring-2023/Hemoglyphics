const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'your-database-host',
  user: 'your-database-user',
  password: 'your-database-password',
  database: 'your-database-name',
});

module.exports = pool;
