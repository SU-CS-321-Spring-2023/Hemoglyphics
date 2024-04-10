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

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 8;
}

app.post('/register', (req, res) => {
  const pass = req.body.password;
  const userName = req.body.userName;
  const email = req.body.email;

  if (!userName || !pass || !email) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email.' });
  }

  if (!validatePassword(pass)) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
  }

  db.query('SELECT * FROM userInfo WHERE userName = ? OR email = ?', [userName, email], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error.' });

    if (result.length > 0) {
      return res.status(400).json({ error: 'Username or email already exists.' });
    }

    const salt = makeSalt(16);
    var hash = salt.concat(pass);
    hash = createHash('sha256').update(hash).digest('hex');
    db.query('INSERT INTO userInfo (userName, passWord, salt, email) VALUES (?, ?, ?, ?);', [userName, hash, salt, email], (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error.' });
      const userId = result.insertId;
      const responseData = { userId: userId };
      return res.status(200).json(responseData);
    });
  });
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
  }

  db.query('SELECT * FROM userInfo WHERE email = ?', [email], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error.' });

    if (result.length === 0) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    const user = result[0];
    const hash = crypto.createHash('sha256').update(user.salt + password).digest('hex');

    if (hash !== user.passWord) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    const responseData = { success: true, userId: user.id };
    return res.status(200).json(responseData);
  });
});


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

app.listen(12000, () => {
  console.log("Server running on port 12000");
});
