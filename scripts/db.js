var mysql = require('mysql');

const pool = mysql.createPool({
  host: 'periodpartyusers.c18kycqqwfsz.us-east-1.rds.amazonaws.com',
  port: 1433,
  user: 'admin',
  password: 'SecureShit69$',
  database: 'periodpartyusers',
});

module.exports = pool;