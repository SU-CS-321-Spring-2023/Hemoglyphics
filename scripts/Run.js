// Import the registerUser function and other necessary modules
const { registerUser } = require('./Register.js');

// Define an async function to wrap the registration process
async function main() {
  try {
    await registerUser("IsaacC", "spacefort66", "isaaccopenhaver@gmail.com");
  } catch (error) {
    console.error("Error registering user:", error);
  }
}

// Call the async function to start the registration process
main();
