var mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  port: "1433",
  user: 'root',
  password: 'root',
  database: 'LoginSystem',
});

module.exports = pool;