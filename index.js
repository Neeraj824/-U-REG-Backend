const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
const ratesRouter = require('./routes/rates');

// Enable cross-origin requests
app.use(cors());

// Middleware to parse JSON requests
app.use(bodyParser.json());

// API routes
app.use('/api/v1/rates', ratesRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});