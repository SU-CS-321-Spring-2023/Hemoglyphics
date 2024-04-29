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

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function createJSONIfNotExist(filePath, defaultData = {}) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData));
  }
}

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
    const { userName, userId } = req.body;

    if (!userName || !userId) {
      return res.status(400).json({ message: 'Invalid input data.' });
    }

    db.query('SELECT id FROM userInfo WHERE userName = ?', [userName], (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error.' });
      if (result.length === 0) {
        return res.status(404).json({ error: 'User not found.' });
      }

      const friendUserId = result[0].id;

      const filePath = 'users/'+userId+'/friends.json';
      ensureDirectoryExistence(filePath);
      createJSONIfNotExist(filePath, { friends: [] });

      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Internal server error.' });

        let friends = { friends: [] };
        try {
          friends = JSON.parse(data);
        } catch (error) {
          return res.status(500).json({ error: 'Internal server error.' });
        }

        const existingFriend = friends.friends.find(friend => friend.id === friendUserId);
        if (existingFriend) {
          return res.status(400).json({ message: 'Friend already added.' });
        }

        friends.friends.push({ username: userName, id: friendUserId });
        const withNewFriend = JSON.stringify(friends);

        fs.writeFile(filePath, withNewFriend, 'utf-8', (err) => {
          if (err) return res.status(500).json({ error: 'Internal server error.' });

          const updatedFriendsList = friends.friends.map(friend => ({
            username: friend.username,
            id: friend.id.toString(),
          }));

          return res.status(200).json({ message: 'Friend added successfully.', friends: updatedFriendsList });
        });
      });
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
});


app.post("/friendsList", async (req, res) => {
  const userId = req.body.userId;
  if (!userId) {
    return res.status(400).json({ error: 'Invalid input data.' });
  }

  const filePath = 'users/'+userId+'/friends.json';
  ensureDirectoryExistence(filePath);
  createJSONIfNotExist(filePath, { friends: [] });

  fs.readFile(filePath, 'utf8', (err, data) => {
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

      const settingsFilePath = path.join(userDir, 'settings.json');
      ensureDirectoryExistence(settingsFilePath);
      createJSONIfNotExist(settingsFilePath, {
        "first-name": "first",
        "last-name": "last",
        "email": email,
        "location_public": "false",
        "birthday": "mm/dd/yyyy",
        "username": userName,
        "userID": userId
      });

      const friendsFilePath = path.join(userDir, 'friends.json');
      ensureDirectoryExistence(friendsFilePath);
      createJSONIfNotExist(friendsFilePath, { friends: [] });

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

app.post('/getSettings', (req, res) => {
  const userId = req.body.userId;

  if (!userId) {
    return res.status(400).json({ error: 'no user ID' });
  }

  const userDir = path.join(__dirname, 'users', String(userId));
  const settingsFilePath = path.join(userDir, 'settings.json');
  ensureDirectoryExistence(settingsFilePath);
  createJSONIfNotExist(settingsFilePath, {
    "first-name": "first",
    "last-name": "last",
    "email": email,
    "location_public": "false",
    "birthday": "mm/dd/yyyy",
    "username": userName,
    "userID": userId
  });

  fs.readFile(settingsFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error.' });
    }

    try {
      const settingsData = JSON.parse(data);
      return res.status(200).json(settingsData);
    } catch (parseError) {
      return res.status(500).json({ error: 'Error parsing JSON data.' });
    }
  });
});

app.post('/setSettings', (req, res) => {
  const { userId, settings } = req.body;

  if (!userId || !settings) {
    return res.status(400).json({ error: 'Invalid request data.' });
  }
  const userDir = path.join(__dirname, 'users', String(userId));
  const settingsFilePath = path.join(userDir, 'settings.json');

  db.query('SELECT userName FROM userInfo WHERE userId = ?', [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database error.' });
    }

    if (result.length === 0) {
      return res.status(406).json({ error: 'User not found.' });
    }

    const username = result;
console.log(username);
console.log(result.userName);
console.log(result[0].userName)
    const updatedSettings = {...settings, Username: username };

    ensureDirectoryExistence(settingsFilePath);
    createJSONIfNotExist(settingsFilePath, updatedSettings);

    return res.status(200).json({ message: 'Settings updated successfully.' });
  });
});

app.get("/test", (req, res) => {
  res.send("Hello, world!");
});

app.listen(12000, () => {
  console.log("Server running on port 12000");
});
