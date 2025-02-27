const db = require('../config/db');

const signInWorker = (req, res) => {
  const { Email, Password } = req.body;

  // Validate input fields
  if (!Email || !Password) {
    return res.status(400).json({ status: 'error', message: 'All fields are required.' });
  }

  const sql = `
    SELECT * FROM worker_account 
    WHERE Email = ? AND Password = ?
  `;

  const values = [Email, Password];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ status: 'error', message: 'An error occurred during sign-in.' });
    }

    // Check if user exists
    if (results.length === 0) {
      return res.status(401).json({ status: 'error', message: 'Invalid email or password.' });
    }

    // Successful sign-in
    const worker = results[0]; // Retrieve worker details from the database
    return res.status(200).json({
      status: 'success',
      message: 'Sign-in successful!',
      worker: {
     //   id: worker.id, // Replace with the actual column name for the worker's ID
        firstName: worker.First_name, // Replace with the actual column name
        lastName: worker.Last_name, // Replace with the actual column name
        email: worker.Email,
        // Exclude sensitive details like the password
      },
    });
  });
};

module.exports = { signInWorker };


