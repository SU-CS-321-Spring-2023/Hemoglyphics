const db = require('./db');
const { createHash } = require('crypto');



async function registerUser(user, pass, email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (pass == "") {
        alert("Password can not be empty");
        return false;
      } else if (re.test(String(pass).toLowerCase()) == false) {
        alert("Password must be valid");
        return false;
      }

      if (email == "") {
        alert("Email can not be empty");
        return false;
      } else if (re.test(String(email).toLowerCase()) == false) {
        alert("Email must be valid");
        return false;
      }

      if (user == "") {
        alert("Username can not be empty");
        return false;
      } else if (re.test(String(x).toLowerCase()) == false) {
        alert("Username must be valid");
        return false;
      }

    const salt = makeSalt(16);
    console.log("salt: " + salt);
    var hash = salt.concat(pass);
    console.log("salt and pass: " + hash);
    hash = createHash('sha256').update(hash).digest('hex');
    console.log(hash);

    try {
        await db.query('INSERT INTO users (user, salt, hash, email) VALUES (?,?,?,?)', [user, salt, hash, email]);
        console.log("User registered successfully");
        return true;
    } catch (error) {
        console.error("Error registering user:", error);
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
module.exports = { registerUser };