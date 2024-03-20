const db = require('./db');
const { createHash } = require('crypto');


async function registerUser(user, pass, email) {
  const re = /^[a-zA-Z0-9_]{3,20}$/;
    if (pass == "") {
        console.log("Password can not be empty");
        return false;
      } else if (re.test(String(pass).toLowerCase()) == false) {
        console.log("Password must be valid");
        return false;
      }

      if (email == "") {
        console.log("Email can not be empty");
        return false;
      } else if (re.test(String(email).toLowerCase()) == true) {
        console.log("Email must be valid");
        return false;
      }

      if (user == "") {
        console.log("Username can not be empty");
        return false;
      } else if (re.test(String(user).toLowerCase()) == false) {
        console.log("Username must be valid");
        return false;
      }

    const salt = makeSalt(16);
    console.log("salt: " + salt);
    var hash = salt.concat(pass);
    console.log("salt and pass: " + hash);
    hash = createHash('sha256').update(hash).digest('hex');
    console.log(hash);

    try {
      await db.query('INSERT INTO user (user, salt, hash, email) VALUES (?,?,?,?)', [user, salt, hash, email]);
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
registerUser("test2", "steve", "testtest@gmail.com");