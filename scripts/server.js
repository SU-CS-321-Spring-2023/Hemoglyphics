const db = require('./db.js'); // Import your MySQL configuration

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // You can change the port as needed

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Function to save symptom data
async function saveSymptoms(symptoms) {
    // Create an object where the keys are symptom names and the values are 1
    const symptomData = symptoms.reduce((obj, symptom) => {
        obj[symptom.name] = 1;
        return obj;
    }, {});

    // Perform database query to save symptom data
    try {
        await db.query('INSERT INTO user_symptoms SET ?', [symptomData]);
        console.log("Symptoms saved successfully");
    } catch (error) {
        console.error("Error saving symptoms:", error);
    }
}

// API endpoint to save symptom data
app.post('/save-symptoms', (req, res) => {
    const { symptoms } = req.body;

    console.log("Received symptoms:", symptoms); // Log the received symptoms

    saveSymptoms(symptoms)
        .then(() => {
            console.log("Symptoms saved successfully"); // Log success message
            res.status(200).json({ message: 'Symptoms saved successfully' });
        })
        .catch(error => {
            console.error("Error in saveSymptoms:", error); // Log the error
            res.status(500).json({ error: 'Error saving symptoms' });
        });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = { saveSymptoms };
