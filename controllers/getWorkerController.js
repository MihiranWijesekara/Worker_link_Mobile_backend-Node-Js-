const db = require('../config/db');

const fetchWorker = (req, res) => {
  const { email } = req.query;

  // Validate the email parameter
  if (!email) {
    return res.status(400).json({ status: 'error', message: 'Email is required to fetch worker data.' });
  }

  const sql = 'SELECT * FROM worker_account WHERE Email = ?';
  const values = [email];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error fetching worker:', err);
      return res.status(500).json({ status: 'error', message: 'Failed to fetch worker data.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ status: 'error', message: 'Worker not found.' });
    }

    return res.status(200).json({
      status: 'success',
      data: results[0], // Return only the logged-in worker's data
    });
  });
};

module.exports = { fetchWorker };
