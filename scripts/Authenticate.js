const argon2 = require('argon2');
//database connection link
const db = require('./db');
//pulls user
const getUserFromDatabase = async (user) => {
  const [rows] = await db.query('SELECT * FROM users WHERE user = ?', [user]);
  return rows[0] || null;
};
//pulls last login info
const updateUserLastLogin = async (user) => {
  await db.query('UPDATE users SET last_login = CURRENT_TIMESTAMP() WHERE user = ?', [user]);
};

const authenticateUser = async (user, pass) => {
  // Retrieve user data (including stored salt and hashed password) from the database
  const userData = await getUserFromDatabase(user);

  if (!userData) {
    // User not found
    return false;
  }

  const { salt, hashedPassword } = userData;

  // Hash the entered password using the retrieved salt
  const enteredPasswordHash = await argon2.hash(pass, { salt: Buffer.from(salt, 'hex') });

  // Compare the entered password hash with the stored hash
  const isPasswordValid = enteredPasswordHash === hashedPassword;

  if (isPasswordValid) {
    // Update the last login timestamp in the database
    await updateUserLastLogin(user);
  }

  return isPasswordValid;
};
const isAuthenticated = authenticateUser(user, enteredPassword);

if (isAuthenticated) {
  console.log('User authenticated!');
} else {
  console.log('Invalid user or password.');
}