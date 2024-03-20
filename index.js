const express = require('express');
const {createHash} = require('crypto');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

const db = mysql.createPool({
  host: 'users.c18kycqqwfsz.us-east-1.rds.amazonaws.com',
  user: 'hemoglyph',
  password: '100%clEan',
  database: 'users',
  connectionLimit: 15
});

app.use(bodyParser.urlencoded({extended: true}));

app.post('/',(req,res)=>{
    const pass = req.body.password;
    const userName = req.body.userName;
    const email = req.body.email;
    const salt = makeSalt(16);
    var hash = salt.concat(pass);
    hash = createHash('sha256').update(hash).digest('hex');
    console.log(hash);

    try {
      db.query('INSERT INTO userInfo (userName, passWord, salt, email) VALUES(?,?,?,?);', [userName, hash, salt, email], (err, result)=>{
        res.send("success registered");
      });
    } catch (error) {
        console.error("Error registering user:", error);
    }

    res.send("hello steve");
});

app.listen(3001, () => {
    console.log('running on port 3001')
});
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