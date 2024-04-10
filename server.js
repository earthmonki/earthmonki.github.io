const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse incoming request data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Handle form submissions
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;

    // Process the form data
    console.log(`Received form submission from ${name} (${email}): ${message}`);
    console.log('Processing form data...');

    // Send a response to the client
    res.send('Form submission successful!');

});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
