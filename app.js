const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3001;



// Enable cross-origin requests
app.use(cors());
// Database connection configuration
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE, 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Middleware to parse JSON requests
app.use(bodyParser.json());
// API endpoint to get historical exchange rates for a specific date
app.get('/api/v1/rates/:date', async (req, res) => {
  const { date } = req.params;
  try {
    // Execute the SQL query to retrieve the latest exchange rates for all currencies
    const [rows] = await pool.promise().query(`
      SELECT c.code, c.name, r.rate, r.effective_date
      FROM rates r
      INNER JOIN currencies c ON r.target_currency_id = c.id
      WHERE r.base_currency_id = 1
      AND r.effective_date = ?
    `, [date]);
    res.json(rows); // Send the query result as a JSON response
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
