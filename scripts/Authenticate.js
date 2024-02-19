  const { createHash } = require('crypto');
  //database connection link
  const db = require('./db');

  // Function to hash the password using SHA-256
  const hashPassword = (password, salt) => {
    const hash = createHash('sha256');
    hash.update(password + salt);
    return hash.digest('hex');
  };

  // Function to retrieve user data from the database
  const getUserFromDatabase = async (user) => {
    const rows = await db.query('SELECT * FROM users WHERE user = ?', [user]);
    return rows[0] || null;
  };

  const authenticateUser = async (user, pass) => {
    // Retrieve user data (including stored salt and hashed password) from the database
    const userData = await getUserFromDatabase(user);
  
    if (!userData) {
      // User not found
      console.log('User not found:', user);
      return false;
    }
  
    const { salt, hash } = userData;
  
    console.log('Retrieved salt from database:', salt);
  
    // Hash the entered password using the retrieved salt
    const enteredPasswordHash = createHash('sha256').update(salt + pass).digest('hex');
  
    console.log('Entered password hash:', enteredPasswordHash);
    console.log('Stored hash from database:', hash);
  
    // Compare the entered password hash with the stored hash
    const isPasswordValid = enteredPasswordHash === hash;

  
    return isPasswordValid;
  };
  
  // Example usage
  const isAuthenticated = await authenticateUser("IsaacC", "spacefort66");

  if (isAuthenticated) {
    console.log('User authenticated!');
  } else {
    console.log('Invalid user or password.');
  }
