const workerModel = require('../models/workerModel');

const signInWorker = (Email, Password, callback) => {
  // Validate input fields
  if (!Email || !Password) {
    return callback(null, { 
      status: 'error', 
      message: 'All fields are required.' 
    });
  }

  workerModel.findByEmailAndPassword(Email, Password, (err, results) => {
    if (err) {
      return callback(err, null);
    }

    // Check if user exists
    if (results.length === 0) {
      return callback(null, { 
        status: 'error', 
        message: 'Invalid email or password.' 
      });
    }

    // Successful sign-in
    const worker = results[0];
    return callback(null, {
      status: 'success',
      message: 'Sign-in successful!',
      worker: {
        firstName: worker.First_name,
        lastName: worker.Last_name,
        email: worker.Email,
      },
    });
  });
};

const fetchWorker = (email,callback) => {
    if(!email) {
        return callback(null, {
            status: 'error',
            message: 'Email is required to fetch worker data.'
        });
    }
    workerModel.findByEmail(email, (err, result) => {
        if(err){
            return callback(err, null);
        }

        if(result.length === 0) {
            return callback(null, {
                status: 'error',
                message: 'worker not found.'
            });
        }
        return callback(null, {
            status: 'success',
            data: result[0],
        });

    });
};


module.exports = { signInWorker,fetchWorker };