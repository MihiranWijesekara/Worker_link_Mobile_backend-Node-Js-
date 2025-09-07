const db = require('../config/db');

const findByEmailAndPassword = (email, password, callback) => {
  const sql = 'SELECT * FROM worker_account WHERE Email = ? AND Password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};


const findByEmail = (email, callback) => {
  const sql = 'SELECT * FROM worker_account WHERE Email = ?';
  db.query(sql,[email], (err, result ) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

module.exports = { findByEmailAndPassword, findByEmail };