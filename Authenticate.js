//Automatically generated for proof of concept, will need tweaking for application specific parameters
const argon2 = require('argon2');
const db = require('./db'); // Import your database connection module

const getUserFromDatabase = async (username) => {
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0] || null;
};

const updateUserLastLogin = async (username) => {
  await db.query('UPDATE users SET last_login = CURRENT_TIMESTAMP() WHERE username = ?', [username]);
};

const authenticateUser = async (username, password) => {
  // Retrieve user data (including stored salt and hashed password) from the database
  const userData = await getUserFromDatabase(username);

  if (!userData) {
    // User not found
    return false;
  }

  const { salt, hashedPassword } = userData;

  // Hash the entered password using the retrieved salt
  const enteredPasswordHash = await argon2.hash(password, { salt: Buffer.from(salt, 'hex') });

  // Compare the entered password hash with the stored hash
  const isPasswordValid = enteredPasswordHash === hashedPassword;

  if (isPasswordValid) {
    // Update the last login timestamp in the database
    await updateUserLastLogin(username);
  }

  return isPasswordValid;
};

// Usage example
const username = 'exampleUser';
const enteredPassword = 'user123';

const isAuthenticated = await authenticateUser(username, enteredPassword);

if (isAuthenticated) {
  console.log('User authenticated!');
} else {
  console.log('Invalid username or password.');
}
