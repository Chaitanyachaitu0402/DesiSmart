// server.cjs
const express = require('express');
const bodyParser = require('body-parser');
const { Gateway } = require('./takepayments-integration/SDK-NodeJS-main/gateway.js'); // Adjust path as per your SDK location

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Example endpoint to handle payment requests
app.post('/pay', async (req, res) => {
    try {
        const reqFields = req.body; // Ensure reqFields are correctly formatted as per Takepayments SDK
        const response = await Gateway.directRequest(reqFields);

        console.log('Payment Response:', response);
        res.json(response); // Send response back to client
    } catch (error) {
        console.error('Payment Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
