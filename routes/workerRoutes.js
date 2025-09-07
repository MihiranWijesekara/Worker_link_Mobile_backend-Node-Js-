const express = require('express');
const cors = require('cors');
const path = require('path');
const workerController = require("../controllers/workerController");
const { signInWorker } = require('../controllers/signInController');  
const { fetchWorkerProfileList } = require('../controllers/workerProfileCategory');  
const router = express.Router();

// Serve static files from the uploads directory
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// POST request to add a worker
router.post("/add", workerController.addWorker);

// GET request for worker data (this should be GET, not POST)
router.get("/workerData", workerController.fetchWorker);

// POST request to Sign IN a worker
router.post('/signIn', cors(), signInWorker);  

// GET request for worker data (this should be GET, not POST)
router.get('/profileList', cors(), fetchWorkerProfileList);  

module.exports = router;
