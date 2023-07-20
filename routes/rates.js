const express = require('express');
const router = express.Router();
const pool = require('../config');

// API endpoint to get historical exchange rates for a specific date
router.get('/:date', async (req, res) => {
  const { date } = req.params;
  try {
    // Execute the SQL query to retrieve the latest exchange rates for all currencies
    const [rows] = await pool.query(`
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

module.exports = router;