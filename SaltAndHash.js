import argon2 from 'argon2';
import { getUserFromDatabase, updateUserLastLogin } from './yourDatabaseFunctions';

const authenticateUser = async (username, password) => {
  // Retrieve user data (including stored salt and hashed password) from the database
  const userData = await getUserFromDatabase(username);

  if (!userData) {
    // User not found
    return false;
  }

  const { salt, hashedPassword } = userData;

  // Hash the entered password using the retrieved salt
  const enteredPasswordHash = await hashPassword(password, salt);

  // Compare the entered password hash with the stored hash
  const isPasswordValid = enteredPasswordHash === hashedPassword;

  if (isPasswordValid) {
    // Update the last login timestamp in the database
    await updateUserLastLogin(username);
  }

  return isPasswordValid;
};

// Usage example
const username = LoginPage.getUser();
const enteredPassword = LoginPage.getPass();

const isAuthenticated = await authenticateUser(username, enteredPassword);

if (isAuthenticated) {
  console.log('User authenticated!');
} else {
  console.log('Invalid username or password.');
}
