const express = require("express");
const { createHash } = require('crypto');
const cors = require("cors");
const mysql = require("mysql");

const app = express();

const db = mysql.createPool({
  host: 'users.c18kycqqwfsz.us-east-1.rds.amazonaws.com',
  user: 'hemoglyph',
  password: '100%clEan',
  database: 'users',
  connectionLimit: 15
});

app.use(express.json());
app.use(cors());

function makeSalt(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@!#$&_';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

app.get("/test", (req, res) => {
  res.send("Hello, world!");
});

app.get("/user", (req, res) => {
  const q = "SELECT id FROM users WHERE userName = 'TheFireGolem';";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/register', (req, res) => {
  const pass = req.body.password;
  const userName = req.body.userName;
  const email = req.body.email;
  const salt = makeSalt(16);
  var hash = salt.concat(pass);
  hash = createHash('sha256').update(hash).digest('hex');
  db.query('INSERT INTO userInfo (userName, passWord, salt, email) VALUES (?, ?, ?, ?);', [userName, hash, salt, email], (err, result) => {
    if (err) return res.json(err);
    const userId = result.insertId;
    const responseData = { userId: userId};
    return res.json(responseData);
  });
});


app.listen(12000, () => {
  console.log("Server running on port 12000");
});
