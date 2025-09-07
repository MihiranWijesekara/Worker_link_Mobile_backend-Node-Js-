const workerService = require('../services/workerService');

const signInWorker = (req, res) => {
  const { Email, Password } = req.body;
  
  workerService.signInWorker(Email, Password, (err, result) => {
    if (err) {
      console.error('Error during sign-in:', err);
      return res.status(500).json({ 
        status: 'error', 
        message: 'An error occurred during sign-in.' 
      });
    }
    
    if (result.status === 'error') {
      return res.status(401).json(result);
    }
    
    res.status(200).json(result);
  });
};

module.exports = { signInWorker };
  
