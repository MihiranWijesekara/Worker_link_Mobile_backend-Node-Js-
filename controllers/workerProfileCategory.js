const db = require('../config/db');

const fetchWorkerProfileList = (req, res) => {
  const { Work_type } = req.query;

  // Query to select workers based on the Work_type
  const sql = 'SELECT * FROM worker_account WHERE Work_type = ?';
  const values = [Work_type];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error fetching worker profiles:', err);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to fetch worker profiles.',
      });
    }

    // If no workers found for the given Work_type
    if (results.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: `No workers found for Work_type: ${Work_type}.`,
      });
    }

    // If workers found, return all workers matching the Work_type
    return res.status(200).json({
      status: 'success',
      data: results, // Return the entire list of workers with the matching Work_type
    });
  });
};

module.exports = { fetchWorkerProfileList };
