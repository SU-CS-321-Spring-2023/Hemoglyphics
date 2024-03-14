const { createPool } = require ('mysql');
const pool = mysql.createPool({
  host: 'periodpartyusers.c18kycqqwfsz.us-east-1.rds.amazonaws.com',
  user: 'hemoglyph',
  password: '100%clEan',
  database: 'users',
  connectionLimit: 15
});
