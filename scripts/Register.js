const db = require('./db');
const { createHash } = require('crypto');



async function registerUser(user, pass, email) {
    if (pass.includes('?') || pass.includes('\'') || pass.includes('\"')) {
        return false;
    }

    const salt = makeSalt(16);
    console.log("salt: " + salt);
    var hash = salt.concat(pass);
    console.log("salt and pass: " + hash);
    hash = createHash('sha256').update(hash).digest('hex');
    console.log(hash);

    try {
        await db.query('INSERT INTO userx (user, salt, hash, email) VALUES (?,?,?,?)', [user, salt, hash, email]);
        console.log("User registered successfully");
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