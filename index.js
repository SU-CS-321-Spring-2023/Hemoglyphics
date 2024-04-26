const express = require("express");
const { createHash } = require('crypto');
const cors = require("cors");
const mysql = require("mysql");
const fs = require('fs');
const path = require('path');

const app = express();

const db = mysql.createPool({
  host: 'users.c18kycqqwfsz.us-east-1.rds.amazonaws.com',
  user: 'hemoglyph',
  password: '100%clEan',
  database: 'users',
  connectionLimit: 5
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

app.post("/addFriend", async (req, res) => {
  try {
      const username = req.body.userName;
      const userId = req.body.userId;

      console.log('Received request to add friend. Username:', username, 'UserID:', userId);

      if (!username || !userId) {
          console.log('Invalid input data. Username:', username, 'UserID:', userId);
          return res.status(400).json({ message: 'Invalid input data.' });
      }

      db.query('SELECT id FROM userInfo WHERE userName = ?', [username], (err, result) => {
          if (err) {
              console.error('Database error:', err);
              return res.status(500).json({ error: 'Database error.' });
          }
          if (result.length === 0) {
              console.log('User not found with username:', username);
              return res.status(404).json({ error: 'User not found.' });
          }

          const friendUserId = result[0].id;
          console.log('Friend user ID found:', friendUserId);

          fs.readFile('users/' + userId + '/friends.json', 'utf8', (err, data) => {
              if (err) {
                  console.error('Error reading friends data:', err);
                  return res.status(500).json({ error: 'Internal server error.' });
              }

              var friends = { friends: {} };
              try {
                  friends = JSON.parse(data);
              } catch (error) {
                  console.error('Error parsing friends data:', error);
                  return res.status(500).json({ error: 'Internal server error.' });
              }

              if (friends.friends[friendUserId]) {
                  console.log('Friend already added with ID:', friendUserId);
                  return res.status(400).json({ message: 'Friend already added.' });
              }

              friends.friends[friendUserId] = username;
              const withNewFriend = JSON.stringify(friends);

              fs.writeFile('users/' + userId + '/friends.json', withNewFriend, 'utf-8', (err) => {
                  if (err) {
                      console.error('Error writing friends data:', err);
                      return res.status(500).json({ error: 'Internal server error.' });
                  }
                  console.log('Friend added successfully. Username:', username, 'UserID:', userId);
                  return res.status(200).json({ message: 'Friend added successfully.' });
              });
          });
      });
  } catch (error) {
      console.error('Internal server error:', error);
      return res.status(500).json({ error: 'Internal server error.' });
  }
});


app.post("/friendsList", async (req, res) => {
  const userId = req.body.userId;
  if (!userId) {
    return res.status(400).json({ error: 'Invalid input data.' });
  }

  fs.readFile('users/'+userId+'/friends.json', 'utf8', (err, data) => {
      if (err) return res.status(500).json({ error: 'Internal server error.' });

      try {
          const friendsData = JSON.parse(data);
          return res.status(200).json(friendsData);
      } catch (parseError) {
          return res.status(500).json({ error: 'Error parsing JSON data.' });
      }
  });
});

app.post('/register', (req, res) => {
  const password = req.body.password;
  const userName = req.body.userName;
  const email = req.body.email;

  if (!userName || !password || !email) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email.' });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
  }

  const salt = makeSalt(16);
  const hash = createHash('sha256').update(salt + password).digest('hex');

  db.query('SELECT * FROM userInfo WHERE userName = ? OR email = ?', [userName, email], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error.' });

    if (result.length > 0) {
      return res.status(400).json({ error: 'Username or email already exists.' });
    }

    db.query('INSERT INTO userInfo (userName, passWord, salt, email) VALUES (?, ?, ?, ?);', [userName, hash, salt, email], (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error.' });

      const userId = result.insertId;
      const responseData = { userId: userId };
      const userDir = path.join(__dirname, 'users', String(userId));
      fs.mkdirSync(userDir, { recursive: true });
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
    return res.status(401).json({ error: 'Invalid email format.' });
  }

  if (!validatePassword(password)) {
    return res.status(402).json({ error: 'Password must be at least 8 characters long.' });
  }

  db.query('SELECT * FROM userInfo WHERE email = ?', [email], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error.' });

    if (result.length === 0) {
      return res.status(406).json({ error: 'Invalid credentials.' });
    }

    const user = result[0];
    const hash = createHash('sha256').update(user.salt + password).digest('hex');

    if (hash !== user.passWord) {
      return res.status(407).json({ error: 'Invalid password.' });
    }

    return res.status(200).json({ userId: user.id });
  });
});

app.get("/test", (req, res) => {
  res.send("Hello, world!");
});

app.listen(12000, () => {
  console.log("Server running on port 12000");
});
